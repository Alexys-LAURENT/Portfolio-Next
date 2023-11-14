<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231114141733 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE competences_projets (id INT AUTO_INCREMENT NOT NULL, projets_id INT DEFAULT NULL, libelle VARCHAR(255) NOT NULL, INDEX IDX_7F76D078597A6CB7 (projets_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE images_projets (id INT AUTO_INCREMENT NOT NULL, projets_id INT DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, src VARCHAR(255) NOT NULL, INDEX IDX_2B29DFB9597A6CB7 (projets_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE projets (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, github_link VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE technos_projets (id INT AUTO_INCREMENT NOT NULL, projets_id INT DEFAULT NULL, titre VARCHAR(255) NOT NULL, libelle VARCHAR(255) NOT NULL, INDEX IDX_80B41316597A6CB7 (projets_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE competences_projets ADD CONSTRAINT FK_7F76D078597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
        $this->addSql('ALTER TABLE images_projets ADD CONSTRAINT FK_2B29DFB9597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
        $this->addSql('ALTER TABLE technos_projets ADD CONSTRAINT FK_80B41316597A6CB7 FOREIGN KEY (projets_id) REFERENCES projets (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE competences_projets DROP FOREIGN KEY FK_7F76D078597A6CB7');
        $this->addSql('ALTER TABLE images_projets DROP FOREIGN KEY FK_2B29DFB9597A6CB7');
        $this->addSql('ALTER TABLE technos_projets DROP FOREIGN KEY FK_80B41316597A6CB7');
        $this->addSql('DROP TABLE competences_projets');
        $this->addSql('DROP TABLE images_projets');
        $this->addSql('DROP TABLE projets');
        $this->addSql('DROP TABLE technos_projets');
    }
}
