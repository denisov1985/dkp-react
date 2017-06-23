<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:51 PM
 */

namespace ApiBundle\Services\Api;

use ApiBundle\Services\Api\Actions\ActionLogin;

/**
 * Class ActionFactory
 * @package ApiBundle\Services\Api
 */
class ActionFactory
{
    const ACTION_GET    = 'get';
    const ACTION_FIND   = 'find';
    const ACTION_UPDATE = 'update';
    const ACTION_DELETE = 'delete';
    const ACTION_LOGIN  = 'login';

    protected $em;

    /**
     * ActionFactory constructor.
     * @param $em
     */
    public function __construct($em)
    {
        $this->em = $em;
    }

    /**
     * Create action from params
     * @param ActionParams $actionParams
     * @return ActionLogin
     */
    public function create(ActionParams $actionParams)
    {
        switch ($actionParams->getAction()) {
            case self::ACTION_LOGIN:
                return new ActionLogin($this->em, $actionParams);
                break;

            case self::ACTION_FIND:
                //return new ActionFind();
                break;

            case self::ACTION_GET:
                //return new ActionGet();
                break;
        }
    }
}