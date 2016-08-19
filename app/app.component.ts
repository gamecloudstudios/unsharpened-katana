import { Component, OnInit } from '@angular/core';
import { Backgrounds } from './components/backgrounds/backgrounds';
@Component({
  selector: 'my-app',
  directives: [Backgrounds],
  templateUrl: 'app/app.component.html' 
})
export class AppComponent implements OnInit 
{ 
  ngOnInit()
  {
    
  }

  bg_arr_index: number = 0;

  windowHeight: number;
  windowWidth: number;
  services_pos: number;
  services_height: number;
  about_pos: number;
  team_pos: number;
  project_divs: HTMLBodyElement[];
  team_divs: HTMLBodyElement[];
  fadein_elems: HTMLBodyElement[];
  // var last_windowScrollTop = 0;
  splash_opacity: number = 1.0;

  team_members_visible: boolean = false;
  projects_visible: boolean = false;
  services_visible: boolean = false;

  measureElements(the_window)
  {
    this.windowHeight = $(the_window).height();
    this.windowWidth = $(the_window).width();

    // Center the BG images
    // if (!bgs_initialized)
    // var bgs = $('#gcs-backgrounds>.img-container').children('img');
    // debugPrint(windowWidth);
    // debugPrint(windowHeight);
    // centerBGs(the_window, bgs);

    this.services_pos = $('#gcs-services').offset().top;
    this.services_height = $('#gcs-services').height();

    this.about_pos = $('#gcs-about').offset().top;
    this.team_pos = $('#gcs-team').offset().top;

    this.fadein_elems = jQuery.merge($('.fadeout-left'), $('.fadeout-right'));
    this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-up'));
    this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-down'));
    debugPrint(fadein_elems);
    for (var i = 0, length = this.fadein_elems.length; i < length; i++)
    {
      this.fadein_elems[i].dims = {
        pos: $(this.fadein_elems[i]).offset().top,
        height: $(this.fadein_elems[i]).height(),
      }
      this.fadein_elems[i].visible = false;
    }

    // project_divs = $('#gcs-portfolio>.container-fluid>.row>div');
    // for (var i = 0; i < project_divs.length; i++)
    // {
    //   project_divs[i].dims = {
    //     pos: $(project_divs[i]).offset().top,
    //     height:  $(project_divs[i]).height(),
    //   };
    //   project_divs[i].visible = false;
    // }

    this.team_divs = $('#gcs-team>.container>.row>div');
    for (var i = 0; i < this.team_divs.length; i++)
    {
      this.team_divs[i].dims = {
        pos: $(this.team_divs[i]).offset().top,
        height:  $(this.team_divs[i]).height(),
      };
      this.team_divs[i].visible = false;
    }

    // debugPrint("windowHeight" + windowHeight);
    // debugPrint("services_pos" + services_pos);
    // debugPrint("services_height" + services_height);
    determineBackground(this.windowHeight + $(window).scrollTop());
  }
}
