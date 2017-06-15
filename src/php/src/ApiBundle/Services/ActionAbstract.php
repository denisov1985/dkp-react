<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/14/2017
 * Time: 12:13 PM
 */

namespace ApiBundle\Services;


use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;

class ActionAbstract
{
    protected $em;
    protected $entity;

    /**
     * Constructor
     * ActionAbstract constructor.
     * @param $entity
     * @param EntityManager $em
     */
    public function __construct($entity, $em)
    {
        $this->entity = $entity;
        $this->em     = $em;
    }

    /**
     * Get repository helper
     * @return \Doctrine\ORM\EntityRepository
     */
    protected function getRepository() {
        return $this->em->getRepository('ApiBundle:' . ucfirst($this->entity));
    }

    /**
     * Get data helper
     * @param Request $request
     * @return array|mixed
     */
    protected function getData(Request $request) {
        $content = $request->getContent();
        $data = [];
        if (!empty($content))
        {
            $data = json_decode($content, true); // 2nd param to get as array
        }
        return $data;
    }
}