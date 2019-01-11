const maskPostcode = (target) => {
    const name = document.querySelector(`#${target}`);
    name.addEventListener('keyup', () => {
        if (name.value.length === 2) {
            name.value = name.value + "-"
        }
    })
    if (name.value.length === 6) {
        addToLoacalStorage(target, name.value)
    }
}

const maskNip = () => {
    const nip = document.querySelector('#nipCompany');
    nip.addEventListener('keyup', () => {
        if (nip.value.length === 3 || nip.value.length === 7 || nip.value.length === 10) {
            nip.value = nip.value + "-"
        }
    })
    if (nip.value.length === 13) {
        validNip(nip)
    }
}

const validNip = (nip) => {
    const regexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (nip.value.match(regexp)) {
        addToLoacalStorage("nipCompany", nip.value)
    }
}

const addToLoacalStorage = (target, value) => {
    localStorage.setItem(target, value);
    const date = new Date().toUTCString();
    localStorage.setItem('lastChange', date)
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}


const autofill = (allInput) => {
    allInput.forEach(input => {
        if (input.name !== "status") {
            input.value = localStorage.getItem(input.name);
        } else if (input.name === "status") {
            if (input.id === localStorage.getItem(input.name)) {
                input.setAttribute("checked", "checked")
            }
        }
    })
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}


const init = () => {
    const allInput = document.querySelectorAll('input');
    autofill(allInput);
    allInput.forEach(input => {
        input.addEventListener('input', (event) => {
            if (event.target.name !== 'nipCompany' && event.target.name !== 'status' && event.target.name === "postcodeClient" && event.target.name === "postcodeCompany") {
                const target = event.target.name;
                const value = event.target.value;
                addToLoacalStorage(target, value)
            } else if ((event.target.name === "postcodeClient") || (event.target.name === "postcodeCompany")) {
                const target = event.target.name;
                maskPostcode(target);
            } else if (event.target.name === "nipCompany") {
                maskNip();
            } else if (event.target.name === "status") {
                const target = event.target.name;
                const value = event.target.id;
                addToLoacalStorage(target, value)
            }
        });
    })
}


init();