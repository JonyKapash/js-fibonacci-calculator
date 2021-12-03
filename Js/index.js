// Element decelerations
const inputNum = document.getElementById("inputNum");
const button = document.getElementById("myBtn");
const displayRes = document.getElementById("displayRes");
const loading = document.getElementById("loading");
const loading2 = document.getElementById("loading2");
const largeNumber = document.getElementById("largerNum");
const meaningOfLife = document.getElementById("meaningOfLife");
const userResultHistory = document.getElementById("userResultHistory");
const resultsList = document.getElementById("results-list");
const checkbox = document.getElementById("check-box");

// Server URLS
const fibRequest = "http://localhost:5050/fibonacci/";
const fibonacciResultsUrl = "http://localhost:5050/getFibonacciResults";

// Event listeners
window.addEventListener("load", function () {
	loading2.style.display = "inline-block";
	getPreviousResults();
});

button.addEventListener("click", function () {
	onButtonClick();
	if (checkbox.checked) {
		numberRouter(inputNum.value);
	} else {
		loading.style.display = "none";
		fibonacci(inputNum.value);
	}
});

const onButtonClick = () => {
	loading.style.display = "block";
	inputNum.style.border = "1px solid #CCCCCC";
	inputNum.style.color = "#373A3C";
	largeNumber.style.display = "none";
	meaningOfLife.innerText = "";
};

// routes the user input number
const numberRouter = userNum => {
	if (userNum > 50) {
		biggerThen50();
	} else if (userNum == 42) {
		numIs42(userNum);
	} else {
		numInRange(userNum);
	}
};

// fibonacci calculation not by server
// function fibonacci(num) {
// 	let prevNum = 0;
// 	let currentNum = 1;
// 	let temp;
// 	while (num >= 0) {
// 		temp = prevNum;
// 		prevNum = prevNum + currentNum;
// 		currentNum = temp;
// 		num--;
// 	}

// 	return (displayRes.innerHTML = currentNum);
// }

const fibonacci = num => {
	let solution;
	if (num < 2) {
		return num;
	} else {
		solution = fibonacci(num - 1) + fibonacci(num - 2);
	}
	return (displayRes.innerHTML = solution);
};

// fibonacci calculation by server
// const numInRange = userNum => {
// 	fetch(fibRequest + userNum)
// 		.then(response => {
// 			if (response.ok) {
// 				return response.json();
// 			} else {
// 				throw new Error("Something went wrong");
// 			}
// 		})
// 		.then(function (data) {
// 			let date = new Date(data.createdDate);
// 			let liItem = document.createElement("li");
// 			liItem.innerHTML = `The Fibonacci Of <b>${data.number}</b> is <b>${data.result}</b>. Calculated at: ${date}`;
// 			resultsList.appendChild(liItem);

// 			displayRes.style.display = "block";
// 			loading.style.display = "none";
// 			displayRes.innerText = data.result;
// 		})
// 		.catch(error => {
// 			loading.style.display = "none";
// 			console.log(error);
// 		});
// };

const numInRange = async userNum => {
	const response = await fetch(fibRequest + userNum);
	const data = await response.json();

	let date = new Date(data.createdDate);
	let liItem = document.createElement("li");
	liItem.innerHTML = `The Fibonacci Of <b>${data.number}</b> is <b>${data.result}</b>. Calculated at: ${date}`;
	resultsList.prepend(liItem);

	displayRes.style.display = "block";
	loading.style.display = "none";
	displayRes.innerText = data.result;
};

const biggerThen50 = () => {
	inputNum.style.color = "#D9534F";
	inputNum.style.border = "1px solid #D9534F";
	largeNumber.style.display = "block";
	displayRes.innerText = "";
	loading.style.display = "none";
};

const numIs42 = async userNum => {
	meaningOfLife.style.display = "block";
	displayRes.innerText = "";
	const response = await fetch(fibRequest + userNum);

	const result = await response.text();

	loading.style.display = "none";
	meaningOfLife.innerText = `Server error: ${result}`;
};

// Onload history of fibonacci results
const getPreviousResults = async () => {
	const response = await fetch(fibonacciResultsUrl);

	const data = await response.json();

	loading2.style.display = "none";
	for (let i = 0; i < data.results.length; i++) {
		let liItem = document.createElement("li");
		let date = new Date(data.results[i].createdDate);
		liItem.innerHTML = `The Fibonacci Of <b>${data.results[i].number}</b> is <b>${data.results[i].result}</b>. Calculated at ${date}`;
		resultsList.appendChild(liItem);
	}
};
