import { MigrationInterface, QueryRunner } from "typeorm";
import  seedRoles  from "./../seeder/role-seeder";
import  seedUsers  from "../seeder/user-seeder";
export class SeedingData1722939424674 implements MigrationInterface {
    name = 'SeedingData1722939424674'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await this.seedDatabase();
        console.log('seeding tables roles et users effectué');
    }


    private async seedDatabase(): Promise<void> {
      try {
         console.log('Seeding roles...');
         await seedRoles();
         console.log('Roles seeding completed.');
     } catch (seedError) {
         console.error('Error seeding roles:', seedError);
         throw seedError;
     }

        try {
            await seedUsers();
            console.log('Users seeding completed.');
        } catch (seedError) {
            console.error('Error seeding users:', seedError);
            throw seedError;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          }

}
