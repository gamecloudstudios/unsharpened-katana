import { Component, OnInit } from '@angular/core';
import { GCS_Backgrounds } from './components/backgrounds/backgrounds';
import { GCS_Splash } from './components/splash/splash';
import { GCS_Services } from './components/services/services';
import { GCS_About } from './components/about/about';
import { GCS_Portfolio } from './components/portfolio/portfolio';
import { GCS_Team } from './components/team/team';
import { GCS_ContactUs } from './components/contact-us/contact-us';

@Component({
  selector: 'my-app',
  directives: [GCS_Backgrounds, GCS_Splash, GCS_Services, GCS_About, GCS_Portfolio, GCS_Team, GCS_ContactUs],
  templateUrl: 'app/app.component.html',
  // styleUrls: ['app/app.component.css'] 
})
export class AppComponent implements OnInit 
{ 
  ngOnInit()
  {
    this.measureElements(window);
  }

  bg_arr_index: number = 0;

  windowHeight: number;
  windowWidth: number;
  services_pos: number;
  services_height: number;
  about_pos: number;
  team_pos: number;
  project_divs: any[];
  team_divs: any[];
  fadein_elems: any[];
  // var last_windowScrollTop = 0;
  splash_opacity: number = 1.0;

  team_members_visible: boolean = false;
  projects_visible: boolean = false;
  services_visible: boolean = false;

  NodeListToArray(list: NodeList): HTMLElement[]
  {
    return Array.prototype.slice.call(list);
  }

  measureElements(the_window)
  {
    this.windowHeight = the_window.innerHeight;
    this.windowWidth = the_window.innerWidth;

    // // Center the BG images
    // // if (!bgs_initialized)
    // // var bgs = $('#gcs-backgrounds>.img-container').children('img');
    // // debugPrint(windowWidth);
    // // debugPrint(windowHeight);
    // // centerBGs(the_window, bgs);

    let services_div = document.getElementById('gcs-services');
    this.services_pos = services_div.offsetTop; //$('#gcs-services').offset().top;
    this.services_height = services_div.offsetHeight; //$('#gcs-services').height();

    let about_div = document.getElementById('gcs-about');
    this.about_pos = about_div.offsetTop; //$('#gcs-about').offset().top;
    this.team_pos = about_div.offsetHeight; //$('#gcs-team').offset().top;

    this.fadein_elems = this.NodeListToArray(document.getElementsByClassName('fadeout-left'));
    this.fadein_elems = this.fadein_elems.concat(this.NodeListToArray(document.getElementsByClassName('fadeout-right'))); //jQuery.merge($('.fadeout-left'), $('.fadeout-right'));
    this.fadein_elems = this.fadein_elems.concat(this.NodeListToArray(document.getElementsByClassName('fadeout-up')));// this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-up'));
    this.fadein_elems = this.fadein_elems.concat(this.NodeListToArray(document.getElementsByClassName('fadeout-down')));// this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-down'));
    // debugPrint(fadein_elems);
    for (var i = 0, length = this.fadein_elems.length; i < length; i++)
    {
      this.fadein_elems[i].dims = {
        pos: this.fadein_elems[i].offsetTop,
        height: this.fadein_elems[i].offsetHeight,
      }
      this.fadein_elems[i].visible = false;
    }

    // // project_divs = $('#gcs-portfolio>.container-fluid>.row>div');
    // // for (var i = 0; i < project_divs.length; i++)
    // // {
    // //   project_divs[i].dims = {
    // //     pos: $(project_divs[i]).offset().top,
    // //     height:  $(project_divs[i]).height(),
    // //   };
    // //   project_divs[i].visible = false;
    // // }

    this.team_divs = this.NodeListToArray(document.querySelectorAll('#gcs-team>.container>.row>div')); //$('#gcs-team>.container>.row>div');
    for (var i = 0; i < this.team_divs.length; i++)
    {
      this.team_divs[i].dims = {
        pos: this.team_divs[i].offsetTop,
        height:  this.team_divs[i].offsetHeight,
      };
      this.team_divs[i].visible = false;
    }

    // // debugPrint("windowHeight" + windowHeight);
    // // debugPrint("services_pos" + services_pos);
    // // debugPrint("services_height" + services_height);
    // determineBackground(this.windowHeight + $(window).scrollTop());
  }

