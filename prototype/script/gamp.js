var gamp = function(event_label)
{
  $.ajax({
    method: 'POST',
    url: 'https://www.google-analytics.com/collect',
    data: {
      v: '1',
      tid: 'UA-86681201-1',
      aip: '1',
      cid: '111',
      ds: 'web',
      t: 'pageview',
      el: event_label
    },
    success: function()
    {
      console.log(`Request for event ${event_label} succeeded!`);
    },
    error: function()
    {
      console.log(`Request for event ${event_label} failed!`);
    }
  });
};