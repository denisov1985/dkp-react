<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:45 PM
 */

namespace ApiBundle\Services\Api\Actions;


use ApiBundle\Services\Api\ActionParams;
use ApiBundle\Services\Api\ErrorResponse;
use ApiBundle\Services\Api\Exceptions\ApiException;
use ApiBundle\Services\Api\Response;
use JMS\Serializer\SerializationContext;

abstract class AbstractAction
{
    protected $actionParams;
    protected $status = 200;
    protected $serializer;


    /**
     * AbstractAction constructor.
     * @param $em
     */
    public function __construct($em, $actionParams)
    {
        $this->em = $em;
        $this->actionParams = $actionParams;
        $this->serializer = \JMS\Serializer\SerializerBuilder::create()->build();
    }

    /**
     * Serialize data
     * @param $content
     * @return mixed
     */
    protected function serialize($content) {
        return json_decode($this->serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true)));
    }

    /**
     * @return ActionParams
     */
    public function getActionParams()
    {
        return $this->actionParams;
    }

    /**
     * Get repository helper
     * @return \Doctrine\ORM\EntityRepository
     */
    protected function getRepository($entity) {
        return $this->em->getRepository('ApiBundle:' . ucfirst($entity));
    }

    protected abstract function handle();

    public function getResponse()
    {
        try {
            $result = $this->handle();
        }   catch (ApiException $e) {
            return new ErrorResponse($e->getMessage(), $e->getCode(), $e->getErrors());
        }
        return $this->getResponseInstance($this->handle());
    }

    protected function getResponseInstance($result) {
        return new Response($result);
    }
}