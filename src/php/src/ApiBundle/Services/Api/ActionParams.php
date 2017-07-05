<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:13 PM
 */

namespace ApiBundle\Services\Api;

class ActionParams
{
    protected $entity;
    protected $action;
    protected $params;
    protected $data;
    protected $token;
    protected $query;

    public function __construct($entity, $action, $params, $data, $token, $query)
    {
        $this->entity = $entity;
        $this->action = $action;
        $this->params = $params;
        $this->data   = $data;
        $this->token  = $token;
        $this->query  = $query;

    }

    /**
     * @return mixed
     */
    public function getQuery()
    {
        return $this->query;
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @return mixed
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * @return mixed
     */
    public function getAction()
    {
        return $this->action;
    }

    /**
     * @return mixed
     */
    public function getParams()
    {
        return $this->params;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }
}