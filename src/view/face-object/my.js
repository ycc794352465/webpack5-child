const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(handle) {
        this.status = PENDING;
        // 成功回调的值
        this.value = undefined;
        // 失败回调的值
        this.reason = undefined;
         // 注册的成功回调
        this.onResolvedCallbacks = [];
        // 注册的失败回调
        this.onRejectedCallbacks = [];
        if (!this._isFunction(handle)) {
            throw new Error("请传入一个函数");
        }
        handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(value) {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            // 5.3，同一promise对象可以添加多个then监听，状态改变时按照注册顺序依次执行
            this.onResolvedCallbacks.forEach(fn => fn(this.value));
          }
    }
    _reject(reason) {
        // 4，状态一旦发生改变就不可再次改变
    if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 5.3，同一promise对象可以添加多个then监听，状态改变时按照注册顺序依次执行
        this.onRejectedCallbacks.forEach(fn => fn(this.reason));
      }
    }
    then(onResolved, onRejected) {
        return new MyPromise((nextResolve, nextReject) => {
            // 1.判断有没有传入成功的回调
            if (this._isFunction(onResolved)) {
              // 2.判断当前的状态是否是成功状态
              if (this.status === FULFILLED) {
                try {
                  // 拿到上一个promise成功回调执行的结果
                  let result = onResolved(this.value);
                  // console.log("result", result);
                  // 判断执行的结果是否是一个promise对象
                  if (result instanceof MyPromise) {
                    result.then(nextResolve, nextReject);
                  } else {
                    // 将上一个promise成功回调执行的结果传递给下一个promise成功的回调
                    nextResolve(result);
                  }
                } catch (e) {
                  nextReject(e);
                }
              }
            }
            // 1.判断有没有传入失败的回调
            // if(this._isFunction(onRejected)){
            try {
              // 2.判断当前的状态是否是失败状态
              if (this.status === REJECTED) {
                let result = onRejected(this.reason);
                if (result instanceof MyPromise) {
                  result.then(nextResolve, nextReject);
                } else {
                  nextResolve(result);
                }
              }
            } catch (e) {
              nextReject(e);
            }
            // }
            // 2.判断当前的状态是否是默认状态
            if (this.status === PENDING) {
              if (this._isFunction(onResolved)) {
                // this.onResolvedCallback = onResolved;
                this.onResolvedCallbacks.push(() => {
                  try {
                    let result = onResolved(this.value);
                    if (result instanceof MyPromise) {
                      result.then(nextResolve, nextReject);
                    } else {
                      nextResolve(result);
                    }
                  } catch (e) {
                    nextReject(e);
                  }
                });
              }
              // if(this._isFunction(onRejected)){
              // this.onRejectedCallback = onRejected;
              this.onRejectedCallbacks.push(() => {
                try {
                  let result = onRejected(this.reason);
                  if (result instanceof MyPromise) {
                    result.then(nextResolve, nextReject);
                  } else {
                    nextResolve(result);
                    nextReject();
                  }
                } catch (e) {
                  nextReject(e);
                }
              });
              // }
            }
          })
      }
      catch(onRejected) {
        return this.then(undefined, onRejected);
    }
    static all(list){
        return new MyPromise(function (resolve, reject) {
            let arr = [];
            let count = 0;
            for(let i = 0; i < list.length; i++){
                let p = list[i];
                p.then(function (value) {
                    // arr.push(value); 注意不要这样写，会导致结果顺序不对
                    arr[i] = value
                    count++;
                    if(list.length === count){
                        resolve(arr);
                    }
                }).catch(function (e) {
                    reject(e);
                });
            }
        });
    }
    static race(list){
        return new MyPromise(function (resolve, reject) {
            for(let p of list){
                p.then(function (value) {
                    resolve(value);
                }).catch(function (e) {
                    reject(e);
                });
            }
        })
    }
    _isFunction(fn) {
      return typeof fn === "function";
    }
}