<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use JMS\Serializer\SerializationContext;
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

    protected function serialize($content) {
        $serializer = $this->get('jms_serializer');
        return $serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true));
    }

    abstract protected function _getEntityName();

    protected function _createEntity() {
        $entity = $this->_getEntityName();
        return new $entity();
    }
}
