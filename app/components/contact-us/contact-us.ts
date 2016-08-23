import { Component } from '@angular/core';
import { ContactCollectionModel, GeneratedContactModel, GCS_CONTACTS } from '../../models/contact-model/contact-model';

@Component({
  selector: '[gcs-contact-us]',
  host: {
    class: 'full-width foot gcs-bottom-section',
    id: 'contact-us'
  },
  templateUrl: './app/components/contact-us/contact-us.html'
})
export class GCS_ContactUs
{
  my_contacts: ContactCollectionModel[] = GCS_CONTACTS;
}