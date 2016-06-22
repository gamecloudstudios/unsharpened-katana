var DEBUG = true;
var debug_line = 1;

function debugPrint(str)
{
  if (DEBUG)
  {
    let msg = `${debug_line++}: ${str}`;
    $('#debug-info').append($('<p>').append(msg));
    console.log(msg);

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

$(document).ready(function()
{

});

$(window).load(function()
{

});