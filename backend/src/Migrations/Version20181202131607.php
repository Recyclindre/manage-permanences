<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181202131607 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE permanence ADD nb_users SMALLINT DEFAULT NULL, ADD nb_buckets DOUBLE PRECISION DEFAULT NULL, ADD temperature DOUBLE PRECISION DEFAULT NULL, CHANGE event_message event_message LONGTEXT DEFAULT NULL, CHANGE event_title event_title VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE permanence DROP nb_users, DROP nb_buckets, DROP temperature, CHANGE event_title event_title VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE event_message event_message LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
