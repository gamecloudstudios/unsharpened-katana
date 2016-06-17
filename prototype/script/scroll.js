//document.addEventListener("DOMContentLoaded", function(event)
$(window).load(function()
{
  measureElements($(window));
});

var windowHeight;
var windowWidth;
var services_pos, services_height;
var project_divs = [];
var team_divs = [];
var last_windowScrollTop = 0;
var splash_opacity = 1.0;

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
  let bgs = $('#gcs-backgrounds').children('img');
  // console.log(windowWidth);
  // console.log(windowHeight);
  let length = bgs.length;
  for (let i = 0; i < length; i++)
  {
    let img_w = bgs[i].clientWidth;
    console.log((windowWidth - img_w) / 2);
    // let img_css = {}
    $(bgs[i]).css(
      {
        'margin-left': '' + (img_w <= windowWidth ? 0 : (windowWidth - img_w) / 2) + 'px'
      }
    );
  }
  
  services_pos = $('#gcs-services').offset().top;
  services_height = $('#gcs-services').height();

  project_divs = $('#gcs-portfolio>.container-fluid>.row>div');
  for (let i = 0; i < project_divs.length; i++)
  {
    project_divs[i].dims = {
      pos: $(project_divs[i]).offset().top,
      height:  $(project_divs[i]).height(),
    };
    // console.log(`project_div[${i}] pos + height = ${(project_divs[i].dims.pos + project_divs[i].dims.height)}`);
  }

  team_divs = $('#gcs-team>.container>.row>div');
  for (let i = 0; i < team_divs.length; i++)
  {
    team_divs[i].dims = {
      pos: $(team_divs[i]).offset().top,
      height:  $(team_divs[i]).height(),
    };
    // console.log(`team_divs[${i}] pos + height = ${(team_divs[i].dims.pos + team_divs[i].dims.height)}`);
  }

  // console.log("windowHeight" + windowHeight);
  // console.log("services_pos" + services_pos);
  // console.log("services_height" + services_height);
}

$(window).resize(function()
{
  measureElements($(this));

  
});


$('#gcs-navbar a').on('click', function()
{
  let windowScrollTop = $(window).scrollTop();
  let link_id = $(this).attr('href');
  // console.log("navbar link clicked! " + link_id);

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
  // console.log(`window bottom = ${window_bottom}`);
  // console.log('bottom window position = ' + window_bottom);

  let windowScrollDelta = windowScrollTop - last_windowScrollTop;

  // BG Parallax Scrolling Effect
  $('#gcs-backgrounds').animate(
    {
      top: "-=" + (windowScrollDelta * .5) 
    },
    1
  );
  // console.log('PARALLAX!!!!');

  // Transforming the menu navbar
  windowScrollTop > windowHeight * .75 ? $('.navbar').addClass('shrunken-navbar') : $('.navbar').removeClass('shrunken-navbar');

  // Fading away the contents in the splash section
  splash_opacity = (windowHeight - windowScrollTop) / windowHeight;
  // console.log('splash_opacity = ' + splash_opacity);
  if (splash_opacity >= 0)
  {
    $('#gcs-splash>.container').show();
    $('#gcs-splash>.container').fadeTo(1, splash_opacity,"linear");
  }
  else
  {
    $('#gcs-splash>.container').hide();
  }

  for (let i = 0; i <project_divs.length; i++)
  {
    if (window_bottom > project_divs[i].dims.pos + project_divs[i].dims.height)
    {
      showSpin($(project_divs[i]).children('.project-panel'));
    }
  }

  for (let i = 0; i <team_divs.length; i++)
  {
    if (window_bottom > team_divs[i].dims.pos + team_divs[i].dims.height)
    {
      growElement($(team_divs[i]).children('.team-panel'));
    }
  }

  if (window_bottom > services_pos + (services_height >> 2))
  {
    console.log("FADE IN!");
    fadeInServices();
  }

  last_windowScrollTop = windowScrollTop;
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
    // console.log("FULL SIZE!");
    $(element).removeClass("tiny-size");
  }, 690);
};

var growElement = function(element)
{
  $(element).addClass("grow-element");
  setTimeout(function()
  {
    // console.log("FULL SIZE!");
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