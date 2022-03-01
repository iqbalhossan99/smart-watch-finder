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
                <img  src="${phone.image}" id="self-thumbnail-img" class="card-img-top rounded pt-3 w-75 mx-auto" alt="...">
                <div class="card-body">
                    <h6 class="mt-3">${phone.phone_name}</h6>
                    
                </div>
                <div class="card-footer">
                    <h5>${phone.brand}</h5> 
                    <button onclick="getPhoneDetails('${phone.slug}')" class="p-1 rounded">See Details</button>
                </div>
            </div>
        `;

        searchResultDiv.appendChild(createDisplayDiv)
    });
}


// display phone details
const getPhoneDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}

const displayPhoneDetails = (phoneDetails) => {
    console.log(phoneDetails.data)
    const displayPhoneDetailsDiv = document.getElementById('display-details');
    const createDisplayPhoneDetailsDiv = document.createElement('div');

    createDisplayPhoneDetailsDiv.innerHTML = `
        <div class="card mt-5 mb-3">
            <img src="${phoneDetails.data.image}" id="details-img" class="card-img-top w-50 mx-auto mt-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phoneDetails.data.name}</h5>
                    <h6 class="card-title">${phoneDetails.data.releaseDate}</h6>
                    <h3 class="card-title">Main Features</h3>
                    <p class="card-title"> <strong>ChipSet: </strong> ${phoneDetails.data.mainFeatures.chipSet}</p>
                    <p class="card-title"><strong>DisplaySize: </strong> ${phoneDetails.data.mainFeatures.displaySize}</p>
                    <p class="card-title"><strong>Memory: </strong> ${phoneDetails.data.mainFeatures.memory}</p>
                    <p class="card-title"><strong>Sensors: </strong> ${phoneDetails.data.mainFeatures.sensors}</p>
                    <h3 class="card-text">Other information</h3>
                    <p class="card-title"><strong>Bluetooth: </strong> ${phoneDetails.data.others.Bluetooth}</p>
                    <p class="card-title"><strong>GPS: </strong> ${phoneDetails.data.others.GPS}</p>
                    <p class="card-title"><strong>NFC: </strong> ${phoneDetails.data.others.NFC}</p>
                    <p class="card-title"><strong>Radio: </strong> ${phoneDetails.data.others.Radio}</p>
                    <p class="card-title"><strong>USB: </strong> ${phoneDetails.data.others.USB}</p>
                    <p class="card-title"><strong>WLAN: </strong> ${phoneDetails.data.others.WLAN}</p>
                    
                 </div>
        </div>
    `;

    displayPhoneDetailsDiv.appendChild(createDisplayPhoneDetailsDiv);

}