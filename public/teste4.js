const LIMITE_ESCALACAO = 2;
const LIMITE_SERVINDO = 4;

let missas = [
    { data: new Date(), id: 'qua, 05', prioridade: 3},
    { data: new Date(), id: 'qua, 12', prioridade: 3},
    { data: new Date(), id: 'qua, 19', prioridade: 3},
    { data: new Date(), id: 'qua, 26', prioridade: 3},
    { data: new Date(), id: 'sab, 01', prioridade: 4},
    { data: new Date(), id: 'sab, 08', prioridade: 4},
    { data: new Date(), id: 'sab, 15', prioridade: 4},
    { data: new Date(), id: 'sab, 22', prioridade: 4},
    { data: new Date(), id: 'sab, 29', prioridade: 4},
    { data: new Date(), id: 'sex, 07', prioridade: 5},
    { data: new Date(), id: 'novena', prioridade: 6},
    { data: new Date(), id: 'dom manhã, 02', prioridade: 2},
    { data: new Date(), id: 'dom noite, 02', prioridade: 1},
    { data: new Date(), id: 'dom manhã, 09', prioridade: 2},
    { data: new Date(), id: 'dom noite, 09', prioridade: 1},
    { data: new Date(), id: 'dom manhã, 16', prioridade: 2},
    { data: new Date(), id: 'dom noite, 16', prioridade: 1},
    { data: new Date(), id: 'dom manhã, 23', prioridade: 2},
    { data: new Date(), id: 'dom noite, 23', prioridade: 1},
    { data: new Date(), id: 'dom manhã, 30', prioridade: 2},
    { data: new Date(), id: 'dom noite, 30', prioridade: 1}
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
    {nome: 'Djane Medeiros Oliveira', missasDisponiveis: [missas[12], missas[14], missas[16], missas[18], missas[20]]},
    {nome: 'Igor', missasDisponiveis: [missas[11], missas[13], missas[15], missas[17], missas[19], missas[12], missas[14], missas[16], missas[18], missas[20]]},
];

const orderByPriority = missas => {
    return missas.sort((a, b) => b.prioridade - a.prioridade);
};

const getNaoRelacionados = contagem => {
    const p = [];
    for(let pessoa of pessoas) {
        if(!contagem[pessoa.nome])
            p.push(pessoa)
    }
    return p;
};

function main() {
    const missasOrdenadas = orderByPriority(missas);
    const escalacao = {};
    const naoRelacionados = [];
    const contagemPessoasServindo = {};
    for(let missa of missasOrdenadas) {
        escalarEssaMissa(escalacao, missa, contagemPessoasServindo);
    }  
    console.log("Escalação ---");
    console.log(escalacao);
    console.log(`Não relacionados: ---`);
    console.log(getNaoRelacionados(contagemPessoasServindo));
}

const ehCasal = pessoa => pessoa.nome.split(" e ").length > 1;

const contarServindo = (escalacao, missaId) => {
    let totalServindo = 0;
    escalacao[missaId].forEach(pessoa => {
        totalServindo += ehCasal(pessoa) ? 2 : 1;
    });
    return totalServindo;
};

const getPessoasDessaMissa = missa => {
    const pessoasDaMissa = [];
    for(let pessoa of pessoas) {
        if(pessoa.missasDisponiveis.includes(missa)) {
            pessoasDaMissa.push(pessoa);
        }
    }
    return pessoasDaMissa;
};

function escalarEssaMissa(escalacao, missa, contagemPessoasServindo) {
    escalacao[missa.id] = [];
    const pessoas = getPessoasDessaMissa(missa);
    console.log("pessoas dessa missa: ", missa.id);
    console.log(pessoas.length);
    let vezes = 0;
    while(pessoas.length > 0 && contarServindo(escalacao, missa.id) < LIMITE_SERVINDO) {
        const randomPerson = pessoas.splice(Math.floor(Math.random() * pessoas.length), 1)[0];
        if(!contagemPessoasServindo[randomPerson.nome]) {
            contagemPessoasServindo[randomPerson.nome] = 0;
        }
        console.log(contagemPessoasServindo[randomPerson.nome]);
        if(contagemPessoasServindo[randomPerson.nome] < LIMITE_ESCALACAO) {
            contagemPessoasServindo[randomPerson.nome] += 1;
            escalacao[missa.id].push(randomPerson);
        }
        console.log(`tem ${contarServindo(escalacao, missa.id)} pessoas já servindo na ${missa.id}`)
        console.log(`pessoas length: ${pessoas.length}`)
        console.log(`vezes iterando: ${++vezes}`);
    }
}

main();
