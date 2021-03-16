# ES6学习笔记

### 1. let const function

* let

  * let有块级作用域 ，在`{}`中定义变量，在`{}`之外是无法引用的

  * 暂时性死区：在有let声明的作用域中，在let声明之前使用let变量会出现引用错误
  * 在相同作用域层级上，不可以声明相同标识名变量。但是层级不同则可以**(注意：如果if判断语句没有`{}`，那么就没有块级作用域，块级作用域是和`{}`绑定在一起的)**

* function

  * 变量提升，会将函数声明提升到顶部（类似var），在ES5中没有块级作用的概念，例如

    ````js
    let a = 1;
    if(true) {
        function test(){
            a = 2;
        }
    } else {
        function test() {
            a = 3;
        }
    }
    test(); // a = 3
    ````

    在ES5中，函数会提升到顶部，会覆盖之前的定义

* const
  
  * 定义一个常量，本质上是声明一个指向固定地址的指针，修改指针地址会报错

### 2. 变量解构

* 数组解构（其实也是一种对象解构）

  * 数组解构的规则，当没有使用index来对应时，按照数组的顺序解构，当出现index时，安装index的值来解构

    ```js
    let [a, b, c] = [1, 2, 3] // a = 1, b = 2, c = 3 顺序解构
    let [a, [b], c] = [1, [2], 3] // a = 1, b = 2, c = 3 嵌套解构
    let [a, b, c] = [1, 2, 3, 4, 5] // a = 1, b = 2, c = 3 不完全解构
    let [a, b, c] = [1, 2] // a = 1, b = 2, c = undefined 不完全解构
    let [a, ...rest] = [1, 2, 3, 4] // a = 1, rest = [2, 3, 4] 使用扩展符来进行解构的赋值
    let [, , c] = [1, 2, 3] // c =  3 
    ```

    

    当解构的对象不是一个数组时或者转化对象以后不具备Iterator接口或者本身就不具备Iteratorjiek，则发生错误

    ```js
    // 报错
    let [foo] = 1;
    let [foo] = false;
    let [foo] = NaN;
    let [foo] = undefined;
    let [foo] = null;
    let [foo] = {};
    ```

  * 默认值
  
    数组的解构赋值在赋值数据为undefind时，可以给默认值，在数组赋值时，会使用严格等于`===`来判断是不是undefined
  
    ```js
    let [foo = 1] = [] // foo = 1
    let [foo = 1] = [null] // foo = null null === undefined = false
    ```
  
    假如使用函数来进行默认赋值，那么函数只会在使用时才会执行
  
    ```js
    let [foo = fn()] = [1] 
    等同于
    if([1][0] === undefined) {
        foo = fn()
    } else {
        foo = [1][0]
    }
    ```
  
    同时默认值也可以使用声明的变量，但是必须已经声明
  
    ```js
    let [foo = 1, bar = foo] = [] // foo = 1, bar = 1
    let [foo = bar, bar = 1] = [] // ReferenceError: bar is not defined
    ```
  
    

* 对象解构

  * 对象的解构模式

    ```js
    let {foo: bar} = { foo: 'baz' } //  foo是匹配模式，bar是被赋值的变量
    let { foo } = { foo: 'baz' } // 这是一种简写，当匹配模式和声明的变量相同时，可以简写
    ```

    对象解构和数组解构不同，对象解构必须取得他的同名变量，然后在赋值给声明变量，在此处， foo是匹配模式，bar是被赋值的变量，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

    对象的解构也可以嵌套，但是当嵌套的对象不存在时，会报错**（Tips：对象的解构赋值可以取到继承的属性）**

    ```js
    let { foo: { bar } } = {
        foo: {
            bar: 'baz'
        }
    } // bar = 'baz' 
    
    let { 0: a, 1: b, c: 2 } = [1, 2, 3] // a = 1, b = 2, c = 3 数组的本质还是对象，所以可以使用对象解构
    
    let { foo: {bar} } = { baz: 1 } // 报错
    
    const obj1 = {};
    const obj2 = { foo: 'bar' };
    Object.setPrototypeOf(obj1, obj2);
    
    const { foo } = obj1;
    foo // "bar"
    ```

  * 默认值

    对象解构也可以给默认值，生效的条件同样是严格等于undefined `===undefined`

* 其他类型的解构

  非object的解构都会转成object对象然后进行解构操作

  ```js
  let [a, b, c, d, e] = 'Hello'; // a = 'H', b = 'e', c = 'l', d = 'l', e = 'o'
  let {length: len} = 'Hello' // len = 5
  let { toString: s } = 123
  s === Number.prototype.toString // true
  let { toString: s } = true
  s === Boolean.prototype.toString // true
  let { prop: x } = undefined; // TypeError
  let { prop: y } = null; // TypeError / undefined 和 null 无法转成对象，所以对它们进行解构赋值，都会报错
  ```

### 3. 字符串的拓展

* 字符的Unicode表示法

  ES6加强了对Unicode的支持，允许采用`\uxxxx`的方式表示一个字符，其中`xxxx`表示字符的Unicode码点。但是这种表示法只允许`\u0000 - \uFFFF`之间的字符，超出了这个范围需要用两个双字节的形式表示

  ```js
  "\u0061"  //  a
  "\uD842\uDFB7" // "𠮷"
  
  "\u20BB7" // " 7" 直接在\u后面跟上超过0xFFFF的数值，js引擎会理解为 \u20BB + 7
  ```

  ES6对这点也进行了优化，新增了`{}`表示，只要将码点放入`{}`中，就可以正确的解读该字符

  ```js
  "\u{20BB7}"
  // "𠮷"
  
  "\u{41}\u{42}\u{43}"
  // "ABC"
  
  let hello = 123;
  hell\u{6F} // 123
  
  '\u{1F680}' === '\uD83D\uDE80'
  // true
  
  // 表示一个字符的6中方法
  '\z' === 'z'  // true
  '\172' === 'z' // true
  '\x7A' === 'z' // true
  '\u007A' === 'z' // true
  '\u{7A}' === 'z' // true 
  ```

* 字符串的遍历器接口

  ES6为字符串添加了遍历器接口，可以使得字符串可以被`for...of`进行遍历，最重要的是可以实别大于`0xFFFF`的码点，传统遍历无法识别。

  ```js
  let text = String.fromCodePoint(0x20BB7);
  
  for(let i = 0; i < text.length; i++) {
      console.log(text[i]);
  }
  // " "
  // " "
  
  for(let i of text) {
      console.log(i)
  }
  // "𠮷"
  ```

* 直接输入`U+2028` 和 `U+2029`

  js字符串允许直接输入字符，以及输入字符的转义形式，但是js规定5个字符，不能在字符串中直接使用，只能使用转义形式

  1. U+005C：反斜杠（reverse solidus)
  2. U+000D：回车（carriage return）
  3. U+2028：行分隔符（line separator）
  4. U+2029：段分隔符（paragraph separator）
  5. U+000A：换行符（line feed）

* JSON.stringify()的改造

  UTF-8规定，`0xD800 - 0xDFFF`之间的码点不能单独使用，必须配对使用。JSON.stringify()的问题在于，它可能返回``0xD800``到`0xDFFF`之间的单个码点。

  改造之后，如果遇到`0xD800`到`0xDFFF`之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

  ```js
  JSON.stringify('\u{D834}') // ""\\uD834""
  JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
  ```

* 模板字符串

  模板字符串会保留字符串中等值的空格和回车