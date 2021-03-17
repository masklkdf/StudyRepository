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

  模板字符串会保留字符串中等值的空格和回车，在模板字符串中可以使用`${}`放置变量或者表达式，函数。但是如果变量或者函数没有声明，将会报错
  
  ```js
  let name = 'jf'
  
  console.log(`my name is ${name}`) => my name is jf
  console.log(`1 + 1 = ${1 + 1}`) => 1 + 1 = 2
  
  ```

* 标签模板

  ```js
  function test() {}
  let name = 'jf'
  
  test`my name is ${name}`
  等价于
  test(['my ', ' name', ' is ', raw: ['my ', ' name', ' is ']], 'jf')
  test(strList, ...values) => test(strList, value1, value2, ..., valuen)
  ```

  

### 4. 字符串新增方法

* String.fromCodePoint

  String.fromCodePoint方法可以识别`0XFFFF`以上的码点，String.fromCharCode只能识别`0xFFFF`一下的码点，如果码点超过了，fromCharCode会舍弃最高位；但是String.fromCodePoint()可以有多个参数，但是会将参数合并。**注意：fromCodePoint定义在String对象上，codePointAt定义在字符串的实例对象上。**

  ```js
  String.fromCharCode(0x20BB7) => String.fromCharCode(0x0BB7) // "ஷ"
  String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y' // true
  ```

* String.raw

  String.raw返回一个连斜杠都被转义（即在斜杠前面再加一个斜杠）的字符串，用于处理模板字符串。

  ```js
  String.raw`Hi\n${2 + 3}` // 实际返回'Hi\\n5'， 显示则为‘Hi\n5’
  String.raw`Hi\\n` // 实际返回‘Hi\\\\n’， 显示为'Hi\\n'
  
  // raw函数实现
  String.raw = function (strings, ...values) {
    let output = '';
    let index;
    for (index = 0; index < values.length; index++) {
      output += strings.raw[index] + values[index];
    }
  
    output += strings.raw[index]
    return output;
  }
  ```

* String.codePointAt

  js内部，字符以UTF-8的形式存储，每个字符固定两个子节，那么当一个字符占有4个子节的时候，或被认为是两个字符。

  ```js
  let s = "𠮷";
  
  s.length // 2
  s.charAt(0) // ''
  s.charAt(1) // ''
  s.charCodeAt(0) // 55362
  s.charCodeAt(1) // 57271
  ```

  总之，`codePointAt()`方法会正确返回 32 位的 UTF-16 字符的码点。对于那些两个字节储存的常规字符，它的返回结果与`charCodeAt()`方法相同。

  `codePointAt()`方法返回的是码点的十进制值，如果想要十六进制的值，可以使用`toString()`方法转换一下。最好配合`for...of`进行使用，因为`for...of`可以正确识别UTF-32的字符	,也可以使用`...`扩展运算符。

  codePointAt还可以用来测试一个字符是两个子节还是四个子节组成的

  ```js
  function is32Bit(c) {
      return c.codePointAt(0) > 0xFFFF;
  }
  
  is32Bit("𠮷") // true
  is32Bit("a") // false
  ```

* String.normalize

  许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode 提供了两种方法。一种是直接提供带重音符号的字符，比如`Ǒ`（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如`O`（\u004F）和`ˇ`（\u030C）合成`Ǒ`（\u004F\u030C）。

  ```js
  // 这两种表示方法，在视觉和语义上都等价，但是 JavaScript 不能识别。
  
  '\u01D1'==='\u004F\u030C' //false
  
  '\u01D1'.length // 1
  '\u004F\u030C'.length // 2
  
  // ES6 提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化。
  '\u01D1'.normalize() === '\u004F\u030C'.normalize()
  // true
  ```

  `normalize`方法可以接受一个参数来指定`normalize`的方式，参数的四个可选值如下。

  - `NFC`，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
  - `NFD`，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
  - `NFKC`，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，`normalize`方法不能识别中文。）
  - `NFKD`，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

  **注意：`normalize`方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过 Unicode 编号区间判断。**

* **实例方法：**includes()，startsWith（），endsWith（）

  传统上，js只有`indexof`方法来确认一个字符串是否包含在另一个字符串中。ES6提供了三种新方法。

  * includes（）：返回布尔值，表示是否找到了参数字符串
  * startsWith（）：返回布尔值，表示参数字符串是否在源字符串的头部。
  * endsWith（）：返回布尔值，表示参数字符串是否在源字符串的尾部。

  这三个方法都接收第二个参数，表示开始的位置。但是`endsWith`跟其他两个方法不同，endsWith表示0 - 当前位置。

  ```js
  let str = 'Hello World!'
  
  str.includes('llo') // true
  str.startsWith('He') // true
  str.endsWith('ld!') // true
  ```

