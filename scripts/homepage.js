let addressList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressList = getAddressBookDataFromStorage();
    document.querySelector(".address-count").textContent = addressList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
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
                    <img id="${addressBookData._id}" onclick="remove(this)" src="/Users/admin/Documents/Java Fellowship Program/AddressBookApp/image/icons8-delete-button-30.png" alt="delete">
                    <img id="${addressBookData._id}" onclick="update(this)" src="/Users/admin/Documents/Java Fellowship Program/AddressBookApp/image/icons8-edit-button-48.png" alt="edit">
                </td>
            </tr>
        `;
    }
    document.querySelector('.table').innerHTML = innerHtml;
}