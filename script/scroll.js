//document.addEventListener("DOMContentLoaded", function(event)
// window.addEventListener('load', function()
jQuery(window).load(function()
{
  console.log('Window loaded!');
  measureElements(this);
  checkScroll(this);
  fadeOutLoader($('.preloader-home'));
});

var bg_arr = [
  'img/SHOWSTOPPER PAGE_v1.jpg',
  'img/PS_4.jpg',
  'img/GC CLOUD HEADER_v1.jpg'
];
var bg_arr_index = 0;

var windowHeight;
var windowWidth;
var services_pos, services_height;
var about_pos, team_pos;
var project_divs = [];
var team_divs = [];
var fadein_elems = [];
// var last_windowScrollTop = 0;
var splash_opacity = 1.0;

var team_members_visible = false;
var projects_visible = false;
var services_visible = false;
// var bgs_initialized = false;
// var bgs = [];

function NodeListToArray(list)
{
  return Array.prototype.slice.call(list);
}

/**
 * measureElements
 * Measures the dimensions of numerous elements on the page
 *  and stores those measurements into variables.
 */
var measureElements = function(the_window)
{
  windowHeight = the_window.innerHeight;
  windowWidth = the_window.innerWidth;

  // Center the BG images
  // if (!bgs_initialized)
  // var bgs = $('#gcs-backgrounds>.img-container').children('img');
  // debugPrint(windowWidth);
  // debugPrint(windowHeight);
  // centerBGs(the_window, bgs);

  let services_div = document.getElementById('gcs-services');
  services_pos = services_div.offsetTop; //$('#gcs-services').offset().top;
  services_height = services_div.offsetHeight; //$('#gcs-services').height();

  let about_div = document.getElementById('gcs-about');
  about_pos = about_div.offsetTop; //$('#gcs-about').offset().top;
  team_pos = about_div.offsetHeight; //$('#gcs-team').offset().top;

  fadein_elems = NodeListToArray(document.getElementsByClassName('fadeout-left'));
  fadein_elems = fadein_elems.concat(NodeListToArray(document.getElementsByClassName('fadeout-right'))); //jQuery.merge($('.fadeout-left'), $('.fadeout-right'));
  fadein_elems = fadein_elems.concat(NodeListToArray(document.getElementsByClassName('fadeout-up')));// this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-up'));
  fadein_elems = fadein_elems.concat(NodeListToArray(document.getElementsByClassName('fadeout-down')));// this.fadein_elems = jQuery.merge(this.fadein_elems, $('.fadeout-down'));
  // debugPrint(fadein_elems);
  for (var i = 0, length = fadein_elems.length; i < length; i++)
  {
    fadein_elems[i].dims = {
      pos: fadein_elems[i].offsetTop,
      height: fadein_elems[i].offsetHeight,
    }
    fadein_elems[i].visible = false;
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

  team_divs = NodeListToArray(document.querySelectorAll('#gcs-team>.container>.row>div')); //$('#gcs-team>.container>.row>div');
  for (var i = 0; i < team_divs.length; i++)
  {
    team_divs[i].dims = {
      pos: team_divs[i].offsetTop,
      height: team_divs[i].offsetHeight,
    };
    team_divs[i].visible = false;
  }

  // // debugPrint("windowHeight" + windowHeight);
  // // debugPrint("services_pos" + services_pos);
  // // debugPrint("services_height" + services_height);
  // determineBackground(this.windowHeight + $(window).scrollTop());
  determineBackground(windowHeight + window.pageYOffset);
}

$(window).resize(function()
{
  measureElements($(this));
  var bgs = $('#gcs-backgrounds>.img-container').children('img');
  debugPrint('Calling centerBGs B');
  centerBGs(window, bgs);
});


$('#gcs-navbar a').on('click', function()
{
  var windowScrollTop = $(window).scrollTop();
  var link_id = $(this).attr('href');
  // debugPrint("navbar link clicked! " + link_id);

  // Get the y-position of the div we're clicking for
  var div_pos = $(link_id).offset().top;

  scrollThisAmount(div_pos);

  return false;   // Prevent propogation through DOM.
});


/**
 * WINDOW SCROLL EVENT HANDLER
 *
 *
 *
 *
 *
 */
// $(window).scroll(function()
window.addEventListener('scroll', function()
{
  checkScroll(this);
}, false);

function checkScroll(window)
{
  var windowScrollTop = window.pageYOffset;
  var window_bottom = windowHeight + windowScrollTop;
  debugPrint('window bottom = ' + (window_bottom));
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
  determineBackground(window_bottom);

  // Transforming the menu navbar
  windowScrollTop > windowHeight * .75 ? $('.navbar').addClass('shrunken-navbar') : $('.navbar').removeClass('shrunken-navbar');

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

var fadeInServices = function()
{
  $('#gcs-services .service-tile:eq(0)').delay(250).animate(
    {
      opacity: 1
    },
    'slow'
  );

  $('#gcs-services .service-tile:eq(1)').delay(1000).animate(
    {
      opacity: 1
    },
    'slow'
  );

  $('#gcs-services .service-tile:eq(2)').delay(1750).animate(
    {
      opacity: 1
    },
    'slow'
  );

  $('#gcs-services .service-tile:eq(3)').delay(2500).animate(
    {
      opacity: 1
    },
    'slow'
  );
};

var showSpin = function(element)
{
  $(element).addClass("spin-element");
  setTimeout(function()
  {
    // debugPrint("FULL SIZE!");
    $(element).removeClass("tiny-size");
  }, 690);
};

var growElement = function(element)
{
  // debugPrint('growElement for: ' + element);
  $(element).addClass("grow-element");
  setTimeout(function()
  {
    // debugPrint("FULL SIZE!");
    $(element).removeClass("no-size");
  }, 590);
};


var scrollThisAmount = function(amount)
{
  $('html, body').delay(200).animate(
    {
      scrollTop: amount - 80 // 90 is height of navbar
    },
    1000
  );
};

var determineBackground = function(scroll_pos)
{
  var new_bg_arr_index = -1;
  // var bg_img_elem = $('#gcs-backgrounds>img');

  if (scroll_pos < about_pos)
  {
    new_bg_arr_index = 0;
  }
  else if (scroll_pos >= about_pos && scroll_pos < team_pos)
  {
    new_bg_arr_index = 1;
  }
  else
  {
    new_bg_arr_index = 2;
  }

  if (new_bg_arr_index !== bg_arr_index)
  {
    bg_arr_index = new_bg_arr_index;
    $('#gcs-backgrounds').css(
      {
        transform: 'translateY(-' + (100 * bg_arr_index) + 'vh)',
        '-webkit-transform': 'translateY(-' + (100 * bg_arr_index * (1.0 / bg_arr.length)) + '%)'
      }
    );
  }
};

var fadeInDirection = function(element)
{
  // Extract the classNames of this element.
  var str_classes = element.context.classList;
  var i = 0;
  for (length = str_classes.length; i < length; i++)
  {
    if (str_classes[i].startsWith('fadeout-'))
      break;
  }

  $(element).addClass("fadein");
  $(element).removeClass(str_classes[i]);
  // setTimeout(function()
  // {
  //   // debugPrint("FULL SIZE!");
  //   $(element).removeClass("fadeout-" + str_direction);
  // }, 690);
}

var fadeOutLoader = function(element)
{
  $('.preloader-gif').addClass('fadeout-gif');
  var self = element;
  $(element).addClass('fadeout');
  setTimeout(function(){
    $(self).addClass('post-fadeout');
  }, 2000);
}
