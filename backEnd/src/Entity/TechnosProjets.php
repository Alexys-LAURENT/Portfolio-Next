<?php

namespace App\Entity;

use App\Repository\TechnosProjetsRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TechnosProjetsRepository::class)
 * @ApiResource()
 */
class TechnosProjets
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
     * @ORM\Column(type="string", length=255)
     * @Groups({"projets:read"})
     */
    private $libelle;

    /**
     * @ORM\ManyToOne(targetEntity=Projets::class, inversedBy="technos")
     */
    private $projets;

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

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getProjets(): ?Projets
    {
        return $this->projets;
    }

    public function setProjets(?Projets $projets): self
    {
        $this->projets = $projets;

        return $this;
    }
}