  checkScroll(window): void
  {
    var windowScrollTop = window.pageYOffset;
    var window_bottom = this.windowHeight + windowScrollTop;
    // debugPrint('window bottom = ' + (window_bottom));
    // debugPrint('bottom window position = ' + window_bottom);

    // var windowScrollDelta = windowScrollTop - last_windowScrollTop;

    // BG Parallax Scrolling Effect
    // $('#gcs-backgrounds').animate(
    //   {
    //     top: "-=" + (windowScrollDelta * .3)
    //   },
    //   0
    // );
    // debugPrint('PARALLAX!!!!');
// determineBackground(window_bottom);

    // Transforming the menu navbar
    windowScrollTop > this.windowHeight * .75 ? $('.navbar').addClass('shrunken-navbar') : $('.navbar').removeClass('shrunken-navbar');

    // Fading away the contents in the splash section
    splash_opacity = (windowHeight - windowScrollTop) / windowHeight;
    // debugPrint('splash_opacity = ' + splash_opacity);
    if (splash_opacity >= 0)
    {
      $('#gcs-splash>.container').show();
      $('#gcs-splash>.container').fadeTo(1, splash_opacity,"linear");
    }
    else
    {
      $('#gcs-splash>.container').hide();
    }

    if (true)
    {
      for (var i = 0, length = fadein_elems.length; i < length; i++)
      {
        if (!fadein_elems[i].visible && window_bottom > fadein_elems[i].dims.pos + ($(fadein_elems[i]).hasClass('fadein-early') ? fadein_elems[i].dims.height / 4 : fadein_elems[i].dims.height))
        {
          fadein_elems[i].visible = true;
          fadeInDirection($(fadein_elems[i]));
        }
      }
    }

    // if (!projects_visible)
    // {
    //   for (var i = 0; i <project_divs.length; i++)
    //   {
    //     if (!project_divs[i].visible && window_bottom > project_divs[i].dims.pos + project_divs[i].dims.height)
    //     {
    //       project_divs[i].visible = true;
    //       // showSpin($(project_divs[i]).children('.project-panel'));
    //     }
    //   }
    //   var visible_arr = project_divs.filter(function()
    //   {
    //     // debugPrint('project_div.visible: ' + project_div.visible);
    //     return this.visible;
    //   });
    //   debugPrint('team_visible_arr.length=' + (visible_arr.length) + ', team_divs.length=' + (project_divs.length));
    //   projects_visible = project_divs.length > 0 && visible_arr.length == project_divs.length;
    // }
    // else
    //   debugPrint("All projects visible!");


    if (!team_members_visible)
    {
      for (var i = 0; i < team_divs.length; i++)
      {
        // debugPrint(`team_divs[${i}].visible = ${team_divs[i].visible}`);
        if (!team_divs[i].visible && window_bottom > team_divs[i].dims.pos + team_divs[i].dims.height)
        {
          team_divs[i].visible = true;
          growElement($(team_divs[i]).children('.team-panel'));
        }
      }
      var team_visible_arr = [];
      team_visible_arr = team_divs.filter(function()
      {
        return this.visible;
      });
      debugPrint('team_visible_arr.length=' + (team_visible_arr.length) + ', team_divs.length=' + (team_divs.length));
      team_members_visible = team_divs.length > 0 && team_visible_arr.length == team_divs.length;
      // debugPrint("visible array: " + visible_arr);
    }
    else
      debugPrint("All team members visible!");

    if (!services_visible && (window_bottom > services_pos + (services_height >> 2)))
    {
      // debugPrint("FADE IN!");
      services_visible = true;
      fadeInServices();
    }
    // else
    //   debugPrint("All services visible!");

    // last_windowScrollTop = windowScrollTop;
  }
}
