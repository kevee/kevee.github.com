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
        center: [38.049685, -121.658286],
        zoom: 12,
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
            weight : 5,
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
    var routeMap = $('.map.route').get(0);
    mapOptions.zoom = 10;
    var routeMap = L.map(routeMap, mapOptions);
    L.tileLayer.provider('MapBox.kevee.hkm8c4c1').addTo(routeMap);
    var routeLayers = {};
    $('.route-link').on('click', function(event) {
      $('.route-directions').hide();
      event.preventDefault();
      if(typeof routeLayers[$(this).data('route')] === 'undefined') {
        $(this).parent('li').addClass('active');
        $.getJSON($(this).data('route') + '.json', function(data) {
          routeLayers[$(this).data('route')] = L.geoJson(data, {
              onEachFeature: addPopup,
              style : {
                weight: 5,
                color: '#5777c3',
                opacity: 0.8
              }
          });
          routeMap.addLayer(routeLayers[$(this).data('route')]);
        });
      }
      else {
        if($(this).parents('.active').length) {
          routeMap.removeLayer(routeLayers[$(this).data('route')]);
          $(this).parents('li').removeClass('active');
        }
        else {
          routeMap.addLayer(routeLayers[$(this).data('route')]);
          $('#' + $(this).data('route')).show();
          $(this).parents('li').addClass('active');
        }
      }
    });
    $('.route-link').first().trigger('click');
  });
})(jQuery);
