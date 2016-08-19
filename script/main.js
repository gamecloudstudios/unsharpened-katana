var DEBUG = false;
var debug_line = 1;

function debugPrint(str)
{
  if (DEBUG)
  {
    var msg = debug_line++ + ':' + str;
    $('#debug-info').append($('<p>').append(msg));
    // console.log(msg);

    $('#debug-info').animate(
    {
      scrollTop: '' + $('#debug-info').prop('scrollHeight') + 'px'
    }, 0
    );
  }  
}

$('#debug-toggle').click(function()
{
  DEBUG = !DEBUG;
  $('#debug-info').toggle(DEBUG);
});

document.addEventListener('DOMContentLoaded', function()
{
  $('.section-headline').parent().attr('style',
    'text-align: center'
  );

  if (!DEBUG)
  {
    $('#debug-info').hide();
  }

  $('#gcs-navbar li>button').on('click', function()
  {
    var url_directory = this.textContent;
    var dest = 'http://gamecloudstudios.github.io/unsharpened-katana/prototype/' + url_directory;
    window.location = dest;   
  });
});

$(window).load(function()
{

});