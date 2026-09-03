let monthSelected = 11;

function mapNumberToDays(dia) {
    const dayInStr = {
        0: 'Domingo',
        1: 'Segunda',
        2: 'Terça',
        3: 'Quarta',
        4: 'Quinta',
        5: 'Sexta',
        6: 'Sábado',
    };
    const date = new Date();
    date.setMonth(monthSelected);
    date.setDate(dia);
    return dayInStr[date.getDay()];
}

function getMonthFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const monthUrl = parseInt(urlParams.get('month'));
    if(isNaN(monthUrl) || monthUrl < 0 || monthUrl > 11) {
        console.error('month undefined');
        alert("Mês indefinido");
        throw new Error("Month selected undefined");
    }
    return monthUrl;
}

async function main() { 
    try {
        monthSelected = getMonthFromUrl();
    } catch(error) {
        console.error('erro ao definir mês:', error);
        showErrorScreen("O mês para qual está sendo feita a escalação não está definido. 😟");
        return;
    }
    console.log('ready to get disponibilidades')
    const data = await fetch(`http://localhost:8080/scheduleDisponibilidades?monthSelected=${monthSelected}`)
    const response = await data.json();
    console.log(response);
    showLineup(response.lineup);
}

function showLineup(lineup) {
    const container = document.getElementById('container');
    console.log(lineup);
    lineup = lineup.sort((m1, m2) => {
        const dayDiff = m1.dia - m2.dia;
        if(dayDiff != 0) {
            return dayDiff;
        }
        const hora1 = m1.diaDeMissa.horario.hora;
        const hora2 = m2.diaDeMissa.horario.hora;
        const horaDiff = hora1 - hora2;
        if(horaDiff != 0) {
            return horaDiff;
        }
        const minutos1 = m1.diaDeMissa.horario.minutos;
        const minutos2 = m2.diaDeMissa.horario.minutos;
        minutos1 - minutos2;
    });
    lineup.forEach(missa => {
        const missaDiv = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.innerText = `${mapNumberToDays(missa.dia)} ${missa.dia}/11/2026 ${missa.horario}`;
        const ul = document.createElement('ul');
        missa.escalacao.forEach(escalado => {
            const il = document.createElement('li');
            il.innerText = escalado;
            ul.appendChild(il);
        });
        missaDiv.appendChild(h4);
        missaDiv.appendChild(ul);
        missaDiv.classList.add('missa-div');
        container.appendChild(missaDiv);
    });
}

main();