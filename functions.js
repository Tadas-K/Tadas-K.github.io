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
        return `Vardas: ${this.name}\nPavardė: ${this.surename}\nEl. paštas: ${this.email}\nTelefonas: ${this.phoneNumb}\nAdresas: ${this.address}\nĮvesti skaičiai: ${this.numbs.join(", ")}\nViduris: `;
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

    let formAnswer = new FormObject(name, surename, email, phone, address, numbs);

    document.getElementById('form-output-id').innerText = formAnswer.getFormatedOutput();

    console.log(formAnswer.getFormatedOutput());
});


