<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 5:27 PM
 */

namespace ApiBundle\Services\Api;
use JMS\Serializer\SerializationContext;


class ActionSerializer
{
    protected $serializer;

    /**
     * Serializer
     * ActionSerializer constructor.
     */
    public function __construct($serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * Serialize data
     * @param $content
     * @return mixed
     */
    public function serialize($content) {
        return json_decode($this->serializer->serialize($content, 'json', SerializationContext::create()->setSerializeNull(true)));
    }
}