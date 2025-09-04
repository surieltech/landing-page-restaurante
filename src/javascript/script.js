//responsividade do menu lateral quando ativado em mobile (feito em jquery)
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });
});

//animções na nav-bar
   const sections = $("section");
const navItems = $(".nav-item");
const header = $("header");

$(window).on("scroll", function () {
    const scrollPosition = $(window).scrollTop();

    // sombra no header
    if (scrollPosition <= 0) {
        header.css("box-shadow", "none");
    } else {
        header.css("box-shadow", "5px 1px 5px rgba(0,0,0,0.1)");
    }

    let activeSectionIndex = 0;

    sections.each(function (i) {
        const section = $(this);
        const sectionTop = section.offset().top - $(window).height() / 3; // pega 1/3 da tela
        const sectionBottom = sectionTop + section.outerHeight();

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSectionIndex = i;
            return false; // já achou, para o loop
        }
    });

    navItems.removeClass("active");
    $(navItems[activeSectionIndex]).addClass("active");
});

