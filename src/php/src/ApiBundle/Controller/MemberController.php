<?php

namespace ApiBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

class MemberController extends DefaultController
{
    protected function _getEntityName()
    {
        return 'Member';
    }
}
