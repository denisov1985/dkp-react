<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\City;
use ApiBundle\Entity\Region;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use ApiBundle\Entity\User;

class LoadCitiesAndRegionsData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $stubFile = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'stubs' . DIRECTORY_SEPARATOR . 'City.json';
        $content = file_get_contents($stubFile);
        $data = json_decode($content, true);

        foreach ($data['regions']['region'] as $regionData) {
            $region = new Region();
            $region->setName($regionData['name']);
            $manager->persist($region);

            foreach ($regionData['city'] as $cityData) {
                $city = new City();
                $city->setName($cityData['name']);
                $city->setLat($cityData['lat']);
                $city->setLon($cityData['lon']);
                $city->setRegion($region);
                $manager->persist($city);
            }
        }
        $manager->flush();
   }
}