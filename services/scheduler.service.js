import { getDiasDeMissa, getDisponiveisDia } from './firebase.service.js';

const LIMITE_SERVINDO = 4;
const LIMITE_ESCALACAO = 2;
const MONTHS_THAT_HAVE_31_DAYS = [0, 2, 4, 6, 7, 9, 11];

const getLastDayOfMonth = (monthSelected) => {
    let lastDay = -1;
    if(MONTHS_THAT_HAVE_31_DAYS.includes(monthSelected)) {
        lastDay = 31;
    } else if(monthSelected == 1) {
        lastDay = ehAnoBissexto() ? 29 : 28;
    } else {
        lastDay = 30;
    }
    return lastDay;
};

const ehAnoBissexto = () => {
    const currentYear = new Date().getFullYear();
    return (currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0;
}

const verifyMonthIfMonthIsFromNextYear = (targetMonth, currentDate) => {
    return targetMonth < currentDate.getMonth() ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();
};

const buildMissas = async (month) => {
    const missas = [];
    const diasDeMissa = await getDiasDeMissa();
    const auxDate = new Date();
    let allPerson = new Set();
    auxDate.setFullYear(verifyMonthIfMonthIsFromNextYear(month, auxDate));
    for(let dia = 1; dia <= getLastDayOfMonth(); dia++) {
        auxDate.setDate(dia);
        const massDays = howManyMassDays(auxDate, diasDeMissa);
        for(let diaDeMissa of massDays) {
            console.log(diaDeMissa);
            const disponiveis = await getDisponiveisDia(diaDeMissa, month);
            allPerson = allPerson.union(new Set(getMembersOfAnswer(disponiveis)));
            missas.push({
                dia: dia, 
                horario: String(diaDeMissa.horario.hora).padStart(2, '0') + ":" + 
                         String(diaDeMissa.horario.minutos).padStart(2, '0'),
                diaDeMissa: diaDeMissa,
                escalacao: [],
                disponiveis: disponiveis 
            });
        }
    }

    return [missas, allPerson];
}

function getMembersOfAnswer(answer) {
    return answer.map(a => a.servidor.id);
}

function howManyMassDays(auxDate, massDays) {
    const result = [];
    for(let diaDeMissa of massDays) {
        if(diaDeMissa.horario.dia === auxDate.getDay()) {
            result.push(diaDeMissa);
        }
    }
    return result;
}

export const schedule = async (month) => {
    let [missas,  allPerson] = await buildMissas(month);
    missas = missas.sort((m1, m2) => m1.disponiveis.length - m2.disponiveis.length);
    const contagem = new Map();
    allPerson.forEach(p => { 
        contagem[p] = 0 
    });
    for(let { disponiveis, escalacao } of missas) {
        fillEscalacao(disponiveis, escalacao, contagem);
    }
    return {
        lineup: missas,
        count: contagem
    };
};

const ehCasal = nome => nome.split(" e ").length > 1;

const contarServindo = (escalacao) => {
    let totalServindo = 0;
    escalacao.forEach(pessoa => {
        totalServindo += ehCasal(pessoa) ? 2 : 1;
    });
    return totalServindo;
};

const getIndiceAleatorio = (lengthPessoas) => {
    return Math.floor(Math.random() * lengthPessoas);
};

function verifyPersonNameInMap(name, map) {
    if(!map[name]) {
        map[name] = 0;
    }
}

const addOrdered = (array, element) => {
    array.push(element);
    array = array.sort();
};

function limiteUltrapassado(person, escalacao, contagemPessoasServindo) {
    const currentPerson = ehCasal(person) ? 2 : 1;
    return (contarServindo(escalacao) + currentPerson > LIMITE_SERVINDO)
            || (contagemPessoasServindo[person] >= LIMITE_ESCALACAO);
}

function fillEscalacao(disponiveis, escalacao, contagem) {
    while(disponiveis.length > 0 && contarServindo(escalacao) < LIMITE_SERVINDO) {
        let indiceAleatorio = getIndiceAleatorio(disponiveis);
        const disponibilidade = disponiveis.splice(indiceAleatorio, 1)[0];
        const servidorName = disponibilidade.servidor.id + "";
        verifyPersonNameInMap(servidorName, contagem);
        if(!limiteUltrapassado(servidorName, escalacao, contagem)) {
            contagem[servidorName] += 1;
            addOrdered(escalacao, servidorName);
        }
    }
}
