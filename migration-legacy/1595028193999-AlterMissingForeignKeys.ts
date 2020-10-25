import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

// cria todas as FK que faltaram da PRIMEIRA RUN de migrations.

export default class AlterMissingForeignKeys1595028193999
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // item.entries_id

    await queryRunner.addColumn(
      'item',
      new TableColumn({
        name: 'entries_id',
        type: 'uuid',
        isNullable: true,
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

    // transaction.member_id
    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'member_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'MemberTransaction',
        columnNames: ['member_id'],
        referencedColumnNames: ['id_member'],
        referencedTableName: 'member',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // in_out.transaction_id
    await queryRunner.addColumn(
      'in_out',
      new TableColumn({
        name: 'transaction_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'in_out',
      new TableForeignKey({
        name: 'TransactionInOut',
        columnNames: ['transaction_id'],
        referencedColumnNames: ['id_transaction'],
        referencedTableName: 'transaction',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // in_out.item_id
    await queryRunner.addColumn(
      'in_out',
      new TableColumn({
        name: 'item_id',
        type: 'uuid',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'in_out',
      new TableForeignKey({
        name: 'ItemInOut',
        columnNames: ['item_id'],
        referencedColumnNames: ['id_item'],
        referencedTableName: 'item',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );

    // entries.member_id
    await queryRunner.addColumn(
      'entries',
      new TableColumn({
        name: 'member_id',
        type: 'uuid',
        isNullable: true,
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

    // entries.provider_id
    await queryRunner.addColumn(
      'entries',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
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
    // drop item.entries_id
    await queryRunner.dropColumn('item', 'entries_id');
    await queryRunner.dropForeignKey('item', 'EntriesItem');

    // drop transaction.member_id
    await queryRunner.dropColumn('transaction', 'member_id');
    await queryRunner.dropForeignKey('transaction', 'MemberTransaction');

    // drop in_out FK's
    await queryRunner.dropColumn('in_out', 'transaction_id');
    await queryRunner.dropForeignKey('in_out', 'TransactionInOut');

    await queryRunner.dropColumn('in_out', 'item_id');
    await queryRunner.dropForeignKey('int_out', 'ItemInOut');

    // drop entries FK's
    await queryRunner.dropColumn('entries', 'member_id');
    await queryRunner.dropForeignKey('entries', 'MemberEntries');

    await queryRunner.dropColumn('entries', 'provider_id');
    await queryRunner.dropForeignKey('entries', 'ProviderEntries');
  }
}
