const LIMITE_ESCALACAO = 2;
// const LIMITE_RODADAS = 2;
const LIMITE_SERVINDO = 4;

// casal só servir uma vez
// procurar tirar os que serviram duas vezes e colocar não relacionados
// listar dos não relacionados, os dias que podem
// listar dos que serviram duas vezes, os dias também.

let missas = [
    { data: new Date(), id: 'qua, 03', prioridade: 2},
    { data: new Date(), id: 'qua, 10', prioridade: 2},
    { data: new Date(), id: 'qua, 17', prioridade: 2},
    { data: new Date(), id: 'sab, 06', prioridade: 4},
    { data: new Date(), id: 'sab, 13', prioridade: 4},
    { data: new Date(), id: 'sab, 20 manha', prioridade: 4},
    { data: new Date(), id: 'sab, 27', prioridade: 4},
    { data: new Date(), id: 'sab, 20 noite', prioridade: 3},
    { data: new Date(), id: 'sex, 05', prioridade: 5},
    { data: new Date(), id: 'dom manhã, 07', prioridade: 1},
    { data: new Date(), id: 'dom noite, 07', prioridade: 0},
    { data: new Date(), id: 'dom manhã, 14', prioridade: 1},
    { data: new Date(), id: 'dom noite, 14', prioridade: 0},
    { data: new Date(), id: 'dom manhã, 21', prioridade: 1},
    { data: new Date(), id: 'dom noite, 21', prioridade: 0},
    { data: new Date(), id: 'dom manhã, 28', prioridade: 1},
    { data: new Date(), id: 'dom noite, 28', prioridade: 0},
];

