import { Component } from '@angular/core';
import { GCS_ServiceModel, SERVICES_HEADLINE, SERVICES } from '../../models/service/service.model';

@Component({
  selector: 'gcs-services',
  host: {
    class: 'gcs-bottom-section',
    'id': 'gcs-services'
  },
  templateUrl: './app/components/services/services.html'
})
export class GCS_Services
{
  headline: string = SERVICES_HEADLINE;
  services: GCS_ServiceModel[] = SERVICES;
}

