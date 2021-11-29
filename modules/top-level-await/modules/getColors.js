// fetch request
const colors = fetch('https://mdn.github.io/js-examples/modules/top-level-await/data/colors.json')
	.then(response => response.json());

// 程序会停在await位置,直到表达式colors以promise的形式处置完成
// 处置完成后后续的操作(export)才执行
export default await colors;