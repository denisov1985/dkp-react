<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use ApiBundle\Entity\User;

class LoadUsersData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $stubFile = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'stubs' . DIRECTORY_SEPARATOR . 'Users.json';
        $content = file_get_contents($stubFile);
        $data = json_decode($content, true);

        foreach ($data as $item) {
            $member = new User();
            $member->setIsActive($item['isActive']);
            $member->setName($item['name']);
            $member->setPassword(md5(rand(1, 1000)));
            $member->setEmail($item['email']);
            $manager->persist($member);
        }
        $manager->flush();
   }
}