// Smooth scrolling
$(window).scroll(function() {
  $('a[href*=#]').click(function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500);
  });
});

// Portfolio grid
$('.portfolio-grid').masonry({
  itemSelector: '.portfolio-item',
  columnWidth: '.portfolio-item'
});
