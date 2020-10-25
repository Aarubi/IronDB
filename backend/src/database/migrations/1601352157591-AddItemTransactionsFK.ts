import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddItemTransactionsFK1601352157591
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'item_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'ItemTransactions',
        columnNames: ['item_id'],
        referencedColumnNames: ['id_item'],
        referencedTableName: 'item',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transactions', 'item_id');
    await queryRunner.dropForeignKey('transactions', 'ItemTransactions');
  }
}
