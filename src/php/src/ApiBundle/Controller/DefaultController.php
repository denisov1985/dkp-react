<?php

namespace ApiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return new JsonResponse([
            'ololo' => 'trololo'
        ]);
    }

    public function getAction()
    {
        return $this->render('ApiBundle:Default:index.html.twig');
    }
}
