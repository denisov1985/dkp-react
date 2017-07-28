<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:51 PM
 */

namespace ApiBundle\Services\Api;

use ApiBundle\Services\Api\Actions\AbstractAction;
use ApiBundle\Services\Api\Actions\ActionCollect;
use ApiBundle\Services\Api\Actions\ActionLogin;
use ApiBundle\Services\Api\Actions\ActionFind;
use ApiBundle\Services\Api\Actions\ActionGet;
use ApiBundle\Services\Api\Actions\ActionSave;
use ApiBundle\Services\Api\Actions\ActionUpload;

/**
 * Class ActionFactory
 * @package ApiBundle\Services\Api
 */
class ActionFactory
{
    const ACTION_GET     = 'get';
    const ACTION_FIND    = 'find';
    const ACTION_SAVE    = 'save';
    const ACTION_UPLOAD  = 'upload';
    const ACTION_DELETE  = 'delete';
    const ACTION_LOGIN   = 'login';
    const ACTION_COLLECT = 'collect';

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
     * @return AbstractAction
     */
    public function create(ActionParams $actionParams)
    {
        switch ($actionParams->getAction()) {
            case self::ACTION_LOGIN:
                return new ActionLogin($this->em, $actionParams);
                break;

            case self::ACTION_FIND:
                return new ActionFind($this->em, $actionParams);
                break;

            case self::ACTION_GET:
                return new ActionGet($this->em, $actionParams);
                break;

            case self::ACTION_SAVE:
                return new ActionSave($this->em, $actionParams);
                break;

            case self::ACTION_COLLECT:
                return new ActionCollect($this->em, $actionParams);
                break;

            case self::ACTION_UPLOAD:
                return new ActionUpload($this->em, $actionParams);
                break;
        }
    }
}