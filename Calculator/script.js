const calculationDisplay = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");

let input = "";
let toggle = true;

function updateDisplay(){
  calculationDisplay.innerText = input || "0";
}

// NUMBER
document.querySelectorAll(".number").forEach(btn=>{
  btn.onclick = ()=>{
    input += btn.innerText;
    updateDisplay();
  }
});

// OPERATOR
document.querySelectorAll(".operator").forEach(btn=>{
  btn.onclick = ()=>{
    let op = btn.innerText;

    if(op==="×") op="*";
    if(op==="÷") op="/";
    if(op==="−") op="-";

    input += op;
    updateDisplay();
  }
});

// BRACKET
document.getElementById("paren-btn").onclick = ()=>{
  input += toggle ? "(" : ")";
  toggle = !toggle;
  updateDisplay();
};

// CLEAR
document.querySelector(".clear").onclick = ()=>{
  input="";
  resultDisplay.innerText="0";
  updateDisplay();
};

// BACKSPACE
document.getElementById("backspace").onclick = ()=>{
  input = input.slice(0,-1);
  updateDisplay();
};

// PLUS MINUS
document.querySelector(".toggle").onclick = ()=>{
  if(input.startsWith("-")){
    input=input.slice(1);
  }else{
    input="-"+input;
  }
  updateDisplay();
};

// SQUARE
document.getElementById("square").onclick = ()=>{
  try{
    let value = Function("return " + input)();
    let result = value * value;

    input = result.toString();
    updateDisplay();
    resultDisplay.innerText = result + "✨";
  }catch{
    resultDisplay.innerText="Error";
  }
};

// CUBE
document.getElementById("cube").onclick = ()=>{
  try{
    let value = Function("return " + input)();
    let result = value * value * value;

    input = result.toString();
    updateDisplay();
    resultDisplay.innerText = result;
  }catch{
    resultDisplay.innerText="Error";
  }
};

// POWER
document.getElementById("power").onclick = ()=>{
  input += "**";
  updateDisplay();
};

// PI
document.getElementById("pi").onclick = ()=>{
  input += "3.1416";
  updateDisplay();
};

// EQUAL
document.querySelector(".equals").onclick = ()=>{
  try{
    let result = Function("return " + input)();
    resultDisplay.innerText = result;
  }catch{
    resultDisplay.innerText="Error";
  }
};

// ----------------------------------------------------
// KEYBOARD 
// ----------------------------------------------------

function getButtonForKey(key) {
  let matchedBtn = null;
  let k = key.toLowerCase();
  
  document.querySelectorAll("button").forEach(btn => {
    let btnText = btn.innerText;
    if (key === btnText) matchedBtn = btn;
    else if (key === "Enter" && btnText === "=") matchedBtn = btn;
    else if (key === "Backspace" && btnText === "←") matchedBtn = btn;
    else if ((key === "Escape" || k === "c") && btnText === "AC") matchedBtn = btn;
    else if (key === "*" && btnText === "×") matchedBtn = btn;
    else if (key === "/" && btnText === "÷") matchedBtn = btn;
    else if (key === "-" && btnText === "−") matchedBtn = btn;
    else if ((key === "(" || key === ")") && btnText === "()") matchedBtn = btn;

    // Naye buttons
    else if (key === "^" && btnText === "xʸ") matchedBtn = btn;
    else if (k === "s" && btnText === "x²") matchedBtn = btn;
    else if (k === "b" && btnText === "x³") matchedBtn = btn;
    else if (k === "p" && btnText === "π") matchedBtn = btn;
  });
  return matchedBtn;
}

// (Press down)
document.addEventListener("keydown", e => {
  let key = e.key;
  let k = key.toLowerCase(); // 👇 Yahan 'k' define karna zaroori tha

  // Space ko number manne se rokne ke liye condition fix ki hai
  if(!isNaN(key) && key.trim() !== "") input+=key;

  if(key===".") input+=".";

  if(["+","-","*","/"].includes(key)){
    input+=key;
  }

  if(key==="(" || key===")") input+=key;

  if(key==="Enter" || key==="="){
    try{
      resultDisplay.innerText = Function("return " + input)();
    }catch{
      resultDisplay.innerText="Error";
    }
  }

  if(key==="Backspace"){
    input=input.slice(0,-1);
  }

  if(key === "Escape" || k === "c"){
    input="";
    resultDisplay.innerText="0";
  }

  //  CALCULATION LOGIC OF X2 , X3 , XY 
  if (key === "^") {
    input += "**"; 
  }
  
  if (k === "p") {
    input += "3.1416"; 
  }
  
  if (k === "s") {
    try{
      let value = Function("return " + input)();
      let result = value * value;
      input = result.toString();
      resultDisplay.innerText = result + "✨";
    }catch{
      resultDisplay.innerText="Error";
    }
  }
  
  if (k === "b") {
    try{
      let value = Function("return " + input)();
      let result = value * value * value;
      input = result.toString();
      resultDisplay.innerText = result;
    }catch{
      resultDisplay.innerText="Error";
    }
  }

  updateDisplay();

  
  let btn = getButtonForKey(key);
  if (btn) {
    btn.classList.add("keyboard-press");
  }
}); 

document.addEventListener("keyup", e => {
  let key = e.key;
  let btn = getButtonForKey(key);
  
  if (btn) {
    btn.classList.remove("keyboard-press"); 
  }
});