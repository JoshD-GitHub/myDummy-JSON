const API = 'https://dummyjson.com/products';

// STILL NEEDS CLOSE BUTTON FOR MORE INFO
// STILL NEEDS FUNCTIONING DELETE BUTTON
// STILL NEEDS ADDING YOUR OWN PRODUCT FORM

const getAllProducts = async() => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data.products)
        return data.products;
    } catch (error) {
        console.log(error);
    };
};

const render = (productArray) => {
    productArray.map((item) => {
        const div = document.querySelector('div');
        const section = document.createElement('section');
        const h3 = document.createElement('h3');
        // h3.setAttribute('data-id', `${item.id}`);
        h3.innerHTML = item.title + `<br/>`;

        const infoButton = document.createElement('button');
        infoButton.setAttribute('data-id', `${item.id}`)
        infoButton.innerText = 'More Info';

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-id', `${item.id}`)
        deleteButton.innerText = 'Delete';

        h3.appendChild(infoButton);
        h3.appendChild(deleteButton);

        infoButton.addEventListener('click', infoListener);
        deleteButton.addEventListener('click', deleteListener);


        div.appendChild(section);
        section.appendChild(h3)
    });
};

/*
const renderSingleProduct = (singleProductArray) => {
    singleProductArray.map((item) => {
        // const img = `<img src='${item.thumbnail}' />`;
        const img = document.createElement('img');
        img.src = item.thumbnail;

        const ul = document.createElement('ul');

        const li = `
        <li>${item.brand}</li>
        <li>${item.category}</li>
        <li>${item.description}</li>
        <li>${item.discountPercentage}</li>
        <li>${item.price}</li>
        <li>${item.rating}</li>
        <li>${item.stock}</li>
        `;

        ul.appendChild(li);

    });
};
*/

const infoListener = async(event) => {
    const productID = event.target.dataset.id;
    const response = await fetch (`${API}/${productID}`);
    const singleProduct = await response.json();
    console.log('singleProduct', singleProduct)
    console.log(event.target.parentNode.parentNode)
    const buttonSection = event.target.parentNode.parentNode

    const img = document.createElement('img');
    img.src = singleProduct.thumbnail;

    const ul = document.createElement('ul');
    // const li = document.createElement('li');
   ul.innerHTML = `
    <li><strong>Name: </strong>${singleProduct.brand}</li>
    <li><strong>Category: </strong>${singleProduct.category}</li>
    <li><strong>Description: </strong>${singleProduct.description}</li>
    <li><strong>Discount Percentage: </strong>${singleProduct.discountPercentage}%</li>
    <li><strong>Price: </strong>$${singleProduct.price}</li>
    <li><strong>Rating: </strong>${singleProduct.rating}</li>
    <li><strong>Stock: </strong>${singleProduct.stock}</li>
    `;

    buttonSection.appendChild(img);
    buttonSection.appendChild(ul);
    // ul.appendChild(li);


    //ADD CLOSE BUTTON
};

const deleteListener = () => {};

const init = async () => {
    const productArray = await getAllProducts();
    render(productArray);
};

init();