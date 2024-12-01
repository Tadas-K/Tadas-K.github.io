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
