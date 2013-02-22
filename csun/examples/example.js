(function($) {
    $(document).ready(function() {
      
      $(window).on('resize', function() {
        $('.editor, #preview').css('height', $(window).height() / 2 + 'px');
        $('#preview').css('padding-top', (($(window).height() / 2) + 10) + 'px');
        $('#settings').css('top', (($(window).height() / 2)+ 10)  + 'px');
        $('#editor-js').css('margin-left', ($(window).width() / 2) + 'px');
      });
      $(window).trigger('resize');
      
      var htmleditor = ace.edit("editor-html");
      var session = htmleditor.getSession();
      htmleditor.setTheme("ace/theme/tomorrow");
      session.setMode("ace/mode/html");
      htmleditor.setBehavioursEnabled(false);
      htmleditor.renderer.setShowPrintMargin(false);
      session.setUseWrapMode(true);
      session.setWrapLimitRange(null, null);
      htmleditor.renderer.setPrintMarginColumn(80);
      $('#preview .content').html(htmleditor.getValue());
      htmleditor.getSession().on('change', function(e) {
        $('#preview .content').html(htmleditor.getValue());
      });
      
      var jseditor = ace.edit("editor-js");
      var session = jseditor.getSession();
      jseditor.setTheme("ace/theme/tomorrow");
      session.setMode("ace/mode/javascript");
      jseditor.setBehavioursEnabled(false);
      jseditor.renderer.setShowPrintMargin(false);
      session.setUseWrapMode(true);
      session.setWrapLimitRange(null, null);
      jseditor.renderer.setPrintMarginColumn(80);
      
      $('#run').click(function() {
        eval(jseditor.getValue());
      });
      
    });
  })(jQuery);