import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const USERS_TABLE_NAME = 'users';
const ARTISTS_TABLE_NAME = 'artists';
const ALBUMS_TABLE_NAME = 'albums';
const TRACKS_TABLE_NAME = 'tracks';
const FAVORITE_ARTISTS_TABLE_NAME = 'favorite_artists';
const FAVORITE_ALBUMS_TABLE_NAME = 'favorite_albums';
const FAVORITE_TRACKS_TABLE_NAME = 'favorite_tracks';

export class Init1687202789400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createUsersTable(queryRunner);
    await this.createArtistsTable(queryRunner);
    await this.createAlbumsTable(queryRunner);
    await this.createTracksTable(queryRunner);
    await this.createFavouriteArtistsTable(queryRunner);
    await this.createFavouriteAlbumsTable(queryRunner);
    await this.createFavouriteTracksTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USERS_TABLE_NAME);
    await queryRunner.dropTable(ARTISTS_TABLE_NAME);
    await queryRunner.dropTable(ALBUMS_TABLE_NAME);
    await queryRunner.dropTable(TRACKS_TABLE_NAME);
    await queryRunner.dropTable(FAVORITE_ARTISTS_TABLE_NAME);
    await queryRunner.dropTable(FAVORITE_ALBUMS_TABLE_NAME);
    await queryRunner.dropTable(FAVORITE_TRACKS_TABLE_NAME);
  }

  private async createUsersTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USERS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'version',
            type: 'integer',
            isNullable: true,
            default: 1,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  private async createArtistsTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ARTISTS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'grammy',
            type: 'boolean',
          },
        ],
      }),
    );
  }

  private async createAlbumsTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ALBUMS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'artist_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }

  private async createTracksTable(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tracks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'artist_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'album_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'float',
          },
        ],
      }),
    );
  }

  private async createFavouriteTracksTable(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: FAVORITE_TRACKS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'track_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }

  private async createFavouriteAlbumsTable(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: FAVORITE_ALBUMS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'album_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }

  private async createFavouriteArtistsTable(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: FAVORITE_ARTISTS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'artist_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }
}
