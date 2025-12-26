const LIMITE_ESCALACAO = 2;
const LIMITE_SERVINDO = 4;

let missas = [
    { data: new Date(), id: 'qua, 05'},
    { data: new Date(), id: 'qua, 12'},
    { data: new Date(), id: 'qua, 19'},
    { data: new Date(), id: 'qua, 26'},
    { data: new Date(), id: 'sab, 01'},
    { data: new Date(), id: 'sab, 08'},
    { data: new Date(), id: 'sab, 15'},
    { data: new Date(), id: 'sab, 22'},
    { data: new Date(), id: 'sab, 29'},
    { data: new Date(), id: 'sex, 07'},
    { data: new Date(), id: 'qui, 20'},
    { data: new Date(), id: 'dom manhã, 02'},
    { data: new Date(), id: 'dom noite, 02'},
    { data: new Date(), id: 'dom manhã, 09'},
    { data: new Date(), id: 'dom noite, 09'},
    { data: new Date(), id: 'dom manhã, 16'},
    { data: new Date(), id: 'dom noite, 16'},
    { data: new Date(), id: 'dom manhã, 23'},
    { data: new Date(), id: 'dom noite, 23'},
    { data: new Date(), id: 'dom manhã, 30'},
    { data: new Date(), id: 'dom noite, 30'}
];

let pessoas = [
    {nome: 'Maria Antonia', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[9], missas[10], missas[4], missas[5], missas[6], missas[7], missas[8], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Sabrina', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3]]},
    {nome: 'Gracilene', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20], missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Anderson', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[9], missas[10], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Franklin', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Tavin', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Osana', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[9], missas[10], missas[4], missas[5], missas[6], missas[7], missas[8], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Dayane', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[10]]},
    {nome: 'Marcela', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[10], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Eduarda', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Ellen', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Rayana', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[9], missas[10], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Lays', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Michael', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8]]},
    {nome: 'Mayara', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8]]},
    {nome: 'Jaíres', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[10]]},
    {nome: 'Aran', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Myrella', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'César', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Rita e Roberto', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[10], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Hellen', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3]]},
    {nome: 'Beto e Boneca', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    { nome: 'Emilly', missasDisponiveis: [missas[9]]},
    {nome: 'Nilson', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Laura', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'João Lima', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Elyssa', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3],missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Kailany K', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Guilherme', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Hayan e Rayla', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Manuel Vitor', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Djarlan', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Kailany D', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3]]},
    {nome: 'Ana Beatriz Oliveira', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Jordânia e Nailson', missasDisponiveis: [missas[0],missas[1], missas[2], missas[3], missas[9], missas[4], missas[5], missas[6], missas[7], missas[8]]},
    {nome: 'Enzo Diniz', missasDisponiveis: [missas[4], missas[5], missas[6], missas[7], missas[8], missas[12], missas[14], missas[16], missas[18], missas[20], missas[11], missas[13], missas[15], missas[17], missas[19]]},
    {nome: 'Ana Beatriz Dantas', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Kenned', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20], missas[0],missas[1], missas[2], missas[3]]},
    {nome: 'Djane', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Igor', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
];

const numEscalados = {
    numJovens: 0,
    numCasais: 0,
    total: function() {
        return this.numJovens + (this.numCasais * 2);
    }
};

function main() {
    const escalacao = {};
    const totalPessoas = pessoas.length;
    for(let pessoa of pessoas) {
        escalarPessoa(pessoa, escalacao, numEscalados);
    }

    while(numEscalados.total() < missas.length * LIMITE_SERVINDO && pessoas.length > 0) {
        const randomInd = Math.floor(Math.random() * pessoas.length);
        const pessoaAlt = pessoas.splice(randomInd, 1)[0];
        escalarPessoa(pessoaAlt, escalacao, numEscalados);
    }

    console.log(escalacao);
    console.log('Número de escalados: ', numEscalados.total());
    console.log('Número de pessoas no começo: ', totalPessoas);
    console.log('Número de pessoas que sobraram: ', pessoas.length);
}

function escalarPessoa(pessoa, escalacao, numEscalados) {
    const missas = pessoa.missasDisponiveis.slice();
    while(missas.length > 0) {
        const randomInd = Math.floor(Math.random() * missas.length);
        const missaAlt = missas[randomInd];
        if(!escalacao[missaAlt.id]) {
            escalacao[missaAlt.id] = {
                escalados: [],
                numJovens: 0,
                numCasais: 0,
                totalEscalados: function() {
                    return this.numJovens + this.numCasais * 2;
                }
            };
        }
        if(escalacao[missaAlt.id].totalEscalados() + funcao(pessoa.nome) <= LIMITE_SERVINDO && 
            !escalacao[missaAlt.id].escalados.includes(pessoa.nome)) {
            escalacao[missaAlt.id].escalados.push(pessoa.nome)
            if(ehCasal(pessoa.nome)) {
                escalacao[missaAlt.id].numCasais += 1;
                numEscalados.numCasais++;
            } else {
                escalacao[missaAlt.id].numJovens += 1;
                numEscalados.numJovens++;
            }
            break;
        } else {
            missas.splice(randomInd, 1);
        }
    }
}

function funcao(nome) {
    return ehCasal(nome) ? 2 : 1;
}

function ehCasal(nome) {
    return nome.split(" e ").length > 1;
}

main();
