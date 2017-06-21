<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/14/2017
 * Time: 11:52 AM
 */

namespace ApiBundle\Services;

use Symfony\Component\HttpFoundation\Request;

class ActionFind extends ActionAbstract implements ActionInterface
{
    public function handle(Request $request, $params)
    {
        return $this->getRepository()->findAll();
    }
}