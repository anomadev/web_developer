class IndexForSiblings {
  static get(element){
    let children = element.parentNode.children;
    for(let i = 0; i < children.length; i++) {
      let child = children[i];
      if(child == element) return i;
    }
  }
}

class TabsManager {
  constructor(selectorTabs, selectorControls, selectorIndicator) {
    this.tabs = document.querySelector(selectorTabs);
    this.controls = document.querySelectorAll(selectorControls);
    this.indicator = document.querySelector(selectorIndicator);
    this.handleClick = this.handleClick.bind(this);
    this.setIndicatorWidth();
    this.bindEvents();
  }

  setIndicatorWidth() {
    this.indicator.style.width = this.controls[0].clientWidth + "px";
  }

  bindEvents() {
    this.controls.forEach(button => {
      button.addEventListener('click', this.handleClick);
    });
  }

  handleClick(event) {
    event.preventDefault();
    let button = event.currentTarget;
    let position = IndexForSiblings.get(button);
    this.indicator.style.left = (position * this.indicator.clientWidth) + "px";
    this.openTab(button.hash);
  }

  openTab(hash) {
    let tab = document.querySelector(hash);
    let position = IndexForSiblings.get(tab);
    this.tabs.querySelector('.container').style.left = -(position * 100) + "%";
  }
}

new TabsManager(".tabs", ".tabs-control a", ".indicator");