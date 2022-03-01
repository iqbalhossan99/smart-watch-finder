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

    phones.map(phone => {
        // console.log(phone)
        const searchResultDiv = document.getElementById('search-result');
        const createDisplayDiv = document.createElement('div');
        createDisplayDiv.classList.add('col');
        // createDisplayDiv.classList.add(' bg-danger');
        createDisplayDiv.innerHTML = `                       
            <div class="card ">
                <img  src="${phone.image}" class="card-img-top figure-img img-fluid rounded p-3" alt="...">
                <div class="card-body">
                    <h6 class="mt-3">${phone.phone_name}</h6>
                    <h5>${phone.brand}</h5> 
                </div>
                <div class="card-footer">
                    <button>See Details</button>
                </div>
            </div>
        `;

        searchResultDiv.appendChild(createDisplayDiv)
    });
}