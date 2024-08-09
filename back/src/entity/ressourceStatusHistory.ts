// src/entity/ressourceStatusHistory.ts
import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ressource } from './Ressource';
import type {Relation} from 'typeorm'

@Entity()
export class RessourceStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  ressource_status_history_uuid!: string;

  @Column({type: 'timestamptz' })
  status_changed_at!: Date;

  @Column({type: 'varchar', length: 50, nullable: true })
  preview_state!: string;

  @Column({type: 'varchar', length: 50, nullable: true })
  new_state!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => Ressource, (ressource) => ressource.statusHistory)
  @JoinColumn({ name: 'ressource_uuid' })
  ressource!: Relation<Ressource>;
}
