import { Component } from '@angular/core';
@Component({
  selector: 'gcs-backgrounds',
  templateUrl: './app/components/backgrounds/backgrounds.html'
})
export class Backgrounds 
{ 
  public bgs: Background[] = BACKGROUNDS;
}


export class Background
{
  src: string;
}

const BACKGROUNDS: Background[] = [
  {
    src: '../../img/pexels-gcs.jpg'
  },
  {
    src: '../../img/pexels-team.jpg'
  },
  {
    src: '../../img/pexels-office.jpg'
  }
]