<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:53 PM
 */

namespace ApiBundle\Services\Api\Actions;

class ActionFind extends ActionSecure
{

    protected function handle()
    {
        $this->getActionParams()->getEntity();

        $collection = $this->getRepository()->findBy([], ['id' => 'DESC'],5);
        $result = [];

        foreach ($collection as $item) {
            $result[] = [
                'type' => $this->getActionParams()->getEntity(),
                'id' => $item->getId(),
                'attributes' => $this->serialize($item)
            ];
        }

        return $result;
    }
}