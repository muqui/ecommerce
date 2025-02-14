import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1736477234017 implements MigrationInterface {
    name = 'Initial1736477234017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "users" ADD "codeZip" character varying`);
        await queryRunner.query(`UPDATE "users" SET "codeZip" = '00000' WHERE "codeZip" IS NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "codeZip" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codeZip"`);
    }

}
