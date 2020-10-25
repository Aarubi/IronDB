import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AddEntriesTable1601331999186
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entries',
        columns: [
          {
            name: 'id_entries',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'entries_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'price',
            type: 'money',
          },
          {
            name: 'nota_fiscal',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
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
    await queryRunner.dropTable('entries');
  }
}
