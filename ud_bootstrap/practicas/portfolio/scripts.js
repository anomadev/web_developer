$(function(){
  $('.galeria .contenedor-imagen').on('click', function(){
    $('#modal').modal;

    let rutaImagen = ($(this).find('img').attr('src'));
    $('#imagen-modal').attr('src', rutaImagen);
  });

  $('#modal').on('click', function() {
    $('#modal').modal('hide');
  });
})