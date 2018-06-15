"use strict";

// preloader timeout
var interval = 0;
var timeOut = setInterval(function(){preLoader();}, 2000);
function preLoader(){
    if (interval == 1) {
        clearInterval(timeOut);
        jQuery('.preloader').slideUp(300);
    }
}

jQuery(document).ready(function(){

    interval = 1;

    // add background image from html
    jQuery.each(jQuery('[data-bg]'), function(){
        if (jQuery(this).attr('data-bg').length > 0){
            jQuery(this).css('background-image', 'url('+ jQuery(this).attr('data-bg') +')');
        }
    });  

    // starting animations on scroll
    new WOW().init();

    // popup youtube video
    jQuery.extend(true, $.magnificPopup.defaults, {  
        iframe: {
            patterns: {
               youtube: {
                  index: 'youtube.com/', 
                  id: 'v=', 
                  src: 'http://www.youtube.com/embed/%id%?autoplay=1&vq=hd720' 
              }
            }
        }
    });
    jQuery('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    setTimeout(function(){
        jQuery('#section0 .col-xl-6').addClass('animated fadeInLeftBig'); 
    }, 2000);

    // countdown
    (function(){
        if(jQuery('#counter').width() > 0 ) {
            var timer = jQuery('#counter').attr('data-countdown');

            jQuery('.countdown').downCount({
                date: timer,
                offset: +10
            });
        }
    })(jQuery());

    // fullpage scroll functions
    if( jQuery('#fullPage').width() > 0 ){
        jQuery("#fullPage").fullpage({
            scrollBar: true,
            menu: '#menu',
            sectionSelector: '.crypto-section',
            slideSelector: false,
            verticalCentered: true,
            responsiveSlides: false,
            lockAnchors: false,
            scrollingSpeed: 800,
            responsiveWidth: 1025,
            anchors: ['platform', 'platform-subsection', 'platform-subsection', 'token-view', 'token-view-subsection', 'roadmap', 'team', 'partners', 'faq', 'contact'],
    
            onLeave: function(index, nextIndex, direction){
                var leavingSection = jQuery(this);
                if(index == 3 && direction =='down'){
                   setTimeout(function(){
                    jQuery('.token-sale__graph').addClass('active');
                   }, 600);
                }
                jQuery('.navbar-brand').fadeOut(100);
            },
            afterLoad: function(anchorLink, index){
                jQuery('.navbar-brand').fadeIn(400); 
                var loadedSection = jQuery(this);
                if(index == 4){
                    setTimeout(function(){
                        jQuery('.token-sale__graph').addClass('active');
                    }, 600);
                }
                else if(index == 12){
                    jQuery('.navbar-brand').addClass('fixed-bottom');
                } else {
                    jQuery('.navbar-brand').removeClass('fixed-bottom');
                }
                var activeItem;
                if(index == 1 || index == 2 || index == 3){
                    activeItem = jQuery('#menu').find('li').first()
                }else if(index == 4 || index == 5 ){
                    activeItem = jQuery('#menu').find('li[data-menuanchor="token-view"]')
                }else{
                    return false;
                }
                activeItem
                    .addClass('active')
                    .siblings().removeClass('active');           
            },
        });
        jQuery(document).on('click', '.navbar-brand', function(){
            $.fn.fullpage.moveTo('1');
        });
        jQuery('.scrollDown').on('click', function () {
            $.fn.fullpage.moveSectionDown();
        });
    }

    if(jQuery(window).width() < 789 ){
        jQuery('.navbar-toggler').on('click', function() {
            jQuery('#fullPage').toggleClass('show-menu');
        });

        jQuery(window).scroll(function() {    
            var scroll = jQuery(window).scrollTop();
        
            if (scroll >= 50) {
                jQuery(".navbar").addClass("scrolled");
            } else {
                jQuery(".navbar").removeClass("scrolled");
            }
        });
    }

    if(jQuery('.charts-view').width() > 0){
        // token distribution chart
        var chart = AmCharts.makeChart( "distributionChart", {
            "type": "pie",
            "theme": "light",
            "autoMargins": false,
            "marginTop": 0,
            "marginBottom": 0,
            "pullOutRadius": 10,
            "fontSize": 14,
            "fontFamily": "inherit",
            "responsive": {
                "enabled": true,
            },
            "dataProvider": [ 
                {
                    "token": "Token Sale (To cover marketing, operations, legal, and development costs)",
                    "value": 10,
                    "color": "#7c397f"
                }, {
                    "token": "Given to first users for onboarding (only to be used as bounties on their projects)",
                    "value": 15,
                    "color": "#a661ad",
                }, {
                    "token": "Team and Advisors",
                    "value": 10,
                    "color": "#c586ce",
                }, {
                    "token": "Marketing, Legal and Operations",
                    "value": 10,
                    "color": "#8a508e"
                }, {
                    "token": "Atrium Development Foundation",
                    "value": 5,
                    "color": "#e4aeed"
                }
            ],
            "valueField": "value",
            "titleField": "token",
            "colorField": "color",
            "balloon":{
                "fixedPosition":true
            },
            "export": {
                "enabled": false
            }
        } );

        // proceeds use chart
        var chartData = {
            "2009": [
            { "sector": "Bounties", "size": 2.2 },
            { "sector": "Reserve",  "size": 4.5 },
            { "sector": "Advisors", "size": 14.6 },
            { "sector": "Partners", "size": 9.3 },
            { "sector": "Core",     "size": 22.5 } ],
            "2010": [
            { "sector": "Bounties", "size": 2 },
            { "sector": "Reserve",  "size": 4.2 },
            { "sector": "Advisors", "size": 14.8 },
            { "sector": "Partners", "size": 9.7 },
            { "sector": "Core",     "size": 22 } ],
            "2011": [
            { "sector": "Bounties", "size": 1.8 },
            { "sector": "Reserve",  "size": 4.2 },
            { "sector": "Advisors", "size": 13.7 },
            { "sector": "Partners", "size": 9.4 },
            { "sector": "Core",     "size": 22.1 } ],
            "2012": [
            { "sector": "Bounties", "size": 1.9 },
            { "sector": "Reserve",  "size": 4.2 },
            { "sector": "Advisors", "size": 14.5 },
            { "sector": "Partners", "size": 10.6 },
            { "sector": "Core",     "size": 23 } ],
            "2013": [
            { "sector": "Bounties", "size": 1.8 },
            { "sector": "Reserve",  "size": 4.4 },
            { "sector": "Advisors", "size": 15.2 },
            { "sector": "Partners", "size": 10.5 },
            { "sector": "Core",     "size": 24.7 } ],
            "2014": [
            { "sector": "Bounties", "size": 1.7 },
            { "sector": "Reserve",  "size": 4 },
            { "sector": "Advisors", "size": 16.3 },
            { "sector": "Partners", "size": 10.7 },
            { "sector": "Core",     "size": 24.6 } ],
            "2015": [
            { "sector": "Bounties", "size": 1.6 },
            { "sector": "Reserve",  "size": 3.1 },
            { "sector": "Advisors", "size": 16.3 },
            { "sector": "Partners", "size": 10.7 },
            { "sector": "Core",     "size": 25.8 } ],
            "2016": [
            { "sector": "Bounties", "size": 1.5 },
            { "sector": "Reserve",  "size": 3.3 },
            { "sector": "Advisors", "size": 16.2 },
            { "sector": "Partners", "size": 11 },
            { "sector": "Core",     "size": 27.5 } ],
            "2017": [
            { "sector": "Bounties", "size": 1.4 },
            { "sector": "Reserve",  "size": 3.3 },
            { "sector": "Advisors", "size": 16.9 },
            { "sector": "Partners", "size": 10.6 },
            { "sector": "Core",     "size": 28.1 } ],
            "2018": [
            { "sector": "Bounties", "size": 1.4 },
            { "sector": "Reserve",  "size": 3.9 },
            { "sector": "Advisors", "size": 15.7 },
            { "sector": "Partners", "size": 10.6 },
            { "sector": "Core", "size": 29.1 } ]
        };
        var currentYear = 2018;
        var chart = AmCharts.makeChart( "proceedsChart", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [],
            "valueField": "size",
            "titleField": "sector",
            "startDuration": 0,
            "innerRadius": 60,
            "pullOutRadius": 40,
            "marginTop": 0,
            "fontSize": 14,
            "fontFamily": "inherit",
            "responsive": {
                "enabled": true,
            },
            "colors": [
                "#fcb9cb",
                "#f993a9",
                "#f85068",
                "#f7728b",
                "#dc4a60",
            ],
            "allLabels": [{
                "y": "50%",
                "align": "center",
                "size": 24,
                "bold": true,
                "text": "2009",
                "color": "#333"
                }, {
                "y": "45%",
                "align": "center",
                "size": 18,
                "text": "Year",
                "color": "#e63359"
            }],
            "listeners": [ {
            "event": "init",
            "method": function( e ) {
                var chart = e.chart;
                function getCurrentData() {
                var data = chartData[currentYear];
                currentYear++;
                if (currentYear > 2018)
                    currentYear = 2009;
                return data;
                }
                function loop() {
                    chart.allLabels[0].text = currentYear;
                    var data = getCurrentData();
                    chart.animateData( data, {
                        duration: 1000,
                        complete: function() {
                        setTimeout( loop, 3000 );
                        }
                    } );
                }
                loop();
            }
            } ],
        } );
    };
    // roadmap chart
    (function(){
        var chart = AmCharts.makeChart( "roadmapGraph", {
            "type": "gantt",
            "theme": "light",
            "marginRight": 60,
            "fontSize": 14,
            "fontFamily": "inherit",
            "period": "DD",
            "dataDateFormat": "YYYY-MM-DD",
            "columnWidth": 0.5,
            "valueAxis": {
                "type": "date"
            },
            "brightnessStep": 7,
            "graph": {
                "fillAlphas": 1,
                "lineAlpha": 1,
                "lineColor": "#fff",
                "fillAlphas": 0.85,
                "balloonText": "<b>[[task]]</b>:<br />[[open]] -- [[value]]"
            },
            "rotate": true,
            "responsive": {
                "enabled": true,
            },
            "categoryField": "category",
            "segmentsField": "segments",
            "colorField": "color",
            "startDateField": "start",
            "endDateField": "end",
            "dataProvider": [ {
                "category": "Idea formulated",
                "segments": [ {
                    "start": "2017-09-01",
                    "end": "2018-02-01",
                    "color": "#b9783f",
                    "task": "Idea formulated"
                } 
                // {
                //     "start": "2017-01-16",
                //     "end": "2018-01-27",
                //     "task": "Producing specifications"
                // }, {
                //     "start": "2017-02-05",
                //     "end": "2018-04-18",
                //     "task": "Development"
                // }, {
                //     "start": "2017-04-18",
                //     "end": "2017-04-30",
                //     "task": "Testing and QA"
                // } 
                ]
            }, {
                "category": "Development",
                "segments": [ {
                "start": "2018-02-01",
                "end": "2018-05-01",
                "color": "#cc4748",
                "task": "Development"
                }
                // {
                // "start": "2017-03-12",
                // "end": "2018-03-25",
                // "task": "Producing specifications"
                // }, {
                // "start": "2017-05-16",
                // "end": "2018-02-05",
                // "task": "Development"
                // }, {
                // "start": "2017-02-10",
                // "end": "2017-02-18",
                // "task": "Testing and QA"
                // } 
                ]
            }, {
                "category": "Beta TestNet",
                "segments": [ {
                    "start": "2018-05-01",
                    "end": "2018-08-01",
                    "color": "#2f4074",
                    "task": "Beta TestNet"
                }
                // {
                //     "start": "2017-03-19",
                //     "end": "2017-12-03",
                //     "task": "Beta TestNet"
                // }, {
                //     "start": "2017-06-20",
                //     "end": "2018-04-25",
                //     "task": "Development"
                // }, {
                //     "start": "2017-05-27",
                //     "end": "2018-06-15",
                //     "task": "Testing and QA"
                // } 
                ]
            }, {
                "category": "Token Sale",
                "segments": [ {
                    "start": "2018-08-01",
                    "end": "2018-11-01",
                    "color": "#f85068",
                    "task": "Token Sale"
                }
                // {
                //     "start": "2017-06-12",
                //     "end": "2018-01-19",
                //     "task": "Producing specifications"
                // }, {
                //     "start": "2017-06-19",
                //     "end": "2018-03-01",
                //     "task": "Development"
                // }, {
                //     "start": "2017-03-08",
                //     "end": "2018-03-30",
                //     "task": "Testing and QA"
                // } 
                ]
            }, {
                "category": "Platform Launch",
                "segments": [ {
                    "start": "2018-11-01",
                    "end": "2018-11-10",
                    "color": "#f85068",
                    "task": "Platform Launch"
                }
                // {
                //     "start": "2017-06-12",
                //     "end": "2018-01-19",
                //     "task": "Producing specifications"
                // }, {
                //     "start": "2017-06-19",
                //     "end": "2018-03-01",
                //     "task": "Development"
                // }, {
                //     "start": "2017-03-08",
                //     "end": "2018-03-30",
                //     "task": "Testing and QA"
                // } 
                ]
            } ],
            "valueScrollbar": {
                "autoGridCount": true
            },
            "chartCursor": {
                "cursorColor": "#55bb76",
                "valueBalloonsEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.5,
                "valueLineBalloonEnabled": true,
                "valueLineEnabled": true,
                "zoomable": false,
                "valueZoomable": true
            },
        });
    })(jQuery());

    // contact form validation
    jQuery("#contacUs").validate({           
        submitHandler: function () {
            $.ajax({
                type: 'POST',
                url: 'php/SendMail.php',
                data: jQuery("#contacUs").serialize(),
                complete: function(results) {                                              
                    setTimeout(function(){
                        jQuery(".response-message.success").addClass("active");  
                        jQuery("#contacUs")[0].reset();
                    }, 300);
                }
            });
        }
    });
    
    // colors skin function
    jQuery(".colors-list .btn-color").on('click', function() {
        var newCol   =jQuery(this).attr('data-theme');
        var newStyle =jQuery("#themeStyle");        
        jQuery(this).parent().parent().find('li').removeClass('active');
        jQuery(this).parent().addClass('active');
        jQuery(newStyle).attr('href', 'css/themes/' + newCol + '.css');
        if( jQuery('#cd-content').hasClass('fixed-top-navbar') ) {
            jQuery("#cd-content").attr('class', newCol + ' fixed-top-navbar');
        } else {
            jQuery("#cd-content").attr('class', newCol );
        }
    });
    jQuery('.settings-btn').on('click', function(){
        jQuery(this).toggleClass('open');
        jQuery(this).parent().toggleClass('align-items-end visible');
    });
    
    // autogrowing textarea based on how much you write in it
    var textarea = document.querySelector('textarea');
    textarea.addEventListener('keydown', autosize);
    function autosize(){
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }

    // NORMAL SCROLLING PAGE FUNCTIONS
    if ( jQuery('#normalScroll').width() > 0 ) {
        
        // scroll next
        jQuery(".scrollDown").on('click', function(){
            jQuery('html, body').animate({
                scrollTop: jQuery("#platform2").offset().top
            }, 1200);
        });

        // smooth scroll to div in href
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        jQuery(window).scroll(function(){
            jQuery('.crypto-section').each(function(){
              if(isScrolledIntoView(jQuery(this))){
                jQuery(this).addClass("in-view");
              }
            });
          });
          
        function isScrolledIntoView(elem){
            var $elem = jQuery(elem);
            var $window = jQuery(window);
          
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
          
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();
          
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
    }

});
// END DOCUMENT READY FUNCTIONS

//  LOAD BITCOIN WIDGET // 
(function(b,i,t,C,O,I,N) {
    window.addEventListener('load',function() {
    if(b.getElementById(C))return;
    I=b.createElement(i),N=b.getElementsByTagName(i)[0];
    I.src=t;I.id=C;N.parentNode.insertBefore(I, N);
},false)
})(document,'script','https://widgets.bitcoin.com/widget.js','btcwdgt');