// when the DOM is ready...

//thikbox // load gallery with AJAX including thickbox.js function showGallery() { if (!$('#imagegallery').hasClass("loaded")) { $("#loading").replaceWith('</ul>'); $("#imagegallery").load('ajax_gallery.php'); $.getScript("js/thickbox.js"); } }

//jQuery.noConflict();  (function($){
	
	
$(document).ready(function () {
	
	
  
   // NOTE: You can even omit all options and simply replace the regular title tooltips like so:
   // $('#content a[href]').qtip();
    var $panels = $('#slider .scrollContainer > div');
    var $container = $('#slider .scrollContainer');

    // if false, we'll float all the panels left and fix the width 
    // of the container
    var horizontal = true;

    // float the panels left if we're going horizontal
    if (horizontal) {
        $panels.css({
            'float' : 'left',
            'position' : 'relative' // IE fix to ensure overflow is hidden
        });

        // calculate a new width for the container (so it holds all panels)
        $container.css('width', $panels[0].offsetWidth * $panels.length);
    }

    // collect the scroll object, at the same time apply the hidden overflow
    // to remove the default scrollbars that will appear
    var $scroll = $('#slider .scroll').css('overflow', 'hidden');

    // apply our left + right buttons
    $scroll
        .before()
        .after('<a href="#"  class="scrollButtons right"title="View Next Set"/></a>');
        
        //org
        //.before('<img class="scrollButtons left" src="js/scroll_left.png" />')
//        .after('<img class="scrollButtons right" src="js/scroll_right.png" />');
        //ende
        
 // .before(�<img class=�scrollButtons left� onmouseover=�this.src=\�images/lefthover.gif\�� onmouseout=�this.src=\�images/left.gif\�� src=�images/left.gif� alt=�" />�) 
//  .after(�<img class=�scrollButtons right� onmouseover=�this.src=\�images/righthover.gif\�� onmouseout=�this.src=\�images/right.gif\�� src=�images/right.gif� alt=�" />�);      
       // .before('<img class="scrollButtons left" onmouseover="this.src=\'js/scroll_left.png\'" onmouseout="this.src=\'js/scroll_left.pn\'" src="js/scroll_left.png" alt="" />') 
//		.after('<img class="scrollButtons right" onmouseover="this.src=\'images/righthover.gif\'" onmouseout="this.src=\'js/scroll_right.png\'" src="js/scroll_right.png" alt="" />');

    // handle nav selection
    function selectNav() {
        $(this)
            .parents('ul:first')
                .find('a')
                    .removeClass('selected')
                .end()
            .end()
            .addClass('selected');
    }

    $('#slider .navigation').find('a').click(selectNav);
// auto height hack � needs to be first in the function//
    function trigger(data) {  var div = "#" + data.id; var divHeight = $(div).height()+24; 
	// add 24px to the overall height to ensure all text is displayed - the final height calc was cutting off text 
	$(".scroll").animate ({ height: divHeight }, 600 ); 
	// end// 
	var el = $('#slider .navigation').find('a[href$="' + data.id + '"]').get(0); selectNav.call(el);

}


   //orgi function trigger(data) {
    	
    	//test<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    //	//hide all videos
//    $('#slider .video').hide();
//    //show the "active" video
//    $("#" + data.id + " .video").show();
    	
    	// go find the navigation link that has this target and select the nav
    
    // { var el = $(document).find(�a [href$="' + data.id + '"]�).get(0); $element = el; selectNav.call(el); fader(); }
//
//if (window.location.hash) { trigger({ id : window.location.hash.substr(1) }); } else { $(�ul.navigation a:first�).click(); fader(); }
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//orgi
      //  var el = $('#slider .navigation').find('a[href$="' + data.id + '"]').get(0);
//        selectNav.call(el);
//    }

    if (window.location.hash) {
        trigger({ id : window.location.hash.substr(1) });
    } else {
        $('ul.navigation a:first').click();
    }

    // offset is used to move to *exactly* the right place, since I'm using
    // padding on my example, I need to subtract the amount of padding to
    // the offset.  Try removing this to get a good idea of the effect
    var offset = parseInt((horizontal ? 
        $container.css('paddingTop') : 
        $container.css('paddingLeft')) 
        || 0) * -1;


    var scrollOptions = {
    	//interval: 2000, //the time for duration
    	//force: true,    //for automated start of the intervall in the first tab
    	
    	//event: mouseover, 
        target: $scroll, // the element that has the overflow

        // can be a selector which will be relative to the target
        items: $panels,

        navigation: '.navigation a',

        // selectors are NOT relative to document, i.e. make sure they're unique
        prev: 'img.left', 
        next: 'img.right',

        // allow the scroll effect to run both directions
        axis: 'xy',

        onAfter: trigger, // our final callback

        offset: offset,

        // duration of the sliding effect
        duration: 500,

        // easing - can be used with the easing plugin: 
        // http://gsgd.co.uk/sandbox/jquery/easing/
        easing: 'swing'
    };

    // apply serialScroll to the slider - we chose this plugin because it 
    // supports// the indexed next and previous scroll along with hooking 
    // in to our navigation.
    $('#slider').serialScroll(scrollOptions);

    // now apply localScroll to hook any other arbitrary links to trigger 
    // the effect
    $.localScroll(scrollOptions);

    // finally, if the URL has a hash, move the slider in to position, 
    // setting the duration to 1 because I don't want it to scroll in the
    // very first page load.  We don't always need this, but it ensures
    // the positioning is absolutely spot on when the pages loads.
    scrollOptions.duration = 1;
    $.localScroll.hash(scrollOptions);

//// start to automatically cycle the tabs
var cycleTimer = setInterval(function () {
   $scroll.trigger('next');
}, 5000); //adjust this number to your liking

// select some trigger elements to stop the auto-cycle
var $stopTriggers = $('#slider .navigation').find('a') // tab headers
   .add('.scroll')                                     // panel itself
   .add("a[href^='#']");                               // links to a tab

// this is the function that will stop the auto-cycle
function stopCycle() {
   $stopTriggers.unbind('click.cycle');   // remove the no longer needed stop triggers
   clearInterval(cycleTimer);             // stop the auto-cycle itself
}

// bind stop cycle function to the click event using namespaces
$stopTriggers.bind('click.cycle', stopCycle);


});
//})(jQuery);