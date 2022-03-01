// search phones
const searchPhones = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    if (inputValue == '') {
        alert('Please enter you favourite phones name!')
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhones(data.data));
    }
}


// display phones
const displayPhones = (phones) => {

    const maxValue = phones.slice(0, 20);
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.textContent = '';
    if (phones.length == 0) {
        alert(`Didn't find any phones`);
    } else {
        maxValue.forEach(phone => {
            const createDisplayDiv = document.createElement('div');
            createDisplayDiv.classList.add('col');
            createDisplayDiv.innerHTML = `                       
                <div class="card ">
                    <img  src="${phone.image}" id="self-thumbnail-img" class="card-img-top rounded pt-3 w-50 mx-auto" alt="...">
                    <div class="card-body">
                        <h6 class="mt-3">${phone.phone_name}</h6>
                        
                    </div>
                    <div id="self-card-footer" class="card-footer d-flex  d-md-block d-lg-flex d-xl-flex">
                        <h6>${phone.brand}</h6> 
                        <button onclick="getPhoneDetails('${phone.slug}')"  id="self-details-btn"  class="p-1  ms-md-0 ms-lg-3 ms-xl-5 rounded">Details</button>
                    </div>
                </div>
            `;
            searchResultDiv.appendChild(createDisplayDiv);
        });
    }
}


// get phone details
const getPhoneDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}


// display phone details
const displayPhoneDetails = (phoneDetails) => {
    const displayPhoneDetailsDiv = document.getElementById('display-details');

    displayPhoneDetailsDiv.innerHTML = `
        <div class="col-8 mx-auto">
            <div class="card my-5 mb-3">
                <img src="${phoneDetails.data.image}" id="details-img" class="card-img-top w-25 mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title mt-3">${phoneDetails.data.name}</h5>
                        <h6 class="card-text">${phoneDetails.data.releaseDate? phoneDetails.data.releaseDate: `Release date didn't found!`}</h6>
                        <h3 class="mt-4">Main Features</h3>
                        <p class="card-text"> <strong>ChipSet: </strong> ${phoneDetails.data.mainFeatures.chipSet}</p>
                        <p class="card-text"><strong>DisplaySize: </strong> ${phoneDetails.data.mainFeatures.displaySize}</p>
                        <p class="card-text"><strong>Memory: </strong> ${phoneDetails.data.mainFeatures.memory}</p>
                        <p class="card-text"><strong>Sensors: </strong> ${phoneDetails.data.mainFeatures.sensors}</p>
                        <h3  class="mt-4">Other information</h3>
                        <p class="card-text"><strong>Bluetooth: </strong> ${phoneDetails.data.others.Bluetooth}</p>
                        <p class="card-text"><strong>GPS: </strong> ${phoneDetails.data.others.GPS}</p>
                        <p class="card-text"><strong>NFC: </strong> ${phoneDetails.data.others.NFC}</p>
                        <p class="card-text"><strong>Radio: </strong> ${phoneDetails.data.others.Radio}</p>
                        <p class="card-text"><strong>USB: </strong> ${phoneDetails.data.others.USB}</p>
                        <p class="card-text"><strong>WLAN: </strong> ${phoneDetails.data.others.WLAN}</p>
                    </div>
            </div>
        </div>
    `;

}