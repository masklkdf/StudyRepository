export default class Watcher{
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 获取值
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    // 触发一次对象的 key 的 get 方法，用于将实例收集
    this.value = this.get();
  }

  get() {
    // 将这个watcher实例挂载到 window 上
    window.target = this;
    const value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }
  // 依赖更新提醒
  notify() {
    const oldV = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldV);
  }
}

const bailRE = /[^\w.$]/
function parsePath(expOrFn) {
  if (bailRE.test(expOrFn)) return;

  const segments = expOrFn.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}