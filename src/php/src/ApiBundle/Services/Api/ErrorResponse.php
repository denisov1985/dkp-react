<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:37 PM
 */

namespace ApiBundle\Services\Api;

class ErrorResponse extends Response
{
    protected $message;
    protected $status;
    protected $errors;

    public function __construct($message, $code, $errors)
    {
        $this->message = $message;
        $this->status  = $code;
        $this->errors  = $errors;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getResult()
    {
        return [
            'error' => [
                'message' => $this->message,
                'code'   => $this->status,
                'errors'  => $this->errors,
            ]
        ];
    }
}