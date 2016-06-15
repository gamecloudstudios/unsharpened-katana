function Carousel(_src_arr, _num_visible, _num_slide)
{
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
  /**
   *  Set the DOM array
   * @param _first_visible - Integer representing the index from
   *  src_arr leftmost visible element in the carousel.   
   */ 
  this.setDomArr = function(_first_visible)
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
}

var decrementArrayIndex = function(arr, index)
{
  return (--index >= 0 ? index : arr.length - 1);
}

var incrementArrayIndex = function(arr, index)
{
  return (++index < arr.length ? index : 0);
}