// 1.在模块内部共享私有变量1
// 定义一个匿名函数对象并立即执行，写法是(function(){...})() 注意函数声明和调用时括号的用法
var counter = (function () {
    // privateCounter是匿名函数的lexical环境中的内部变量
    var privateCounter = 0;
    // 声明changeBy函数时，它所在的lexical环境中的内部变量privateCounter，自然被包含到函数的闭包中
    function changeBy(val) {
        privateCounter += val;
    }

    return {
        // 返回一个对象，它的各个property都是函数对象，执行时会关联changeBy的闭包，从而读取privateCounter
        // PS: 下面的三个函数property由于共享同一个闭包环境，所以用的是同一个privateCounter
        // PSS: 相比于一般用prototype声明property对象的方式，这种闭包的写法可以确保外部程序无法改动privateCounter，它是“私有”的
        increment: function () {
            changeBy(1);
        },

        decrement: function () {
            changeBy(-1);
        },

        value: function () {
            return privateCounter;
        }
    };
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.

// 2.在模块内部共享私有变量2
// 用一个工厂方法创建包含私有变量的对象
var makeCounter = function () {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function () {
            changeBy(1);
        },

        decrement: function () {
            changeBy(-1);
        },

        value: function () {
            return privateCounter;
        }
    }
};

var counter1 = makeCounter();
var counter2 = makeCounter();

// alert(counter1.value());  // 0.

counter1.increment();
console.log(counter1.value());
counter1.increment();
console.log(counter1.value());
// alert(counter1.value()); // 2.

counter1.decrement();
console.log(counter1.value());
console.log(counter2.value());
// alert(counter1.value()); // 1.
// alert(counter2.value()); // 0.

let counter3 = makeCounter();
// makeCounter.prototype.base = function(){
//     return 1;
// };
counter3.increment();
console.log(counter3.value());
let counter4 = new counter3.constructor();
counter4.value();
// console.log(counter4.base());

// alert(counter4.base()); // 1
// console.log(counter4.base());  // 1.
