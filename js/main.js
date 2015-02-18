$(function() {
  // Smooth scrolling
  $('a[href*=#]:not([href=#])').click(function(item) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
  var hoverOrTouch = (('ontouchend' in window)) ? 'tap' : 'mouseenter mouseleave';


  $('#bs-navbar-collapse').find('a').click(function() {
    $(this).closest(".dropdown-menu").prev().dropdown("toggle");
  });

  $('#sticker').on(hoverOrTouch,function() { $(this).toggleClass('hover')});
  $('.progress').on(hoverOrTouch,function() { 
    $('.progress.hover').removeClass('hover');
    $(this).toggleClass('hover')
  });
  // navbarAffix();
  // $(window).resize(function(){ 
  //   navbarAffix();
  // });

  

});





function navbarAffix() {
  var affix_offset = $('#jumbotron-top').height()  + $('#top-navbar-fixed').height();
  $('#top-navbar-fixed').affix({
    offset: {
      top: affix_offset
    }
  });
}


function send_email(item) {
  if(email_form.checkValidity()) {
    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        'key': 'yLSxcngLNKc6Xvb8pCFopw',
        'message': {
          'from_email': $(email_form).find('input[name="email"]').val(),
          'to': [
              {
                'email': 'live.mellon@gmail.com',
                'name': 'foklepoint.com',
                'type': 'to'
              },
            ],
          'autotext': 'true',
          'subject': 'Message from ' + $(email_form).find('input[name="name"]').val(),
          'html': $(email_form).find('[name="message"]').val()
        }
      }
     }).done(function(response) {
      $(email_form).slideUp('slow');
       var str = '<div class="row"><div class="col-md-10 col-lg-10 col-offset-lg-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 center"><h2 class="light-text">Your message has been sent!</h2></div></div>';
       $(email_form).html(str);
       $(email_form).slideDown('slow');
     });
  }
}
