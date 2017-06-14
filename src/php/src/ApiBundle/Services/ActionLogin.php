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

    public function handle(Request $request, $params)
    {
        $data = $this->getData($request);

        $user = $this->getRepository()->findOneBy(
            array(
                'email' => $data['email'],
                'password' => md5($data['password'])
            )
        );

        return [
            'result' => !empty($user),
            'user' => $user
        ];
    }
}