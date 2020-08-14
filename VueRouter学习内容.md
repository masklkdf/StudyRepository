# VueRouter学习内容

### 1. 命名视图



在常规组件中，router-view是没有name属性（默认 default），如：

```js
// Vue文件
<router-view></router-view>

// router.js
const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Vue
        }
    ]
})

// 带有命名的router-view
<router-view></router-view>
<router-view name="profile"></router-view>

// router.js
const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                default: Vue,
                profile: profile
            }
        }
    ]
})
```

### 2. 命名路由

在router.js 中 ，路由可以配置name属性，用来给 router-link 和 router用来跳转，如：

```js
const router = new VueRouter({
    routes: [
        {
            path: '/:homeId',
            name: 'home',
            component: Home
        }
    ]
})

// router-link
<router-link :to="{ name: 'home', params: {homeId: 123}}"></router-link>
// router
const homeId = 123;
router.push({name: 'home', params: {homeId: 123}})
router.push({path: `/${homeId}`})
router.push({name: 'home', params: {homeId: 123}}) // 如果提供了path，params将会被忽略， router-link也适用
```

### 3. 重定向

例如：当路由访问 /a 时， url会替换为 /b

```js
// 访问 /a 路径的url会跳转到 /b
const router = new VueRouter({
    routes: [
        // 普通的重定向
        {
            path: '/a',
            redirect: '/b'
        },
        // 重定向到一个命名的路由上
        {
            path: '/a',
            redirect: {name: 'foo'}
        }，
        // 使用方法进行重定向
        {
        	path: '/a',
        	redirect: to => {
        		//方法接收 目标路由 作为参数
        		// reutrn 重定向的 字符串路径/路径对象
        	}
        }
    ]
})

```

起别名，当用户访问 /b 时，url会保持 /b，但是路由匹配为 /a

```js
const router = new VueRouter({
    routes: [
        {
            path: '/a',
            component; A,
            alias: '/b'
        }0
    ]
})
```



