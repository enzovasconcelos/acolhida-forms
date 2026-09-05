let baseUrl;

const mapIntToDayWeek = {
    0: 'Domingo',
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado',
};

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
    baseUrl = window.location.origin;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const memberName = urlParams.get('memberName');
    if (!memberName) {
        alert('Nome de mebro indefinido');
        return;
    };
    const month = getMonthFromUrl();
    const response = await fetch(`${baseUrl}/members/${memberName}/availability?month=${month}`);
    const responseData = await response.json();
    console.log('response: ', responseData)
    if (!responseData.success) {
        alert('Algo deu errado ao buscar disponibilidades de ' + memberName);
        return;
    }
    const schedules = responseData.availability.map(a => a.horario);
    showAvailability(memberName, schedules);
}

function showAvailability(memberName, availability) {
    const container = document.getElementById('container');
    const title = document.createElement('h4');
    title.innerText = `Disponibilidade de ${memberName}`;
    container.appendChild(title);
    
    const ul = document.createElement('ul');
    availability.forEach(a => {
        const li = document.createElement('li');
        li.innerText = `${mapIntToDayWeek[a.dia]} ${a.hora}:${a.minutos}`;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

main();