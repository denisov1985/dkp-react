<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:53 PM
 */

namespace ApiBundle\Services\Api\Actions;

use ApiBundle\Services\Api\Exceptions\ApiException;

class ActionGet extends ActionSecure
{

    protected function handle()
    {


        $params = $this->getActionParams()->getParams();
        if (!isset($params[0])) {
            throw new ApiException($this->getActionParams()->getEntity() . ' ID not provided');
        }

        $item = $this->getRepository()->find($params[0]);

        $query = $this->getActionParams()->getQuery();
        $include = [
            'include' => []
        ];
        if (isset($query['include'])) {
            $includeParts = explode(',', $query['include']);
            foreach ($includeParts as $part) {
                $includeData = $this->getRepository($part)->findAll();
                $include['include'][$part] = $this->format($includeData);
            }
        }

        $this->restoreSerializer();
        return [
            'type' => $this->getActionParams()->getEntity(),
            'id' => $item->getId(),
            'attributes' => $this->serialize($item),
        ] + $include;
    }
}