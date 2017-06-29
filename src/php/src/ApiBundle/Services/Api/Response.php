<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:37 PM
 */

namespace ApiBundle\Services\Api;

class Response
{
    protected $data;

    public function __construct($data)
    {
        $this->data   = $data;
    }

    public function getResult()
    {
        return [
            'data' => $this->data
        ];
    }

    public function getStatus()
    {
        return 200;
    }
}