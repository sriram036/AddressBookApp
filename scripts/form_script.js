class AddressBookData {
    get id() { return this._id; }
    set id(id) {
        this._id = id;
    }

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }

    get address() { return this._address; }
    set address(address) {
        let addressRegex = RegExp('^([a-zA-Z]{3,}[\\s]{1}){3,}$')
        if (addressRegex.test(address))
            this._address = address;
        else throw 'Address is Incorrect';
    }

    get number() { return this._number; }
    set number(number) {
        let numberRegex = RegExp('^[+]?([9]{1}[1]{1})?[0-9]{10}$')
        if (numberRegex.test(number))
            this._number = number;
        else throw 'Number is Incorrect';
    }

    get city() { return this._city; }
    set city(city) {
        this._city = city;
    }

    get state() { return this._state; }
    set state(state) {
        this._state = state;
    }

    get zipcode() { return this._zipcode; }
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }
}

const save = () => {
    try {
        let addressBookData = createAddressBook();
        createAndUpdateStorage(addressBookData)
    } catch (e) {
        return;
    }
}

const createAddressBook = () => {
    let addressBookData = new AddressBookData();
    try {
        addressBookData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData.address = getInputValueById('#address');
    } catch (e) {
        setTextValue('.address-error', e);
        throw e;
    }
    try {
        addressBookData.number = getInputValueById('#number');
    } catch (e) {
        setTextValue('.number-error', e);
        throw e;
    }
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zipcode = getInputValueById('#zipcode');
    return addressBookData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

    if(addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData]
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if(address.value.length == 0) {
            addressError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    const number = document.querySelector('#number');
    const numberError = document.querySelector('.number-error');
    number.addEventListener('input', function() {
        if(number.value.length == 0) {
            numberError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).number = number.value;;
            numberError.textContent = "";
        } catch (e) {
            numberError.textContent = e;
        }
    });
});