let pessoas = [
    {nome: 'Gracilene', missasDisponiveis: [missas[12], missas[14], missas[16], missas[10], missas[9], missas[11], missas[13], missas[15], missas[7]]},
    {nome: 'Elma e Fagner', missasDisponiveis: [missas[12], missas[14], missas[16], missas[10], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Rian', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6]]},
    {nome: 'Ellen Fernanda', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Tavin', missasDisponiveis: [missas[12], missas[14], missas[16], missas[10], missas[9], missas[11], missas[13], missas[15], missas[7]]},
    {nome: 'Osana', missasDisponiveis: [missas[4], missas[5], missas[6], missas[8], missas[0], missas[1], missas[2], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Marcela', missasDisponiveis: [missas[0], missas[1], missas[2], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Manoel Vitor', missasDisponiveis: [missas[12], missas[14], missas[16], missas[10], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Neto Macedo', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Beatriz Silva', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Aran', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Jajau e Nalva', missasDisponiveis: [missas[0], missas[1], missas[2], missas[10], missas[12], missas[14], missas[16], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'João Lima', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Leila', missasDisponiveis: [missas[0], missas[1], missas[2]]},
    {nome: 'Juciane', missasDisponiveis: [missas[12], missas[14], missas[16], missas[11], missas[13], missas[15]]},
    {nome: 'Emily', missasDisponiveis: [missas[8]]},
    {nome: 'José Michael', missasDisponiveis: [missas[7], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Laura', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Rita e Roberto', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16], missas[0], missas[1], missas[2]]},
    {nome: 'Dayane', missasDisponiveis: [missas[8], missas[7], missas[3], missas[4], missas[6]]},
    {nome: 'Kaylane Duarte', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6]]},
    {nome: 'Sabrina', missasDisponiveis: [missas[0], missas[1], missas[2]]},
    {nome: 'Enzo', missasDisponiveis: [missas[7], missas[3], missas[4], missas[5], missas[6], missas[12], missas[14], missas[16], missas[10], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Eduarda', missasDisponiveis: [missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Kailane Karen', missasDisponiveis: [missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Anderson', missasDisponiveis: [missas[8], missas[7], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Kennedy', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Nalanda', missasDisponiveis: [missas[0], missas[1], missas[2], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Nicolas', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Raiana', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16], missas[0], missas[1], missas[2], missas[7], missas[8]]},
    {nome: 'Eyshella', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Nilson', missasDisponiveis: [missas[7], missas[3], missas[4], missas[5], missas[6], missas[10], missas[12], missas[14], missas[16], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Ana Júlia', missasDisponiveis: [missas[7], missas[3], missas[4], missas[5], missas[6], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Ana Beatriz Oliveira', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Priscila', missasDisponiveis: [missas[7], missas[8], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Daniele', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6],  missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Guilherme', missasDisponiveis: [missas[0], missas[1], missas[2], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Debora', missasDisponiveis: [missas[0], missas[1], missas[2], missas[3], missas[4], missas[5], missas[6], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Djarlan', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Paola', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16], missas[7]]},
    {nome: 'Camila', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16], missas[7]]},
    {nome: 'Helen Kleselly', missasDisponiveis: [missas[0], missas[1], missas[2]]},
    {nome: 'Elissa', missasDisponiveis: [missas[0], missas[1], missas[2], missas[9], missas[11], missas[13], missas[15]]},
    {nome: 'Gabriela', missasDisponiveis: [missas[3], missas[4], missas[5], missas[6]]},
    {nome: 'Cezar', missasDisponiveis: [missas[9], missas[11], missas[13], missas[15], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Jordânia e Nailson', missasDisponiveis: [missas[0], missas[1], missas[2], missas[7], missas[3], missas[4], missas[5], missas[6]]},
    {nome: 'Myrella', missasDisponiveis: [missas[9], missas[11], missas[13], missas[15], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Suênia', missasDisponiveis: [missas[1], missas[2]]},
    {nome: 'Frankzao', missasDisponiveis: [missas[0], missas[1], missas[2], missas[10], missas[12], missas[14], missas[16]]},
    {nome: 'Fernanda e Gilvan', missasDisponiveis: [missas[10], missas[12], missas[14], missas[16]]},
];

const orderByPriority = missas => {
    return missas.sort((a, b) => b.prioridade - a.prioridade);
};

const getNaoRelacionados = contagem => {
    const p = [];
    let numNaoRelacionados = 0;
    for(let pessoa of pessoas) {
        if(!contagem[pessoa.nome] || contagem[pessoa.nome] == 0) {
            p.push(pessoa)
            numNaoRelacionados += ehCasal(pessoa) ? 2 : 1;
        }
    }
    return [p, numNaoRelacionados];
};

const getEscaladosDuasVezes = contagem => {
    const p = [];
    let numServiuDuasVezes = 0;
    for(let pessoa of pessoas) {
        if(contagem[pessoa.nome] && contagem[pessoa.nome] == LIMITE_ESCALACAO) {
            p.push(pessoa)
            numServiuDuasVezes += ehCasal(pessoa) ? 2 : 1;
        }
    }
    return [p, numServiuDuasVezes];
};

function main() {
    const missasOrdenadas = orderByPriority(missas);
    const escalacao = {};
    const contagemPessoasServindo = {};
    //for(let rodada = 1; rodada <= LIMITE_RODADAS; rodada++) {
        for(let missa of missasOrdenadas) {
            escalarEssaMissa(escalacao, missa, contagemPessoasServindo, 0);
        }  
    //}
    console.log("Escalação ---");
    console.log(escalacao);
    const [naoRelacionados, numNaoRelacionados] = getNaoRelacionados(contagemPessoasServindo);
    console.log(`Não relacionados: ---(${numNaoRelacionados})`);
    console.log(naoRelacionados);
    const [escaladosDuasVezes, numEscaladosDuasVezes] = getEscaladosDuasVezes(contagemPessoasServindo);
    console.log(`Escalado Duas Vezes: ---(${numEscaladosDuasVezes})`);
    console.log(escaladosDuasVezes);
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

const getIndiceAleatorio = (lengthPessoas) => {
    let indice = -1;
    for(let i = 0; i < 3; i++)
        indice = Math.floor(Math.random() * lengthPessoas);
    
    return indice;
};

// ajeitar aqui
const addOrdered = (array, element) => {
    array.push(element);
    array = array.sort((p1, p2) => { 
        if(p1.nome < p2.nome)
            return -1;
        else if(p1.nome > p2.nome)
            return 1;
        else
            return 0;
    });
};

function escalarEssaMissa(escalacao, missa, contagemPessoasServindo, limiteEscalacao) {
    escalacao[missa.id] = [];
    const pessoas = getPessoasDessaMissa(missa);
    console.log("pessoas dessa missa: ", missa.id);
    console.log(pessoas.length);
    let vezes = 0;
    while(pessoas.length > 0 && contarServindo(escalacao, missa.id) < LIMITE_SERVINDO) {
        let indiceAleatorio = getIndiceAleatorio(pessoas.length);
        const randomPerson = pessoas.splice(indiceAleatorio, 1)[0];
        if(!contagemPessoasServindo[randomPerson.nome]) {
            contagemPessoasServindo[randomPerson.nome] = 0;
        }
        console.log(contagemPessoasServindo[randomPerson.nome]);
        if(contarServindo(escalacao, missa.id) + (ehCasal(randomPerson) ? 2 : 1) > LIMITE_SERVINDO) {
            //pessoas.push(randomPerson);
            continue;
        }
        console.log(`${randomPerson.nome} servindo ${contagemPessoasServindo[randomPerson.nome]}`);
        if(contagemPessoasServindo[randomPerson.nome] < LIMITE_ESCALACAO) {
            contagemPessoasServindo[randomPerson.nome] += 1;
            addOrdered(escalacao[missa.id], randomPerson);
            // escalacao[missa.id].push(randomPerson);
        }
        console.log(`tem ${contarServindo(escalacao, missa.id)} pessoas já servindo na ${missa.id}`)
        console.log(`pessoas length: ${pessoas.length}`)
    }
}

main();
