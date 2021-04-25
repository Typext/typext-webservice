import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMinutes1619380074433 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'minutes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'file_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'minute_number',
            type: 'varchar',
          },
          {
            name: 'place',
            type: 'varchar',
          },
          {
            name: 'project',
            type: 'varchar',
          },
          {
            name: 'schedule',
            type: 'varchar',
          },
          {
            name: 'areas',
            type: 'varchar',
          },
          {
            name: 'status',
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
        foreignKeys: [
          {
            name: 'UserId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
          },
          {
            name: 'FileId',
            referencedTableName: 'files',
            referencedColumnNames: ['id'],
            columnNames: ['file_id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('minutes');
  }
}
