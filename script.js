const allInput = document.querySelectorAll('input');

const autofill = () => {
    allInput.forEach(input => {
        input.value = localStorage.getItem(input.name);
    })
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}

const maskNip = () => {
    const nip = document.querySelector('#nipCompany');
    nip.addEventListener('keyup', () => {
        if (nip.value.length === 3 || nip.value.length === 7 || nip.value.length === 10) {
            nip.value = nip.value + "-"
        }
    })
}

const validNip = () => {
    const nip = document.querySelector('#nipCompany');
    const regexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (nip.value.match(regexp)) {
        console.log('poprawny')
        addToLoacalStorage("nipCompany", nip.value)
    }
}

const addToLoacalStorage = (target, value) => {
    console.log(target);
    console.log(value)
    localStorage.setItem(target, value);
    const date = new Date().toUTCString();
    localStorage.setItem('lastChange', date)
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}

allInput.forEach(input => {
    input.addEventListener('change', (event) => {
        const target = event.target.name;
        const value = event.target.value;
        if (event.target.name !== 'nipCompany') {
            addToLoacalStorage(target, value)
        } else if (event.target.name === "nipCompany") {
            validNip()
        }

    });
})
autofill()
maskNip()