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