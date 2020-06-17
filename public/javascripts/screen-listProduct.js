let btnAddNewProduct = document.getElementById('add-newProduct');
btnAddNewProduct.onclick = () => {
    window.location.href = '/product/add';
}

let elementProduct = document.getElementsByClassName('element-product');
for (i = 0; i < elementProduct.length; i++) {
    elementProduct[i].onclick = function () {
        let productData = $(this).data('product');
        window.location.href = '/product/edit/'+productData.Product_id;
    };
}
