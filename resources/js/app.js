// search phones
const searchPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}


// display phones
const displayPhones = (phones) => {

    phones.forEach(phone => {
        console.log(phone)
    });
}