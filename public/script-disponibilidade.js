const mapNumberToDays = {
    0: 'Domingos',
    1: 'Segundas-feira',
    2: 'Terças-feiras',
    3: 'Quartas-feiras',
    4: 'Quintas-feiras',
    5: 'Sextas-feiras',
    6: 'Sábados',
};

const mapIntToDayWeek = {
    0: 'Domingo',
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado',
};

let days = {};
let daysSelected  = {};
let monthSelected = -1;
let baseUrl = "";
let massSelecteds = [];

const getDaysOfMass = async () => { 
    try {
        const response = await fetch(`${baseUrl}/getDaysOfMass`, { method: 'GET' });
        if(response.status !== 200) {
            console.error('An error when try get days of mass:', response);
            return;
        }
        const body = await response.json();
        days = body.days;
    } catch(error) {
        console.error("An error ocorred when get Days of mass:", error);
    }
}

function sendToServer(data) {
    hideContent();
    showLoading();
    fetch(`${baseUrl}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if(response.status !== 200) {
            console.error("An error ocurred to submit forms:", response);
        }
        return response.json();
    }).then(data => {
        console.log('response data:', data);
        hideLoading();
        showFormsAnswered();
    })
    .catch(error => {
        console.error(error);
    });
}

function showLoading() {
    const loadingContent = document.getElementById("loading");
    loadingContent.innerHTML = `
        <div class="card" style="text-align: center;">
            <p>Submetendo resposta...</p>
        </div>
    `;
}

function hideLoading() {
    const loadingContent = document.getElementById("loading");
    loadingContent.innerText = '';
}

function hideContent() {
    const content = document.getElementById("forms");
    content.innerHTML = '';
    const formsDescription = document.getElementById("forms-description");
    formsDescription.innerHTML = '';
}

function showFormsAnswered() {
    const loading = document.getElementById("answered");
    const div = document.createElement("div");
    div.classList.add("answered-content");
    div.classList.add("card");
    const p = document.createElement("p");
    p.style.textAlign = "center";
    p.innerText = "Resposta submetida. 🎉🎉🎉";
    div.appendChild(p);
    loading.appendChild(div);
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
    monthSelected = getMonthFromUrl();
    console.log(`Escalação para o mês ${monthSelected}`);
    baseUrl = window.location.origin;
    await getDaysOfMass();
    setDaysInUI(days);
    const response = await getMassGroups();
    setMassGroupsInUI(response.groups);
    addEventListenerOnSubmitButton();
}

function addEventListenerOnSubmitButton() {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', submit);
}

async function getMassGroups() {
    try {
        const response = await fetch(`${baseUrl}/getMassGroups`, { method: 'GET' });
        if(response.status !== 200) {
            console.error('An error ocorred when get mass groups:', response); 
            alert('Ocorreu um erro ao obter grupos de missa especifícas');
            return; 
        }
        return response.json();
    } catch(error) {
        console.error('An error ocorred when get mass groups:', error); 
        alert('Ocorreu um erro ao obter grupos de missa especifícas');
    }
}

async function setMassGroupsInUI(groups) {
    const groupsContent = document.getElementById("groups-content");
    console.log('groups:', groups);
    groups.forEach(g => {
        const card = document.createElement("div");
        card.classList.add("card"); 
        card.classList.add("card-disponibilidade"); 
        const h4 = document.createElement("h4");
        h4.innerText = g.nome;
        const ul = document.createElement("ul");
        ul.classList.add("list");
        ul.id = `${g.id}:list`;
        card.appendChild(h4);
        card.appendChild(ul);
        groupsContent.appendChild(card);
        addMissasOfGroup(`${g.id}:list`, g);
    });
}

function addMissasOfGroup(idList, group) {
    console.log('id list:', idList);
    const list = document.getElementById(idList);
    console.log(list);
    group.missas.forEach(m => {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = `checkbox:${m.id}`;
        input.addEventListener('click', selectMassByCheck)
        input.id = `checkbox:${m.id}`;
        const label = document.createElement("span");
        const date = new Date(m.date.nanoseconds);
        label.innerText = `${mapIntToDayWeek[date.getDay()]}, dia ${String(date.getDate()).padStart(2, '0')}`
        label.innerText += `/${String(date.getMonth() + 1).padStart(2, '0')}`;
        const minutesStr = date.getMinutes() == 0 ? '' : `:${String(date.getMinutes()).padStart(2, '0')}`;
        label.innerText += `, às ${String(date.getHours()).padStart(2, '0')}h${minutesStr} (${m.description})`;
        li.appendChild(input);
        li.appendChild(label);
        li.classList.add("group__list__item");
        li.id = m.id;
        li.addEventListener('click', selectMassOfGroup);
        list.appendChild(li);
    });
}

function selectMassByCheck() {
    const check = this;
    const li = document.getElementById(check.id.split(':')[1]);
    li.click();
}

function selectMassOfGroup() {
    const liItem = this;
    console.log(liItem);
    const checkbox = document.getElementById(`checkbox:${liItem.id}`); 
    if(checkbox.checked) {
        const i = massSelecteds.indexOf(liItem.id);
        massSelecteds.splice(i, 1);
    } else {
        massSelecteds.push(liItem.id); 
    }
    checkbox.checked = !checkbox.checked;
    console.log(massSelecteds);
}

function selectDayByCheck(dayId) {
    const a = document.getElementById(dayId);
    console.log(a);
    a.click();
}

function setDaysInUI(days) {
    const daysContainer = document.getElementById('days-container');
    for(let dayId in days) {
        const input = document.createElement('input');
        input.type = "checkbox";
        input.name = dayId;
        input.classList.add('checkbox');
        input.addEventListener('click', () => selectDayByCheck(dayId));
        input.id = `check:${dayId}`;
        const label = document.createElement('label');
        label.for = dayId;
        const minutosStr = days[dayId].horario.minutos == 0 ? "" : days[dayId].horario.minutos;
        label.textContent = 
            `${mapNumberToDays[days[dayId].horario.dia]}, às ${days[dayId].horario.hora}h${minutosStr}`;
        const a = document.createElement("a");
        a.appendChild(input);
        a.appendChild(label);
        a.id = dayId;
        a.addEventListener("click", selectDay);
        a.classList.add('checkbox-container');
        const daysDiv = document.createElement("div");
        daysDiv.classList.add("daysOfMissaContainer");
        daysDiv.id = `daysDiv:${dayId}`;
        const div = document.createElement("div");
        div.appendChild(a);
        div.appendChild(daysDiv);
        daysContainer.appendChild(div);
    };
}

const ehAnoBissexto = () => {
    const currentYear = new Date().getFullYear();
    return (currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0;
}

const getLastDayOfMonth = (monthSelected) => {
    let lastDay = -1;
    if([0, 2, 4, 6, 7, 9, 11].includes(monthSelected)) {
        lastDay = 31;
    } else if(monthSelected == 1) {
        lastDay = ehAnoBissexto() ? 29 : 28;
    } else {
        lastDay = 30;
    }
    return lastDay;
};

function selectDay() {
    const checkbox = document.getElementById(`check:${this.id}`);
    if(checkbox.checked) {
        daysSelected[this.id] = [];
        removeDaysSelected(this.id);
    } else {
        daysSelected[this.id] = [];
        showDaysSelected(this.id);
    }
    checkbox.checked = !checkbox.checked;
}

function removeDaysSelected(id) {
    const daysDiv = document.getElementById(`daysDiv:${id}`);
    daysDiv.innerHTML = '';
}

function showDaysSelected (id) {
    const daysDiv = document.getElementById(`daysDiv:${id}`);
    const daySelected = days[id];
    console.log('daySelected:', daySelected);
    const lastDayOfMonth = getLastDayOfMonth(monthSelected);
    console.log(lastDayOfMonth);
    for(let i = 1; i <= lastDayOfMonth; i++) {
        let auxDate = new Date();
        auxDate.setMonth(monthSelected);
        auxDate.setDate(i);
        if(auxDate.getDay() == daySelected.horario.dia) {
            const dayButton = document.createElement("button");
            dayButton.addEventListener("click", addDaySelected);
            dayButton.id = `${id}:${i}`;
            dayButton.classList.add("day-of-missa-button");
            dayButton.classList.add("day-selected");
            dayButton.textContent = i;
            daysDiv.appendChild(dayButton);
            daysSelected[id].push(i);
        }
    }
};

function addDaySelected() {
    const [dayId, dayOfWeekStr] = this.id.split(":"); 
    const dayOfWeek = parseFloat(dayOfWeekStr);
    const daySelectedArr = daysSelected[dayId];
    if(!daySelectedArr) {
        console.error(`Array of the day ${dayId}:${dayOfWeek} not defined`);
        return;
    }
    const dayIndex = daySelectedArr.indexOf(dayOfWeek);
    if(dayIndex >= 0) {
        daySelectedArr.splice(dayIndex, 1);
        this.classList.remove('day-selected');
    } else {
        daySelectedArr.push(dayOfWeek);
        this.classList.add('day-selected');
    }
    console.log('daysSelected of missas');
    console.log(daysSelected);
}

async function submit() {
    const name = document.getElementById('nome').value;
    const obs = document.getElementById('obs').value;
    if(!name) {
      console.log('submission cancelled. Name invalid');
      alert('Nome vazio');
      return;
    }
    console.log('submiting: ', {
        daysSelected,
        name,
        monthSelected,
        obs
    })
    sendToServer({
        daysSelected,
        name,
        monthSelected,
        obs,
        massSelecteds
    });
}

main();
