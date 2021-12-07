// 1.为函数对象构造lexical环境1
// 与closure-simple的情况不同,displayName没有立即执行，而是被作为函数对象重新赋值给myFunc
// myFunc()执行时，等价于执行displayName，displayName执行时用创建时的lexical环境，其中包含了name对象
// 所以alert能够正确调用name的值
function makeFunc() {
    var name = 'Mozilla';
    function displayName() {
      alert(name);
    }
    return displayName;
  }
  
  var myFunc = makeFunc();
  myFunc();

// 2.为函数对象构造lexical环境2
// makeAdder(x)为内部的匿名函数创建一个lexical环境,这个环境里有个本地变量x
// 返回的function(y)的闭包里就有变量x
// 执行makeAdder(5)是为其中的匿名函数add5创建一个本地变量x=5的lexical环境
// 执行makeAdder(10)是为又一个匿名函数add10创建一个本地变量x=10的lexical环境
  function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  
  console.log(add5(2));  // 7
  console.log(add10(2)); // 12