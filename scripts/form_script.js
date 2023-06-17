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

    toString() {
        return "id=" + this.id + ", name=" + this.name + ", address=" + this.address + 
                ", number=" + this.number + ", city=" + this.city + ", state=" + 
                this.state + ", zipcode=" + this.zipcode;
    }
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setAddressBookObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("/Users/admin/Documents/Java Fellowship Program/AddressBookApp/AddressBookList.html");
    } catch (e) {
        return;
    }
}

const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._number = getInputValueById('#number');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zipcode = getInputValueById('#zipcode');
}

/*const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList) {
        let addressBookData = addressBookList.find(addressData => addressData._name = addressBookObj._name);
        if (!addressBookData){
            addressBookList.push(createAddressBook());
        } else {
            const index = addressBookList.map(addressData => addressData._name).indexOf(addressBookData._name);
            addressBookList.splice(index, 1, createAddressBook(addressBookData._name));
        }
    } else {
        addressBookList = [createAddressBook()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}*/

const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name;
    } catch (e) {
        setValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData.addres = addressBookObj._address;
    } catch (e) {
        setValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData.number = addressBookObj._number;
    } catch (e) {
        setValue('.text-error', e);
        throw e;
    }
    addressBookData.city = addressBookObj.city;
    addressBookData.state = addressBookObj.state;
    addressBookData.zipcode = addressBookObj.zipcode;
    alert(addressBookData.toString());
}

/*const createAddressBook = () => {
    let addressBookData = new AddressBookData();
    try {
        addressBookData.name = getInputValueById('#name');
    } catch (e) {
        setValue('.text-error', e);
        throw e;
    }
    try {
        addressBookData.address = getInputValueById('#address');
    } catch (e) {
        setValue('.address-error', e);
        throw e;
    }
    try {
        addressBookData.number = getInputValueById('#number');
    } catch (e) {
        setValue('.number-error', e);
        throw e;
    }
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zipcode = getInputValueById('#zipcode');
    return addressBookData;
}*/

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList) {
        let addressBookData = addressBookList.find(addressData => addressData._name == addressBookObj._name);
        if (!addressBookData) {
            addressBookList.push(createAddressBook());
        } else {
            const index = addressBookList.map(addressData => addressData._name).indexOf(addressBookData._name);
            addressBookList.splice(index, 1, createAddressBookData(addressBookData._name));
            alert(addressBookData._name);
        }
    } else {
        addressBookList = [addressBookData]
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBookData = (name) => {
    let addressBookData = new AddressBookData();
    if (!name) addressBookData.name = createNewContactId();
    else addressBookData.name = name;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const resetForm = () => {
    setValue('#name','');
    setValue('#address','');
    setValue('#number','');
    setValue('#city','Bangalore');
    setValue('#state','Karnataka');
    setValue('#zipcode','560063');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

let isUpdate = false;
let addressBookObj = {};

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

    checkForUpdate();
});

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editAddress')
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObj._name);
    setValue('#address', addressBookObj._address);
    setValue('#number', addressBookObj._number);
    setValue('#city', addressBookObj._city);
    setValue('#state', addressBookObj._state);
    setValue('#zipcode', addressBookObj._zipcode);
}

const createNewContactId = () => {
    let contactName = localStorage.getItem("ContactName");
    contactName = !contactName ? 1 : contactName;
    localStorage.setItem("ContactName",contactName);
    return contactName;
}
