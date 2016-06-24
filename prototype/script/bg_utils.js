window.addEventListener('load', function()
{
  var bgs = $('#gcs-backgrounds>.img-container').children('img');
  centerBGs(window, bgs);
});

$(window).resize(function()
{
  debugPrint('WINDOW RESIZING!!!');
  var bgs = $('#gcs-backgrounds>.img-container').children('img');
  centerBGs(window, bgs);
});

function centerBGs(the_window, bg_arr)
{
  var windowHeight = $(the_window).height();
  var windowWidth = $(the_window).width();

  var length = bg_arr.length;
  for (var i = 0; i < length; i++)
  {
    // if (!bgs_initialized)
    var img_w = bg_arr[i].clientWidth;
    var img_h = bg_arr[i].clientHeight;
    // var img_ar = img_w / img_h;
    var nat_ar = bg_arr[i].naturalWidth / bg_arr[i].naturalHeight;
    var win_ar = windowWidth / windowHeight;
    

    // measured_bgs_natural_wh = true;
    // debugPrint((windowWidth - img_w) / 2);
    // if (i == 0)
      // debugPrint(`IMAGE[${i}]: img_w = ${img_w}, img_h = ${img_h}, nat_w = ${bgs[i].naturalWidth}, nat_h = ${bgs[i].naturalHeight}`);
    // var img_css = {}
    // Measuring the background image stylings
    // 1) window's aspect ratio (AR) < image's natural AR -- image height is 100% and confined to viewport, image width is calculated using image height and natural AR and is centered.
    // 2) window's AR >= image's natural AR -- image width is 100% and confined to the viewport. image height is calculated using image width and natural AR and is centered.
    $(bg_arr[i]).css(
      {
        'width': (win_ar >= nat_ar ? 100 : windowHeight * nat_ar / windowWidth * 100) + '%',
        'margin-left': (win_ar >= nat_ar ? 0 : (windowWidth - img_w) / 2) + 'px',
        'height': (win_ar < nat_ar ? 100 : windowWidth / nat_ar / windowHeight * 100) + '%',
        'margin-top': '0'//${win_ar < nat_ar ? 0 : (windowHeight - img_h) / 2}px`
      }
    );
  }
}