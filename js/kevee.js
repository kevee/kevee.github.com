
var kevee = {
	mapCenter : { lat : 53.009826,
				  lon : -98.014526 },
	
	init : function() {
		kevee.moveOppositeCircles();
		kevee.loadMap();
		kevin.loadTmi();
	},
	
	moveOppositeCircles : function() {
		$('.opposite-day').each(function() {
			var multiplier = (Math.random() > .5) ? 1 : -1;
			
			$(this).css('left', (parseInt($(this).css('left').replace('px', '')) + (Math.random() * 200 * multiplier)) + 'px');
			$(this).css('top', (parseInt($(this).css('top').replace('px', '')) + (Math.random() * 200 * multiplier)) + 'px');
		});
	},
	
	loadMap : function() {
		var mapCenter = new google.maps.LatLng(this.getRandom(this.mapCenter.lat), this.getRandom(this.mapCenter.lon));
		var map = new google.maps.Map(document.getElementById("map"), {
		  zoom: 10,
		  center: mapCenter,
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  backgroundColor: $('body').css('background'),
		  disableDefaultUI: true
		});
	},
	
	getRandom : function(val) {
		var multiplier = (Math.random() > .5) ? 1 : -1;
		return val + ((Math.random() * 5) * multiplier);
	},

	loadTmi : function() {
		CSUMBEnergy.apiKey = 'slfjlkvsd097jlkfjlknf03fn3insvkld';
		$('.tmi .value').html(CSUMBEnergy.getPointData('43office') + '&deg;');
	}
	
};

$(document).ready(kevee.init);