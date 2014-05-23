(function($) {

  $(document).ready(function() {
    $('#now').html(moment().format("MMM D"));
    $.getJSON('http://www.spitcast.com/api/county/water-temperature/monterey/', function(data) {
      $('#fahrenheit').html(data.fahrenheit);
      $('#celcius').html(data.celcius);
      $('#wetsuit').html(data.wetsuit);
    });
    $.getJSON('http://webprojects.csumb.edu/pub/weather.php?points=36.619122,-121.912891', function(data) {
      var weather = data[0].data;
      console.log(weather);
      if(typeof weather.alerts !== 'undefined' && weather.alerts.length) {
        $.each(weather.alerts, function(index, alert) {
          $('#weather-alerts').append('<div class="container"><div class="alert alert-error">' + alert.description + '</div></div>');
        });
      }
      $('#weather').append('<h3 style="font-size: 4em;">' + Math.round(weather.daily.data[0].apparentTemperatureMin) + '&deg; &mdash; ' + Math.round(weather.daily.data[0].apparentTemperatureMax) + '&deg;</h3>');
      $('#weather').append('<p class="lead">' + weather.daily.data[0].summary + '</p>');
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
            fillColor : "rgba(70, 191, 189, 0.5)",
            strokeColor : "rgba(70, 191, 189, 1)",
            pointColor : "rgba(70, 191, 189, 1)",
            pointStrokeColor : "#fff",
            data : swellData.hs
          },
          {
            fillColor : "rgba(253, 180, 92,0.5)",
      			strokeColor : "rgba(253, 180, 92, 1)",
      			pointColor : "rgba(253, 180, 92, 1)",
            pointStrokeColor : "#fff",
            data : swellData.tp
          }
        ]
      };
      var options = {
        pointDot: false,
        animation: false,
        scaleOverlay: true
      };
      $('#swell').attr('width', $(window).width() + 'px');
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
      			fillColor : "rgba(243, 62, 111, 0.5)",
      			strokeColor : "rgba(243, 62, 111, 1)",
      			pointColor : "rgba(151,187,205,1)",
      			pointStrokeColor : "#fff",
      			data : tideData
      		}
      	]
      };
      var options = {
        pointDot: false,
        animation: false,
        scaleOverlay: true
      };
      $('#tide').attr('width', $(window).width() + 'px');
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
            fillColor : "rgba(70, 191, 189,0.5)",
            strokeColor : "rgba(70, 191, 189,1)",
            pointColor : "rgba(70, 191, 189,1)",
            pointStrokeColor : "#fff",
            data : windData
          }
        ]
      };
      var options = {
        pointDot: false,
        animation: false,
        scaleOverlay: true
      };
      $('#wind').attr('width', $(window).width() + 'px');
      var ctx = document.getElementById("wind").getContext("2d");
      var myNewChart = new Chart(ctx).Line(chartData, options);
    });
    $.getJSON('http://www.spitcast.com/api/county/spots/monterey/', function(data) {
      $.each(data, function(index, spot) {
        $.getJSON('http://webprojects.csumb.edu/pub/surf.php?spot=' + spot.spot_id, function(data) {
          var $deets = $('<a href="#" class="btn btn-primary pull-right slider" data-spot="' + spot.spot_id + '">Details</a>');
          $('#spots').append('<h2>' + spot.spot_name + '</h2>');
          $('#spots').append($deets);
          $deets.on('click', function(event) {
            event.preventDefault();
            $('#deets-' + $(this).data('spot')).slideToggle();
          });
          var spotData = [];
          var spotLabels = [];
          var $list = $('<ul class="unstyled" id="deets-' + spot.spot_id + '">');
          $.each(data, function(index, spot) {
            if(spot.hour.toLowerCase() == moment().format('ha')) {
              $('#spots').append('<p class="lead"><strong>Currently: </strong>' + spot.shape_full + '</p>');
            }
            $list.append('<li><strong>' + spot.hour + ':</strong> Swell: ' + spot.shape_detail.swell + ' Tide: ' + spot.shape_detail.tide + ' Wind: ' + spot.shape_detail.wind +'</li>');
            if(spot.hour == '12PM' || spot.hour == '6AM' || spot.hour == '6PM') {
              spotLabels.push(spot.hour);
            }
            else {
              spotLabels.push('');
            }
            spotData.push(spot.size_ft);
          });
          var chartData = {
            labels : spotLabels,
            datasets : [
              {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : spotData
              }
            ]
          };
          var options = {
            pointDot: false,
            animation: false,
            scaleOverlay: true
          };
          var $canvas = $('<canvas height="200"/>');
          $canvas.attr('width', $(window).width() + 'px');
          $('#spots').append($list);
          $list.hide();
          $('#spots').append($canvas);
          var ctx = $canvas.get(0).getContext("2d");
          var myNewChart = new Chart(ctx).Line(chartData, options);

        });
      });
    });
  });
})(jQuery);
