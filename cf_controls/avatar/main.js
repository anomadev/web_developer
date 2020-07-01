(function() {
  document.querySelector('#file-uploader')
    .addEventListener('change', function(event){
      let files = event.target.files;
      let image = files[0];
      let imageURL = URL.createObjectURL(image);

      document.querySelector('.profile .img').style.backgroundImage = `url("${imageURL}")`;
    });
})();