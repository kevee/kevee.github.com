(function($) {

	$(document).ready(function() {
		$('.row h2').sticky();
		$('a.popover-link').popover({
			html : true,
			content : function() {
				return $('#' + $(this).data('contentid')).find('div').first().html();
			},
			trigger : 'hover',
			placement : 'bottom'
		});
	});
})(jQuery);