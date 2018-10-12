<?php
/**
 * Created by PhpStorm.
 * User: arnaudbanvillet
 * Date: 12/10/2018
 * Time: 13:19
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
class Permanence
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
     * @var \DateTime Permanence date
     *
     * @ORM\Column(type="datetime")
     */
    public $date;

    /**
     * @var Opener[] People who will open the composter
     *
     * @ORM\ManyToMany(targetEntity="Opener", mappedBy="permanences")
     */
    public $openers;

    public function __construct() {
        $this->openers = new ArrayCollection();
    }

    public function __toString() {
        return $this->getDate()->format('Y-m-d H:i:s');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection|Opener[]
     */
    public function getOpeners(): Collection
    {
        return $this->openers;
    }

    public function addOpener(Opener $opener): self
    {
        if (!$this->openers->contains($opener)) {
            $this->openers[] = $opener;
            $opener->addPermanence($this);
        }

        return $this;
    }

    public function removeOpener(Opener $opener): self
    {
        if ($this->openers->contains($opener)) {
            $this->openers->removeElement($opener);
            $opener->removePermanence($this);
        }

        return $this;
    }

}