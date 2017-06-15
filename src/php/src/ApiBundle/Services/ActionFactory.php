<?php

namespace ApiBundle\Services;

class ActionFactory
{
    const ACTION_GET    = 'get';
    const ACTION_FIND   = 'find';
    const ACTION_UPDATE = 'update';
    const ACTION_DELETE = 'delete';
    const ACTION_LOGIN  = 'login';

    protected $em;
    protected $entity;
    protected $jwsProvider;

    public function __construct($entityManager, $jwsProvider) {
        $this->em = $entityManager;
        $this->jwsProvider   = $jwsProvider;
    }

    public function create($entity, $action, $params)
    {
        switch ($action) {
            case self::ACTION_LOGIN:
                return new ActionLogin($entity, $this->em, $this->jwsProvider);
                break;

            case self::ACTION_FIND:
                return new ActionFind($entity, $this->em);
                break;

            case self::ACTION_GET:
                return new ActionGet($entity, $this->em);
                break;
        }
    }
}