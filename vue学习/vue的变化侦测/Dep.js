export default class Dep{
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (window.target) this.subs.addSub(window.target);
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < this.subs.length; i++) {
      subs[i].update();
    }
  }
}


function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(;item)
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}