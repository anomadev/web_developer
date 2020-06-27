import Slider from "./slider";
import elements from './elements';
import Preloader from '../preloader/preloader';

let sliderText = document.querySelector('#slider-text');
let sliderTitle = document.querySelector('#slider-title');
let sliderSubtitle = document.querySelector('#slider-subtitle');
let sliderImage = document.querySelector('#slider-image');
let sliderTextContent = document.querySelector('#slider-text-content');

let leftArrow = document.querySelector('.left-arrow');
let rightArrow = document.querySelector('.right-arrow'); 

let slider = new Slider({
  elements: elements,
  animationFunc: function(element) {
    sliderTextContent.classList.add('hide');
    sliderImage.classList.add('hide');

    setTimeout(function() {
      sliderTitle.innerHTML = element.title;
      sliderSubtitle.innerHTML = element.subtitle;
      sliderText.innerHTML = element.text;
      sliderImage.src = element.image;

      sliderTextContent.classList.remove('hide');
      sliderImage.classList.remove('hide');
    }, 600);

  },
  speed: 5000
});

slider.play();

leftArrow.addEventListener('click', slider.prev);
rightArrow.addEventListener('click', slider.next);

const imagesPaths = elements.map(element => element.image);
Preloader.preloadImages({
  images: imagesPaths,
  completed: function() {
    document.querySelector('.controls').style.display = 'block';
  }
});