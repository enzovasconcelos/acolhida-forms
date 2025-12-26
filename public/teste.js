const LIMITE_ESCALACAO = 2

let missas = [
    { data: new Date(), id: 1},
    { data: new Date(), id: 2},
    { data: new Date(), id: 3},
    { data: new Date(), id: 4},
    { data: new Date(), id: 5},
    { data: new Date(), id: 6},
    { data: new Date(), id: 7},
    { data: new Date(), id: 8}
];
let pessoas = [
    {nome: 'pessoa1', missasDisponiveis: [1, 2, 2]},
    {nome: 'pessoa2', missasDisponiveis: [2, 2, 2]},
    {nome: 'pessoa3', missasDisponiveis: [1, 2, 2]},
    {nome: 'pessoa4', missasDisponiveis: [1, 8, 2]},
    {nome: 'pessoa5', missasDisponiveis: [2, 7, 2]},
    {nome: 'pessoa6', missasDisponiveis: [3, 3, 2]},
    {nome: 'pessoa7', missasDisponiveis: [4, 5, 2]}
];

function main() {
    const escalacao = {};
    for(let i = 0; i < LIMITE_ESCALACAO; i++) {
        gerarEscalacao(pessoas, missas, escalacao);
    }
    console.log(escalacao);
}

function gerarEscalacao(pessoas, missas, escalacao) {
    let alocacoes = 0;
    const controle = {};
    while(alocacoes / 4 < missas.length && pessoas.length > 0) {
        let pessoaAleatoria = pessoas.splice(Math.floor(Math.random() * pessoas.length), 1)[0]; 
        console.log(pessoaAleatoria);
        const vezesEscalado = controle[pessoaAleatoria];
        /*if(vezesEscalado == null) {
            controle[pessoaAleatoria] = 1;
        } else if (vezesEscalado < 2){
            controle[pessoaAleatoria] += 1;
        } else {
            pessoas.slice(pessoaAleatoria, 1);
             continue;
        }*/
        let alocado = false;
        let missasCopia = pessoaAleatoria.missasDisponiveis.slice();
        console.log("length: ", missasCopia.length);
        while(missasCopia.length > 0) {
            console.log("entrou no segundo while");
            let missaDisponivelAlt = 
                missasCopia.splice(Math.floor(Math.random() * missasCopia.length), 1)[0];

            let pessoasEscaladas = escalacao[missaDisponivelAlt];
            if(pessoasEscaladas == null) {
                escalacao[missaDisponivelAlt] = [];
                pessoasEscaladas = [];
            }
            if(pessoasEscaladas.length < 4 && !pessoasEscaladas.includes(pessoaAleatoria)) {
                escalacao[missaDisponivelAlt].push(pessoaAleatoria)
                alocado = true;
                break;
            }
            console.log("missas copia length: ", missasCopia.length);
        }
        if(!alocado) {

        } else {
            alocacoes++;
        }
        console.log("número de alocações: ", alocacoes);
    }

    return escalacao;
}

main();