* 实例方法：repeat（）

  `repeat`方法返回一个新字符串，表示将源字符串重复n次。参数如果是小数，会向下取整；负数或者`Infinity`会报错，但是如果是`0 - 1`之间的小数，将会视为0。参数为NaN，等同于0。如果参数为字符串，会先转成数字。

  ```js
  'x'.repeat(3) // 'xxx'
  'x'.repeat(2.9) // 'xx' 小数会向下取整
  
  'na'.repeat(Infinity) // RangeError
  'na'.repeat(-1) // RangeError
  
  'na'.repeat(-0.9) // ''
  'na'.repeat(NaN) // ''
  
  'na'.repeat('na') // ''
  'na'.repeat('2') // 'nana'
  
  ```

* **实例方法：**padStart()，padEnd()

  这两个方法使用来补全字符串的，都接收两个参数：最大补全的长度，补全用的字符串；`padStart`用来补全头部，`padEnd`用来补全尾部.

  * 如果第二个参数为空，默认使用空格补全。
  * 如果补全字符超过补全长度，将会截取字符串；如果补全字符串的长度不够，会重复字符串;如果源字符串长度超过第一个参数，那么返回源字符串，操作无效

  ```js
  'x'.padStart(5, 'abab') // 'ababx'
  'x'.padStart(5, 'abc') // 'abcax'
  'x'.padStart(5) // '    x'
  
  // 常见用途
  '1'.padStart(10, '0') // "0000000001"
  '12'.padStart(10, '0') // "0000000012"
  '123456'.padStart(10, '0') // "0000123456"
  
  '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
  '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
  ```

* **实例方法：**trimStart()，trimEnd()

  `trimStart`，`trimEnd`为清除字符串头部/尾部的空格，属于函数式，别名为`trimLeft`，`trimRight`

* **实例方法：**matchAll()

  该方法返回一个正则表达式在当前字符串的所有匹配

  ```js
  let itorator = 'avacab',matchAll(/a/g)
  
  itorator.next().value // ["a", index: 0, input: "avacab", groups: undefined]
  itorator.next().value // ["a", index: 2, input: "avacab", groups: undefined]
  itorator.next().value // ["a", index: 4, input: "avacab", groups: undefined]
  itorator.next().value // undefined
  ```

  

* **实例方法：**replaceAll()

  与`replace`方法相同，但是可以替换所有的，属于函数式。接收两个参数：搜索模式，替换字符串

  * 搜索模式可以是字符串，也可以是一个正则表达式，带有全局模式符`g`，如果没有，会报错;**注意：matchAll同**

  * 第二个参数表示替换字符串，可以使用一些特殊的字符串
    - `$&`：匹配的子字符串。
    - `$ ``：匹配结果前面的文本。
    - `$` `：匹配结果后面的文本。
    - `$n`：匹配成功的第`n`组内容，`n`是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
    - `$$`：指代美元符号`$`。
    - 也可以是一个函数，函数的返回值将替换掉第一个参数匹配的文本，这个替换函数可以接受多个参数。第一个参数是捕捉到的匹配内容，第二个参数捕捉到是组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置，最后一个参数是原字符串。

    ```js
  // $& 表示匹配的字符串，即`b`本身
  // 所以返回结果与原字符串一致
  'abbc'.replaceAll('b', '$&')
  // 'abbc'
  
  // $` 表示匹配结果之前的字符串
  // 对于第一个`b`，$` 指代`a`
  // 对于第二个`b`，$` 指代`ab`
  'abbc'.replaceAll('b', '$`')
  // 'aaabc'
  
  // $' 表示匹配结果之后的字符串
  // 对于第一个`b`，$' 指代`bc`
  // 对于第二个`b`，$' 指代`c`
  'abbc'.replaceAll('b', `$'`)
  // 'abccc'
  
  // $1 表示正则表达式的第一个组匹配，指代`ab`
  // $2 表示正则表达式的第二个组匹配，指代`bc`
  'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
  // 'bcab'
  
  // $$ 指代 $
  'abc'.replaceAll('b', '$$')
  // 'a$c'
  
  'aabbcc'.replaceAll('b', () => '_')
  // 'aa__cc'
  
  const str = '123abc456';
  const regex = /(\d+)([a-z]+)(\d+)/g;
  
  function replacer(match, p1, p2, p3, offset, string) {
    return [p1, p2, p3].join(' - ');
  }
  
  str.replaceAll(regex, replacer)
  // 123 - abc - 456
    ```

  

### 5. 正则的拓展

* `RegExp`构造参数

  在ES5中，`RegExp`函数有两种情况

  * 接收两个参数：字符串，正则表达式的修饰符。返回一个正则表达式。
  * 接收一个参数：正则表达式。返回一个正则表达式的拷贝。ES5 不允许此时使用第二个参数添加修饰符，否则会报错。

  ES6改变了这一行为，选择优先使用第二个参数的修饰符，覆盖正则表达式本身的修饰符。

* 字符串的正则方法

  