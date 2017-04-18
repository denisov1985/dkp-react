<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\Event;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadEventsData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        return true;
        $names = ['Sekhmet', 'Craken', 'Capitan Marley'];
        for ($i = 0; $i < 50; $i++) {
            $event = new Event();
            $event->setCreatorId(1);
            $event->setName($names[rand(0, 2)]);
            $event->setPoints(rand(1, 20) * 10);
            $event->setStartedAt(new \DateTime());
            $manager->persist($event);
        }
        $manager->flush();
   }
}
?>