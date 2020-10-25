import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
// cria todas as FK que faltaram da PRIMEIRA RUN de migrations.

export default class AddMissingForeignKeys1601333407971
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela item

    await queryRunner.addColumn(
      'item',
      new TableColumn({
        name: 'entries_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'item',
      new TableForeignKey({
        name: 'EntriesItem',
        columnNames: ['entries_id'],
        referencedColumnNames: ['id_entries'],
        referencedTableName: 'entries',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // Tabela transactions
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'member_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'MemberTransactions',
        columnNames: ['member_id'],
        referencedColumnNames: ['id_member'],
        referencedTableName: 'member',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
    // Tabela entries
    await queryRunner.addColumn(
      'entries',
      new TableColumn({
        name: 'member_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'entries',
      new TableForeignKey({
        name: 'MemberEntries',
        columnNames: ['member_id'],
        referencedColumnNames: ['id_member'],
        referencedTableName: 'member',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.addColumn(
      'entries',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'entries',
      new TableForeignKey({
        name: 'ProviderEntries',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id_provider'],
        referencedTableName: 'provider',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop item FK's
    await queryRunner.dropColumn('item', 'entries_id');
    await queryRunner.dropForeignKey('item', 'EntriesItem');

    // drop transactions Fk's
    await queryRunner.dropColumn('transactions', 'member_id');
    await queryRunner.dropForeignKey('transactions', 'MemberTransactions');

    // drop entries FK's
    await queryRunner.dropColumn('entries', 'member_id');
    await queryRunner.dropForeignKey('entries', 'MemberEntries');
    await queryRunner.dropColumn('entries', 'provider_id');
    await queryRunner.dropForeignKey('entries', 'ProviderEntries');
  }
}
