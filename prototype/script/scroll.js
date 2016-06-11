document.addEventListener("DOMContentLoaded", function(event)
{
  measureElements($(window));
});

var windowHeight;
var services_pos, services_height;
var project_divs = [];
var team_divs = [];

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
      height:  $(project_divs[i]).height()
    };
  }

  team_divs = $('#gcs-team>.container>.row>div');
  for (let i = 0; i < team_divs.length; i++)
  {
    team_divs[i].dims = {
      pos: $(team_divs[i]).offset().top,
      height:  $(team_divs[i]).height()
    };
  }

  console.log("windowHeight" + windowHeight);
  console.log("services_pos" + services_pos);
  console.log("services_height" + services_height);
}

$(window).resize(function()
{
  measureElements($(this));
});

$(window).scroll(function()
{
  let windowScrollTop = $(this).scrollTop();
  let window_bottom = windowHeight + windowScrollTop;
  // // console.log('bottom window position = ' + window_bottom);

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
};

var showSpin = function(element)
{
  $(element).addClass("spin-element");
  setTimeout(function()
  {
    // console.log("FULL SIZE!");
    $(element).removeClass("tiny-size");
  }, 690);
}

var growElement = function(element)
{
  $(element).addClass("grow-element");
  setTimeout(function()
  {
    console.log("FULL SIZE!");
    $(element).removeClass("no-size");
  }, 590);
}
