import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIsAdmin1736538426618 implements MigrationInterface {
    name = 'ChangeIsAdmin1736538426618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`CREATE TYPE "public"."users_isadmin_enum" AS ENUM('USER', 'ADMIN', 'SUPERADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" "public"."users_isadmin_enum" NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "mobil" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "mobil" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
        await queryRunner.query(`DROP TYPE "public"."users_isadmin_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" character varying NOT NULL DEFAULT false`);
    }

}
