(function($) {

  $(document).ready(function() {
    $('#now').html(moment().format("MMM D"));
    $.getJSON('http://www.spitcast.com/api/county/water-temperature/monterey/', function(data) {
      $('#fahrenheit').html(data.fahrenheit);
      $('#celcius').html(data.celcius);
      $('#wetsuit').html(data.wetsuit);
    });
    $.getJSON('http://api.spitcast.com/api/county/swell/monterey/', function(data) {
      var swellData = {hs: [], tp: []};
      var swellLabels = [];
      $.each(data, function(index, swell) {
        if(swell.hour == '12PM' || swell.hour == '6AM' || swell.hour == '6PM') {
          swellLabels.push(swell.hour);
        }
        else {
          swellLabels.push('');
        }
        swellData.hs.push(swell[0].hs);
        swellData.tp.push(swell[0].tp);
      });
      var chartData = {
        labels : swellLabels,
        datasets : [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : swellData.hs
          },
          {
            fillColor : "rgba(220,220,220,0.5)",
      			strokeColor : "rgba(220,220,220,1)",
      			pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : swellData.tp
          }
        ]
      };
      var options = {
        pointDot: false,
        animation: false
      };
      $('#swell').attr('width', $('#left').width() + 'px');
      var ctx = document.getElementById("swell").getContext("2d");
      var myNewChart = new Chart(ctx).Line(chartData, options);
    });
    $.getJSON('http://api.spitcast.com/api/county/tide/monterey/', function(data) {
      var tideData = [];
      var tideLabels = [];
      $.each(data, function(index, tide) {
        if(tide.hour == '12PM' || tide.hour == '6AM' || tide.hour == '6PM') {
          tideLabels.push(tide.hour);
        }
        else {
          tideLabels.push('');
        }
        tideData.push(tide.tide);
      });
      var chartData = {
      	labels : tideLabels,
      	datasets : [
      		{
      			fillColor : "rgba(151,187,205,0.5)",
      			strokeColor : "rgba(151,187,205,1)",
      			pointColor : "rgba(151,187,205,1)",
      			pointStrokeColor : "#fff",
      			data : tideData
      		}
      	]
      };
      var options = {
        pointDot: false,
        animation: false
      };
      $('#tide').attr('width', $('#left').width() + 'px');
      var ctx = document.getElementById("tide").getContext("2d");
      var myNewChart = new Chart(ctx).Line(chartData, options);
    });
    $.getJSON('http://api.spitcast.com/api/county/wind/monterey/', function(data) {
      var windData = [];
      var windLabels = [];
      $.each(data, function(index, wind) {
        if(wind.hour == '12PM' || wind.hour == '6AM' || wind.hour == '6PM') {
          windLabels.push(wind.hour);
        }
        else {
          windLabels.push('');
        }
        windData.push(wind.speed_mph);
      });
      var chartData = {
        labels : windLabels,
        datasets : [
          {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : windData
          }
        ]
      };
      var options = {
        pointDot: false,
        animation: false
      };
      $('#wind').attr('width', $('#right').width() + 'px');
      var ctx = document.getElementById("wind").getContext("2d");
      var myNewChart = new Chart(ctx).Line(chartData, options);
    });
    $.getJSON('http://www.spitcast.com/api/county/spots/monterey/', function(data) {
      $.each(data, function(index, spot) {
        console.log(spot);
        $('#spots').append('<h2>' + spot.spot_name + '</h2>');
        $.getJSON('http://api.spitcast.com/api/spot/forecast/' + spot.spot_id, function(data) {

        });
      });
    });
  });
})(jQuery);
