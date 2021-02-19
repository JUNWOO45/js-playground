'use strict';

module.exports = pgjs;

function pgjs() {
  // TODO
}

class MyClass {
  #pField = 'junwoo';

  getPField() {
    return this.#pField;
  }
}

console.log(new MyClass().getPField());
