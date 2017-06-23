<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:45 PM
 */

namespace ApiBundle\Services\Api\Actions;


use ApiBundle\Services\Api\ActionResponse;

abstract class AbstractAction
{
    protected $actionParams;
    protected $status = 200;
    /**
     * AbstractAction constructor.
     * @param $em
     */
    public function __construct($em, $actionParams)
    {
        $this->em = $em;
        $this->actionParams = $actionParams;
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
        return new ActionResponse($this->handle(), $this->status);
    }
}