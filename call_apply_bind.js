function test(arg){
    console.log(this.variable + arg);
}

var obj = {
    variable : 1
};

//variable = 3;
test(1); // 直接执行，当前上下文中没有定义variable变量，结果为NaN
test.apply(obj, [1]);// this = obj, apply传参方式为数组形式，apply自动拆开数组分配给函数参数
test.call(obj,2);//this = obj，call传参方式为参数列表，按顺序分配给函数参数

var c =  test.bind(obj,3); //bind方法类似call，但是只绑定不执行，执行需要再做一次调用
c();