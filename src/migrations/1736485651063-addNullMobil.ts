import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullMobil1736485651063 implements MigrationInterface {
    name = 'AddNullMobil1736485651063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "mobil" character varying`);
        await queryRunner.query(`UPDATE "users" SET "mobil" = '00000' WHERE "mobil" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "mobil" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobil"`);
    }

}
