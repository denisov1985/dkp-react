<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class DefaultController extends Controller
{
    /**
     * Index action (find all)
     * @return Response
     */
    public function indexAction()
    {
        $collection = $this->getDoctrine()
            ->getRepository('ApiBundle:' . $this->_getEntityName())
            ->findAll();
        return new Response(
            $this->serialize($collection),
            Response::HTTP_OK,
            ['Content-Type', 'application/json']
        );
    }

    /**
     * Get item details
     * @param $id
     * @return Response
     */
    public function getAction($id)
    {
        $item = $this->getDoctrine()
            ->getRepository('ApiBundle:' . $this->_getEntityName())
            ->find($id);
        return new Response(
            $this->serialize($item),
            Response::HTTP_OK,
            ['Content-Type', 'application/json']
        );
    }

    /**
     * Save action
     * @param Request $request
     * @return JsonResponse
     */
    public function saveAction(Request $request)
    {
        $content = $request->getContent();
        if (!empty($content))
        {
            $data = json_decode($content, true); // 2nd param to get as array
            $params = isset($data['params']) ? $data['params'] : [];
            $data   = $data['data'];
        }

        if (!empty($data['id'])) {
            $user = $this->getDoctrine()
                ->getRepository('ApiBundle:' . $this->_getEntityName())
                ->find($data['id']);
        }   else  {
            $user = $this->_createEntity();
        }

        foreach ($data as $key => $value) {
            if ($key == 'id') {
                continue;
            }
            $method = "set" . str_replace(' ', '', ucwords(str_replace('_', ' ', $key)));
            $value = $value === '' ? null : $value;
            $user->$method($value);
        }

        $validator = $this->get('validator');
        $errors = $validator->validate($user);

        $errorsCollection = [];
        foreach ($errors as $key => $error) {
            $errorsCollection[$error->getPropertyPath()] = [
                'property' => $error->getPropertyPath(),
                'message'  => $error->getMessage()
            ];
        }

        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($user);
        $em->flush();

        $user = $this->getDoctrine()
            ->getRepository('ApiBundle:' . $this->_getEntityName())
            ->find($user->getId());

        $userData = $this->serialize($user);

        return new JsonResponse([
            'valid'  => count($errorsCollection) === 0,
            'errors' => $errorsCollection,
            'data'   => $data,
            'params' => $params,
            'object' => json_decode($userData),
        ]);
    }

    public function deleteAction(Request $request)
    {
        $content = $request->getContent();
        if (!empty($content))
        {
            $data = json_decode($content, true); // 2nd param to get as array
            $params = isset($data['params']) ? $data['params'] : [];
            $data   = $data['data'];
        }

        $em = $this->getDoctrine()->getEntityManager();

        if (isset($data['id'])) {
            $record = $this->getDoctrine()
                ->getRepository('ApiBundle:' . $this->_getEntityName())
                ->find($data['id']);
            $em->remove($record);
        }   else  {
            foreach ($data as $recordToDelete) {
                $record = $this->getDoctrine()
                    ->getRepository('ApiBundle:' . $this->_getEntityName())
                    ->find($recordToDelete['data']['id']);
                $em->remove($record);
            }
        }
        $em->flush();
        return new JsonResponse([
            'valid'  => true,
            'errors' => [],
            'data'   => $data,
            'params' => $params
        ]);
    }

    protected function serialize($content) {
        $serializer = $this->get('jms_serializer');
        return $serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true));
    }

    abstract protected function _getEntityName();

    protected function _createEntity() {
        $entity = $this->_getEntityName();
        $entity = 'ApiBundle\\Entity\\' . $entity;
        return new $entity();
    }
}
