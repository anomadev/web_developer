(function() {
  let pinged = false;
  let nav = document.querySelector(".navigation");
  let stickyScrollPoint = document.querySelector('.poster').offsetHeight;

  function pingToTop() {
    if(pinged) return;
    nav.classList.add('pinged');
    pinged = true;
  }

  function unPingFromTop() {
    if(!pinged) return;
    nav.classList.remove('pinged');
    pinged = false;
  }

  window.addEventListener('scroll', function(event) {
    let coords = nav.getBoundingClientRect();
    if(window.scrollY < stickyScrollPoint) return unPingFromTop();
    if(coords.top <= 0) return pingToTop();
  });
})();