// src/entity/follow.ts
import {  Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import type {Relation} from 'typeorm'

@Entity()
export class Follow {
  @PrimaryColumn('uuid')
  user_uuid!: string;

  @PrimaryColumn('uuid')
  user_uuid_1!: string;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'user_uuid' })
  user!: Relation<User>;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'user_uuid_1' })
  follower!: Relation<User>;
}
