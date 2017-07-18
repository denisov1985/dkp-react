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

    protected function _initQueryParams() {
        if (!isset($this->query['page'])) {
            $this->query['page'] = [
                'limit'   => 7,
                'offset'  => 1,
            ];
        }

        if (!isset($this->query['page']['limit'])) {
            $this->query['page']['limit'] = 7;
        }

        if (!isset($this->query['page']['offset'])) {
            $this->query['page']['offset'] = 1;
        }
    }

    protected function handle()
    {
        $query = $this->getQuery();
        //$collection = $this->getRepository()->findBy([], [], $query['page']['limit'], ($query['page']['offset'] - 1) * $query['page']['limit']);
        $collection = $this->findAll();
        $count = $this->countAll();

        $this->query['page']['total'] = $count;

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