// 只有module文件才可以用import export关键字
const name = 'square';

function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}

function random(min, max) {
   let num = Math.floor(Math.random() * (max - min)) + min;
   return num;
}

function reportArea(length, listId) {
  let listItem = document.createElement('li');
  listItem.textContent = `${name} area is ${length * length}px squared.`

  let list = document.getElementById(listId);
  list.appendChild(listItem);
}

function reportPerimeter(length, listId) {
  let listItem = document.createElement('li');
  listItem.textContent = `${name} perimeter is ${length * 4}px.`

  let list = document.getElementById(listId);
  list.appendChild(listItem);
}

function randomSquare(ctx) {
  let color1 = random(0, 255);
  let color2 = random(0, 255);
  let color3 = random(0, 255);
  let color = `rgb(${color1},${color2},${color3})`
  ctx.fillStyle = color;

  let x = random(0, 480);
  let y = random(0, 320);
  let length = random(10, 100);
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}

// 非default对象导出时要用{}包起来
export { name, draw, reportArea, reportPerimeter };
// ES6为了方便兼容CommonJS等AMD{异步模块定义}模式的模块化系统,每个模块都可以export一个default function
// default function在import时不需要用大括号{} 直接写作 import func from 'module.js'
// 可以直接写export default function(...){...} 到import的时候再给它起名字
export default randomSquare;
