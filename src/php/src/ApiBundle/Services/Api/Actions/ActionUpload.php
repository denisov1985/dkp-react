<?php
/**
 * Created by PhpStorm.
 * User: Dmytro_Denysov
 * Date: 6/23/2017
 * Time: 4:53 PM
 */

namespace ApiBundle\Services\Api\Actions;

use ApiBundle\Entity\Image;
use ApiBundle\Services\Api\Exceptions\ApiException;

class ActionUpload extends ActionSecure
{

    protected function handle()
    {
        $data = $this->getActionParams()->getData();

        $product = $this->getRepository()->find($data['id']);

        $imgData = str_replace(' ','+',$data['data_uri']);
        $imgData =  substr($imgData,strpos($imgData,",")+1);
        $imgData = base64_decode($imgData);

        $uploadPath = dirname(dirname(dirname(dirname(dirname(dirname(dirname(__DIR__))))))) .
            DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'upload' . DIRECTORY_SEPARATOR . md5('Y-m-d');

        if (!is_dir($uploadPath)) {
            mkdir($uploadPath);
        }
        $parts = explode('.', $data['filename']);
        $ext = array_pop($parts);
        $filename = md5(time()) . '.' . $ext;
        file_put_contents($uploadPath . DIRECTORY_SEPARATOR . $filename, $imgData);

        $image = new Image();
        $image->setName(md5('Y-m-d') . DIRECTORY_SEPARATOR . $filename);
        $image->setType($data['filetype']);
        $image->setProduct($product);

        $this->em->persist($image);
        $this->em->flush();

        return [
            'type' => 'Image',
            'id' => $image->getId(),
            'attributes' => $this->serialize($image),
        ];
    }
}