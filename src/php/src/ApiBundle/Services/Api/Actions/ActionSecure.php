<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:53 PM
 */

namespace ApiBundle\Services\Api\Actions;

use ApiBundle\Services\Api\AuthResponse;
use ApiBundle\Services\Api\Exceptions\ApiException;
use ApiBundle\Services\Security\JWSProvider;

abstract class ActionSecure extends AbstractAction
{
    protected $user;

    protected function preAction() {
        $token = $this->getActionParams()->getToken();
        if (is_null($token)) {
            throw new ApiException("Token must be provided", 403);
        }
        $tokenProvider = $this->getTokenProvider();
        try {
            $decodedData = $tokenProvider->decode($token);
        }   catch (\Exception $e) {
            throw new ApiException('Invalid token signature', 403);
        }

        $this->user = $decodedData['payload'];
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return JWSProvider
     */
    public function getTokenProvider()
    {
        return new JWSProvider();
    }
}