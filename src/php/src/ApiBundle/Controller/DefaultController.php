<?php

namespace ApiBundle\Controller;

use ApiBundle\Entity\Product;
use ApiBundle\Entity\User;
use ApiBundle\Form\ProductType;
use ApiBundle\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DefaultController
 * @package ApiBundle\Controller
 */

class DefaultController extends Controller
{
    /**
     * Resolve action and class
     * @param $path
     * @param Request $request
     * @return Response
     */
    public function indexAction($path, Request $request)
    {
        $actionResolver = $this->get('api.action_resolver');
        $response = $actionResolver->resolve($request, $path);
        return new JsonResponse($response->getResult(), $response->getStatus());
    }

    public function testAction($entity)
    {
        $user = new Product();
        $form = $this->createForm(ProductType::class, $user);

        $rendered = $this->render('register.html.twig', [
            "form" => $form->createView(),
            "entity" => $entity
        ]);

        $rendered = $rendered->getContent();

        $rendered = str_ireplace('apibundle_', '', $rendered);
        $rendered = str_ireplace('][', '.', $rendered);
        $rendered = str_ireplace('product[', '', $rendered);
        $rendered = str_ireplace('[', '', $rendered);
        $rendered = str_ireplace(']', '', $rendered);
        $rendered = str_ireplace('style="display: none"', '', $rendered);

        echo $rendered; die();


    }


    public function resolveEntity($path)
    {
        $parts = explode('/', $path);
        return ucfirst($parts[0]);
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

    protected function _createEntity() {
        $entity = $this->_getEntityName();
        $entity = 'ApiBundle\\Entity\\' . $entity;
        return new $entity();
    }
}
