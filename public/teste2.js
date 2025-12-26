const LIMITE_ESCALACAO = 2;
const LIMITE_PESSOAS_MISSA = 4;

let datasMissas = [
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
    {nome: 'pessoa1'},
    {nome: 'pessoa2'},
    {nome: 'pessoa3'},
    {nome: 'pessoa4'},
    {nome: 'pessoa5'},
    {nome: 'pessoa6'},
    {nome: 'pessoa7'}
];
let forms = [
    { idMissa: datasMissas[0], disponiveis: [pessoas[0], pessoas[1], pessoas[3], pessoas[4]]},
    { idMissa: datasMissas[2], disponiveis: [pessoas[2], pessoas[1], pessoas[4], pessoas[0], pessoas[6]]},
    { idMissa: datasMissas[1], disponiveis: [pessoas[3], pessoas[0], pessoas[6]]},
    { idMissa: datasMissas[3], disponiveis: [pessoas[2], pessoas[1], pessoas[5]]},
    { idMissa: datasMissas[4], disponiveis: [pessoas[1], pessoas[4], pessoas[1]]},
    { idMissa: datasMissas[5], disponiveis: [pessoas[6], pessoas[4]]},
];

function main() {
    const result = gerarEscalacao(forms, pessoas, datasMissas);
    console.log(result);
}

function gerarEscalacao(forms, pessoas, missas) {
    const escalacao = {};
    const vezesServindo = {};
    for(let missa of forms) {
        console.log("iterando sobre a missa: ", missa.idMissa.id);
        const disponiveis = missa.disponiveis.slice();
        while(disponiveis.length > 0 && (escalacao[missa.idMissa.id]?.length ?? 0) < 
            LIMITE_PESSOAS_MISSA) {
            const randomNumber = Math.floor(Math.random() * disponiveis.length);
            const randomPerson = disponiveis.splice(randomNumber, 
                                                    1)[0];
            console.log("disponiveis length: ", disponiveis.length);
            console.log("número aletorio", randomNumber);
            if(vezesServindo[randomPerson] ?? 0 < LIMITE_ESCALACAO) {
                addPersonInEscalacao(randomPerson, missa.idMissa.id, escalacao);
                incVezesServindo(randomPerson, vezesServindo);
            }
        }
    }
    console.log(vezesServindo);

    return escalacao;
}

function addPersonInEscalacao(person, missa, escalacao) {
    if (!escalacao[missa]) {
        escalacao[missa] = []; 
    } 
    escalacao[missa].push(person);
    console.log("pessoa adicionada: ", person);
    console.log("na missa", missa);
}

function incVezesServindo(person, vezesServindo) {
    if(!vezesServindo[person]) {
        vezesServindo[person] = 0;
    }
    vezesServindo[person]++;
}

main();
