import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// precisa de migration de FK depois(emeber_id e provider_id)

export default class AddEntries1595015060066 implements MigrationInterface {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entries');
  }
}
