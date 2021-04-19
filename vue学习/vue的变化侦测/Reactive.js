function defineReactive(data, key, value) {
  // 新增
  //const dep = [];

  // 修改
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 新增
      // 收集依赖
      //dep.push(window.target);
      
      // 修改
      // 收集依赖
      dep.depend();
      
      return value;
    },
    set(newV) {
      if (newV != value) val = newV;
      // 新增
      // 触发依赖
      // for (let i = 0; i < dep.length; i++) {
      //   dep[i](newV, value);
      // }

      // 修改
      // 触发依赖
      dep.notify();

      // val = newV;
    }
  })
}

let obj = {}
defineReactive(obj, a, 1)