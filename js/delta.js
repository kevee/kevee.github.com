(function($) {
  $(document).ready(function() {
    $(window).on('resize', function() {
      $('.map.wide').css('width', $(window).width() + 'px');
      $('.map.tall').css('height', $(window).height() + 'px');
      $('.map.short').css('height', ($(window).height() * .8) + 'px')
    });

    var addPopup = function(feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup('<h4>' + feature.properties.name + '</h2>' + feature.properties.popupContent);
      }
    }

    $(window).resize();
    var mapOptions = {
        center: [38.15, -121.658286],
        zoom: 11,
        scrollWheelZoom: false,
        touchZoom: false
    };
    var map = $('.map.delta-overview').get(0);
		var map = L.map(map, mapOptions);
    L.tileLayer.provider('Stamen.Watercolor').addTo(map);
    var historyLayer = L.geoJson().addTo(map);
    $.getJSON('data.json', function(data) {
      L.geoJson(data, {
          onEachFeature: addPopup
      }).addTo(map);
    });
    $.getJSON('mans-harsh-lines.json', function(data) {
      var layer = L.geoJson(data, {
          style : {
            weight : 7,
            color : '#ff0000',
            opacity: 0.8
          }
      });
      layer.addTo(map);
      $('#mans-harsh-lines a').on('click', function(event) {
        event.preventDefault();
        if($(this).is('.concealed')) {
          map.addLayer(layer);
          $(this).removeClass('concealed').text('Conceal the harsh lines of man');
        }
        else {
          map.removeLayer(layer);
          $(this).addClass('concealed').text('Reveal the harsh lines of man');
        }
      })
    });

    $('.route-directions').hide();
    var dayClick = function(event) {
      $('.route-directions').hide();
      $($(this).attr('href')).show();
      event.preventDefault();
      $.each(routeLayers, function() {
        this.setStyle({ color : '#5777c3'});
      });
      routeLayers[$(this).data('route')].setStyle({ color : '#ae3131'});
    };
    var routeMap = $('.map.route').get(0);
    mapOptions.zoom = 10;
    var routeMap = L.map(routeMap, mapOptions);
    L.tileLayer.provider('MapBox.kevee.hkm8c4c1').addTo(routeMap);
    var routeLayers = {};
    $('.route-link').each(function() {
      var $link = $(this);
      $.getJSON($link.data('route') + '.json', function(data) {
        routeLayers[$link.data('route')] = L.geoJson(data, {
            onEachFeature: addPopup,
            style : {
              weight: 5,
              color: '#5777c3',
              opacity: 0.8
            }
        });
        routeMap.addLayer(routeLayers[$link.data('route')]);
        $link.on('click', dayClick);
      });
    });
  });
})(jQuery);
