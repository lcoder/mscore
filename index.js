/**
 * mscore 打分插件
 * Created by maotingfeng on 16/7/27.
 */
(function( factory ){
    var md = typeof define == "function" ;
    if( typeof module === 'object' && typeof module.exports === 'object' ){
        module.exports = factory() ;
    }else if( md && define.amd ){
        define( ['require','jquery'] , factory ) ;
    }else if( md && define.cmd ) {
        define( 'ymdate' , ['jquery'] , factory ) ;
    }else{
        factory( function(){ return window.jQuery } ) ;
    }
})(function( require ){
    var $ = require('jquery') ;
    // 绑定jquery方法
    $.extend( $.fn , {
        /* initScore 打分,星形分数 */
        initScore: function( config ){
            var settings = $.extend( { onClassName: 'on' , allStars: 5 , onMouseEnterStar: $.noop , onPick: $.noop , isTitle: false } , config ) ,
                isPick = config && !!config.onPick ;
            function initScore(){
                var $this = $( this ) ,
                    score = $this.data('score') ,
                    stars = $this.data( 'stars' ) ;
                $this.find('.star').remove() ;
                if( isPick ){
                    settings.onClassName = 'picked' ;
                }
                $this.append( initHTML.call( this , { score: score , stars:stars } ) ) ;
                if( isPick ){
                    bindEvents.call( this ) ;
                }
            }
            /* 生成html */
            function initHTML( cg ){
                var html = '' ,
                    score = cg.score ,
                    stars = 0 ,
                    $this = $( this ) ,
                    allStars= settings.allStars ,
                    isScoreTxt = $this.data( 'isscoretxt' ) ,
                    className = settings.onClassName ;
                if( score === undefined ){
                    stars = cg.stars ;
                    if( isNaN( stars ) ){
                        warn( stars + '...stars不是一个有效的数字' ) ;
                        return ;
                    }
                }else{
                    if( score >= 1 && score <= 29 ){            // 1星
                        stars = 1 ;
                    }else if( score >= 30 && score <= 49 ){     // 2星
                        stars = 2 ;
                    }else if( score >= 50 && score <= 69 ){     // 3
                        stars = 3 ;
                    }else if( score >= 70 && score <= 89 ){     // 4星
                        stars = 4 ;
                    }else if( score >= 90 ){                    // 5星
                        stars = 5 ;
                    }else{
                        warn( score + '分数格式错误' ) ;
                    }
                }
                if( stars > 0 ){ if( settings.isTitle ){ $this.attr( 'title' , score + '分,' + stars + '星' ) } }
                for( var i = 0 ; i < allStars ; i++ ){
                    var classNams = '' ;
                    if( stars <= 0 ){ }
                    else{
                        classNams = ' ' + className ;
                        stars-- ;
                    }
                    html += '<span class="star' + classNams + '"><i class="iconfont">&#xe619;</i></span>' ;
                }
                if( html != '' && isScoreTxt ){
                    // 正确的分数格式、确定需要显示文本
                    html += '<span class="score">' + score + '分</span>' ;
                }
                return html ;
            }
            function bindEvents(){
                var $score = $( this ) ;

                $score.off().on("mouseenter",".star",function(){
                    var $this = $( this ) ,
                        $stars = $this.parent().find('.star') ,
                        index = $stars.index( $this ) ;
                    $stars.each( function( _index , val ){
                        _index <= index ? $(val).addClass( 'on' ) : $(val).removeClass( 'on' ) ;
                    } ) ;
                    settings.onMouseEnterStar.call( this , index ) ;
                }).on("mouseleave",function(){
                    var $this = $( this ) ,
                        $stars = $this.find('.star') ;
                    $stars.removeClass( 'on' ) ;
                }).on("click",".star",function(){
                    var $this = $( this ) ,
                        $stars = $this.parent().find('.star') ,
                        index = $stars.index( $this ) ;
                    $stars.each( function( _index , val ){
                        _index <= index ? $(val).addClass( 'picked' ) : $(val).removeClass( 'picked' ) ;
                    } ) ;
                    settings.onPick.call( this , index ) ;
                }) ;
            }
            function warn( txt ){
                if( window.console && window.console.warn ){
                    window.console.warn( 'score插件:' + txt ) ;
                }
            }
            this.each(function(){
                initScore.call( this ) ;
            });
            return this ;
        }
    } ) ;
} );