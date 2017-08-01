<?php

namespace FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('FrontendBundle:Default:index.html.twig');
    }

    public function shopAction()
    {
        return $this->render('FrontendBundle:Default:shop.html.twig');
    }
}
