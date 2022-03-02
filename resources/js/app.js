// search phones
const searchProducts = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';

    // spinner 
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    const searchResult = document.getElementById('search-result');

    searchResult.style.display = 'none'

    if (inputValue == '') {
        alert('Please enter you favourite phones name!')
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayProducts(data.data));
    }
}


// display phones
const displayProducts = (products) => {
    console.log(products)
    // get search result div
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // clear display product details
    productDetailsDiv.textContent = '';

    // get section title div
    const sectionTitle = document.getElementById('st-title');
    sectionTitle.textContent = '';

    // get max items to display in ui
    const maxItems = products.slice(0, 20);

    const restItems = products.slice(20);

    if (products.length == 0) {
        alert(`Didn't find any phones`);
    } else {

        // create new section title div
        const newTitleDiv = document.createElement('div')
        newTitleDiv.innerHTML = `<h2 class="mt-5 text-center">Top Brand Smart Phones and Watch</h2>`
        sectionTitle.appendChild(newTitleDiv);
        // map the phones
        maxItems.map(product => {

            const productsDisplay = document.createElement('div');
            productsDisplay.classList.add('col');
            productsDisplay.innerHTML = `                                                   
                <div class="card ">                   
                    <img  src="${product.image}" id="self-thumbnail-img" class="card-img-top rounded pt-3 w-50 mx-auto" alt="...">
                    <div class="card-body">
                        <h6 class="mt-3">${product.phone_name}</h6>                        
                    </div>
                    <div id="self-card-footer" class="card-footer d-flex  d-md-block d-lg-flex d-xl-flex">
                        <h6>${product.brand}</h6> 
                        <button onclick="getProductDetails('${product.slug}')"  id="self-details-btn"  class="p-1  ms-md-0 ms-lg-3 ms-xl-5 rounded">Details</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(productsDisplay);

            spinner.style.display = 'none';
            searchResult.style.display = 'block'

        });
    }

    const showMoreButton = document.getElementById('show-more-div');
    showMoreButton.innerHTML = `<button  id="show-more-btn" class=" mt-4 p-1 rounded">Show
    More</button>`;

    const showMoreBtn = document.getElementById('show-more-btn')
    showMoreBtn.onclick = () => {
        restItems.map(element => {
            const productsDisplay = document.createElement('div');
            productsDisplay.classList.add('col');
            productsDisplay.innerHTML = `                                                   
                <div class="card  ">                   
                    <img  src="${element.image}" id="self-thumbnail-img" class="card-img-top rounded pt-3 w-50 mx-auto" alt="...">
                    <div class="card-body">
                        <h6 class="mt-3">${element.phone_name}</h6>                        
                    </div>
                    <div id="self-card-footer" class="card-footer d-flex  d-md-block d-lg-flex d-xl-flex">
                        <h6>${element.brand}</h6> 
                        <button onclick="getProductDetails('${element.slug}')"  id="self-details-btn"  class="p-1  ms-md-0 ms-lg-3 ms-xl-5 rounded">Details</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(productsDisplay);
        })
        // getColClass.style

    }
}










// get phone details
const getProductDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayProductDetails(data.data))
}


const productDetailsDiv = document.getElementById('display-details');

// display phone details
const displayProductDetails = (phoneDetails) => {


    const createProductDetailsDiv = document.createElement('div');

    createProductDetailsDiv.innerHTML = `
    <h2 class="section-title mt-5"> Full Details About ${phoneDetails.name?phoneDetails.name :"Didn't find product name"}</h2> 
        <div class="col-8 mx-auto">            
            <div class="card my-4 mb-3 shadow ">
                <img src="${phoneDetails.image? phoneDetails.image : "Didn't find features img" }" id="details-img" class="card-img-top w-25 mx-auto mt-3" alt="...">
                    <div class="card-body">
                        <h5 class="card-title mt-3">${phoneDetails.name? phoneDetails.name: "Didn't find product img"}</h5>
                        <h6 class="card-text">${phoneDetails.releaseDate? phoneDetails.releaseDate : `Release date didn't found!`}</h6>
                        <h3 class="mt-4">Main Features</h3>
                        <p class="card-text"> <strong>ChipSet: </strong> ${phoneDetails.mainFeatures.chipSet?phoneDetails.mainFeatures.chipSet:"Didn't find chipSet features"}</p>
                        <p class="card-text"><strong>DisplaySize: </strong> ${phoneDetails.mainFeatures.displaySize?phoneDetails.mainFeatures.displaySize:"Didn't find display size features"}</p>
                        <p class="card-text"><strong>Memory: </strong> ${phoneDetails.mainFeatures.memory?phoneDetails.mainFeatures.memory:"Didn't find memory features"}</p>
                        <p class="card-text"><strong>Sensors: </strong> ${phoneDetails.mainFeatures.sensors? phoneDetails.mainFeatures.sensors:"Didn't find sensor features"}</p>
                        <h3  class="mt-4">Other information</h3>
                        <p class="card-text"><strong>Bluetooth: </strong> ${phoneDetails.others.Bluetooth? phoneDetails.others.Bluetooth : "Didn't find Bluetooth features"}</p>
                        <p class="card-text"><strong>GPS: </strong> ${phoneDetails.others.GPS?phoneDetails.others.GPS:"Didn't find GPS features"}</p>
                        <p class="card-text"><strong>NFC: </strong> ${phoneDetails.others.NFC?phoneDetails.others.NFC:"Didn't find NFC features"}</p>
                        <p class="card-text"><strong>Radio: </strong> ${phoneDetails.others.Radio?phoneDetails.others.Radio:"Didn't find Radio features"}</p>
                        <p class="card-text"><strong>USB: </strong> ${phoneDetails.others.USB?phoneDetails.others.USB:"Didn't find USB features"}</p>
                        <p class="card-text"><strong>WLAN: </strong> ${phoneDetails.others.WLAN?phoneDetails.others.WLAN:"Didn't find WLAN features"}</p>
                    </div>
            </div>
        </div>
    `;
    productDetailsDiv.appendChild(createProductDetailsDiv);
}




// search rest items

// const searchRestProducts = () => {
//     const inputField = document.getElementById('input-field');
//     const inputValue = inputField.value;
//     inputField.value = '';
//     if (inputValue == '') {
//         alert('Please enter you favourite phones name!')
//     } else {
//         fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
//             .then(res => res.json())
//             .then(data => displayRestProducts(data.data));
//     }

//     // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
//     //     .then(res => res.json())
//     //     .then(data => console.log(data.data));
// }

// const displayRestProducts = (restProducts) => {
//     // console.log(restProducts)
//     const newRestProducts = restProducts.slice(20)
//     console.log(newRestProducts)

// }