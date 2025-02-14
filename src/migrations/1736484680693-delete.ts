import { MigrationInterface, QueryRunner } from "typeorm";

export class Delete1736484680693 implements MigrationInterface {
    name = 'Delete1736484680693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "codeZip"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "codeZip" character varying NOT NULL`);
    }

}
