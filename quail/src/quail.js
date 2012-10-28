/*
 * QUAIL Accessibility Information Library - jQuery Plugin
 * Powerful accessibility checking with jQuery
 *
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {

  $.fn.quail = function(options) {
    if (!this.length) {
      return this;
    }
    quail.options = options;

    quail.html = this;
    quail.run();
    if(quail.options.getRawResults) {
      return quail.getRawResults();
    }
    
    return this;
  };

  var quail = {
    
    options : { },
    
    testCallbacks : { 
      'placeholder'    : 'placeholderTest',
      'label'          : 'labelTest',
      'header'         : 'headerOrderTest',
      'event'          : 'scriptEventTest',
      'labelProximity' : 'labelProximityTest',
      'color'          : 'colorTest'
    },
    
    run : function() {
      if(quail.options.reset) {
        quail.accessibilityResults = { };
      }
      if(typeof quail.options.accessibilityTests !== 'undefined') {
        quail.accessibilityTests = quail.options.accessibilityTests;
      }
      else {
        $.ajax({ url : quail.options.jsonPath + '/tests.json',
                 async : false,
                 dataType : 'json',
                 success : function(data) {
                    if(typeof data === 'object') {
                      quail.accessibilityTests = data;
                    }
                }});
      }
      quail.runTests();
    },
    
    testFails : function(testName, $element, options) {
      options = options || {};
      
      quail.accessibilityResults[testName].push($element);
      if(typeof quail.options.callback !== 'undefined') {
        var severity = (typeof quail.accessibilityTests[testName].severity !== 'undefined') ?
                       quail.accessibilityTests[testName].severity :
                       'unknown';
        quail.options.callback({element : $element,
                               testName : testName,
                               severity : severity,
                               options  : options
                               });
      }
    },

    runTests : function() {
      $.each(quail.options.guideline, function(index, testName) {
        var testType = quail.accessibilityTests[testName].type;
        if(typeof quail.accessibilityResults[testName] === 'undefined') {
          quail.accessibilityResults[testName] = [ ];
        }
        if(testType === 'selector') {
          quail.html.find(quail.accessibilityTests[testName].selector).each(function() {
            quail.testFails(testName, $(this));
          });
        }
        if(testType === 'custom') {
          if(typeof quail[quail.accessibilityTests[testName].callback] !== 'undefined') {
            quail[quail.accessibilityTests[testName].callback]();
          }
        }
        if(typeof quail[quail.testCallbacks[testType]] !== 'undefined') {
          quail[quail.testCallbacks[testType]](testName, quail.accessibilityTests[testName]);
        }
      });
    },

    isUnreadable : function(text) {
      if(typeof text !== 'string') {
        return true;
      }
      return (text.trim().length) ? false : true;
    },

    isDataTable : function(table) {
      return (table.find('th').length && table.find('tr').length > 2) ? true : false;
    },

    getRawResults : function(testName) {
      if(testName) {
        return quail.accessibilityResults[testName];
      }
      return quail.accessibilityResults;
    },

    html : { },

    strings : { },

    accessibilityResults : { },

    accessibilityTests : { },

    loadTests : function() {

    },

    validURL : function(url) {
      return (url.search(' ') === -1) ? true : false;
    },

    loadString : function(stringFile) {
      if(typeof quail.strings[stringFile] !== 'undefined') {
        return quail.strings[stringFile];
      }
      $.ajax({ url : quail.options.jsonPath + '/strings/' + stringFile + '.json',
               async: false,
               dataType : 'json',
               success : function(data) {
                quail.strings[stringFile] = data;
               }});
      return quail.strings[stringFile];
    },
    
    cleanString : function(string) {
      return string.toLowerCase().replace(/^\s\s*/, '');
    },
    
    loadHasEventListener : function() {
      $.ajax({url : quail.options.jsonPath + '/../jquery/jquery.hasEventListener/jQuery.hasEventListener-2.0.3.min.js',
              async : false,
              dataType : 'script'
            });
    },

    placeholderTest : function(testName, options) {
      quail.loadString('placeholders');
      quail.html.find(options.selector).each(function() {
        var text;
        if(typeof options.attribute !== 'undefined') {
          if(typeof $(this).attr(options.attribute) === 'undefined' || 
                (options.attribute === 'tabindex' &&
                  !$(this).attr(options.attribute)
                )
             ) {
            quail.testFails(testName, $(this));
            return;
          }
          text = $(this).attr(options.attribute);
        }
        else {
          text = $(this).text();
        }
        if(typeof text === 'string') {
          text = quail.cleanString(text);
          var regex = /^([0-9]*)(k|kb|mb|k bytes|k byte)$/g;
          var regexResults = regex.exec(text.toLowerCase());
          if(regexResults && regexResults[0].length) {
            quail.testFails(testName, $(this));
          }
          else {
            if(options.empty && quail.isUnreadable(text)) {
              quail.testFails(testName, $(this));
            }
            else {
              if(quail.strings.placeholders.indexOf(text) > -1 ) {
                quail.testFails(testName, $(this));
              }
            }
          }
        }
        else {
          if(options.empty && typeof text !== 'number') {
            quail.testFails(testName, $(this));
          }
        }
      });
    },

    labelProximityTest : function(testName, options) {
        quail.html.find(options.selector).each(function() {
          var $label = quail.html.find('label[for=' + $(this).attr('id') + ']').first();
          if(!$label.length) {
            quail.testFails(testName, $(this));
          }
          if(!$(this).parent().is($label.parent())) {
            quail.testFails(testName, $(this));
          }
        });
    },
    
    textStatistics : {
      
      cleanText : function(text) {
        return text.replace(/[,:;()\-]/, ' ')
                   .replace(/[\.!?]/, '.')
                   .replace(/[ ]*(\n|\r\n|\r)[ ]*/, ' ')
                   .replace(/([\.])[\. ]+/, '$1')
                   .replace(/[ ]*([\.])/, '$1')
                   .replace(/[ ]+/, ' ')
                   .toLowerCase();
                   
      },
      
      sentenceCount : function(text) {
        var copy = text;
        return copy.split('.').length + 1;
      },
      
      wordCount : function(text) {
        var copy = text;
        return copy.split(' ').length + 1;
      },
      
      averageWordsPerSentence : function(text) {
        return quail.textStatistics.wordCount(text) / quail.textStatistics.sentenceCount(text);
      },
      
      averageSyllablesPerWord : function(text) {
        var count = 0;
        var wordCount = quail.textStatistics.wordCount(text);
        if(!wordCount) {
          return 0;
        }
        $.each(text.split(' '), function(index, word) {
          count += quail.textStatistics.syllableCount(word);
        });
        return count / wordCount;
      },
      
      syllableCount : function(word) {
        var matchedWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                              .match(/[aeiouy]{1,2}/g);
        if(!matchedWord || matchedWord.length === 0) {
          return 1;
        }
        return matchedWord.length;
      }
    },
    
    colorTest : function(testName, options) {
      if(options.bodyForegroundAttribute && options.bodyBackgroundAttribute) {
        var $body = quail.html.find('body').clone(false, false);
        var foreground = $body.attr(options.bodyForegroundAttribute);
        var background = $body.attr(options.bodyBackgroundAttribute);
        if(typeof foreground === 'undefined') {
          foreground = 'rgb(0,0,0)';
        }
        if(typeof background === 'undefined') {
          foreground =  'rgb(255,255,255)';
        }
        $body.css('color', foreground);
        $body.css('background-color', background);
        if((options.algorithm === 'wcag' && !quail.colors.passesWCAG($body)) ||
           (options.algorithm === 'wai' && !quail.colors.passesWAI($body))) {
           quail.testFails(testName, $body);  
        }
      }
      quail.html.find(options.selector).find('*').each(function() {
        if((options.algorithm === 'wcag' && !quail.colors.passesWCAG($(this))) ||
           (options.algorithm === 'wai' && !quail.colors.passesWAI($(this)))) {
           quail.testFails(testName, $(this));
        }
      });
    },

    scriptEventTest : function(testName, options) {
      if(typeof jQuery.hasEventListener === 'undefined') {
        quail.loadHasEventListener();
      }
      var $items = (typeof options.selector === 'undefined') ?
                    quail.html.find('body').find('*') :
                    quail.html.find(options.selector);
      $items.each(function() {
        var $element = $(this).get(0);
        if($(this).attr(options.searchEvent)) {
          if(typeof options.correspondingEvent === 'undefined' ||
             !$(this).attr(options.correspondingEvent)) {
            quail.testFails(testName, $(this));
          }
        }
        else {
          if($.hasEventListener($element, options.searchEvent.replace('on', '')) && 
             (typeof options.correspondingEvent === 'undefined' ||
             !$.hasEventListener($element, options.correspondingEvent.replace('on', '')))) {
            quail.testFails(testName, $(this));
          }
        }
      });
    },

    labelTest : function(testName, options) {
      quail.html.find(options.selector).each(function() {
        if(!$(this).parent('label').length &&
          !quail.html.find('label[for=' + $(this).attr('id') + ']').length) {
            quail.testFails(testName, $(this));
        }
      });
    },
    
    containsReadableText : function(element, children) {
      if(!quail.isUnreadable(element.text())) {
        return true;
      }
      if(!quail.isUnreadable(element.attr('alt'))) {
        return true;
      }
      if(children) {
        var readable = false;
        element.find('*').each(function() {
          if(quail.containsReadableText($(this), true)) {
            readable = true;
          }
        });
        if(readable) {
          return true;
        }
      }
      return false;
    },
    
    headerOrderTest : function(testName, options) {
      var current = parseInt(options.selector.substr(-1, 1), 10);
      var nextHeading = false;
      quail.html.find('h1, h2, h3, h4, h5, h6').each(function() {
        var number = parseInt($(this).get(0).tagName.substr(-1, 1), 10);
        if(nextHeading && (number - 1 > current || number + 1 < current)) {
          quail.testFails(testName, $(this));
        }
        if(number === current) {
          nextHeading = $(this);
        }
        if(nextHeading && number !== current) {
          nextHeading = false;
        }
      });
    },
    
    acronymTest : function(testName, acronymTag) {
      var predefined = { };
      var alreadyReported = { };
      quail.html.find(acronymTag + '[title]').each(function() {
        predefined[$(this).text().toUpperCase()] = $(this).attr('title');
      });
      quail.html.find('p, div, h1, h2, h3, h4, h5').each(function(){
        var $el = $(this);
        var words = $(this).text().split(' ');
        if(words.length > 1 && $(this).text().toUpperCase() !== $(this).text()) {
          $.each(words, function(index, word) {
            word = word.replace(/[^a-zA-Zs]/, '');
            if(word.toUpperCase() === word &&
               word.length > 1 &&
               typeof predefined[word.toUpperCase()] === 'undefined') {
              if(typeof alreadyReported[word.toUpperCase()] === 'undefined') {
                quail.testFails(testName, $el, {acronym : word.toUpperCase()});
              }
              alreadyReported[word.toUpperCase()] = word;
            }
          });
        }
      });
    },
    
    aAdjacentWithSameResourceShouldBeCombined : function() {
      quail.html.find('a').each(function() {
        if($(this).next('a').attr('href') === $(this).attr('href')) {
          quail.testFails('aAdjacentWithSameResourceShouldBeCombined', $(this));
        }
      });
    },
    
    aImgAltNotRepetative : function() {
      quail.html.find('a img[alt]').each(function() {
        if(quail.cleanString($(this).attr('alt')) === quail.cleanString($(this).parent('a').text())) {
          quail.testFails('aImgAltNotRepetative', $(this).parent('a'));
        }
      });
    },

    aLinksAreSeperatedByPrintableCharacters : function() {
      quail.html.find('a').each(function() {
        if($(this).next('a').length && quail.isUnreadable($(this).get(0).nextSibling.wholeText)) {
          quail.testFails('aLinksAreSeperatedByPrintableCharacters', $(this));
        }
      });
    },
    
    aLinkTextDoesNotBeginWithRedundantWord : function() {
      var redundant = quail.loadString('redundant');
      quail.html.find('a').each(function() {
        var $link = $(this);
        var text = '';
        if($(this).find('img[alt]').length) {
          text = text + $(this).find('img[alt]:first').attr('alt');
        }
        text = text + $(this).text();
        text = text.toLowerCase();
        $.each(redundant.link, function(index, phrase) {
          if(text.search(phrase) > -1) {
            quail.testFails('aLinkTextDoesNotBeginWithRedundantWord', $link);
          }
        });
      });
    },
    
    aMustContainText : function() {
      quail.html.find('a').each(function() {
        if(!quail.containsReadableText($(this), true) && !($(this).attr('name') && !$(this).attr('href'))) {
          quail.testFails('aMustContainText', $(this));
        }
      }); 
    },
    
    aSuspiciousLinkText : function() {
      var suspiciousText = quail.loadString('suspicious_links');
      quail.html.find('a').each(function() {
        if(suspiciousText.indexOf(quail.cleanString($(this).text())) > -1) {
          quail.testFails('aSuspiciousLinkText', $(this));
        }
      });
    },
    
    blockquoteUseForQuotations : function() {
      quail.html.find('p').each(function() {
        if($(this).text().substr(0, 1).search(/[\'\"]/) > -1 &&
           $(this).text().substr(-1, 1).search(/[\'\"]/) > -1) {
          quail.testFails('blockquoteUseForQuotations', $(this));
        }
      });
    },

    documentAcronymsHaveElement : function() {
      quail.acronymTest('documentAcronymsHaveElement', 'acronym');
    },

    documentAbbrIsUsed : function() {
      quail.acronymTest('documentAbbrIsUsed', 'abbr');
    },
    
    documentVisualListsAreMarkedUp : function() {
      var listQueues = [/\*/g, '<br>*', '&bull;', '&#8226'];
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        $.each(listQueues, function(index, item) {
          if($element.text().split(item).length > 2) {
            quail.testFails('documentVisualListsAreMarkedUp', $element);
          }
        });
      });
    },
    
    documentValidatesToDocType : function() {
      if(typeof document.doctype === 'undefined') {
        return;
      }
    },
    
    documentIDsMustBeUnique : function() {
      var ids = [];
      quail.html.find('*[id]').each(function() {
        if(ids.indexOf($(this).attr('id')) >= 0) {
          quail.testFails('documentIDsMustBeUnique', $(this));
        }
        ids.push($(this).attr('id'));
      });
    },
    
    documentLangIsISO639Standard : function() {
      var languages = quail.loadString('language_codes');
      var language = quail.html.find('html').attr('lang');
      if(!language) {
        return;
      }
      if(languages.indexOf(language) === -1) {
          quail.testFails('documentLangIsISO639Standard', quail.html.find('html'));
      }
    },
    
    doctypeProvided : function() {
      if(!document.doctype) {
        quail.testFails('doctypeProvided', quail.html.find('html'));
      }
    },

    appletContainsTextEquivalent : function() {
      quail.html.find('applet[alt=], applet:not(applet[alt])').each(function() {
        if(quail.isUnreadable($(this).text())) {
          quail.testFails('appletContainsTextEquivalent', $(this));
        }
      });
    },
    
    documentStrictDocType : function() {
      if(typeof document.doctype === 'undefined' || 
         !document.doctype ||
         document.doctype.systemId.indexOf('strict') === -1) {
        quail.testFails('documentStrictDocType', quail.html.find('html'));
      }
    },

    embedHasAssociatedNoEmbed : function() {
      if(quail.html.find('noembed').length) {
        return;
      }
      quail.html.find('embed').each(function() {
        quail.testFails('embedHasAssociatedNoEmbed', $(this));
      });
    },
    
    emoticonsExcessiveUse : function() {
      var emoticons = quail.loadString('emoticons');
      var count = 0;
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        $.each($element.text().split(' '), function(index, word) {
          if(emoticons.indexOf(word) > -1) {
            count++;
          }
          if(count > 4) {
            return;
          }
        });
        if(count > 4) {
          quail.testFails('emoticonsExcessiveUse', $element);
        }
      });
    },
    
    emoticonsMissingAbbr : function() {
      var emoticons = quail.loadString('emoticons');
      quail.html.find('p, div, h1, h2, h3, h4, h5, h6').each(function() {
        var $element = $(this);
        var $clone = $element.clone();
        $clone.find('abbr, acronym').each(function() {
          $(this).remove();
        });
        $.each($clone.text().split(' '), function(index, word) {
          if(emoticons.indexOf(word) > -1) {
            quail.testFails('emoticonsMissingAbbr', $element);
          }
        });
      });
    },
    
    formWithRequiredLabel : function() {
       var redundant = quail.loadString('redundant');
       var labels = [];
       var lastStyle, currentStyle = false;
       redundant.required[redundant.required.indexOf('*')] = /\*/g;
       quail.html.find('label').each(function() {
         var text = $(this).text().toLowerCase();
         var $label = $(this);
         $.each(redundant.required, function(index, word) {
           if(text.search(word) >= 0 && !quail.html.find('#' + $label.attr('for')).attr('aria-required')) {
             quail.testFails('formWithRequiredLabel', $label);
           }
         });
         currentStyle = $label.css('color') + $label.css('font-weight') + $label.css('background-color');
         if(lastStyle && currentStyle !== lastStyle) {
           quail.testFails('formWithRequiredLabel', $label);
         }
         lastStyle = currentStyle;
       });
    },
    
    headersUseToMarkSections : function() {
      quail.html.find('p').each(function() {
        var set = false;
        var $paragraph = $(this);
        $paragraph.find('strong:first, em:first, i:first, b:first').each(function() {
          if($paragraph.text() === $(this).text()) {
            quail.testFails('headersUseToMarkSections', $paragraph);
          }
        });
      });
    },

    imgAltIsDifferent : function() {
      quail.html.find('img[alt][src]').each(function() {
        if($(this).attr('src') === $(this).attr('alt')) {
          quail.testFails('imgAltIsDifferent', $(this));
        }
      });
    },

    imgAltIsTooLong : function() {
      quail.html.find('img[alt]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.testFails('imgAltIsTooLong', $(this));
        }
      });
    },
    
    inputCheckboxRequiresFieldset : function() {
      quail.html.find(':checkbox').each(function() {
        if(!$(this).parents('fieldset').length) {
          quail.testFails('inputCheckboxRequiresFieldset', $(this));
        }
      });
    },

    inputImageAltIsNotFileName : function() {
      quail.html.find('input[type=image][alt]').each(function() {
        if($(this).attr('src') === $(this).attr('alt')) {
          quail.testFails('inputImageAltIsNotFileName', $(this));
        }
      });
    },

    inputImageAltIsShort : function() {
      quail.html.find('input[type=image]').each(function() {
        if($(this).attr('alt').length > 100) {
          quail.testFails('inputImageAltIsShort', $(this));
        }
      });
    },
    
    inputImageAltNotRedundant : function() {
      var redundant = quail.loadString('redundant');
      quail.html.find('input[type=image][alt]').each(function() {
        if(redundant.inputImage.indexOf(quail.cleanString($(this).attr('alt'))) > -1) {
          quail.testFails('inputImageAltNotRedundant', $(this));
        }
      });
    },

    imgImportantNoSpacerAlt : function() {
      quail.html.find('img[alt]').each(function() {
        var width = ($(this).width()) ? $(this).width() : parseInt($(this).attr('width'), 10);
        var height = ($(this).height()) ? $(this).height() : parseInt($(this).attr('height'), 10);
        if(quail.isUnreadable($(this).attr('alt').trim()) &&
           $(this).attr('alt').length > 0 && 
           width > 50 &&
           height > 50) {
            quail.testFails('imgImportantNoSpacerAlt', $(this));
        }
      });
    },

    imgAltNotEmptyInAnchor : function() {
      quail.html.find('a img').each(function() {
        if(quail.isUnreadable($(this).attr('alt')) &&
           quail.isUnreadable($(this).parent('a:first').text())) {
              quail.testFails('imgAltNotEmptyInAnchor', $(this));
        }
      });
    },

    imgHasLongDesc : function() {
      quail.html.find('img[longdesc]').each(function() {
        if($(this).attr('longdesc') === $(this).attr('alt') ||
           !quail.validURL($(this).attr('longdesc'))) {
            quail.testFails('imgHasLongDesc', $(this));
        }
      });
    },

    imgMapAreasHaveDuplicateLink : function() {
      var links = { };
      quail.html.find('a').each(function() {
        links[$(this).attr('href')] = $(this).attr('href');
      });
      quail.html.find('img[usemap]').each(function() {
        var $image = $(this);
        var $map = quail.html.find($image.attr('usemap'));
        if(!$map.length) {
          $map = quail.html.find('map[name="' + $image.attr('usemap').replace('#', '') + '"]');
        }
        if($map.length) {
          $map.find('area').each(function() {
            if(typeof links[$(this).attr('href')] === 'undefined') {
              quail.testFails('imgMapAreasHaveDuplicateLink', $image);
            }
          });
        }
      });
    },

    imgGifNoFlicker : function() {
      quail.html.find('img[src$=".gif"]').each(function() {
        var $image = $(this);
        $.ajax({url      : $image.attr('src'),
                async    : false,
                dataType : 'text',
                success  : function(data) {
                  if(data.search('NETSCAPE2.0') !== -1) {
                    quail.testFails('imgGifNoFlicker', $image);
                  }
        }});
      });
    },
    
    imgWithMathShouldHaveMathEquivalent : function() {
      quail.html.find('img:not(img:has(math), img:has(tagName))').each(function() {
        if(!$(this).parent().find('math').length) {
          quail.testFails('imgWithMathShouldHaveMathEquivalent', $(this));
        }
      });
    },
    
    labelMustBeUnique : function() {
      var labels = { };
      quail.html.find('label[for]').each(function() {
        if(typeof labels[$(this).attr('for')] !== 'undefined') {
          quail.testFails('labelMustBeUnique', $(this));
        }
        labels[$(this).attr('for')] = $(this).attr('for');
      });
    },
    
    listNotUsedForFormatting : function() {
      quail.html.find('ol, ul').each(function() {
        if($(this).find('li').length < 2) {
          quail.testFails('listNotUsedForFormatting', $(this));
        }
      });
    },
    
    paragarphIsWrittenClearly : function() {
      quail.html.find('p').each(function() {
        var text = quail.textStatistics.cleanText($(this).text());
        if(Math.round((206.835 - (1.015 * quail.textStatistics.averageWordsPerSentence(text)) - (84.6 * quail.textStatistics.averageSyllablesPerWord(text)))) < 60) {
          quail.testFails('paragarphIsWrittenClearly', $(this));
        }
      });
    },

    tabIndexFollowsLogicalOrder : function() {
      var index = 0;
      quail.html.find('[tabindex]').each(function() {
        if(parseInt($(this).attr('tabindex'), 10) >= 0 &&
           parseInt($(this).attr('tabindex'), 10) !== index + 1) {
             quail.testFails('tabIndexFollowsLogicalOrder', $(this));
           }
        index++;
      });
    },
    
    tableLayoutHasNoSummary : function() {
      quail.html.find('table[summary]').each(function() {
        if(!quail.isDataTable($(this)) && !quail.isUnreadable($(this).attr('summary'))) {
          quail.testFails('tableLayoutHasNoSummary', $(this));
        }
      });
    },

    tableLayoutHasNoCaption : function() {
      quail.html.find('table:has(caption)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutHasNoCaption', $(this));
        }
      });
    },

    tableHeaderLabelMustBeTerse : function() {
      quail.html.find('th, table tr:first td').each(function() {
        if($(this).text().length > 20 &&
           (!$(this).attr('abbr') || $(this).attr('abbr').length > 20)) {
          quail.testFails('tableHeaderLabelMustBeTerse', $(this));
        }
      });
    },

    tableLayoutMakesSenseLinearized : function() {
      quail.html.find('table').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutMakesSenseLinearized', $(this));
        }
      });
    },
    
    tableLayoutDataShouldNotHaveTh : function() {
      quail.html.find('table:has(th)').each(function() {
        if(!quail.isDataTable($(this))) {
          quail.testFails('tableLayoutDataShouldNotHaveTh', $(this));
        }
      });
    },
    
    tableSummaryDoesNotDuplicateCaption : function() {
      quail.html.find('table[summary]:has(caption)').each(function() {
        if(quail.cleanString($(this).attr('summary')) === quail.cleanString($(this).find('caption:first').text())) {
          quail.testFails('tableSummaryDoesNotDuplicateCaption', $(this));
        }
      });
    },

    tableUsesAbbreviationForHeader : function() {
      quail.html.find('th:not(th[abbr])').each(function() {
        if($(this).text().length > 20) {
          quail.testFails('tableUsesAbbreviationForHeader', $(this));
        }
      });
    },
    
    tableUseColGroup : function() {
      quail.html.find('table').each(function() {
        if(quail.isDataTable($(this)) && !$(this).find('colgroup').length) {
          quail.testFails('tableUseColGroup', $(this));
        }
      });
    },
    
    tableWithMoreHeadersUseID : function() {
      quail.html.find('table:has(th)').each(function() {
        var $table = $(this);
        var rows = 0;
        $table.find('tr').each(function() {
          if($(this).find('th').length) {
            rows++;
          }
          if(rows > 1 && !$(this).find('th[id]').length) {
            quail.testFails('tableWithMoreHeadersUseID', $table);
          }
        });
      });
    },
    
    preShouldNotBeUsedForTabularLayout : function() {
      quail.html.find('pre').each(function() {
        var rows = $(this).text().split(/[\n\r]+/);
        if(rows.length > 1 && $(this).text().search(/\t/) > -1) {
          quail.testFails('preShouldNotBeUsedForTabularLayout', $(this));
        }
      });
    },
    
    siteMap : function() {
      var mapString = quail.loadString('site_map');
      var set = true;
      quail.html.find('a').each(function() {
        var text = $(this).text().toLowerCase();
        $.each(mapString, function(index, string) {
          if(text.search(string) > -1) {
            set = false;
            return;
          }
        });
        if(set === false) {
          return;
        }
      });
      if(set) {
        quail.testFails('siteMap', quail.html.find('body'));
      }
    },
    
    suspectPHeaderTags : ['strong', 'b', 'em', 'i', 'u', 'font'],

    suspectPCSSStyles : ['color', 'font-weight', 'font-size', 'font-family'],
    
    tabularDataIsInTable : function() {
      quail.html.find('pre').each(function() {
        if($(this).html().search('\t') >= 0) {
          quail.testFails('tabularDataIsInTable', $(this));
        }
      });
    },
    
    pNotUsedAsHeader : function() {
      var priorStyle = { };

      quail.html.find('p').each(function() {
        if(!$(this).text().search('.')) {
          var $paragraph = $(this);
          console.log($paragraph.html());
          $.each(quail.suspectPHeaderTags, function(index, tag) {
            if($paragraph.find(tag).length) {
              $paragraph.find(tag).each(function() {
                console.log($(this).text());
                if($(this).text().trim() == $paragraph.text().trim()) {
                  quail.testFails('pNotUsedAsHeader', $(this));
                }
              });
            }
          })
          $.each(quail.suspectPCSSStyles, function(index, style) {
            if(typeof priorStyle[style] !== 'undefined' &&
               priorStyle[style] !== $paragraph.css(style)) {
              quail.testFails('pNotUsedAsHeader', $paragraph);
            }
            priorStyle[style] = $paragraph.css(style);
          });
          if($paragraph.css('font-weight') === 'bold') {
            quail.testFails('pNotUsedAsHeader', $paragraph);
          }
        }
      });
    },

    documentTitleIsShort : function() {
      if(quail.html.find('head title:first').text().length > 150) {
        quail.testFails('documentTitleIsShort', quail.html.find('head title:first'));
      }
    }
  };

