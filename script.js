const maskNip = (target) => {
    target.addEventListener('keyup', () => {
        if (target.value.length === 3 || target.value.length === 7 || target.value.length === 10) {
            target.value = target.value + "-"
        } else if (target.value.length === 13) {
            validNip(target);
        }
    })
}

const validNip = () => {
    const regexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (target.value.match(regexp)) {
        addToLoacalStorage("nipCompany", target.value)
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
        input.value = localStorage.getItem(input.name);
    })
    document.querySelector('p span').textContent = localStorage.getItem('lastChange')
}


const init = () => {
    const allInput = document.querySelectorAll('input');
    autofill(allInput);
    allInput.forEach(input => {
        input.addEventListener('input', (event) => {
            if (event.target.name !== 'nipCompany' && event.target.name !== 'status') {
                const target = event.target.name;
                const value = event.target.value;
                addToLoacalStorage(target, value)
            } else if (event.target.name === "nipCompany") {
                // debugger
                const target = event.target.name;
                console.log(target)
                maskNip(target);

            } else if (event.target.name === "status") {
                const target = event.target.name;
                const value = event.target.id;
                addToLoacalStorage(target, value)
            }
        });
    })
}


init();
// maskNip()

// const status = document.querySelectorAll('[name=status]');
// status.forEach(s => {
//     s.addEventListener(('click'), (e) => {
//         console.log(e.target.id)
//     })
// })