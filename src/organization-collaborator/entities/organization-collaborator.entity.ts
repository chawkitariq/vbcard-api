import { Exclude } from 'class-transformer';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'organizations_collaborators' })
@Unique(['organization', 'collaborator'])
export class OrganizationCollaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ nullable: true })
  role?: string;

  @Index()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Relation<Organization>;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'collaborator_id' })
  collaborator: Relation<User>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;
}
