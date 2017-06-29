<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/21/2017
 * Time: 7:21 PM
 */

namespace ApiBundle\Services\Api;
use Symfony\Component\HttpFoundation\Request;

class ActionResolver
{
    protected $actionFactory;

    function __construct($actionFactory)
    {
        $this->actionFactory = $actionFactory;
    }

    public function resolve(Request $request, $path)
    {
        $actionParams = new ActionParams(
            $this->resolveEntity($path),
            $this->resolveAction($path),
            $this->resolveParams($path),
            $this->resolveData($request),
            $this->resolveToken($request)
        );

        return $this->actionFactory
            ->create($actionParams)
            ->getResponse();
    }

    /**
     * Resolve request token
     * @param Request $request
     * @return array
     */
    protected function resolveToken(Request $request) {
        return [];
    }

    /**
     * Resolve data fro request
     * @param Request $request
     * @return array
     */
    protected function resolveData(Request $request) {
        $content = $request->getContent();
        if (!empty($content))
        {
            return json_decode($content, true);
        }
        return [];
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
}