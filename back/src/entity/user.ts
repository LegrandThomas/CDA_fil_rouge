// src/entity/user.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, Relation } from 'typeorm';
import { Roles } from './role';
import { Ressource } from './ressource';
import { Comment } from './comment';
import { SharingSession } from './sharingSession';
import { Follow } from './follow';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_uuid!: string;

  @Column({ length: 100 })
  username!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => Roles, (role) => role.users)
  @JoinColumn({ name: 'role_uuid' })
  role!: Relation<Roles>;

  @OneToMany(() => Ressource, (ressource) => ressource.user)
  ressources!: Relation<Ressource[]>;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Relation<Comment[]>;

  @OneToMany(() => SharingSession, (sharingSession) => sharingSession.user)
  sharingSessions!: Relation<SharingSession[]>;

  @ManyToMany(() => Follow, (follow) => follow.user)
  following!: Relation<Follow[]>;

  @ManyToMany(() => Follow, (follow) => follow.follower)
  followers!: Relation<Follow[]>;
}
