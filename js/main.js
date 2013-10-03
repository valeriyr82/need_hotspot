jQuery(document)
    .ready(function ($) {
        var xc = '';
        var slide_stop = 0;
        setTimeout(function () {
            $('.infoBlock').slideUp();
            $('#pom').attr({'src': 'images/plus.png'});
            window.control = 1;
        }, 10000)
        $(document)
            .mousedown(function () {
                clearTimeout(xc);
                //alert("test");
				if (window.learnSelected == false) {
					$("div#navcontainer").fadeIn("fast");
				}
                xc = setTimeout(function () { 
					$('.infoBlock').slideUp();
                    $('#pom') .attr({'src': 'images/plus.png' });
                    $("div#navcontainer").fadeOut("slow");
                    window.control = 1;
                }, 10000)
            });
    });
var ws = '';
var wc = '';
var wt = ''
$(function () {
    var myOutput;
    var myFilterOutput;

    function selectEle(x, type) {
        if(type == 'remove') {
            x.find('.check')
                .remove();
        }
        else {
            $img = $('<img>');
            $img.addClass('check');
            $img.attr({
                src: './images/check.png'
            });
            $img.appendTo(x);
        }
    }
    var n = new Array();
    var m = new Array();
    var v = new Array();
    var w = new Array();
    var all_style = 1;
    var all_type = 1;
    var all_color = 1;

    window.currentDown;
    $('#do_minus').click(function (e) {
            e.preventDefault();
            current = $('#rsImg');
            if(window.control == 1) {
                $('#pom').attr({ 'src': 'images/minus.png' });
                current.slideDown();
                window.control = 0;
                window.currentDown = current;
            }
            else {
                $('#pom').attr({ 'src': 'images/plus.png' });
                current.slideUp();
                window.control = 1;
            }
        })
  
  $('#dynamic').click(function(e){
                      
                      e.preventDefault();
                      e.stopPropagation();
                      current = $('#rsImg');
                      if(window.control == 1) {
                      $('#pom').attr({ 'src': 'images/minus.png' });
                      current.slideDown();
                      window.control = 0;
                      window.currentDown = current;
                      }
                      else {
                      $('#pom').attr({ 'src': 'images/plus.png' });
                      current.slideUp();
                      window.control = 1;
                      }
                      
                      
                      })
  

  
  
});
$(document)
    .ready(function (e) {
        // set up hover panels
        // although this can be done without JavaScript, we've attached these events
        // because it causes the hover to be triggered when the element is tapped on a touch device
        // set up click/tap panels
        $('.hotflip,.click .im,.click p')
            .click(function (e) {
                if($('.click')
                    .hasClass('flip')) {
                    $('.click')
                        .removeClass('flip')
                }
                else {
                    $('.click')
                        .addClass('flip');
                }
            })
            $('.xyHot').live('click',function(e){
$('.front').html($(this).attr('description'));
$('.im').attr({'src':'./images/'+$(this).attr('show')});
                
            $('.hot').show()});
        $('area')
            .live('click', function (e) {
                $('.front')
                    .html($(this)
                        .attr('description'));
                $('.im')
                    .attr({
                        'src': './images/' + $(this)
                            .attr('show')
                    });
                $('.hot')
                    .show()
            });
        $('.hotclose')
            .live('click', function (e) {
                $('.hot')
                    .hide();
                if(!$('.click')
                    .hasClass('flip')) {
                    $('.click')
                        .addClass('flip')
                }
            });
        // set up block configuration
    });
window.control = 1;
$(function () {
    $('#iicon')
        .click(function () {
            $('#info')
                .show();
        })
    $('#info')
        .click(function () {
            $(this)
                .hide();
        })
});