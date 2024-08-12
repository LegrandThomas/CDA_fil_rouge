import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Unique } from 'typeorm';
import { User } from './user';
import type { Relation } from 'typeorm';

/**
 * Represents a role within the system.
 */
@Entity('roles')
@Unique(["role_name"])
export class Role {
  // Unique identifier for the role
  @PrimaryGeneratedColumn('uuid')
  role_uuid!: string;

  // Name of the role
  @Column({ type: 'varchar', length: 100 })
  role_name!: string;

  // Timestamp when the role was created
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  // Timestamp when the role was last updated
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  // One-to-many relationship with the User entity
  @OneToMany(() => User, (user) => user.role)
  users!: Relation<User[]>;
}
