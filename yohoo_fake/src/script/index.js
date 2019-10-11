;
!function () {
    class banner {

        constructor() {

        }


        init() {
            this.render();
            this.overlist();
        }
        // banner图渲染
        render() {
            $.ajax({
                url: 'http://10.31.155.38/test/php/yoho_conn.php',
                dataType: 'json'
            }).done(function (arrdata) {
                let strhtml = '';
                $.each(arrdata, function (index, value) {
                    strhtml += `<li><img src="${value.imgURL}"/></li>`;
                });
                $('.slide-wrapper ul').html(strhtml);
                // 给除了第一个li的另外的li添加opacity属性
                $('.slide-wrapper ul li').each(function (i) {
                    if (i >= 1) {
                        $(this).css({
                            opacity: 0
                        })
                    } else {
                        $(this).css({
                            opacity: 1
                        })
                    }
                })
            })
        }
        // list 图标渲染功能
        overlist() {
            let timer = null;
            $.ajax({
                url: 'http://10.31.155.38/test/yohoo_fake/php/list_conn.php',
                dataType: 'json'
            }).done(function (arrdata) {
                let strhtml = '', o = 0, currentindex = 0;
                $.each(arrdata, function (index, value) {
                    strhtml += `<li><a href="javascript:;" target="_blank"></a><img src="${value.imgURL}"/></li>`;
                });
                $('.thumb-pagination .clearfix').html(strhtml);
                // 鼠标移入添加类
                $('.thumb-pagination .clearfix li a').on('mouseover', function () {
                    o = $(this).parent().index();//存储当前的index
                    currentindex = o;
                    $('.slide-wrapper ul li').each(function (i) {//将所有banner图设为不可见
                        $(this).css({
                            opacity: 0
                        })
                    })
                    $('.slide-wrapper ul li').eq(currentindex).css({//将当前index值的banner图设为可见
                        opacity: 1
                    })
                    $(this).addClass('focus').parent().siblings('li').find('a').removeClass('focus');

                })
                // 移入时清除定时器
                $('#slide-container').on('mouseover', function () {
                    clearInterval(timer)
                })
                // 移除时添加定时器
                $('#slide-container').on('mouseout', function () {
                    timer = setInterval(() => {
                        currentindex++;
                        if (currentindex > 7) {
                            currentindex = 0
                        }
                        move()
                    }, 2000);
                })
                // 运动函数
                function move() {
                    $('.slide-wrapper ul li').each(function (i) {//将所有banner图设为不可见
                        $(this).css({
                            opacity: 0
                        })
                    })
                    $('.slide-wrapper ul li').eq(currentindex).css({//将当前index值的banner图设为可见
                        opacity: 1
                    })
                    $('.slide-wrapper .next').parent().parent().next().find('a').eq(currentindex).addClass('focus').parent().siblings('li').find('a').removeClass('focus');
                }
                // 前进箭头
                $('.slide-wrapper .next').on('click', function () {
                    currentindex++;
                    if (currentindex > 7) {
                        currentindex = 0
                    }
                    move()
                })

                // 后退箭头
                $('.slide-wrapper .prev').on('click', function () {
                    currentindex--;
                    if (currentindex < 0) {
                        currentindex = 7
                    }
                    move()
                })
                timer = setInterval(() => {
                    currentindex++;
                    if (currentindex > 7) {
                        currentindex = 0
                    }
                    move()
                }, 2000);
            });

        }
    }
    new banner().init();



}()