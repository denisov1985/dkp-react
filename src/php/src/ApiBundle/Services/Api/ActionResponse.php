<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:37 PM
 */

namespace ApiBundle\Services\Api;

class ActionResponse
{
    protected $data;
    protected $status;

    public function __construct($data, $status)
    {
        $this->data   = $data;
        $this->status = $status;
    }

    public function getResult($serializer)
    {
        return $serializer->serialize($this->data);
    }
}