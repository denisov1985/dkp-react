<?php
// src/AppBundle/DataFixtures/ORM/LoadUserData.php
namespace AppBundle\DataFixtures\ORM;

use ApiBundle\Entity\Category;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadCategoryData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $stubFile = dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR . 'Resources' . DIRECTORY_SEPARATOR . 'stubs' . DIRECTORY_SEPARATOR . 'Category.json';
        $content = file_get_contents($stubFile);
        $data = json_decode($content, true);

        for ($i = 1; $i <= 2; $i++) {
            foreach ($data as $index => $row) {
                $product = new Category();
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