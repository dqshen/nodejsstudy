// 1.闭包环境是向上逐层继承的
// 函数内部是local scope
// 然后是函数所在的lexical环境，逐层往外都是outer func scope
// 一直到最外层的js文件内全局，是global scope

// global scope
var e = 10;
function sum(a) {
    return function (b) {
        return function (c) {
            // outer functions scope
            return function (d) {
                // local scope
                return a + b + c + d + e;
            }
        }
    }
}

// 用()函数给各层匿名函数逐层传参并调用
console.log(sum(1)(2)(3)(4)); // log 20

// You can also write without anonymous functions:

// global scope
var e = 10;
function sum(a) {
    return function sum2(b) {
        return function sum3(c) {
            // outer functions scope
            return function sum4(d) {
                // local scope
                return a + b + c + d + e;
            }
        }
    }
}

var sum2 = sum(1);
var sum3 = sum2(2);
var sum4 = sum3(3);
var result = sum4(4);
console.log(result) //log 20

// 2.循环语句中，定义的item会被hoist存储到outer scope里，循环里创建的匿名函数的闭包的outer scope是相同的
function showHelp(help) {
    document.getElementById('help').textContent = help;
}

function setupHelpfault() {
    var helpText = [
        { 'id': 'email', 'help': 'Your e-mail address' },
        { 'id': 'name', 'help': 'Your full name' },
        { 'id': 'age', 'help': 'Your age (you must be over 16)' }
    ];

    for (var i = 0; i < helpText.length; i++) {
        // item在setupHelp的scope中被hoist到lexical环境，虽然循环执行3次，但lexical环境中item其实是唯一的
        var item = helpText[i];
        // 对于三个被创建的匿名函数的闭包，循环执行完毕时它们的outer scope最终是一样的，item是同一个
        // 三个不同的对象最后绑定的回调是一样的
        document.getElementById(item.id).onfocus = function () {
            showHelp(item.help);
        }
    }
}

setupHelpfault();

// 2.1 解决方案一：增加一层工厂函数，在每一轮循环中立即将变量传入工厂函数
// 这样实际上每个回调函数内部的help都是之前创建好的，不需要再到outer scope取值
function makeHelpCallback(help) {
    return function () {
        showHelp(help);
    };
}

function setupHelpOne() {
    var helpText = [
        { 'id': 'email', 'help': 'Your e-mail address' },
        { 'id': 'name', 'help': 'Your full name' },
        { 'id': 'age', 'help': 'Your age (you must be over 16)' }
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }
}

setupHelpOne();

// 2.2 解决方案二：增加一层立即调用的匿名函数，在每一轮循环中立即将变量传入工厂函数
// 这样实际上每个回调函数内部的help都是之前创建好的，同样不需要再到outer scope取值
function setupHelpTwo() {
    var helpText = [
        { 'id': 'email', 'help': 'Your e-mail address' },
        { 'id': 'name', 'help': 'Your full name' },
        { 'id': 'age', 'help': 'Your age (you must be over 16)' }
    ];

    for (var i = 0; i < helpText.length; i++) {
        (function () {
            var item = helpText[i];
            document.getElementById(item.id).onfocus = function () {
                showHelp(item.help);
            }
        })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
    }
}

setupHelpTwo();

// 2.3 用let语法,let与var不同，hoist时会随着块的不同而有所区分
  
  function setupHelp3rd() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    for (let i = 0; i < helpText.length; i++) {
      let item = helpText[i];
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
      }
    }
  }
  
  setupHelp3rd();
  
  // 2.4 用forEach语法，遍历时依序执行传入的匿名函数，原理上和2.2方案类似
  function setupHelp4th() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
  
    helpText.forEach(function(text) {
      document.getElementById(text.id).onfocus = function() {
        showHelp(text.help);
      }
    });
  }
  
  setupHelp4th();
  
  

