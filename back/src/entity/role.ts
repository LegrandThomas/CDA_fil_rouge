import {  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './User'
import type {Relation} from 'typeorm'
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  role_uuid!: string;

  @Column({type: 'varchar', length: 100 })
  role_name!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToMany(() => User, (user) => user.role)
  users!: Relation<User[]>;
 
}
