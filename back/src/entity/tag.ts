// src/entity/tag.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { Ressource } from './Ressource'
import type {Relation} from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tag_uuid!: string;

  @Column({type: 'varchar', length: 100 })
  tag_title!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToMany(() => Ressource, (ressource) => ressource.tags)
  @JoinTable({
    name: 'have',
    joinColumn: { name: 'tag_uuid', referencedColumnName: 'tag_uuid' },
    inverseJoinColumn: { name: 'ressource_uuid', referencedColumnName: 'ressource_uuid' }
  })
  ressources!: Relation<Ressource[]>;
    sharingSessions: any;
}
