<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:37 PM
 */

namespace ApiBundle\Services\Api;

use ApiBundle\Services\Api\Actions\AbstractAction;

class Response
{
    protected $data;
    protected $action;

    public function __construct($data, AbstractAction $action = null)
    {
        $this->data   = $data;
        $this->action = $action;
    }

    public function getResult()
    {
        return [
            'data' => $this->data,
        ] + $this->action->getQuery();
    }

    public function getStatus()
    {
        return 200;
    }
}