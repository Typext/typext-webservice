import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreteLogs1619388829938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'logs',
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
            name: 'minute_review_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'minute_id',
            type: 'int',
          },
          {
            name: 'registered_action',
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
            onUpdate: 'CASCADE',
          },
          {
            name: 'MinuteReviewId',
            referencedTableName: 'minute_reviews',
            referencedColumnNames: ['id'],
            columnNames: ['minute_review_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
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
    await queryRunner.dropTable('logs');
  }
}
