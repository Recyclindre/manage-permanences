<?php
/**
 * Created by PhpStorm.
 * User: arnaudbanvillet
 * Date: 12/10/2018
 * Time: 13:24
 */

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * A Permanence
 *
 * @ORM\Entity
 * @ApiResource
 */
class Opener
{

    /**
     * @var int The id
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;


    /**
     * @var string Opener name
     *
     * @ORM\Column
     */
    public $name;

    /**
     * @var Permanence[] People who will open the composter
     *
     * @ORM\ManyToMany(targetEntity="Permanence", inversedBy="openers")
     */
    public $permanences;

    public function __construct() {
        $this->permanences = new ArrayCollection();
    }

    public function __toString() {
        return $this->getName();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Permanence[]
     */
    public function getPermanences(): Collection
    {
        return $this->permanences;
    }

    public function addPermanence(Permanence $permanence): self
    {
        if (!$this->permanences->contains($permanence)) {
            $this->permanences[] = $permanence;
        }

        return $this;
    }

    public function removePermanence(Permanence $permanence): self
    {
        if ($this->permanences->contains($permanence)) {
            $this->permanences->removeElement($permanence);
        }

        return $this;
    }
}