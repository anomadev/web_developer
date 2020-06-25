/**
 *
 * Objeto Window
 * objeto donde se declaran las variables de entorno y funciones globales que
 * provee el navegador, como lo es el objeto document.
 */

console.log(window.document);

/** Obtener elementos
 * ============================================================================
 */

/**
 * Obtener elementos mediante el atributo id.
 */

const title = document.getElementById('title');
console.log(title);
title.innerHTML = 'Cursos';

const description = document.getElementById('description');
description.innerHTML = 'Listado de cursos';

/**
 * Obtener elementos mediante la clase
 * todos los elementos tienen la propiedad className
 */

const classItems = document.getElementsByClassName('list-group-item');
console.log(classItems);

for (var i = 0; i < classItems.length; i++) {
  let element = classItems[i];
  console.log(element);
}

/**
 * Obtener elementos mpor etiqueta 
 * todos los elementos poseen el atributo tagName
 */

const tagsItems = document.getElementsByTagName('li');
for (var tag = 0; tag < tagsItems.length; tag++) {
  if (tag % 2 == 0) {
    let element = tagsItems[tag];
    element.style.background = '#F2F2F2';
  }
}

/**
 * Obtener elementos por CSS
 * querySelector retornara el primer elemento que cumpla con la regla de 
 * busqueda que le enviamos como argumento.
 * 
 * querySelector('#first-course') para id
 * querySelector('.list-group-item') para clase
 * querySelector('li') para etiquetas
 */

const element = document.querySelector('div.container > ul.list-group > li');
console.log(element);

// querySelectorAll retorna una colección de elementos
const elements = document.querySelectorAll('div.container > ul.list-group > li');
console.log(elements);

/**
 * Obtener elementos hijos de un elemento:
 * obj.childElementCount: cuenta los elementos hijos 
 * obj.children: retorna un listado de elementos hijos
 */

const elementParent = document.querySelector('ul');
console.log(elementParent.childElementCount);
console.log(elementParent.children);
console.log(elementParent.firstElementChild);
console.log(elementParent.lastElementChild);

/**
 * Obtener elementos hermanos
 * 
 * obj.parentElement: retorna el elemento padre de objeto.
 * obj.nextElementSibling: retorna el siguiente elemento en el mismo nivel.
 * obj.previousElementSibling: retorna el elemento anterior en el mismo nivel.
 * Si no hay un elemnto padre o hermano las funciones retornaran null.
 */

console.log(element.parentElement);
console.log(element.nextElementSibling);

/**
 * Nodos son los lementos más pequeños que encontramos en el arbol del DOM.
 * (etiquetas, texto o saltos de linea).
 */

const firstCourse = document.getElementById('first-course');
console.log(firstCourse.childNodes);

/** Atributos
 * ============================================================================
 */

/**
  * innerHTML almacena el html del elemento, incluyendo los saltos linea
  * este método medifica el DOM eliminando y creando elementos.
  */

console.log(description.innerHTML);
description.innerHTML = 'Listado de <strong>cursos profesionales</strong>';
console.log(description.textContent);

/** Eventos
 * ============================================================================
 * eventos click y doble click
 */

const btnClickEvent = document.querySelector('.clickEvent');
btnClickEvent.addEventListener('click', function() {
  console.log('Evento Click');
});

const btnDblClickEvent = document.querySelector('.dblClickEvent');
btnDblClickEvent.addEventListener('dblclick', function() {
  console.log('Evento Doble Click');
});

/**
 * objeto target es un atributo del objeto event, el cual almacena 
 * el elemento que disparo al evento.
 */

const btnTarget = document.querySelector('.objTarget');
btnTarget.addEventListener('click', function(event) {
  // el parametro event hace referencia al evento, para estae caso "click"
  console.log(event.target);

  if(title.style.display != 'none') {
    title.style.display = 'none';
    event.target.textContent = 'Mostrar Titulo';
  } else {
    title.style.display = 'block';
    event.target.textContent = 'Ocultar Titulo';
  }
});

/**
 * eventos del mouse
 */

btnTarget.addEventListener('mouseenter', function() {
  this.className = 'btn btn-primary';
});

btnTarget.addEventListener('mouseout', function() {
  this.className = 'btn btn-default';
});

/**
 * función del objeto window setTimeout, la cual ejecuta una función
 * despues de un tiempo estipulado.
 */

setTimeout(function(a, b, c) {
  console.log(`la suma es de: ${a + b + c}`);
}, 2000, 1, 2, 3);

/**
 * eventos del teclado
 */

const titleForm = document.querySelector('#title-form');
titleForm.addEventListener('keydown', function(event) {
  console.log('tecla presionada: '+event.key+' con el código: '+event.keyCode);
});

/**
 * evento submit 
 */

const form = document.getElementById('course-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  let title = document.getElementById('title-form').value;
  let description = document.getElementById('description-form').value;

  console.log(title);
  console.log(description);

  addToList(title);
});

/**
 * eventos de cambio de valor
 */

const cbChangeEvent = document.getElementById('checkbox-form');
cbChangeEvent.addEventListener('change', function() {
  console.log('cambio de valor');
});

/**
 * el evento DOMContentLoaded se ejecuta cuando el html es parseado y el dom
 * ya fue construido.
 * 
 * document.addEventListener('DOMContentLoaded', function(){});
 */

/**
 * Propagación de eventos:
 * event.target: mantiene el valor del elemento que lanzo el evento.
 * this: cambia su valor conforme se va propagando el evento.
 * 
 * Para evitar la propagación del evento podemos apoyarnos de:
 * event.stopPropagation() en el punto que deseamos.
 */

for(let element of document.querySelectorAll('*')) {
  element.addEventListener('click', showMessage);
}

function showMessage(event) {
  console.log("Elemento actual: " + this.tagName);
  console.log("Elemento que disparo el evento: " + event.target.tagName);
  console.log("\n");
}

/** Modificar el DOM
 * ============================================================================
 * agregar elementos al DOM
 */

courses = document.getElementById('list-courses');

function addToListWithInnerHTML(title) {
  let listItemTemplate = `<li class="list-group-item">${title}</li>`;
  courses.innerHTML += listItemTemplate; 
}

function addToList(title) {
  let listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.textContent = title;
  listItem.addEventListener('dblclick', deleteCurrentItem);

  courses.appendChild(listItem);
}

/**
 * eliminar elementos del DOM
 */

function deleteCurrentItem(event) {
  let item = event.target;
  courses.remove(item);
} 