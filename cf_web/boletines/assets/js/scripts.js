console.log('Hola mundo, desde Javascript!!');

// DOM
// querySelector retorna un elemento html
let tabla = document.querySelector(".table");
console.log(tabla);

// querySelectorAll retorna una lista de nodos
let links = document.querySelectorAll("a");
links.forEach(function(link){
  console.log(link)
});

// Eventos
let celdas = document.querySelectorAll("td");
celdas.forEach(function(td) {
  td.addEventListener('click', function() {
    console.log(this);
  });
});

let buttons = document.querySelectorAll(".close");
buttons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    let content = document.querySelector(".content");

    content.classList.remove("animate__animated");
    content.classList.remove("animate__fadeInDown");

    content.classList.add("animate__fadeOutUp");
    content.classList.add("animate__animated");

    setTimeout(function() {
      location.href = "/boletines";
    }, 600);
  });
});