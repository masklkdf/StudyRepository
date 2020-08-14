## Vue学习内容

#### 1. render函数的使用

!['render函数中createElement函数接收的参数'](./git图床/render函数中createElement函数接收的参数.png)

#### 2. Vue 自定义指令

##### 2.1. 定义指令

> 全局注册指令

​	Vue.directive(指令名称，{})

> 局部注册指令

​	写入一个 directives 对象

```js
directives: {
    指令名称: {
        
    }
}
```

##### 2.2. 钩子函数

##### 2.2.1.  一个自定义指令对象可以提供如下几个钩子函数（均为可选）

> bind

​	只调用一次，指令第一次绑定到元素时调用。在这里可以进行 一次性的初始化设置

> inserted

​	被绑定元素插入父节点时调用（仅保证父节点还存在，但不一定已被插入文档中）



> update

​	所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不	必要的模板更新

> componentUpdated

​	指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

> unbind

​	只调用一次，指令与元素解绑时调用。

##### 2.2.2. 钩子函数参数

> el

​	指令所绑定的元素，可以用来直接操作 DOM。

> binding：一个对象，包含以下 property
>
> >- `name`：指令名，不包括 `v-` 前缀。
> >- `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
> >- `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
> >- `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
> >- `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
> >- `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

> vnode

​	Vue 编译生成的虚拟节点。

> oldVnode

​	上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

**除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。**

##### 2.2.3. 动态指令参数



#### 3. 使用watch监听对象的属性

> 3.1. 使用计算属性

```vue
data: () => ({
	row: {
		data: {
			name: 'zs',
			age: 20
		}
	}
})
computed: {
	rowData() {
		return this.row.data
	}
}
watch: {
	rowData: {
		handler(new, old) {
			
		}
	}
}
```

> 3.2. 使用字符串

```vue
watch: {
	'obj.attribute': {
		handler(new, old){}
	}
}
```

> 3.3.  深度检测（此方法会消耗大量内存，不建议使用）

```vue
watch: {
	obj: {
		handler(new, old) {
		
		},
		deep: true
	}
}
```

