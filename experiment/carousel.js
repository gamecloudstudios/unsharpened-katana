var carousel;
var client_arr = [
  'img/carousel/client01.png',
  'img/carousel/client02.png',
  'img/carousel/client03.png',
  'img/carousel/client04.png',
  'img/carousel/client05.png',
  'img/carousel/client06.png',
  'img/carousel/client07.png',
  'img/carousel/client08.png',
  'img/carousel/client09.png'
];

$(window).load(function()
{
  carousel = new Carousel('#gcs-clients', client_arr, 3, 2);
  carousel.createCarouselDOM();
  $('.button-back').click(function()
  {
      carousel.slideCarouselBack();
  });
  $('.button-forward').click(function()
  {
    carousel.slideCarouselForward();
  });
});

function Carousel(_host, _src_arr, _num_visible, _num_slide)
{
  var self = this;

  // Array of all elements used in the carousel
  var src_arr = _src_arr;
  // Number of elements that will be visible in the carousel
  var num_visible = _num_visible; 
  // Number of elements that will slide in/out at a time.  Must be <= num_visible
  var num_slide = _num_slide;

  if (num_slide > num_visible)
  {
    console.log("num_slide is larger than num_visible!");
    return;
  }
  // Array of indices from src_arr that represent the elements in the carousel DOM
  var dom_arr = []; 

  var first_visible = 0;

  var auto_slide = true;
  var auto_slide_interval = null;

  var carousel_container_css = {
    position: 'absolute',
    width: '60vw',
    height: '10vw',
    left: '0',          // Used for centering
    right: '0',         // absolutely-positioned
    margin: '0 auto',   // container to the parent.
    clip: 'rect(0, 60vw, 10vw, 0)',
    overflow: 'hidden'
  };

  var carousel_css = {
    width: '100%',
    height: '100%'
  };

  var carousel_left_css = {
    background: 'red',
    position: 'absolute',    
    width: '' + (num_slide / num_visible * 100) + '%',
    height: '100%',
    right: '100%'
  };

  var carousel_middle_css = {
    background: 'green',
    position: 'absolute',    
    width: '100%',
    height: '100%',
  };

  var carousel_right_css = {
    background: 'blue',
    position: 'absolute',    
    width: '' + (num_slide / num_visible * 100) + '%',
    height: '100%',
    left: '100%'
  };

  var carousel_reserve_img_container_css = {
    width: '' + (1.0 / num_slide * 100) + '%',
    height: '100%',
    float: 'left',
    'text-align': 'center'
  };

  var carousel_middle_img_container_css = {
    width: '' + (1.0 / num_visible * 100) + '%',
    height: '100%',
    float: 'left',
    'text-align': 'center'
  };

  this.createCarouselDOM = function()
  { 
    var carousel_container = $('<div>');
    carousel_container.addClass('carousel-container');
    carousel_container.css(carousel_container_css);

    var carousel_div = $('<div>');
    carousel_div.addClass('custom-carousel');
    carousel_div.css(carousel_css);
    carousel_container.append(carousel_div);

    var carousel_left_div = $('<div>');
    carousel_left_div.addClass('carousel-left-queue');
    carousel_left_div.css(carousel_left_css);
    for (let i = 0; i < num_slide; i++)
    {
      let carousel_reserve_img_container = $('<div>');
      carousel_reserve_img_container.addClass('carousel-img');
      carousel_reserve_img_container.css(carousel_reserve_img_container_css);
      carousel_reserve_img_container.append($('<img>'));
      carousel_left_div.append(carousel_reserve_img_container);
    }

    var carousel_middle_div = $('<div>'); 
    carousel_middle_div.addClass('carousel-visible');
    carousel_middle_div.css(carousel_middle_css);
    for (let i = 0; i < num_visible; i++)
    {
      let carousel_middle_img_container = $('<div>');
      carousel_middle_img_container.addClass('carousel-img');
      carousel_middle_img_container.css(carousel_middle_img_container_css);
      carousel_middle_img_container.append($('<img>'));
      carousel_middle_div.append(carousel_middle_img_container);
    }

    var carousel_right_div = $('<div>');
    carousel_right_div.addClass('carousel-right-queue');
    carousel_right_div.css(carousel_right_css);
    for (let i = 0; i < num_slide; i++)
    {
      let carousel_reserve_img_container = $('<div>');
      carousel_reserve_img_container.addClass('carousel-img');
      carousel_reserve_img_container.css(carousel_reserve_img_container_css);
      carousel_reserve_img_container.append($('<img>'));
      carousel_right_div.append(carousel_reserve_img_container);
    }

    carousel_div.append(carousel_left_div, carousel_middle_div, carousel_right_div);

    $(_host).append(carousel_container);
    setCarouselImages(first_visible);
    setCarouselAutoSlide(auto_slide);
  };

  var setCarouselImages = function(_first_visible)
  {
    setDomArr(_first_visible);

    // query for all image elements in the carousel
    let dom_imgs = $('.custom-carousel').find('img');
    let length = dom_imgs.length;
    for (let i = 0; i < length; i++)
    {
      $(dom_imgs[i]).attr('src', src_arr[dom_arr[i]]);
    }
  };

  var setDomArr = function(_first_visible)
  {
    if (dom_arr.length === 0)   
    {
      dom_arr_length = num_slide * 2 + num_visible;
      for (let i = 0; i < dom_arr_length; i++)
      {
        dom_arr.push(-1);
      }
    } 
    setLeftQueue(_first_visible);
    setVisibleSection(_first_visible);
    setRightQueue(dom_arr[num_slide + num_visible - 1]);
  };

  var setLeftQueue = function(_first_visible)
  {
    let curr_src_index = _first_visible;
    for (let i = num_slide - 1; i >= 0; i--)
    {
      curr_src_index = decrementArrayIndex(src_arr, curr_src_index);
      dom_arr[i] = curr_src_index; //src_arr[curr_src_index];
    }
  };

  var setVisibleSection = function(_first_visible)
  {
    let curr_src_index = _first_visible;
    for (let i = num_slide; i < num_slide + num_visible; i++)
    {
      dom_arr[i] = curr_src_index;
      curr_src_index = incrementArrayIndex(src_arr, curr_src_index);
    }
  }

  var setRightQueue = function(_last_visible)
  {
    let curr_src_index = _last_visible;
    for (let i = num_slide + num_visible; i < dom_arr.length; i++)
    {      
      curr_src_index = incrementArrayIndex(src_arr, curr_src_index);
      dom_arr[i] = curr_src_index; //src_arr[curr_src_index];      
    }
  };

  this.slideCarouselBack = function()
  {
    $('.custom-carousel').addClass('left_translate');
    $('.custom-carousel').removeClass('right_translate');

    setTimeout(function()
    {
      first_visible = decrementArrayIndex(src_arr, first_visible, num_slide);
      setCarouselImages(first_visible);
      $('.custom-carousel').removeClass('left_translate');      
    }, 1000);
  };

  this.slideCarouselForward = function()
  {
    $('.custom-carousel').removeClass('left_translate');
    $('.custom-carousel').addClass('right_translate');

    setTimeout(function()
    {
      first_visible = incrementArrayIndex(src_arr, first_visible, num_slide);
      setCarouselImages(first_visible);
      $('.custom-carousel').removeClass('right_translate');  
    }, 1000);
  };

  var setCarouselAutoSlide = function(set_auto)
  {
    if (set_auto)
    {
      auto_slide_interval = setInterval(function()
      {
        self.slideCarouselForward();
      }, 3000);
    }
    else
    {
      clearInterval(auto_slide_interval);
    }
  };
}

var decrementArrayIndex = function(arr, index)
{
  var amount = arguments[2] ? arguments[2] : 1;
  var dest = index - amount;
  return (dest >= 0 ? dest : arr.length + dest);
}

var incrementArrayIndex = function(arr, index)
{
  var amount = arguments[2] ? arguments[2] : 1;
  var dest = index + amount;
  return (dest < arr.length ? dest : dest - arr.length);
}