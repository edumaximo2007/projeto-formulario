/* const daNascimento = document.querySelector('#nascimento');
daNascimento.addEventListener('blur', (evento) =>{
    validardatanascimento(evento.target);
})
 */

export function valida(input){
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){

        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('input-mensagem-erro').innerHTML = mostrarMensagemDeErro(tipoDeInput, input);
    }
}

const tiposDeErro = [
    'valueMissing',
    'tipeMismatch',
    'patternMismatch',
    'customError'
]

const mesangensDeErro = {
    nome:{
        valueMissing: 'O campo nome não pode está vazio.'
    },
    email:{
        valueMissing: 'O campo email não pode está vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha:{
        valueMissing: 'O campo senha não pode está vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, uma letra maiúscula e uma minúscula, não é permitido caracteres especias.'

    },
    dataNascimento:{
        valueMissing: 'O capo data de nascimento não pode está vazio.',
        customError: 'Você deve ter 18 anos ou mais para efetuar o cadastro.'
    }   
}

const validadores = {
    dataNascimento:input => validardatanascimento(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mesangensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validardatanascimento(input){

    const dataRecebida = new Date(input.value);
    let mesangem = '';

    if(!maiorQue18(dataRecebida)){

        mesangem = 'Você deve ter 18 anos ou mais para efetuar o cadastro';
    }

    input.setCustomValidity(mesangem);
}

function maiorQue18(data){

    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    
    return dataMais18 <= dataAtual;
}
