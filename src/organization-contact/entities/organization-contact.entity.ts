import { Exclude } from 'class-transformer';
import { Contact } from 'src/contact/entities/contact.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Relation, Unique } from 'typeorm';

@Entity({ name: 'organizations_contacts' })
@Unique(['organization', 'contact'])
export class OrganizationContact {
  @Exclude()
  @Column({ name: 'organization_id', primary: true })
  organizationId: string;

  @Exclude()
  @Column({ name: 'contact_id', primary: true })
  contactId: string;

  @Index()
  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Relation<Organization>;

  @ManyToOne(() => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact?: Relation<Contact>;
}
