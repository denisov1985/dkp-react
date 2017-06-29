<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:37 PM
 */

namespace ApiBundle\Services\Api;

class AuthResponse extends Response
{
    protected $data;
    protected $token;

    public function __construct($data, $token)
    {
        $this->data  = $data;
        $this->token = $token;
    }

    public function getResult()
    {
        return [
            'data'  => $this->data,
            'token' => $this->token,
        ];
    }
}