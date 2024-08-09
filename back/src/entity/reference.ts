// src/entity/reference.ts
import {  Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ressource } from './Ressource';
import { SharingSession } from './SharingSession';
import type {Relation} from 'typeorm'

@Entity()
export class Reference {
  @PrimaryColumn('uuid')
  ressource_uuid!: string;

  @PrimaryColumn('uuid')
  sharing_session_uuid!: string;

  @ManyToOne(() => Ressource)
  @JoinColumn({ name: 'ressource_uuid' })
  ressource!: Relation<Ressource>;

  @ManyToOne(() => SharingSession)
  @JoinColumn({ name: 'sharing_session_uuid' })
  sharingSession!: Relation<SharingSession>;
}
