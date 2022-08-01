//VARIAVEIS MIN E MAX
const oNumMax = 1000;
const oNumMin = 0;

const spanMax = document.querySelector('.header-num label max');
const spanMin = document.querySelector('.header-num label min');
spanMax.innerHTML = oNumMax;
spanMin.innerHTML = oNumMin + 1;

// CONECTANDO COM HTML
const btnAdd = document.querySelector('#btn-num'); // botão para adicionar
const showNumAdd = document.querySelector('#show-array'); // caixa onde vai ser mostrado o numero adicionado

const btnReport = document.querySelector('#btn-report'); // botão para gerar relatório
const divReport = document.querySelector('#div-report'); // div do relatório
// BANCO DE DADOS
var dbNumeros = []; // array com os números adicionados
var dbPrimos = [];
// Relatório Gerado
const textReport = document.querySelector('.show-report');

// ZERAR TUDO
const btnReset = document.querySelector('.reset');
const zerarNum = document.querySelector('#input-num'); // para zerar o numero ao clicar em add
const infLabel = document.querySelector('.infLabel');
const infSpan = document.querySelector('.infSpan');
window.onload = numFocus();

window.addEventListener('keypress', (e) => {
    var combKey = window.event ? event : e;

    if (e.keyCode === 13) {
        Adicionar();
    } else if (e.keyCode == 6) {
        console.log(`combo apertado`);
        GenerateReport();
    }
});

function Adicionar() {
    infSpan.classList.remove('display-none');
    // CONECTANDO COM HTML

    const numAdd = Number(document.querySelector('#input-num').value); // número a adicionar

    // VALIDANDO ENTRADAS
    if (numAdd <= oNumMin || numAdd > oNumMax) {
        alert(`insira um número entre ${oNumMin} e ${oNumMax}`);
        infSpan.classList.add('display-none');
        numFocus();
    } else if (dbNumeros.includes(numAdd) == true && dbNumeros.indexOf(numAdd) != -1) {
        alert('insira um número diferente');
        infSpan.classList.add('display-none');
        numFocus();
    } else {
        if (dbNumeros.length >= 1) {
            btnReport.classList.remove('btn-disabled');
            infLabel.classList.remove('display-none');
            infSpan.classList.add('display-none');
        } else {
            btnReport.classList.add('btn-disabled');
            infLabel.classList.add('display-none');
        }

        dbNumeros.push(numAdd); // adicionei o número ao array
        showNumAdd.innerHTML = dbNumeros.join('<br/>');
    }

    // ZERAR VALORES
    zerarNum.value = '';
    divReport.classList.add('display-none');
    // focando no próximo número
    numFocus();
}

function numFocus() {
    document.getElementById('input-num').focus();
}

function GenerateReport() {
    // CONECTANDO COM O HTML
    const showReport = document.querySelector('.show-report');

    //MOSTRANDO RESULTADO REPORT
    divReport.classList.remove('display-none');
    // ESCONDENDO O LABEL DE COMBO BOTOES
    infLabel.classList.add('display-none');

    // DESCOBRINDO VALOR MÁXIMO DO ARRAY
    const numMax = Math.max(...dbNumeros);
    // DESCOBRINDO VALOR MÍNIMO DO ARRAY
    const numMin = Math.min(...dbNumeros);

    // SOMANDO TODOS OS VALORES DO ARRAY
    var soma = dbNumeros.reduce(function (soma, i) {
        return soma + i;
    });
    // CALCULANDO MÉDIA DOS VALORES DO ARRAY
    var media = soma / dbNumeros.length;

    // DESCOBRINDO QUANTOS NÚMEROS PARES E IMPARES TEM NO ARRAY
    var par = 0;
    var impar = 0;
    for (const i in dbNumeros) {
        if (dbNumeros[i] % 2 == 0) {
            par++;
        } else {
            impar++;
        }
    }
    // DESCOBRINDO OS NÚMEROS PRIMOS DO ARRAY
    for (let i = 0; i < dbNumeros.length; i++) {
        if (isPrime(dbNumeros[i]) > 0) {
            dbPrimos.push(isPrime(dbNumeros[i]));
            console.log(dbPrimos);
        }
    }

    function isPrime(n) {
        if (n <= 1) return console.log(`${n}nao é primo n<1`);
        for (let i = 2; i < n; i++) if (n % i == 0) return console.log(`${n}nao é primo`);
        return n;
    }

    // COLOCANDO NA TELA OS RESULTADOS
    if (dbPrimos.length > 0) {
        var textPrimos = `<br>Os Seguintes números são primos: <strong>
    ${dbPrimos.join(', ')}</strong>`;
    } else {
        var textPrimos = `nenhum <strong>número primo</strong> cadastrado`;
    }

    var textReport = `
                Ao todo, temos <strong>${dbNumeros.length}</strong> números cadastrados. <br>
                O maior valor informado foi <strong>${numMax}</strong>.<br>
                O menor valor informado foi <strong>${numMin}</strong>.<br>
                Somando todos os valores, temos <strong>${soma}</strong>.<br>
                A média dos valores digitados é <strong>${media.toFixed(2)}</strong>. <br>
                Temos <strong>${par}</strong> números pares e <strong>${impar}</strong> números impares.
                
                `;
    showReport.innerHTML = textReport + textPrimos;
    dbNumeros.length = 0;
    dbPrimos.length = 0;
    btnReport.classList.add('btn-disabled');
}

// REINICIAR TUDO COM BOTÃO RESET
btnReset.addEventListener('click', function () {
    zerarNum.value = ''; // zera o número a adicionar
    dbNumeros.length = 0; // zera o array de Numeros
    dbPrimos.length = 0; // zera o array primos
    showNumAdd.innerHTML = ' '; // tira os números adicionados
    btnReport.classList.add('btn-disabled'); // deixa o botão report desativado
    divReport.classList.add('display-none'); // esconde o display do resultado
});
