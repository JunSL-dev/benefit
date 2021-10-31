$(document).ready(function(){
  $('.background .popup .close').click(function() {
    $(this).parents('.popup').parents('.background').addClass('hidden');
  });
  $('form.register input.ect-btn').click(function() {
    $(this).parents('form.register').children('.background').removeClass('hidden');
  })
  $("#bb").change(function(){
    if($(this).is(":checked")){
      $('.form2').removeClass('hidden');
    }else{
      $('.form2').addClass('hidden');
      $(".form2 input").prop('checked', false);
      $(".form3 input").prop('checked', false);
      $(".form3 .grade").each(function() {
        $(this).addClass('hidden');
      });
    }
  });
  $(".form2 input").change(function(){
    if($(this).is(":checked")) {
      $('.form3 .grade#'+$(this).val()+'').removeClass('hidden');
    } else {
      $('.form3 .grade#'+$(this).val()+'').addClass('hidden');
    }
  });
  $('.btn-close').click(function() {
    $('form.register .background').addClass('hidden');
  });

  $(".scroll").click(function(event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: $(this.hash).offset().top-94 }, 500);
  });
})
