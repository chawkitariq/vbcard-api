import { Contact } from 'src/contact/entities/contact.entity';
import { Organization } from 'src/organization/entities/organization.entity';

export class CreateOrganizationContactDto {
  organization: Organization;
  contact: Contact;
}
