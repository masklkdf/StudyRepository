export default class Observe{
  constructor(value) {
    this.value = value;

    // 当为对象时，使用 get/set 方法
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    for (let [key, value] of Object.entries(obj)) {
      defineReactive(obj, key, value);
    }
  }
}