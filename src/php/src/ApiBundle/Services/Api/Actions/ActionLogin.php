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

class ActionLogin extends AbstractAction
{
    protected $user;

    /**
     * @return JWSProvider
     */
    public function getTokenProvider()
    {
        return new JWSProvider();
    }

    protected function getResponseInstance($response) {
        $encoder = new JWSProvider();
        return new AuthResponse($response, $encoder->encode($this->serialize($this->user)));
    }

    protected function handle()
    {
        $data = $this->getActionParams()->getData();

        if (empty($data['email'])) {
            throw new ApiException('Email is not set');
        }

        if (empty($data['password'])) {
            throw new ApiException('Password is not set');
        }

        $user = $this->getRepository('user')->findOneBy([
            'email' => $data['email'],
            'password' => md5($data['password']),
        ]);

        if (is_null($user)) {
            throw new ApiException('Bad credentials');
        }

        $this->user = $user;

        return [
            'type' => 'user',
            'id'   => $user->getId(),
            'attributes' => $this->serialize($user)
        ];
    }
}