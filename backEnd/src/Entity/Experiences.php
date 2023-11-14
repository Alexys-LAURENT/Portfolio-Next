<?php

namespace App\Entity;

use App\Repository\ExperiencesRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ExperiencesRepository::class)
 * @ApiResource(
 *    itemOperations={"get"={},"delete"={}, "patch"={}}
 * )
 */
class Experiences
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"aPropos:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"aPropos:read"})
     */
    private $titre;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"aPropos:read"})
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=APropos::class, inversedBy="experiences")
     */
    private $aPropos;

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

    public function getAPropos(): ?APropos
    {
        return $this->aPropos;
    }

    public function setAPropos(?APropos $aPropos): self
    {
        $this->aPropos = $aPropos;

        return $this;
    }
}
