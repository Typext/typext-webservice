import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreteMinuteReviews1619388342093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'minute_reviews',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'minute_id',
            type: 'int',
          },
          {
            name: 'topic',
            type: 'varchar',
          },
          {
            name: 'responsible',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'timestamp with time zone',
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
            name: 'MinuteId',
            referencedTableName: 'minutes',
            referencedColumnNames: ['id'],
            columnNames: ['minute_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('minute_reviews');
  }
}
