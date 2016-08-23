import { Component } from '@angular/core';

@Component({
  selector: 'gcs-about',
  host: {
    class: 'gcs-bottom-section',
    id: 'gcs-about'
  },
  templateUrl: './app/components/about/about.html'
})
export class GCS_About
{
  headlines: string[] = HEADLINES; 
}

export const HEADLINES = [
  `The best people making the best products`,
  `Let's build something TOGETHER when you're ready`
]