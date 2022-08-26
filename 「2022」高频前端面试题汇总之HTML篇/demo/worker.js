// 主线程中的api，worker表示是 Worker 的实例：

// worker.postMessage: 主线程往worker线程发消息，消息可以是任意类型数据，包括二进制数据
// worker.terminate: 主线程关闭worker线程
// worker.onmessage: 指定worker线程发消息时的回调，也可以通过worker.addEventListener('message',cb)的方式
// worker.onerror: 指定worker线程发生错误时的回调，也可以 worker.addEventListener('error',cb)
// Worker线程中全局对象为 self，代表子线程自身，这时 this指向self，其上有一些api：

// self.postMessage: worker线程往主线程发消息，消息可以是任意类型数据，包括二进制数据
// self.close: worker线程关闭自己
// self.onmessage: 指定主线程发worker线程消息时的回调，也可以self.addEventListener('message',cb)
// self.onerror: 指定worker线程发生错误时的回调，也可以 self.addEventListener('error',cb)
// https://zhuanlan.zhihu.com/p/79484282
let i = 1;
function simpleCount() {
  i++;
  self.postMessage(i);
  setTimeout(simpleCount, 1000);
}
simpleCount();
self.onmessage = (ev) => {
  postMessage(ev.data + '~~~~');
};
