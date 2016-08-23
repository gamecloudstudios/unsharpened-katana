export class ContactCollectionModel
{
  location: string;
  contacts: GeneratedContactModel[];
  address: string[];

  constructor(contacts: ContactModel[], address?: string[], location?: string)
  {
    this.contacts = [];
    for (let i = 0; i < contacts.length; i++)
    {
      this.contacts[i] = new GeneratedContactModel(contacts[i]);
    }
    this.address = address ? address : null;
    this.location = location != null ? location : null;
  }
}

export class GeneratedContactModel
{
  label: string;
  contact_string: string;
  contact_link: string;

  constructor(contact: ContactModel)
  {
    this.label = contact.label;
    this.contact_string = contact.makeContactString();
    console.log(`GENERATED CONTACT STRING: ${this.contact_string}`);
    this.contact_link = contact.makeContactLink();
    console.log(`GENERATED CONTACT LINK: ${this.contact_link}`);
  }
}

export interface ContactModel
{
  label: string;
  contact_arr: string[];

  makeContactString(): string;
  makeContactLink(): string;
}

export class PhoneModel implements ContactModel
{
  label: string;
  contact_arr: string[];

  constructor(label: string, number: string[])
  {
    this.label = label;
    this.contact_arr = number;
  }

  makeContactString(): string
  {
    return this.contact_arr.join('-');
  }

  makeContactLink(): string
  {
    let prefix: string = 'tel';
    return `${prefix}:${this.makeContactString()}`;
  }
}

export class FaxModel implements ContactModel
{
  label: string;
  contact_arr: string[];

  constructor(label: string, number: string[])
  {
    this.label = label;
    this.contact_arr = number;
  }

  makeContactString(): string
  {
    return this.contact_arr.join('-');
  }

  makeContactLink(): string
  {
    let prefix: string = 'fax-global-phone';
    return `${prefix}:${this.makeContactString()}`;
  }
}

export class EmailModel implements ContactModel
{
  label: string;
  contact_arr: string[];

  constructor(label: string, strs: string[])
  {
    this.label = label;
    this.contact_arr = strs;
  }

  makeContactString(): string
  {
    return `${this.contact_arr[0]}@${this.contact_arr[1]}.${this.contact_arr[2]}`;
  }

  makeContactLink(): string
  {
    let prefix: string = 'mailto';
    return `${prefix}:${this.makeContactString()}`;
  }
}

export const GCS_CONTACTS: ContactCollectionModel[] = [
  new ContactCollectionModel(
    [
      new PhoneModel(
        'Clark Seydel',
        ['+1','202','360','5015']
      )
    ],
    [
      '25025 Las Brisas Rd, Ste A',
      'Murrieta, CA 92562'
    ],
    'Murrieta, CA'
  ),
  new ContactCollectionModel(
    [
      new PhoneModel(
        'Phone',
        ['+86','21','5131','4277']
      ),
      new FaxModel(
        'Fax',
        ['+86','21','5131','4278']
      )
    ],
    [
      '1st Floor Building 17, No. 498',
      'Guoshoujing Road, 201203'
    ],
    'Shanghai, China'
  ),
  new ContactCollectionModel(
    [
      new EmailModel(
        'Email',
        ['info','gamecloudstudios','com']
      )
    ],
    [],
    ' '
  )
];