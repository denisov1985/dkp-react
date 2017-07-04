<?php

namespace ApiBundle\Entity;

use JMS\Serializer\Annotation\Exclude;
/**
 * User
 */
class User
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $email;

    /**
     * @Exclude
     * @var string
     */
    private $password;

    /**
     * @var boolean
     */
    private $isActive;


    /**
     * Get id
     *
     * @return integer
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
     * @return User
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
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return User
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->isActive;
    }
    /**
     * @var string
     */
    private $first_name;

    /**
     * @var string
     */
    private $last_name;

    /**
     * @var integer
     */
    private $gander;


    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->first_name = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->first_name;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->last_name = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->last_name;
    }

    /**
     * Set gander
     *
     * @param integer $gander
     *
     * @return User
     */
    public function setGander($gander)
    {
        $this->gander = $gander;

        return $this;
    }

    /**
     * Get gander
     *
     * @return integer
     */
    public function getGander()
    {
        return $this->gander;
    }
    /**
     * @var integer
     */
    private $gender;


    /**
     * Set gender
     *
     * @param integer $gender
     *
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return integer
     */
    public function getGender()
    {
        return $this->gender;
    }
    /**
     * @var integer
     */
    private $address_id;

    /**
     * @var \ApiBundle\Entity\Address
     */
    private $address;


    /**
     * Set addressId
     *
     * @param integer $addressId
     *
     * @return User
     */
    public function setAddressId($addressId)
    {
        $this->address_id = $addressId;

        return $this;
    }

    /**
     * Get addressId
     *
     * @return integer
     */
    public function getAddressId()
    {
        return $this->address_id;
    }

    /**
     * Set address
     *
     * @param \ApiBundle\Entity\Address $address
     *
     * @return User
     */
    public function setAddress(\ApiBundle\Entity\Address $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return \ApiBundle\Entity\Address
     */
    public function getAddress()
    {
        return $this->address;
    }
    /**
     * @var integer
     */
    private $cityId;

    /**
     * @var integer
     */
    private $regionId;

    /**
     * @var \ApiBundle\Entity\Region
     */
    private $region;

    /**
     * @var \ApiBundle\Entity\City
     */
    private $city;


    /**
     * Set cityId
     *
     * @param integer $cityId
     *
     * @return User
     */
    public function setCityId($cityId)
    {
        $this->cityId = $cityId;

        return $this;
    }

    /**
     * Get cityId
     *
     * @return integer
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
     * @return User
     */
    public function setRegionId($regionId)
    {
        $this->regionId = $regionId;

        return $this;
    }

    /**
     * Get regionId
     *
     * @return integer
     */
    public function getRegionId()
    {
        return $this->regionId;
    }

    /**
     * Set region
     *
     * @param \ApiBundle\Entity\Region $region
     *
     * @return User
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
     * @return User
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
