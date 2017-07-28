<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:53 PM
 */

namespace ApiBundle\Services\Api\Actions;

use ApiBundle\Services\Api\Exceptions\ApiException;

class ActionUpload extends ActionSecure
{

    protected function handle()
    {

        $data = $this->getActionParams()->getData();
        $entityClass = "ApiBundle\\Entity\\" . ucfirst($this->getActionParams()->getEntity());
        if ($data['id']) {
            $entity = $this->getRepository()->find($data['id']);
        }   else  {
            $entity = new $entityClass;
        }
        foreach ($data  as $key => $value) {
            if ($key == 'id') {
                continue;
            }
            $method = "set" . str_replace(' ', '', ucwords(str_replace('_', ' ', $key)));
            $value = $value === '' ? null : $value;
            $entity->$method($value);
        }
        $this->em->persist($entity);
        $this->em->flush();

        die();

        die('ok');

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