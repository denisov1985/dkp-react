<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/14/2017
 * Time: 12:13 PM
 */

namespace ApiBundle\Services;


use Doctrine\ORM\EntityManager;

class ActionAbstract
{
    protected $em;
    protected $entity;

    public function __construct($entity, EntityManager $em)
    {
        $this->entity = $entity;
        $this->em     = $em;
    }

    protected function getRepository() {
        return $this->em->getRepository('ApiBundle:' . ucfirst($this->entity));
    }
}