








function addProductToList() {
    let iProduct = document.querySelector('#i-product');

    let newProductItem = document.createElement('li');
    newProductItem.innerText = iProduct.value;

    let productsList = document.getElementById('products-list');
    productsList.appendChild(newProductItem);

    iProduct.value = '';
}