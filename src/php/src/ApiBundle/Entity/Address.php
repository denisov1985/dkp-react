<?php

namespace ApiBundle\Entity;

/**
 * Address
 */
class Address
{
    /**
     * @var int
     */
    private $id;

    /**
     * @var int
     */
    private $cityId;

    /**
     * @var int
     */
    private $regionId;

    /**
     * @var int
     */
    private $userId;


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
     * Set cityId
     *
     * @param integer $cityId
     *
     * @return Address
     */
    public function setCityId($cityId)
    {
        $this->cityId = $cityId;

        return $this;
    }

    /**
     * Get cityId
     *
     * @return int
     */
    public function getCityId()
    {
        return $this->cityId;
    }

    /**
     * Set regionId
     *
     * @param integer $regionId
     *
     * @return Address
     */
    public function setRegionId($regionId)
    {
        $this->regionId = $regionId;

        return $this;
    }

    /**
     * Get regionId
     *
     * @return int
     */
    public function getRegionId()
    {
        return $this->regionId;
    }

    /**
     * Set userId
     *
     * @param integer $userId
     *
     * @return Address
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return int
     */
    public function getUserId()
    {
        return $this->userId;
    }
    /**
     * @var \ApiBundle\Entity\Region
     */
    private $region;

    /**
     * @var \ApiBundle\Entity\City
     */
    private $city;


    /**
     * Set region
     *
     * @param \ApiBundle\Entity\Region $region
     *
     * @return Address
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

    /**
     * Set city
     *
     * @param \ApiBundle\Entity\City $city
     *
     * @return Address
     */
    public function setCity(\ApiBundle\Entity\City $city = null)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return \ApiBundle\Entity\City
     */
    public function getCity()
    {
        return $this->city;
    }
}
