import { arrayMethods } from "./ArrayMethods";

const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export default class Observe{
  constructor(value) {
    this.value = value;

    // 当为对象时，使用 get/set 方法
    if (Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      // value.__proto__ = arrayMethods;
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

function protoAugment(target, src, arrayKeys) {
  target.__proto__ = src;
}

function copyAugment(target, src, arrayKeys) {
  for (let item of arrayKeys) {
    target[item] = src[item];
  }
}