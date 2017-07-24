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
    protected $query;

    /**
     * AbstractAction constructor.
     * @param $em
     */
    public function __construct($em, ActionParams $actionParams)
    {
        $this->query = $actionParams->getQuery();
        $this->em = $em;
        $this->actionParams = $actionParams;
        $this->serializer = \JMS\Serializer\SerializerBuilder::create()
            ->configureListeners(function(EventDispatcher $dispatcher) {
                $dispatcher->addSubscriber(new \ApiBundle\Event\AvoidDoctrineProxySubscriber());
            })
            ->build();
        $this->_initQueryParams();
    }

    protected function _initQueryParams() {}

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
        return new Response($result, $this);
    }

    /**
     * @return mixed
     */
    public function getQuery()
    {
        return $this->query;
    }

    protected function getBuilder() {
        $builder = $this->getRepository()
            ->createQueryBuilder('p');
        $builder->setMaxResults($this->getQuery()['page']['limit']);

        $filter = $this->getQuery()['filter'];
        foreach($filter as $key => $value) {
            //echo "p.{$value['field']} {$value['operator']} {$value['value']}" . PHP_EOL;
            $builder->andWhere("p.{$value['field']} {$value['operator']} :var{$key}");
            $builder->setParameter("var{$key}", $value['value']);
        }

        //die();

        return $builder;
    }

    protected function findAll() {
        $builder = $this->getBuilder()
            ->setFirstResult($this->getQuery()['page']['limit'] * ($this->getQuery()['page']['offset'] - 1));
        if (!empty($this->getQuery()['sort']['field'])) {
            $builder->addOrderBy('p.' . $this->getQuery()['sort']['field'], $this->getQuery()['sort']['order']);
        }
        return $builder->getQuery()->getResult();
    }

    protected function countAll() {
        return $this->getBuilder()
            ->select('COUNT(p)')
            ->getQuery()
            ->getSingleScalarResult();
    }


}