// src/entity/ressourceType.ts
import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Ressource } from './Ressource';
import type {Relation} from 'typeorm'
@Entity()
export class RessourceType {
  @PrimaryGeneratedColumn('uuid')
  ressource_type_uuid!: string;

  @Column({type: 'varchar', length: 50 })
  type_name!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToMany(() => Ressource, (ressource) => ressource.ressourceType)
  ressources!: Relation<Ressource[]>;
}
