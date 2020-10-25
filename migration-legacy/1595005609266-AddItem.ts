import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddItem1595005609266 implements MigrationInterface {
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
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }
  // adicionar FK entries_id em nova migration

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
  }
}
