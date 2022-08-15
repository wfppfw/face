/**
 * 手写发布订阅
 */
// 发布订阅中心, on-订阅, off取消订阅, emit发布, 内部需要一个单独事件中心caches进行存储;
// interface CacheProps {
//     [key: string]: Array<((data?: unknown) => void)>;
//   }

const { prototype } = require('ws');

// class Observer {
//   private caches: CacheProps = {}; // 事件中心
//   on (eventName: string, fn: (data?: unknown) => void){ // eventName事件名-独一无二, fn订阅后执行的自定义行为
//     this.caches[eventName] = this.caches[eventName] || [];
//     this.caches[eventName].push(fn);
//   }

//   emit (eventName: string, data?: unknown) { // 发布 => 将订阅的事件进行统一执行
//     if (this.caches[eventName]) {
//       this.caches[eventName].forEach((fn: (data?: unknown) => void) => fn(data));
//     }
//   }

//   off (eventName: string, fn?: (data?: unknown) => void) { // 取消订阅 => 若fn不传, 直接取消该事件所有订阅信息
//     if (this.caches[eventName]) {
//       const newCaches = fn ? this.caches[eventName].filter(e => e !== fn) : [];
//       this.caches[eventName] = newCaches;
//     }
//   }

// }

// 手写Object.create
function create(proto) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.');
  }
  function F() {}
  F.prototype = proto;
  const obj = new F();
  return obj;
}
// console.log(create({ a: 'aa' }));

//手写 instanceof 方法
// 实现步骤
// 1. 首先获取类型的原型
// 1. 然后获得对象的原型
// 1. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`

function myInstanceOf(left, right) {
  let proto = Object.getPrototypeOf(left), //获取对象的原型
    prototype = right.prototype; //获取构造函数的prototype

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

//手写 new 操作符

// （1）首先创建了一个新的空对象

// （2）设置原型，将对象的原型设置为函数的 prototype 对象。

// （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

// （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

function objNew(Fn, ...arg) {
  //(1)(2)
  let result = Object.create(Fn.prototype); //let result = {};res.__proto__ = Fn.prototypr
  // (3)
  let res = Fn.call(result, ...arg);
  if ((typeof res === 'object' && res !== null) || typeof res === 'function') {
    return res;
  }
  return result;
}

// 手写防抖
// 在固定时间内只能触发一次事件。
// 1、比如说我们在前端的输入框输入文本的时候，此时会存在一些提示，这些提示都是从服务器获取的，此时当我们每输入一个字符的时候，就向服务器发送一个请求，此时就会造成资源浪费。所以一般我们都设置当用户一秒不输入内容的时候，再向服务器发送来获取数据。
// 2、比如说我们获取服务器资源为图片资源，当页面需要展示很多的图片时，此时如果想要进行滑动(移动端)，此时我们应该计算滑动的窗口的高度，如果当每加载完毕一个图片，就计算宽度，这样势必会造成资源浪费，所以我们判断当一秒钟之内没有任何资源加载的情况下，再去计算高度
function debound(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//手写节流
//函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效
function throttle(fn, delay) {
  let curTime = Date.now();
  return function (...args) {
    let nowTime = Date.now();
    if (nowTime - curTime >= delay) {
      return fn.apply(this, args);
    }
  };
}

//手写typeof

///////console.log(Object.prototype.toString.call(1).slice(8, -1).toLowerCase());
///////////
function myTypeof(temp) {
  return Object.prototype.toString.call(temp).slice(8, -1).toLowerCase();
}

//手写浅拷贝
function shallCopy(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

//深拷贝
function deepCopy(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (cache.has(obj)) return cache.get(obj);
  let newObj = Array.isArray(obj) ? [] : {};
  cache.set(obj, newObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key], cache);
    }
  }
  return newObj;
}
