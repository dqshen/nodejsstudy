// 由于getColors的export操作对象用await生成,所以引擎会异步执行await操作的同时继续执行后续的import
import colors from './modules/getColors.js';
import { Canvas } from './modules/canvas.js';

// 在异步import完成之前,后续的脚本内容(后续的import除外)不会执行
let circleBtn = document.querySelector('.circle');
let squareBtn = document.querySelector('.square');
let triangleBtn = document.querySelector('.triangle');

// create the canvas and reporting list
let myCanvas = new Canvas('myCanvas', document.body, 480, 320);
myCanvas.create();
myCanvas.createReportList();

// draw a square
squareBtn.addEventListener('click', () => {
  import('./modules/square.js').then((Module) => {
    let square1 = new Module.Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, colors.blue);
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  })
});

// draw a circle
circleBtn.addEventListener('click', () => {
  import('./modules/circle.js').then((Module) => {
    let circle1 = new Module.Circle(myCanvas.ctx, myCanvas.listId, 75, 200, 100, colors.green);
    circle1.draw();
    circle1.reportArea();
    circle1.reportPerimeter();
  })
});

// draw a triangle
triangleBtn.addEventListener('click', () => {
  import('./modules/triangle.js').then((Module) => {
    let triangle1 = new Module.Triangle(myCanvas.ctx, myCanvas.listId, 100, 75, 190, colors.yellow);
    triangle1.draw();
    triangle1.reportArea();
    triangle1.reportPerimeter();
  })
});
