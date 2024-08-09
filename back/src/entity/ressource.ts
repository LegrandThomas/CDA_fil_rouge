// src/entity/ressource.ts
import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { RessourceType } from './RessourceType';
import { RessourceStatus } from './RessourceStatus';
import { Comment } from './Comment';
import { Tag } from './Tag';
import { RessourceStatusHistory } from './RessourceStatusHistory';
import type {Relation} from 'typeorm'
@Entity()
export class Ressource {
  @PrimaryGeneratedColumn('uuid')
  ressource_uuid!: string;

  @Column({ type: 'varchar', length: 50 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  content!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  summary!: string;

  @Column({ default: false })
  is_reported!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.ressources)
  @JoinColumn({ name: 'user_uuid' })
  user!: Relation<User>;

  @ManyToOne(() => RessourceType, (ressourceType) => ressourceType.ressources)
  @JoinColumn({ name: 'ressource_type_uuid' })
  ressourceType!: Relation<RessourceType>;

  @ManyToOne(() => RessourceStatus, (ressourceStatus) => ressourceStatus.ressources)
  @JoinColumn({ name: 'ressource_status_uuid' })
  ressourceStatus!: Relation<RessourceStatus>;

  @ManyToOne(() => User, (user) => user.ressources)
  @JoinColumn({ name: 'user_uuid_1' })
  updatedBy!: Relation<User>;

  @OneToMany(() => Comment, (comment) => comment.ressource)
  comments!: Relation<Comment[]>;

  @OneToMany(() => RessourceStatusHistory, (statusHistory) => statusHistory.ressource)
  statusHistory!: Relation<RessourceStatusHistory[]>;

  @ManyToMany(() => Tag, (tag) => tag.ressources)
  tags!: Relation<Tag[]>;
    sharingSessions: any;
}
