<?php

namespace ApiBundle\Entity;

/**
 * City
 */
class City
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
     * @var string
     */
    private $lat;

    /**
     * @var string
     */
    private $lon;


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
     * @return City
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
     * Set lat
     *
     * @param string $lat
     *
     * @return City
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return string
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lon
     *
     * @param string $lon
     *
     * @return City
     */
    public function setLon($lon)
    {
        $this->lon = $lon;

        return $this;
    }

    /**
     * Get lon
     *
     * @return string
     */
    public function getLon()
    {
        return $this->lon;
    }
    /**
     * @var integer
     */
    private $region_id;


    /**
     * Set regionId
     *
     * @param integer $regionId
     *
     * @return City
     */
    public function setRegionId($regionId)
    {
        $this->region_id = $regionId;

        return $this;
    }

    /**
     * Get regionId
     *
     * @return integer
     */
    public function getRegionId()
    {
        return $this->region_id;
    }
    /**
     * @var \ApiBundle\Entity\Region
     */
    private $region;


    /**
     * Set region
     *
     * @param \ApiBundle\Entity\Region $region
     *
     * @return City
     */
    public function setRegion(\ApiBundle\Entity\Region $region = null)
    {
        $this->region = $region;

        return $this;
    }

    /**
     * Get region
     *
     * @return \ApiBundle\Entity\Region
     */
    public function getRegion()
    {
        return $this->region;
    }

    public function __toString() {
        return $this->name;
    }
}
