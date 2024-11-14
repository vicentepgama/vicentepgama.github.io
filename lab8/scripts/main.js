
// 1

function textChange() {
    document.querySelector('#passarPorCima').textContent = 'Obrigado por passares!';
    
}

function textChange2() {
    document.querySelector('#passarPorCima').textContent = 'Passa por aqui!';
    
}

document.getElementById('passarPorCima').addEventListener('mouseover', textChange);
document.getElementById('passarPorCima').addEventListener('mouseout', textChange2);

// 2
const frase = document.getElementById("frase");
document.querySelectorAll("#corGlobal").forEach((button) => {
    button.addEventListener("click", () => {
        
        const color = button.getAttribute("data-color");
        
        frase.style.color = color;
    });
});


// 3
document.getElementById('inputBox').addEventListener('input', () => {
    document.getElementById('inputBox').style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// 4

    
function alterarCor(selectElement) {
    
    document.body.style.backgroundColor = selectElement.value;
}


// 5
let count = parseInt(localStorage.getItem('count')) || 0; 
const botaoConta = document.querySelector('#conta');
const elementoContador = document.querySelector('#count');

elementoContador.textContent = `${count}`;

botaoConta.addEventListener('click', function() {
    count++;
    elementoContador.textContent = `${count}`;
    localStorage.setItem('count', count); 
});

// 6
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const submitBtn = document.getElementById("submitBtn");
const outputMessage = document.getElementById("outputMessage");

submitBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();

    if (name && age) {
        outputMessage.textContent = `Olá, o ${name} tem ${age}!`;
    } else {
        outputMessage.textContent = "Por favor, insira um nome e uma idade válidos.";
    }
});

// 7
let autoCount = 0;
const autoCounterDisplay = document.getElementById("autoCounter");

setInterval(() => {
    autoCount++;
    autoCounterDisplay.textContent = autoCount;
}, 1000);

