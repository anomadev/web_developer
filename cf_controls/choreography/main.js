class Dim {
  static getWidth(element) {
    let style = element.currentStyle = window.getComputedStyle(element);
    return element.offsetWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);
  }
}

class Choreography {
  constructor(containerSelector, itemSelector) {
    this.container = document.querySelector(containerSelector);
    this.elements = this.container.querySelectorAll(itemSelector);

    this.elements.forEach(element => element.style.opacity = 0);
    this.setDelay();
  }

  setDelay() {
    let itemWidth = Dim.getWidth(this.elements[0]);
    let itemsPerRow = Math.floor(this.container.clientWidth / itemWidth);
    for (var i = 0; i < this.elements.length; i += itemsPerRow) {
      for (var j = i; j < (i + itemsPerRow); j++) {
        let xPosition = parseInt(i / itemsPerRow);
        let yPosition = j - i;
        this.elements[i + (j - i)].innerHTML = `[${xPosition}, ${yPosition}]`;

        let positionSum = xPosition + yPosition;
        this.elements[i + (j-i)].style.animationDelay = (positionSum * 50)+'ms';
      }
    }
    this.elements.forEach(element => element.classList.add('zoomIn'));
  }
}

(function() {
  new Choreography('.row', '.card')
})();