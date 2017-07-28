<?php

namespace ApiBundle\Entity;

use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\Exclude;
/**
 * Image
 */
class Image
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var string
     */
    private $name;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Image
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * @Exclude
     * @var \ApiBundle\Entity\Product
     */
    private $product;


    /**
     * Set product
     *
     * @param \ApiBundle\Entity\Product $product
     *
     * @return Image
     */
    public function setProduct(\ApiBundle\Entity\Product $product = null)
    {
        $this->product = $product;

        return $this;
    }
}
