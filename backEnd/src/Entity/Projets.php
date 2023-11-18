<?php

namespace App\Entity;

use App\Repository\ProjetsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ProjetsRepository::class)
 * @ApiResource(
 *    collectionOperations={
 *       "get"={
 *         "normalization_context"={"groups"={"projets:read"}}
 *      }, "post"={}
 *   }
 * )
 */
class Projets
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"projets:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"projets:read"})
     */
    private $titre;

    /**
     * @ORM\Column(type="text")
     * @Groups({"projets:read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"projets:read"})
     */
    private $githubLink;

    /**
     * @ORM\OneToMany(targetEntity=TechnosProjets::class, mappedBy="projets")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Groups({"projets:read"})
     */
    private $technos;

    /**
     * @ORM\OneToMany(targetEntity=CompetencesProjets::class, mappedBy="projets")
     *  @ORM\JoinColumn(onDelete="CASCADE")
     * @Groups({"projets:read"})
     */
    private $competences;

    /**
     * @ORM\OneToMany(targetEntity=ImagesProjets::class, mappedBy="projets")
     *  @ORM\JoinColumn(onDelete="CASCADE")
     * @Groups({"projets:read"})
     */
    private $images;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"projets:read"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"projets:read"})
     */
    private $stacks;

    public function __construct()
    {
        $this->technos = new ArrayCollection();
        $this->competences = new ArrayCollection();
        $this->images = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

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

    public function getGithubLink(): ?string
    {
        return $this->githubLink;
    }

    public function setGithubLink(?string $githubLink): self
    {
        $this->githubLink = $githubLink;

        return $this;
    }

    /**
     * @return Collection<int, TechnosProjets>
     */
    public function getTechnos(): Collection
    {
        return $this->technos;
    }

    public function addTechno(TechnosProjets $techno): self
    {
        if (!$this->technos->contains($techno)) {
            $this->technos[] = $techno;
            $techno->setProjets($this);
        }

        return $this;
    }

    public function removeTechno(TechnosProjets $techno): self
    {
        if ($this->technos->removeElement($techno)) {
            // set the owning side to null (unless already changed)
            if ($techno->getProjets() === $this) {
                $techno->setProjets(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CompetencesProjets>
     */
    public function getCompetences(): Collection
    {
        return $this->competences;
    }

    public function addCompetence(CompetencesProjets $competence): self
    {
        if (!$this->competences->contains($competence)) {
            $this->competences[] = $competence;
            $competence->setProjets($this);
        }

        return $this;
    }

    public function removeCompetence(CompetencesProjets $competence): self
    {
        if ($this->competences->removeElement($competence)) {
            // set the owning side to null (unless already changed)
            if ($competence->getProjets() === $this) {
                $competence->setProjets(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ImagesProjets>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(ImagesProjets $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setProjets($this);
        }

        return $this;
    }

    public function removeImage(ImagesProjets $image): self
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getProjets() === $this) {
                $image->setProjets(null);
            }
        }

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStacks(): ?string
    {
        return $this->stacks;
    }

    public function setStacks(string $stacks): self
    {
        $this->stacks = $stacks;

        return $this;
    }
}