quail.colors = {
  
  getLuminosity : function(foreground, background) {
    foreground = quail.colors.cleanup(foreground);
    background = quail.colors.cleanup(background);
    var RsRGB = foreground.r/255;
    var GsRGB = foreground.g/255;
    var BsRGB = foreground.b/255;
    var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow((RsRGB+0.055)/1.055, 2.4);
    var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow((GsRGB+0.055)/1.055, 2.4);
    var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow((BsRGB+0.055)/1.055, 2.4);

    var RsRGB2 = background.r/255;
    var GsRGB2 = background.g/255;
    var BsRGB2 = background.b/255;
    var R2 = (RsRGB2 <= 0.03928) ? RsRGB2/12.92 : Math.pow((RsRGB2+0.055)/1.055, 2.4);
    var G2 = (GsRGB2 <= 0.03928) ? GsRGB2/12.92 : Math.pow((GsRGB2+0.055)/1.055, 2.4);
    var B2 = (BsRGB2 <= 0.03928) ? BsRGB2/12.92 : Math.pow((BsRGB2+0.055)/1.055, 2.4);
    var l1, l2;
    if (foreground.r + foreground.g + foreground.b <= background.r + background.g + background.b) {
      l2 = (0.2126 * R + 0.7152 * G + 0.0722 * B);
      l1 = (0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
    } else {
      l1 = (0.2126 * R + 0.7152 * G + 0.0722 * B);
      l2 = (0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2);
    }

    return Math.round((l1 + 0.05)/(l2 + 0.05),2);
  },
  
  passesWCAG : function(element) {
    return (quail.colors.getLuminosity(quail.colors.getColor(element, 'foreground'), quail.colors.getColor(element, 'background')) > 5);
  },
  
  passesWAI : function(element) {
    var foreground = quail.colors.cleanup(quail.colors.getColor(element, 'foreground'));
    var background = quail.colors.cleanup(quail.colors.getColor(element, 'background'));
    return (quail.colors.getWAIErtContrast(foreground, background) > 500 &&
            quail.colors.getWAIErtBrightness(foreground, background) > 125);
  },
  
  getWAIErtContrast : function(foreground, background) {
    var diffs = quail.colors.getWAIDiffs(foreground, background);
    return diffs.red + diffs.green + diffs.blue;
  },

  getWAIErtBrightness : function(foreground, background) {
    var diffs = quail.colors.getWAIDiffs(foreground, background);
    return ((diffs.red * 299) + (diffs.green * 587) + (diffs.blue * 114)) / 1000;

  },
  
  getWAIDiffs : function(foreground, background) {
     var diff = { };
     diff.red = Math.abs(foreground.r - background.r); 
     diff.green = Math.abs(foreground.g - background.g);
     diff.blue = Math.abs(foreground.b - background.b);
     return diff;
  },
  
  getColor : function(element, type) {
    if(type === 'foreground') {
      return (element.css('color')) ? element.css('color') : 'rgb(255,255,255)';
    }
    return (element.css('background-color')) ? element.css('background-color') : 'rgb(0,0,0)';
  },
  
  cleanup : function(color) {
    color = color.replace('rgb(', '').replace('rgba(', '').replace(')', '').split(',');
    return { r : color[0],
             g : color[1],
             b : color[2],
             a : ((typeof color[3] === 'undefined') ? false : color[3])
           };
  }
  
};

}(jQuery));