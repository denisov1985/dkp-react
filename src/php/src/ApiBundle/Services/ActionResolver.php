<?php

namespace ApiBundle\Services;

use JMS\Serializer\SerializationContext;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ActionResolver
{
    protected $actionFactory;
    protected $serializer;

    public function __construct($actionFactory, $serializer)
    {
        $this->actionFactory = $actionFactory;
        $this->serializer    = $serializer;
    }

    /**
     * Resolve api request
     * @param $path
     * @param Request $request
     * @return JsonResponse
     */
    public function resolve($path, Request $request)
    {
        $entity     = $this->resolveEntity($path);
        $actionType = $this->resolveAction($path);
        $params     = $this->resolveParams($path);
        try {
            $action     = $this->actionFactory->create($entity, $actionType, $params);

            return new JsonResponse([
                'result' => $this->serialize($action->handle($request, $params))
            ]);
        }  catch (\Exception $e) {
            return new JsonResponse([
                'result' => [],
                'errorMessage' => $e->getMessage()
            ]);
        }
    }

    /**
     * Resolve api entity
     * @param $path
     * @return string
     */
    protected function resolveEntity($path) {
        $parts = explode('/', $path);
        return ucfirst($parts[0]);
    }

    /**
     * Resolve api action
     * @param $path
     * @return string
     */
    protected function resolveAction($path) {
        $parts = explode('/', $path);
        return isset($parts[1]) ? $parts[1] : 'find';
    }

    /**
     * Resolve params
     * @param $path
     * @return string
     */
    protected function resolveParams($path) {
        $parts = explode('/', $path);
        if (!isset($parts[2])) {
            return [];
        }
        unset($parts[0], $parts[1]);
        return array_values($parts);
    }

    protected function serialize($content) {
        return json_decode($this->serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true)));
    }
}