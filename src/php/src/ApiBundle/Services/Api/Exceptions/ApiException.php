<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/21/2017
 * Time: 7:22 PM
 */

namespace ApiBundle\Services\Api\Exceptions;


class ApiException extends \Exception
{
    protected $errors = [];

    public function __construct($message, $code = 200, $errors = [])
    {
        parent::__construct($message, $code);
        $this->errors = $errors;
    }

    /**
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }

}