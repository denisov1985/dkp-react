<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/14/2017
 * Time: 12:13 PM
 */

namespace ApiBundle\Services;


use ApiBundle\Services\Security\JWSProvider;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;

class ActionAbstract
{
    protected $em;
    protected $entity;
    protected $jwsProvider;

    /**
     * Constructor
     * ActionAbstract constructor.
     * @param $entity
     * @param EntityManager $em
     */
    public function __construct($entity, $em, $jwsProvider)
    {
        $this->entity      = $entity;
        $this->em          = $em;
        $this->jwsProvider = $jwsProvider;
    }

    /**
     * Get JWT provider
     * @return JWSProvider
     */
    protected function getJWSProvider() {
        return $this->jwsProvider;
    }

    /**
     * Get repository helper
     * @return \Doctrine\ORM\EntityRepository
     */
    protected function getRepository() {
        return $this->em->getRepository('ApiBundle:' . ucfirst($this->entity));
    }

    /**
     * Get data helper
     * @param Request $request
     * @return array|mixed
     */
    protected function getData(Request $request) {
        $content = $request->getContent();
        $data = [];
        if (!empty($content))
        {
            $data = json_decode($content, true); // 2nd param to get as array
        }
        return $data;
    }

    /**
     * Get user data from token
     * @param Request $request
     * @return array|null|object
     */
    protected function getUserDataFromToken(Request $request) {
        $headers = $request->headers->all();
        if (!isset($headers['bearer'])) {
            return [];
        }
        $token = $headers['bearer'][0];
        try {
            $userData = $this->getJWSProvider()->decode($token);
        }   catch (\Exception $e) {
            return [];
        }
        $userId = $userData['payload']['id'];

        if (!isset($userData['payload']['id'])) {
            return [];
        }

        $user = $this->em->getRepository('ApiBundle:User')->find($userId);
        return $user;
    }

    protected function createResponse(Request $request, $data) {

    }
}