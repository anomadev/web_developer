class Search {
  static get(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
          if(xhr.status == 200) return resolve(JSON.parse(xhr.responseText));
          reject(xhr.status);
        }
      }
    });
  }
}

class Autocomplete {
  constructor(inputSelector, baseURL) {
    this.search = this.search.bind(this);
    this.input = document.querySelector(inputSelector);
    this.url = baseURL;
    this.value = "";
    this.interval = null;
    this.buildDataList();
    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('keyup', () => {
      if(this.input.value == this.value || this.input.value.length < 2) return;
      if(this.interval) window.clearInterval(this.interval);
      this.value = this.input.value;
      this.interval = window.setTimeout(this.search, 500);
    })
  }

  buildDataList() {
    this.datalist = document.createElement('datalist');
    this.datalist.id = "datalist-autocomplete";
    document.querySelector('body').appendChild(this.datalist);
    this.input.setAttribute("list", "datalist-autocomplete");
  }

  search() {
    Search.get(this.url + this.value).then(results => this.build(results));
  }

  build(response) {
    this.datalist.innerHTML = "";
    response.results.forEach(item => {
      let optionEl = document.createElement('option');
      optionEl.value = item.name;
      this.datalist.appendChild(optionEl);
    })
  }
}

(function(){
  const apiURL = 'https://rickandmortyapi.com/api/character/?name=';
  let autocomplete = new Autocomplete('#searcher', apiURL);
})();