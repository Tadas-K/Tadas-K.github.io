document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.light-dark-button');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
