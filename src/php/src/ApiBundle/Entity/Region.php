<?php

namespace ApiBundle\Entity;

use JMS\Serializer\Annotation\VirtualProperty;
use JMS\Serializer\Annotation\Exclude;
/**
 * Region
 */
class Region
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
     * @return Region
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
     * Constructor
     */
    public function __construct()
    {
        $this->cities = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function __toString() {
        return $this->name;
    }
    /**
     * @Exclude()
     * @var \Doctrine\Common\Collections\Collection
     */
    private $cities;


    /**
     * Add city
     *
     * @param \ApiBundle\Entity\City $city
     *
     * @return Region
     */
    public function addCity(\ApiBundle\Entity\City $city)
    {
        $this->cities[] = $city;

        return $this;
    }

    /**
     * Remove city
     *
     * @param \ApiBundle\Entity\City $city
     */
    public function removeCity(\ApiBundle\Entity\City $city)
    {
        $this->cities->removeElement($city);
    }

    /**
     * Get cities
     * @Exclude()
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCities()
    {
        return $this->cities;
    }

    /**
     * @VirtualProperty()
     */
    public function getCitiesCount()
    {
        return $this->cities->count();
    }
}
