<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class MemberController extends Controller
{
    public function indexAction()
    {
        return new JsonResponse([
            'ololo' => 'rtololo'
        ]);
    }

}
