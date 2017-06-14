<?php

namespace ApiBundle\Services;

class ActionFactory
{
    const ACTION_GET    = 'get';
    const ACTION_FIND   = 'find';
    const ACTION_UPDATE = 'update';
    const ACTION_DELETE = 'delete';

    protected $em;
    protected $entity;

    public function __construct($entityManager) {
        $this->em     = $entityManager;
    }

    public function create($entity, $action, $params)
    {
        switch ($action) {
            case self::ACTION_FIND:
                return new ActionFind($entity, $this->em);
                break;

            case self::ACTION_GET:
                return new ActionGet($entity, $this->em);
                break;
        }
    }
}