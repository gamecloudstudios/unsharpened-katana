document.addEventListener("DOMContentLoaded", function(event)
{
});

$(window).scroll(function()
{
  let windowHeight = $(this).height();
  let windowScrollTop = $(this).scrollTop();
  let window_bottom = windowHeight + windowScrollTop;
  console.log('bottom window position = ' + window_bottom);

  var services_pos = $('#gcs-services').offset().top;
  var services_height = $('#gcs-services').height();

  if (window_bottom > services_pos + (services_height >> 2))
  {
    console.log("FADE IN!");
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
