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
use JMS\Serializer\EventDispatcher\EventDispatcher;

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
        $this->serializer = \JMS\Serializer\SerializerBuilder::create()
            ->configureListeners(function(EventDispatcher $dispatcher) {
                $dispatcher->addSubscriber(new \ApiBundle\Event\AvoidDoctrineProxySubscriber());
            })
            ->build();
    }

    /**
     * Restore default serializer
     */
    protected function restoreSerializer() {
        $this->serializer = \JMS\Serializer\SerializerBuilder::create()->build();
    }

    protected function format($data) {
        if (is_array($data)) {
            $result = [];
            foreach ($data as $item) {
                $result[] = [
                    'type' => str_ireplace("ApiBundle\\Entity\\", '', get_class($item)),
                    'id' => $item->getId(),
                    'attributes' => $this->serialize($item)
                ];
            }
            return $result;
        }   else  {
            return [
                'type' => str_ireplace("ApiBundle\\Entity\\", '', get_class($data)),
                'id' => $data->getId(),
                'attributes' => $this->serialize($data)
            ];
        }
    }

    /**
     * Serialize data
     * @param $content
     * @return mixed
     */
    protected function serialize($content) {
        $data = json_decode($this->serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true)));
        return $data;
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
    protected function getRepository($entity = null) {
        if (is_null($entity)) {
            $entity = $this->getActionParams()->getEntity();
        }
        return $this->em->getRepository('ApiBundle:' . ucfirst($entity));
    }

    protected abstract function handle();

    public function getResponse()
    {
        try {
            $this->preAction();
            $result = $this->handle();
            $this->postAction();
        }   catch (ApiException $e) {
            return new ErrorResponse($e->getMessage(), $e->getCode(), $e->getErrors());
        }
        return $this->getResponseInstance($result);
    }

    protected function preAction() {}

    protected function postAction() {}

    protected function getResponseInstance($result) {
        return new Response($result);
    }
}