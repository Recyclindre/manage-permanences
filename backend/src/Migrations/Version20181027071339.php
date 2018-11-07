<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181027071339 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE permanence ADD composter_id INT DEFAULT 1');
        $this->addSql('ALTER TABLE permanence ADD CONSTRAINT FK_DF30CBB67E93ED02 FOREIGN KEY (composter_id) REFERENCES composter (id)');
        $this->addSql('CREATE INDEX IDX_DF30CBB67E93ED02 ON permanence (composter_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE permanence DROP FOREIGN KEY FK_DF30CBB67E93ED02');
        $this->addSql('DROP INDEX IDX_DF30CBB67E93ED02 ON permanence');
        $this->addSql('ALTER TABLE permanence DROP composter_id');
    }
}
