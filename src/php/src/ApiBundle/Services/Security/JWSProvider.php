<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/15/2017
 * Time: 2:58 PM
 */

namespace ApiBundle\Services\Security;


class JWSProvider
{
    /**
     * Get JWS headers
     * @return array
     */
    protected static function getHeaders() {
        return [
            'alg' => 'HS256', //alg is required. see *Algorithms* section for supported algorithms
            'typ' => 'JWT'
        ];
    }

    /**
     * Get secret key
     * @TODO move to environment
     * @return string
     */
    protected static function getKey() {
        return 'bez-paleva';
    }

    /**
     * Encode payload
     * @param $payload
     * @return string
     */
    public function encode($payload)
    {
        $jws = new \Gamegos\JWS\JWS();
        return $jws->encode(self::getHeaders(), $payload, self::getKey());
    }

    /**
     * Decode token
     * @param $token
     * @return array
     */
    public function decode($token)
    {
        $jws = new \Gamegos\JWS\JWS();
        return $jws->verify($token, self::getKey());
    }
}