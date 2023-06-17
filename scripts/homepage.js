let addressList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressList = getAddressBookDataFromStorage();
    document.querySelector(".address-count").textContent = addressList.length;
    createInnerHtml();
    localStorage.removeItem('editAddress');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th>Name</th><th>Address</th><th>Number</th><th>City</th><th>State</th><th>Zipcode</th><th>Actions</th>";
    if (addressList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const addressBookData of addressList) {
        innerHtml = `${innerHtml}
            <tr>
                <td>${addressBookData._name}</td>
                <td>${addressBookData._address}</td>
                <td>${addressBookData._number}</td>
                <td>${addressBookData._city}</td>
                <td>${addressBookData._state}</td>
                <td>${addressBookData._zipcode}</td>
                <td>
                    <img id="${addressBookData._name}" onclick="remove(this)" src="/Users/admin/Documents/Java Fellowship Program/AddressBookApp/image/icons8-delete-button-30.png" alt="delete">
                    <img id="${addressBookData._name}" onclick="update(this)" src="/Users/admin/Documents/Java Fellowship Program/AddressBookApp/image/icons8-edit-button-48.png" alt="edit">
                </td>
            </tr>
        `;
    }
    document.querySelector('.table').innerHTML = innerHtml;
}

const remove = (node) => {
    let addressBookData = addressList.find(addressData => addressData._name == node.id);
    alert(addressBookData._name + " contact is deleting...");
    if (!addressBookData) return;
    const index = addressList.map(addressData => addressData._name)
                    .indexOf(addressBookData._name);
    addressList.splice(index, 1);
    localStorage.setItem("AddressBookList",JSON.stringify(addressList));
    document.querySelector(".address-count").textContent = addressList.length;
    createInnerHtml();
}

const update = (node) => {
    let addressBookData = addressList.find(addressData => addressData._name == node.id);
    if (!addressBookData) return;
    localStorage.setItem('editAddress', JSON.stringify(addressBookData));
    window.location.replace("/Users/admin/Documents/Java Fellowship Program/AddressBookApp/AddressBookForm.html");
}