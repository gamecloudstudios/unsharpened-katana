//document.addEventListener("DOMContentLoaded", function(event)
$(window).load(function()
{
  measureElements($(window));
});

var windowHeight;
var services_pos, services_height;
var project_divs = [];
var team_divs = [];
var last_windowScrollTop = 0;

/**
 * measureElements
 * Measures the dimensions of numerous elements on the page
 *  and stores those measurements into variables. 
 */
var measureElements = function(the_window)
{
  windowHeight = $(the_window).height();

  services_pos = $('#gcs-services').offset().top;
  services_height = $('#gcs-services').height();

  project_divs = $('#gcs-portfolio>.container>.row>div');
  for (let i = 0; i < project_divs.length; i++)
  {
    project_divs[i].dims = {
      pos: $(project_divs[i]).offset().top,
      height:  $(project_divs[i]).height(),
    };
    console.log(`project_div[${i}] pos + height = ${(project_divs[i].dims.pos + project_divs[i].dims.height)}`);
  }

  team_divs = $('#gcs-team>.container>.row>div');
  for (let i = 0; i < team_divs.length; i++)
  {
    team_divs[i].dims = {
      pos: $(team_divs[i]).offset().top,
      height:  $(team_divs[i]).height(),
    };
    console.log(`team_divs[${i}] pos + height = ${(team_divs[i].dims.pos + team_divs[i].dims.height)}`);
  }

  console.log("windowHeight" + windowHeight);
  console.log("services_pos" + services_pos);
  console.log("services_height" + services_height);
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
  console.log(`window bottom = ${window_bottom}`);
  // // console.log('bottom window position = ' + window_bottom);

  let windowScrollDelta = windowScrollTop - last_windowScrollTop;

  // BG Parallax Scrolling Effect
  // $('#gallery').animate(
  //   {
  //     bottom: "+=" + (windowScrollDelta * .3) 
  //   },
  //   1
  // )

  if (windowScrollTop > 90)
  {
    shrinkNavbar();
  }
  else
  {
    growNavbar();
  }

  for (let i = 0; i <project_divs.length; i++)
  {
    if (window_bottom > project_divs[i].dims.pos + project_divs[i].dims.height)
    {
      showSpin($(project_divs[i]).children('.thumbnail'));
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
    // console.log("FADE IN!");
    fadeInServices();
  }

  last_windowScrollTop = windowScrollTop;
});

var fadeInServices = function()
{
  $('#gcs-services .thumbnail:eq(0)').delay(250).animate(
    {
      opacity: 1
    }, 
    'slow'
  );

  $('#gcs-services .thumbnail:eq(1)').delay(1000).animate(
    {
      opacity: 1
    }, 
    'slow'
  );

  $('#gcs-services .thumbnail:eq(2)').delay(1750).animate(
    {
      opacity: 1
    }, 
    'slow'
  );

  $('#gcs-services .thumbnail:eq(3)').delay(2500).animate(
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
    console.log("FULL SIZE!");
    $(element).removeClass("no-size");
  }, 590);
};

var shrinkNavbar = function()
{
  // setTimeout(function()
  // {
  //   $('.navbar').removeClass("original-navbar");
  //   $('.navbar').addClass("shrunken-navbar");
  // }, 595);
  // $('.navbar').addClass("shrink-navbar");
  // $('.navbar-brand>img').addClass("shrink-brand");
};

var growNavbar = function()
{
  // setTimeout(function()
  // {
  //   $('.navbar').addClass("original-navbar");
  //   $('.navbar').removeClass("shrunken-navbar");
  // }, 595);
  // $('.navbar').removeClass("shrink-navbar");
  // $('.navbar').addClass("grow-navbar");
  // $('.navbar-brand>img').removeClass("shrink-brand");
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
