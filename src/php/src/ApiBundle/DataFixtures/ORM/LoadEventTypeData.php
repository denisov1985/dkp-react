<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\Event;
use ApiBundle\Entity\EventType;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadEventTypeData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        return true;
        $names = ['Anthalon',
            'Calamitous Vyrava',
            'Captain Rangora',
            'Dahuta\'s Champion Nazar',
            'Hanure the Hunter',
            'Hounds of Kyrios',
            'Kraken',
            'Meina & Glenn',
            'Morpheus the Forsaken',
            'Prince Riesig the Accursed',
            'Zaldrane the Enchantress',];
        foreach($names as $name) {
            $eventType = new EventType();
            $eventType->setName($name);
            $eventType->setPoints(rand(10, 30) * 10);
            $eventType->setPicture('http://placehold.it/720x480');
            $manager->persist($eventType);
        }
        $manager->flush();
   }
}

