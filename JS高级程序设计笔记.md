# JS高级程序设计笔记

#### 1. 数据的重排序方法

+ sort

使用 sort 方法后，会调用每个数组项的 toString 方法，比较得到的字符串，来确定排序的位置；**即使数组中的数组项全是数组，依然会转化成字符串**，例如：

![sort方法](/git图床/数组的sort方法.png)

为了更好的进行排序任务，sort 方法可以接收一个函数作为参数，参数函数又接收两个参数，比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数，例如：

```js
function compare(value1, value2) {
    if (value1 < value2) return -1;
    else if (value1 > value2) return 1;
    else return 0;
}

let a = [0, 1, 5, 15, 10];

a.sort(compare); // [0, 1, 5, 10, 15]
```

如果想要降序只需要将返回的数组正负交换就可以了。对于数值类型或者其valueOf()方法会返回数值类型的对象类型，可以使用一个更简单的比较函
数。这个函数只要用第二个值减第一个值即可。

```js
function compare(value1, value2){
    return value2 - value1;
}
```

由于比较函数通过返回一个小于零、等于零或大于零的值来影响排序结果，因此减法操作就可以适
当地处理所有这些情况。

* reverse

反转数组中的元素

#### 2. JS中的继承



#### 3. BOM

> window

* BOM的核心，也是JS定义的全局（global）对象，因此可以再任意地方访问到window的属性和方法
* 使用 delete 关键字可以删除window的属性和方法，但是不可以删除使用var关键字声明的属性和方法（使用 IE < 9 的浏览器时，不管是window和var都会抛出错误），因为 使用var关键字声明的变量在添加到window对象上时，会添加 [Configurable: false] 的特性，使得它不可以被delete删除
* screenLeft | screenX， screenRight | screenY 窗口位置信息，浏览器提供的属性

> location

![location](/git图床/location对象.png)

> navigator

* 提供识别客户端浏览器的事实标准
* 可以用来检测插件

> screen

* 

> history

* 保存着用户的上网记录
* go 可以传入整数，前进后者返回浏览记录的长度，或者传入字符串，浏览器会检索最近浏览的包括参数的url
* forward, back go的替代品，相当于go(1),go(-1)



#### 4. 客户端检测

**在有通用的方法之前，最好不要使用客户端检测**

> 能力检测 | 特性检测

* 用来识别浏览器的能力，而不是浏览器





#### 5. DOM

> Node类型

​	DOM1级定义一个Node接口，DOM中的节点类型都继承了该类型；每一个节点都有一个childNodes属性，保存着NodeList对象（一种类数组对象），NodeList是一个动态的类数组，会根据dom的变化而变化；

* nodeName

获取元素节点标签名称

* nodeValue

nodeValue的值始终为null

* 使用xx.childNodes[index]和xx.childNodes.item(index)方法访问类数组
* 使用Array.prototype.slice方法可以将类数组转化成数组
* 每个节点都有一个parentNode属性，指向父节点
* previousSibing，访问同级的上一个兄弟节点，没有则为null
* nextSibing，访问同级的下一个兄弟节点，没有则为null
* firstChild，指向第一个子节点，没有则为null
* lastChild，指向最后一个子节点，没有则为null
* hasChildNodes()方法用来查询是否由子节点，返回bool，比查询childNodes.length方便
* ownerDocument，指向整个文档的文档节点

> 操作节点

* appendChild()，用来向childNodes列表的末尾添加一个节点，返回 新增的；如果该节点本身就在文档中存在，那么会将该节点从原来位置转移到新位置

* insertBefore(arg1, arg2), arg1：要插入的节点，arg2：作为参照的节点。如果arg2 = null ，相当于apendChild()
* replaceChild(arg1, arg2), arg1：要替换的节点，arg2：被替换的节点。
* removeChild(arg1), arg1：要移除的节点，return arg1
* cloneNode(arg1), arg1: bool, 是否深度克隆，克隆之后返回的节点属于文档所有；没有父节点，要手动指定； 该方法不会去复制添加到DOM节点种的JavaScript属性，只复制特性

* normalize(),，这个方法唯一的作用就是处理文档树中的文本节点。由于解析器的实现或DOM操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点的情况。当在某个节点上调用这个方法时，就会在该节点的后代节点中查找上述两种情况。如果找到了空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点。

> Document

Javascript 中 使用 Document 类型表示文档，在浏览器中，document 对象是HTMLDocument（继承自Document 类型）的一个实例，表示整个HTML 页面。而且，document 对象是window 对象的一个属性，因此可以将其作为全局对象来访问

> > Document属性

* nodeType值为9
* nodeName值为"#document"
* nodeValue的值为null
* parentNode值为null
* ownerDocument值为null
* 其子节点可能是一个DocumentType（最多一个），Element（最多一个），ProcessingInstruction或Comment