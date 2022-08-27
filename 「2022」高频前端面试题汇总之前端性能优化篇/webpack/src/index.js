import helloWorld from './hello.js';
console.log(helloWorld());
function component() {
  const element = document.createElement('div');
  element.innerHTML = helloWorld();
  return element;
}

document.body.appendChild(component());
