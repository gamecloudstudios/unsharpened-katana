//document.addEventListener("DOMContentLoaded", function(event)
jQuery(window).load(function()
{
  console.log('Window loaded!');
  measureElements(this);
  checkScroll(this);
  fadeOutLoader($('.preloader-jobs'));
});

var bg_arr = [
  'img/SHOWSTOPPER PAGE_v1.jpg',
  'img/PS_4.jpg',
  'img/GC CLOUD HEADER_v1.jpg'
];
var bg_arr_index = 0;

var windowHeight;
var windowWidth;
// var last_windowScrollTop = 0;
var splash_opacity = 1.0;

var overview_pos = 0;
var overview_height = 0;

var fadein_elems = [];
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
  // var bgs = $('#gcs-backgrounds>.img-container').children('img');
  debugPrint(windowWidth);
  debugPrint(windowHeight);
  // centerBGs(the_window, bgs);
  meme_pos = $('#gcs-jobs-meme').offset().top;
  meme_height = $('#gcs-jobs-meme').height();

  fadein_elems = jQuery.merge($('.fadeout-left'), $('.fadeout-right'));
  fadein_elems = jQuery.merge(fadein_elems, $('.fadeout-up'));
  fadein_elems = jQuery.merge(fadein_elems, $('.fadeout-down'));
  debugPrint(fadein_elems);
  for (var i = 0, length = fadein_elems.length; i < length; i++)
  {
    fadein_elems[i].dims = {
      pos: $(fadein_elems[i]).offset().top,
      height: $(fadein_elems[i]).height(),
    }
    fadein_elems[i].visible = false;
  }

  determineBackground(windowHeight + $(window).scrollTop());
}

$(window).resize(function()
{
  measureElements($(this));
  var bgs = $('#gcs-backgrounds>.img-container').children('img');
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

  // var windowScrollDelta = windowScrollTop - last_windowScrollTop;

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

  if (true)
  {
    for (var i = 0, length = fadein_elems.length; i < length; i++)
    {
      if (!fadein_elems[i].visible && window_bottom > fadein_elems[i].dims.pos + ($(fadein_elems[i]).hasClass('fadein-early') ? fadein_elems[i].dims.height / 8 : fadein_elems[i].dims.height))
      {
        fadein_elems[i].visible = true;
        fadeInDirection($(fadein_elems[i]));
      }
    }
  }
  // last_windowScrollTop = windowScrollTop;
}


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

  debugPrint('meme_pos = ' + meme_pos);
  // var bg_img_elem = $('#gcs-backgrounds>img');

  if (scroll_pos < meme_pos)
  {
    new_bg_arr_index = 0;
  }
  else
  {
    new_bg_arr_index = 1;
  }
  // else if (scroll_pos >= about_pos && scroll_pos < team_pos)
  // {
  //   new_bg_arr_index = 1;
  // }
  // else
  // {
  //   new_bg_arr_index = 2;
  // }

  if (new_bg_arr_index !== bg_arr_index)
  {
    bg_arr_index = new_bg_arr_index;
    $('#gcs-backgrounds').css(
      {
        transform: 'translateY(-' + (100 * bg_arr_index) + 'vh)',
        '-webkit-transform': 'translateY(-' + (100 * bg_arr_index) + 'vh)'
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
