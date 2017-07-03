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
            $member->setFirstName($item['name']);
            $member->setLastName($item['name'] . ' last Name');
            $member->setPassword(md5(rand(1, 1000)));
            $member->setGender(rand(0, 2));
            $member->setEmail($item['email']);
            $manager->persist($member);
        }

        $member = new User();
        $member->setIsActive(1);
        $member->setFirstName('Dimon');
        $member->setLastName('Denisov');
        $member->setGender(1);
        $member->setPassword(md5('555935'));
        $member->setEmail('denisov1985@gmail.com');
        $manager->persist($member);

        $manager->flush();
   }
}