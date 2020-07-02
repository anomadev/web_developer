class DOMHelper {
  static move(element, coords) {
    element.style.top = (coords.y - (element.clientHeight / 2)) + "px";
    element.style.left = (coords.x - (element.clientWidth / 2)) + "px";
  }

  static isOver(element, pointerCoords) {
    let elementCoords = element.getBoundingClientRect();
    if(pointerCoords.x > elementCoords.left && pointerCoords.x < (elementCoords.left + elementCoords.width)) {
      if (pointerCoords.y > elementCoords.top && pointerCoords.y < (elementCoords.top + elementCoords.height)) {
        return true;
      }
    }

    return false;
  }

  static whereIs(element, pointerCoords) {
    let elementCoords = element.getBoundingClientRect();
    if (pointerCoords.x > elementCoords.left && pointerCoords.x < (elementCoords.left + elementCoords.width)) {
      if (pointerCoords.y > elementCoords.top && pointerCoords.y < (elementCoords.top + elementCoords.height)) {
        if (pointerCoords.y > elementCoords.top + (elementCoords.height/2)) return 1;
        return 2;
      }
    }

    return -1;
  }
}

class DragList {
  constructor(listSelector, itemsSelector = "li") {
    this.list = document.querySelector(listSelector);
    this.items = this.list.querySelectorAll(itemsSelector);
    this.finalPosition = -1;
    this.finalElementHover = null;
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.canvas = document.createElement('canvas');
    this.buildFakeElement();
    this.bindEvents();
  }

  buildFakeElement() {
    this.fakeElement = document.createElement('div');
    this.fakeElement.style.background = '#eee';
    this.fakeElement.classList.add('card');
  }

  bindEvents() {
    this.items.forEach(item => {
      item.addEventListener('dragstart', this.handleDragStart);
      item.addEventListener('drag', this.handleDrag);
      item.addEventListener('dragend', this.handleDragEnd);
    });
  }

  handleDragStart(event) {
    let element = event.currentTarget;
    event.dataTransfer.setDragImage(this.canvas, 0, 0);
    element.classList.add("dragging");
  }

  handleDrag(event) {
    let mouseCoords = { x: event.clientX, y: event.clientY };
    DOMHelper.move(event.currentTarget, mouseCoords);
    if(DOMHelper.isOver(this.list, mouseCoords)) {
      this.items.forEach(item =>  this.compareElement(item, event));
    } else {
      this.fakeElement.remove();
    }
  }

  compareElement(item, element) {
    if (item == event.currentTarget) return;
    let mouseCoords = { x: event.clientX, y: event.clientY };
    let result = DOMHelper.whereIs(item, mouseCoords);
    if (result == -1) return;

    this.finalPosition = result;
    this.finalElementHover = item;

    if (result == 1)
      this.list.insertBefore(this.fakeElement, item.nextSibling);
    if (result == 2)
      this.list.insertBefore(this.fakeElement, item);
  }

  handleDragEnd(event) {
    let element = event.currentTarget;
    element.classList.remove("dragging");
    element.style.top = "";
    element.style.left = "";

    if (this.finalPosition == 1)
      this.list.insertBefore(element, this.finalElementHover.nextSibling);
    if (this.finalElementHover == 2)
      this.list.insertBefore(element, this.finalElementHover);
  }
}

(function(){
  new DragList("ul");
})();