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
        $query = $this->getActionParams()->getQuery();

        $collection = $this->getRepository()->findBy([], ['id' => 'DESC'], $query['page']['limit'], ($query['page']['offset'] - 1) * $query['page']['limit']);
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