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

const element = document.querySelector('div.row > ul.list-group > li');
console.log(element);

// querySelectorAll retorna una colección de elementos
const elements = document.querySelectorAll('div.row > ul.list-group > li');
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

const firstCourse = document.getElementById('#first-course');
console.log(firstCourse.childNodes);