//document.addEventListener("DOMContentLoaded", function(event)
$(window).load(function()
{
  measureElements($(this));
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
// var last_windowScrollTop = 0;
var splash_opacity = 1.0;

var team_members_visible = false;
var projects_visible = false;
var services_visible = false;
// var bgs_initialized = false;
// var bgs = [];

/**
 * measureElements
 * Measures the dimensions of numerous elements on the page
 *  and stores those measurements into variables. 
 */
var measureElements = function(the_window)
{
  windowHeight = $(the_window).height();
  windowWidth = $(the_window).width();

  // Center the BG images
  // if (!bgs_initialized)
  let bgs = $('#gcs-backgrounds>.img-container').children('img');
  // debugPrint(windowWidth);
  // debugPrint(windowHeight);
  let length = bgs.length;
  for (let i = 0; i < length; i++)
  {
    // if (!bgs_initialized)
    let img_w = bgs[i].clientWidth;
    let img_h = bgs[i].clientHeight;
    // let img_ar = img_w / img_h;
    let nat_ar = bgs[i].naturalWidth / bgs[i].naturalHeight;
    let win_ar = windowWidth / windowHeight;
    

    // measured_bgs_natural_wh = true;
    // debugPrint((windowWidth - img_w) / 2);
    // if (i == 0)
      // debugPrint(`IMAGE[${i}]: img_w = ${img_w}, img_h = ${img_h}, nat_w = ${bgs[i].naturalWidth}, nat_h = ${bgs[i].naturalHeight}`);
    // let img_css = {}
    // Measuring the background image stylings
    // 1) window's aspect ratio (AR) < image's natural AR -- image height is 100% and confined to viewport, image width is calculated using image height and natural AR and is centered.
    // 2) window's AR >= image's natural AR -- image width is 100% and confined to the viewport. image height is calculated using image width and natural AR and is centered.
    $(bgs[i]).css(
      {
        'width': `${win_ar >= nat_ar ? 100 : windowHeight * nat_ar / windowWidth * 100}%`,
        'margin-left': `${win_ar >= nat_ar ? 0 : (windowWidth - img_w) / 2}px`,
        'height': `${win_ar < nat_ar ? 100 : windowWidth / nat_ar / windowHeight * 100}%`,
        'margin-top': `0`//${win_ar < nat_ar ? 0 : (windowHeight - img_h) / 2}px`
      }
    );
  }
  
  services_pos = $('#gcs-services').offset().top;
  services_height = $('#gcs-services').height();

  about_pos = $('#gcs-about').offset().top;
  team_pos = $('#gcs-team').offset().top;

  project_divs = $('#gcs-portfolio>.container-fluid>.row>div');
  for (let i = 0; i < project_divs.length; i++)
  {
    project_divs[i].dims = {
      pos: $(project_divs[i]).offset().top,
      height:  $(project_divs[i]).height(),
    };
    project_divs[i].visible = false;
    debugPrint(`project_div[${i}] pos + height = ${(project_divs[i].dims.pos + project_divs[i].dims.height)} and visible = ${project_divs[i].visible}`);
  }

  team_divs = $('#gcs-team>.container>.row>div');
  for (let i = 0; i < team_divs.length; i++)
  {
    team_divs[i].dims = {
      pos: $(team_divs[i]).offset().top,
      height:  $(team_divs[i]).height(),
    };
    team_divs[i].visible = false;
    debugPrint(`team_divs[${i}] pos + height = ${(team_divs[i].dims.pos + team_divs[i].dims.height)}`);
  }

  // debugPrint("windowHeight" + windowHeight);
  debugPrint("services_pos" + services_pos);
  debugPrint("services_height" + services_height);
  determineBackground(windowHeight + $(window).scrollTop());
}

$(window).resize(function()
{
  measureElements($(this));

  
});


$('#gcs-navbar a').on('click', function()
{
  let windowScrollTop = $(window).scrollTop();
  let link_id = $(this).attr('href');
  // debugPrint("navbar link clicked! " + link_id);

  // Get the y-position of the div we're clicking for
  let div_pos = $(link_id).offset().top;

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
$(window).scroll(function()
{
  let windowScrollTop = $(this).scrollTop();
  let window_bottom = windowHeight + windowScrollTop;
  debugPrint(`window bottom = ${window_bottom}`);
  // debugPrint('bottom window position = ' + window_bottom);

  // let windowScrollDelta = windowScrollTop - last_windowScrollTop;

  // BG Parallax Scrolling Effect
  // $('#gcs-backgrounds').animate(
  //   {
  //     top: "-=" + (windowScrollDelta * .3) 
  //   },
  //   1
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

  if (!projects_visible)
  {
    for (let i = 0; i <project_divs.length; i++)
    {
      if (window_bottom > project_divs[i].dims.pos + project_divs[i].dims.height)
      {
        project_divs[i].visible = true;
        showSpin($(project_divs[i]).children('.project-panel'));
      }
    }
    let visible_arr = project_divs.filter(function()
    {
      // debugPrint('project_div.visible: ' + project_div.visible);
      return this.visible;
    });
    projects_visible = visible_arr.length == project_divs.length;
  }
  // else
  //   debugPrint("All projects visible!");
  

  if (!team_members_visible)
  {
    for (let i = 0; i < team_divs.length; i++)
    {
      // debugPrint(`team_divs[${i}].visible = ${team_divs[i].visible}`);
      if (window_bottom > team_divs[i].dims.pos + team_divs[i].dims.height)
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
    team_members_visible = team_visible_arr.length == team_divs.length;
    // debugPrint("visible array: " + visible_arr);
  }
  // else
  //   debugPrint("All team members visible!");

  if (!services_visible && (window_bottom > services_pos + (services_height >> 2)))
  {
    // debugPrint("FADE IN!");
    services_visible = true;
    fadeInServices();
  }
  // else
  //   debugPrint("All services visible!");

  // last_windowScrollTop = windowScrollTop;
});

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
      scrollTop: amount - 90 // 90 is height of navbar
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
        transform: `translateY(-${100 * bg_arr_index}vh)`
      }
    );
  }
};
