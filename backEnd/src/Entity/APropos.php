<?php

namespace App\Entity;

use App\Repository\AProposRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AProposRepository::class)
 * @ApiResource(
 *     collectionOperations={},
 *     itemOperations={
 *          "get"={
 *             "normalization_context"={"groups"={"aPropos:read"}}
 *            },
 *        "patch"={}
 *    }
 * )
 */
class APropos
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"aPropos:read"})
     */
    private $subTitle;

    /**
     * @ORM\Column(type="text")
     * @Groups({"aPropos:read"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity=Competences::class, mappedBy="aPropos")
     * @Groups({"aPropos:read"})
     */
    private $competences;

    /**
     * @ORM\OneToMany(targetEntity=Experiences::class, mappedBy="aPropos")
     * @Groups({"aPropos:read"})
     */
    private $experiences;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
        $this->experiences = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSubTitle(): ?string
    {
        return $this->subTitle;
    }

    public function setSubTitle(string $subTitle): self
    {
        $this->subTitle = $subTitle;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Competences>
     */
    public function getCompetences(): Collection
    {
        return $this->competences;
    }

    public function addCompetence(Competences $competence): self
    {
        if (!$this->competences->contains($competence)) {
            $this->competences[] = $competence;
            $competence->setAPropos($this);
        }

        return $this;
    }

    public function removeCompetence(Competences $competence): self
    {
        if ($this->competences->removeElement($competence)) {
            // set the owning side to null (unless already changed)
            if ($competence->getAPropos() === $this) {
                $competence->setAPropos(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Experiences>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experiences $experience): self
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences[] = $experience;
            $experience->setAPropos($this);
        }

        return $this;
    }

    public function removeExperience(Experiences $experience): self
    {
        if ($this->experiences->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getAPropos() === $this) {
                $experience->setAPropos(null);
            }
        }

        return $this;
    }
}
