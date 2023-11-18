<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class VersionYYYYMMDDHHMMSS extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajout de la contrainte de suppression CASCADE';
    }

    public function up(Schema $schema): void
    {

        $this->addSql('ALTER TABLE competences_projets DROP FOREIGN KEY FK_7F76D078597A6CB7');
        $this->addSql('ALTER TABLE images_projets DROP FOREIGN KEY FK_2B29DFB9597A6CB7');
        $this->addSql('ALTER TABLE technos_projets DROP FOREIGN KEY FK_80B41316597A6CB7');

        // Créer la contrainte de suppression CASCADE pour la relation technos_projets, competences_projets, images_projets
        $this->addSql('ALTER TABLE competences_projets ADD CONSTRAINT FK_7F76D078597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE images_projets ADD CONSTRAINT FK_2B29DFB9597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE technos_projets ADD CONSTRAINT FK_80B41316597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE competences_projets DROP FOREIGN KEY FK_7F76D078597A6CB7');
        $this->addSql('ALTER TABLE images_projets DROP FOREIGN KEY FK_2B29DFB9597A6CB7');
        $this->addSql('ALTER TABLE technos_projets DROP FOREIGN KEY FK_80B41316597A6CB7');

        $this->addSql('ALTER TABLE competences_projets ADD CONSTRAINT FK_7F76D078597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
        $this->addSql('ALTER TABLE images_projets ADD CONSTRAINT FK_2B29DFB9597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
        $this->addSql('ALTER TABLE technos_projets ADD CONSTRAINT FK_80B41316597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
    }
}
