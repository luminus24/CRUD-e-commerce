
function printProducts(products){
    let html = '';
    products.forEach(product => {
        html += `<div class="col-md-6 col-lg-4 mt-3">
                    <div class="card">
                        <img src="${product.image}" class="img-fluid">
                        <div class="card-body d-flex flex-column justify-content-end">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}</p>
                            <div class="text-end">
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button class="btn btn-primary"  id"btn-edit" onclick="editProduct(${product.id})">
                                    <i class="fas fa-pen"></i>
                                </button>
                                <button class="btn btn-success" onclick="addToCart(${product.id})">
                                    <i class="fab fa-buysellads"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
    });
    const container = document.getElementById('container-products');
    container.innerHTML = html;
}

function getProducts(){
    axios.get("https://e-commerce-api-academlo.herokuapp.com/api/products")
        .then(function (response){
            const products = response.data;
            printProducts(products);
        })
        .catch(function cbError(error){
            console.log(error);
        })
}

function addProduct(){
    const newProduct ={
        image:document.getElementById("imageProduct").value,
        name: document.getElementById("nameProduct").value,
        price:document.getElementById("priceProduct").value
    }
    axios.post("https://e-commerce-api-academlo.herokuapp.com/api/products" , newProduct)
        .then(function (response){
            formAddProduct.close()
            getProducts();
        })
        .catch(function cbError(error){
            alert("No se pudo crear el producto")
        })
}

function updateProduct(id) {
    const productEdited = {
        image:document.getElementById("imageProductEdit").value,
        name: document.getElementById("nameProductEdit").value,
        price:document.getElementById("priceProductEdit").value
    }
    axios.put(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`, productEdited)
        .then(function (response) {
            alert("Se editó el producto");
            editProductForm.close();
            getProducts();
        })
        .catch(function (error) {
            alert("No se pudo editar el producto");
        })
}

function deleteProduct(id){
    axios.delete(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`)
    .then(function (response){
        console.log(response);
        alert("La tarea se elimino correctamente")
        getProducts();
    })
    .catch(function cbError(error){
        alert("No se pudo eliminar la tarea")
        console.log(error);
    })
}

const editProduct = (id)=>{editProductForm.showModal()}
const openForm = ()=>{formAddProduct.showModal()};
const closeForm = ()=>{formAddProduct.close()}
const closeform = ()=>{editProductForm.close()};

getProducts()