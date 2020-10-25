import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddItemTable1601331114774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id_item',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      })
    );
  }

  // Adicionar FK's em outra migration!

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
  }
}
