const allInput = document.querySelectorAll('input');

const autofill = () => {
    allInput.forEach(input => {
        input.value = localStorage.getItem(input.name);
    })
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}

allInput.forEach(input => {
    input.addEventListener('change', (e) => {
        localStorage.setItem(e.target.name, e.target.value);
        const date = new Date().toUTCString();
        localStorage.setItem('lastChange', date)
    });
})
autofill()