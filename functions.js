const icon = document.getElementById('l-d-b-icon');
const sidebar = document.getElementById('sidebar');

let isDarkMode = false;

document.getElementById('darkModeToggle').addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    icon.textContent = isDarkMode ? 'dark_mode' : 'light_mode';

    document.body.classList.toggle('dark-mode');
});

document.getElementById('navEnableBut').addEventListener('click', () => {
    document.body.classList.toggle('hidden');
});



const spans = document.querySelectorAll('.navigation-bar span');

spans.forEach(span => {
    span.addEventListener('mouseenter', () => {
        span.closest('li').classList.add('active');
    });
    span.addEventListener('mouseleave', () => {
        span.closest('li').classList.remove('active');
    });
});



// Laikrodis
const timeParagraph = document.getElementById('clockParagraph');

setInterval(() => {
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    timeString = `${hours<10 ? "0" : ""}${hours}:${minutes<10 ? "0": ""}${date.getMinutes()}:${seconds<10? "0" : ""}${date.getSeconds()}`;

    timeParagraph.textContent = timeString;

}, 1000);



// Forma
class FormObject {
    constructor(name, surename, email, phoneNumb, address, numbs){
        this.name = name;
        this.surename = surename;
        this.email = email;
        this.phoneNumb = phoneNumb;
        this.address = address;
        this.numbs = numbs;
    }

    getFormatedOutput(){
        const average = this.getAverage();

        return `Vardas: ${this.name}\nPavardė: ${this.surename}\nEl. paštas: ${this.email}\nTelefonas: ${this.phoneNumb}\nAdresas: ${this.address}\nĮvesti skaičiai: ${this.numbs.join(", ")}\n`;
    }

    getAverage(){
        const strArrNumbSum = this.numbs.reduce((accSum, arrMember) => {
            return accSum + parseInt(arrMember); // accSum yra is praeitos iteracijos grazinama verte, arrMemeber tiesiog masyvo narys
        }, 0); // Pradedam nuo 0

        return strArrNumbSum / this.numbs.length; 
    }

    getAverageFormattedOutput(){
        return `${this.name} ${this.surename} (${this.email}) Požymių viduris: ${this.getAverage()}`;
    }
}


// function(event) naudojama vietoj () => {}, nes norime tureti ref i pradini 
// formos objekta, kad galetume paimti reiksmes, jeigu to nereikia, tai galima
// naudoti tuscia varianta () => {}
document.getElementById('form-id').addEventListener('submit', function(event) {
    // Neleidzia submitinti formos
    event.preventDefault();

    const name = document.getElementById("name-id").value;
    const surename = document.getElementById("surname-id").value;
    const email = document.getElementById("email-id").value;
    const phone = document.getElementById("phone-id").value;
    const address = document.getElementById("address-id").value;

    const numbs = [];
    const numName = "number-id";
    for(let i = 1; i <= 5; i++){
        numbs[i-1] = document.getElementById(`${numName}${i}`).value;
    }

    

    // Patikra, ar gerai ivede
    const { emailState: isEmailValid, phoneState: isPhoneValid, addressState: isAddressValid } = checkFormInputs(email, phone, address);

    // Ar netusti laukai
    if(name == "" | surename == "" | email == "" | phone == "" | address == "" | numbs.every(str => str !== "") == false){
        alert("Užpildykite visus formos laukus!");
        return;
    }

    if(isEmailValid == false){
        alert("Blogai ivestas el. pastas");
        return;
    }
    if(isPhoneValid == false){
        alert("Blogai ivestas telefono numeris");
        return;
    }
    if(isAddressValid == false){
        alert("Blogai ivestas adresas");
        return;
    }

    let formAnswer = new FormObject(name, surename, email, phone, address, numbs);

    //Isvedamas bendras rezultatas
    document.getElementById('form-output-id').innerText = formAnswer.getFormatedOutput();
    console.log(formAnswer.getFormatedOutput());

    // Isvedamas average rezultatas atskirai
    const averageP = document.getElementById('form-average-id');

    averageP.innerText = formAnswer.getAverageFormattedOutput();
    averageP.style.color = getColorFromValue(formAnswer.getAverage(), 1, 10); // Cia nustatomas spalvos gradientas, kaip buvo prasyta, 1 - raudona, 5 - oranzine, 10 - zalia 
    console.log(getColorFromValue(formAnswer.getAverage(), 1, 10));
});



// Formos ivesciu kontrole

function checkFormInputs(email, phone, address){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^86\d{7}$/;
    const addressPattern = /^[A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ ]+ (g\.|al\.) \d+(-\d+)?$/;

    const isEmailValid = emailPattern.test(email);
    const isPhoneValid = phonePattern.test(phone);
    const isAddressValid = addressPattern.test(address);

    return {
        emailState: isEmailValid,
        phoneState: isPhoneValid,
        addressState: isAddressValid
    }
}

// Spalvos mappingas
function getColorFromValue(value, min, max) {
    value = Math.floor(value); // Nuimamas float

    if (value <= min) {
        return "#ff0000"; // Jeigu maziau nei 1 ,tada raudona
    }
    if (value >= max) {
        return "#00ff00"; // Jeigu daugiau nei 10, tada zalia
    }

    //Normalizuojama verte, kad butu nuo 0 iki 1
    const normalized = (value - min) / (max - min);

    let r, g, b;

    if (normalized < 0.5) { // Nuo 0.5 imama, nes 2 intervalai pas mus: r-o ir o-g
        const factor = normalized * 2;
        r = 255;
        g = Math.round(165 * factor); // 165, kad gauti oranzine, nes 255 ir 255 duos geltona, sieksime 165, kas duoda oranzine
        b = 0;
    } else {
        const factor = (normalized - 0.5) * 2; // kadangi dabar jau eis nuo 0.5 iki 1, tai grazinama i 0-0.5 ir padauginama, kad butu nuo 0 - 1
        r = Math.round(255 - (255 * factor));
        g = 255;
        b = 0;
    }

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`; // Grazina hex formatu
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}