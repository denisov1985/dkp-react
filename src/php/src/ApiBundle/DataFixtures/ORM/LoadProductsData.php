<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\Image;
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

        for ($i = 1; $i <= 2; $i++) {
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

                if ($index === 0) {
                    $image = new Image();
                    $image->setName('product1.jpg');
                    $image->setProduct($product);
                    $image->setType('image/jpeg');
                    $manager->persist($image);

                    $image2 = new Image();
                    $image2->setName('product2.jpg');
                    $image2->setType('image/jpeg');
                    $image2->setProduct($product);
                    $manager->persist($image2);

                }

                $manager->persist($product);
            }
            $manager->flush();
        }

   }
}