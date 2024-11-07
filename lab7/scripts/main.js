
let counter =0;
function count() {
    document.querySelector('.contador').textContent = ++counter;
}

function textChange() {
    document.querySelector('#passarPorCima').textContent = 'Obrigado por passares!';
    
}

function textChange2() {
    document.querySelector('#passarPorCima').textContent = 'Passa por aqui!';
    
}


document.getElementById('button').addEventListener('click', count);

document.getElementById('passarPorCima').addEventListener('mouseover', textChange);
document.getElementById('passarPorCima').addEventListener('mouseout', textChange2);


document.getElementById('red').addEventListener('click', () => {
    document.querySelector('li#frase').style.color = 'red';
});

document.getElementById('green').addEventListener('click', () => {
    document.querySelector('li#frase').style.color = 'green';
});

document.getElementById('blue').addEventListener('click', () => {
    document.querySelector('li#frase').style.color = 'blue';
});


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

function changeBackground() {

}
function changeBackground() {
    return document.getElementById('inputIngles').value;
}
document.getElementById('ingles').addEventListener('click', () => {

document.querySelector('body').style.backgroundColor =''+ changeBackground() ;
});


//////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showAlert').addEventListener('click', () => {
        alert('Button clicked!');
    });

    document.getElementById('changeText').addEventListener('click', () => {
        document.getElementById('text').textContent = 'Text changed!';
    });

    document.getElementById('hideElement').addEventListener('click', () => {
        document.getElementById('elementToHide').style.display = 'none';
    });

    document.getElementById('showElement').addEventListener('click', () => {
        document.getElementById('elementToHide').style.display = 'block';
    });

    document.getElementById('logMessage').addEventListener('click', () => {
        console.log('Button was clicked!');
    });
});
