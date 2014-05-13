(function($) {
  $(document).ready(function() {
    var points = [[36.619122, -121.912891], [36.599804, -121.881752], [36.625020, -121.841371], [36.648381, -121.793758]];
    var pointString = [];
    var startTime = 7;
    var returnTime = 17;
    $(window).on('resize', function() {
      $('.map').css('width', $(window).width() + 'px')
               .css('height', ($(window).height() * .8) + 'px');
      $('#precipitation').attr('width', $(window).width());
    });
    $(window).resize();
    var mapOptions = {
        center: [36.617615, -121.848280],
        zoom: 12,
        scrollWheelZoom: false,
        touchZoom: false
    };
    var map = $('.map').get(0);
    var map = L.map(map, mapOptions);
    L.tileLayer.provider('MapBox.kevee.hkm8c4c1').addTo(map);
    $.each(points, function() {
      pointString.push(this.join(','));
    });
    $('#now').html(moment().format("MMM D, h:mm a"));
    //var ctx = document.getElementById("precipitation").getContext("2d");
    //var chartData = { labels : [], datasets: [] };
    $.getJSON('http://webprojects.csumb.edu/pub/weather.php?points=' + pointString.join('|'), function(data) {
      /*if(!chartData.labels.length) {
        $.each(data, function() {
          $.each(this.data.minutely.data, function() {
            chartData.labels.push(moment.unix(this.time).format('h:mm'));
          });
        });
      }
      $.each(data, function() {
        var pointData = [];
        $.each(this.data.minutely.data, function() {
          pointData.push(this.precipProbability);
        });
        chartData.datasets.push({
          data : pointData
        });
      });
      new Chart(ctx).Line(chartData);*/
      $('#sunrise span').html(moment(data[0].data.daily.data[0].sunriseTime * 1000).format('h:mm'));
      $('#sunset span').html(moment(data[0].data.daily.data[0].sunsetTime * 1000).format('h:mm'));
      $.each(data, function() {
        var marker = L.marker([this.point[0], this.point[1]]).addTo(map);
        console.log(data);
      });
    });
    $.getJSON('path.json', function(data) {
      var layer = L.geoJson(data, {
          style : {
            weight : 7,
            color : '#ff0000',
            opacity: 0.8
          }
      });
      layer.addTo(map);
    });
  });
})(jQuery);
