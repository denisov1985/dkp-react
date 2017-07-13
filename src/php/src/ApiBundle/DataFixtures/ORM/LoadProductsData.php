<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\Product;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use ApiBundle\Entity\User;

class LoadProductsData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $stubFile = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'stubs' . DIRECTORY_SEPARATOR . 'Products.json';
        $content = file_get_contents($stubFile);
        $data = json_decode($content, true);

        for ($i = 1; $i <= 30; $i++) {
            foreach ($data as $index => $row) {
                $product = new Product();
                foreach ($row  as $key => $value) {
                    if ($key == 'id') {
                        continue;
                    }
                    $method = "set" . str_replace(' ', '', ucwords(str_replace('_', ' ', $key)));
                    $value = $value === '' ? null : $value;
                    $product->$method($value);
                }
                $manager->persist($product);
            }
            $manager->flush();
        }

   }
}