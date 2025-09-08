//responsividade do menu lateral quando ativado em mobile (feito em jquery)
$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
        
        // Atualiza atributos de acessibilidade
        const isExpanded = $('#mobile_menu').hasClass('active');
        $('#mobile_btn').attr('aria-expanded', isExpanded);
    });
    
    // Fechar menu ao clicar em um link
    $('#mobile_nav_list a').on('click', function() {
        $('#mobile_menu').removeClass('active');
        $('#mobile_btn').find('i').removeClass('fa-x').addClass('fa-bars');
        $('#mobile_btn').attr('aria-expanded', 'false');
    });
    
    // Navegação suave para âncoras
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const targetElement = $(targetId);
        if (targetElement.length) {
            const headerHeight = $('header').outerHeight();
            const targetPosition = targetElement.offset().top - headerHeight;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800);
        }
    });
    
    // Lazy loading de imagens com jQuery
    $('.lazy-load').each(function() {
        $(this).attr('src', $(this).data('src')).on('load', function() {
            $(this).addClass('loaded');
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
            const sectionTop = section.offset().top - $(window).height() / 3;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass("active");
        $(navItems[activeSectionIndex]).addClass("active");
    });
    
    // Inicializa o carrossel de eventos (se existir)
    if ($('.events-carousel').length) {
        initEventsCarousel();
    }
});

// Função para inicializar o carrossel de eventos
function initEventsCarousel() {
    const track = $('.events-track');
    const cards = $('.event-card');
    const prevBtn = $('.prev-btn');
    const nextBtn = $('.next-btn');
    const indicators = $('.indicator');
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Ajusta o número de cards para mostrar em telas menores
    function getCardsToShow() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }
    
    // Atualiza a posição do carrossel
    function updateCarousel() {
        const cardsToShow = getCardsToShow();
        const cardWidth = cards.outerWidth() + 30;
        track.css('transform', `translateX(-${currentIndex * cardWidth * cardsToShow}px)`);
        
        // Atualiza indicadores
        indicators.removeClass('active').eq(currentIndex).addClass('active');
    }
    
    // Avança para o próximo conjunto de cards
    function nextSlide() {
        const cardsToShow = getCardsToShow();
        if (currentIndex < Math.ceil(cardCount / cardsToShow) - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Volta para o conjunto anterior de cards
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Vai para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Event listeners para os botões de navegação
    nextBtn.on('click', nextSlide);
    prevBtn.on('click', prevSlide);
    
    // Event listeners para os indicadores
    indicators.on('click', function() {
        goToSlide($(this).index());
    });
    
    // Atualiza o carrossel quando a janela for redimensionada
    $(window).on('resize', updateCarousel);
    
    // Inicializa o carrossel
    updateCarousel();
}