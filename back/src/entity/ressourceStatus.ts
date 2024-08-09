// src/entity/ressourceStatus.ts
import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Ressource } from './Ressource';
import type {Relation} from 'typeorm'

@Entity()
export class RessourceStatus {
  @PrimaryGeneratedColumn('uuid')
  ressource_status_uuid!: string;

  @Column({type: 'varchar', length: 100 })
  name!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToMany(() => Ressource, (ressource) => ressource.ressourceStatus)
  ressources!: Relation<Ressource[]>;
}
