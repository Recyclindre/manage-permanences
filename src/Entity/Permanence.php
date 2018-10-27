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
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Entity\User;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * A Permanence
 *
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"},
 *     normalizationContext={"groups"={"permanence"}}
 * )
 * @ApiFilter(OrderFilter::class, properties={"date":"ASC"})
 * @ApiFilter(DateFilter::class, properties={"date"})
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
     * @Groups({"permanence"})
     */
    public $date;

    /**
     * @var \Boolean Permanence is canceled
     *
     * @ORM\Column(type="boolean")
     * @Groups({"permanence"})
     */
    public $canceled;

    /**
     * @var User[] People who will open the composter
     *
     * @ORM\ManyToMany(targetEntity="User", mappedBy="permanences")
     * @Groups({"permanence"})
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
     * @return Collection|User[]
     */
    public function getOpeners(): Collection
    {
        return $this->openers;
    }

    public function addOpener(User $opener): self
    {
        if (!$this->openers->contains($opener)) {
            $this->openers[] = $opener;
            $opener->addPermanence($this);
        }

        return $this;
    }

    public function removeOpener(User $opener): self
    {
        if ($this->openers->contains($opener)) {
            $this->openers->removeElement($opener);
            $opener->removePermanence($this);
        }

        return $this;
    }

}