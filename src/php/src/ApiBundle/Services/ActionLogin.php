<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/14/2017
 * Time: 11:51 AM
 */

namespace ApiBundle\Services;

use Symfony\Component\HttpFoundation\Request;

class ActionLogin extends ActionAbstract  implements ActionInterface
{

    protected $jwsProvider;

    /**
     * ActionLogin constructor.
     * @param $entity
     * @param EntityManager $em
     * @param $jwsProvider
     */
    public function __construct($entity, $em, $jwsProvider)
    {
        parent::__construct($entity, $em);
        $this->jwsProvider = $jwsProvider;
    }

    /**
     * Handle request
     * @param Request $request
     * @param $params
     * @return array
     */
    public function handle(Request $request, $params)
    {
        $data = $this->getData($request);

        if (!isset($data['email'])) {
            throw new \Exception('Please enter email');
        }

        if (!isset($data['password'])) {
            throw new \Exception('Please enter password');
        }

        $user = $this->getRepository()->findOneBy(
            array(
                'email' => $data['email'],
                'password' => md5($data['password'])
            )
        );

        if (empty($user)) {
            throw new \Exception('Bad credentials');
        }

        return [
            'success' => !empty($user),
            'token' => $this->jwsProvider->encode([
                'id' => $user->getId(),
                'timestamp' => time()
            ])
        ];
    }
}