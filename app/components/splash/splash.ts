import { Component } from '@angular/core';

@Component({
  selector: 'gcs-splash',
  templateUrl: './app/components/splash/splash.html'
})
export class GCS_Splash
{
  headlines: string[] = HEADLINES;
}

const HEADLINES: string[] = [
  "We live with passion."
];