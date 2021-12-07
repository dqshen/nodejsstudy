// init函数中声明了name这个本地变量
// 随后displayName函数创建时,会将这个本地变量作为lexical环境的内容加入到这个函数的"闭包"中
// 当displaName函数调用时，能使用的变量就是创建时被放入这个"闭包"里的内容
function init() {
    var name = 'Mozilla'; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
      alert(name); // use variable declared in the parent function
    }
    displayName();
  }
  init();
  