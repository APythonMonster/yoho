class louti {
    constructor() {
        this.loutinav = $('#loutinav');
        this.navli = $('#loutinav ul li').not('.last');
        this.backtop = $('.last');
        this.louceng = $('.louceng');
    }


    init() {
        let this_ = this;
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 200) {
                this_.loutinav.show();
            } else {
                this_.loutinav.hide();
            }
            // 滑动改变
            this_.louceng.each(function(i,e){
                if($(window).scrollTop()<$(e).offset().top+$(e).height() / 2){
                    this_.navli.eq(i).siblings('li').removeClass('active');
                    this_.navli.eq(i).addClass('active');
                    return false
                }
            })
        })
        // 点击跳转
        this.navli.on('click', function () {
            $(this).addClass('active').siblings('li').removeClass('active');
            let $loucengtop = this_.louceng.eq($(this).index()).offset().top;
            $('html').animate({
                scrollTop: $loucengtop
            })
        })
        this.backtop.on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            });
        });
    }
}

new louti().init();