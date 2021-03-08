var cantEP = 0;

function setCantEP(cant){
    cantEP = Math.round(cant);
}

$(document).ready(function ($) {
    function animateElements() {
        $('.progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    // startAngle: -Math.PI / 2,
                    value: percent / 100,
                    size : 400,
                    thickness: 20,
                    fill: {
                        color: '#95C22B'
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('strong').text(cantEP);
                    $(this).find('strong').append('<span id="label-ep">EcoPuntos</span>');
                }).stop();
            }
        });
    }

    animateElements();
    $(window).scroll(animateElements);
});

$("#top-container").fadeIn(500);

function redirect(link){
    window.location.href = link;
}

