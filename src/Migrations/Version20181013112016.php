<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181013112016 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE opener_permanence DROP FOREIGN KEY FK_9940FBBA2B174A2B');
        $this->addSql('CREATE TABLE app_users (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(25) NOT NULL, password VARCHAR(64) NOT NULL, email VARCHAR(254) NOT NULL, is_active TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_C2502824F85E0677 (username), UNIQUE INDEX UNIQ_C2502824E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_permanence (user_id INT NOT NULL, permanence_id INT NOT NULL, INDEX IDX_78570D5AA76ED395 (user_id), INDEX IDX_78570D5AA9457964 (permanence_id), PRIMARY KEY(user_id, permanence_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_permanence ADD CONSTRAINT FK_78570D5AA76ED395 FOREIGN KEY (user_id) REFERENCES app_users (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_permanence ADD CONSTRAINT FK_78570D5AA9457964 FOREIGN KEY (permanence_id) REFERENCES permanence (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE opener');
        $this->addSql('DROP TABLE opener_permanence');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user_permanence DROP FOREIGN KEY FK_78570D5AA76ED395');
        $this->addSql('CREATE TABLE opener (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE opener_permanence (opener_id INT NOT NULL, permanence_id INT NOT NULL, INDEX IDX_9940FBBA2B174A2B (opener_id), INDEX IDX_9940FBBAA9457964 (permanence_id), PRIMARY KEY(opener_id, permanence_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE opener_permanence ADD CONSTRAINT FK_9940FBBA2B174A2B FOREIGN KEY (opener_id) REFERENCES opener (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE opener_permanence ADD CONSTRAINT FK_9940FBBAA9457964 FOREIGN KEY (permanence_id) REFERENCES permanence (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('DROP TABLE app_users');
        $this->addSql('DROP TABLE user_permanence');
    }
}
