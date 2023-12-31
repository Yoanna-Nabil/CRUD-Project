var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
console.log(productNameInput);
console.log(productPriceInput);
console.log(productCategoryInput);
console.log(productDescriptionInput);

var searchInput = document.getElementById("searchproduct");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var indexUpdate = 0;

var productContainer = [];
if(localStorage.getItem("products")!=null){
    productContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}
function addProduct(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
    }
    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    console.log(productContainer);
    displayProducts();
    clearForm();
}

function clearForm(){
    productNameInput.value = '',
    productPriceInput.value = '',
    productCategoryInput.value = '',
    productDescriptionInput.value = '';
}

function displayProducts(){
    var cartoona = ``;
    for(var i = 0; i<productContainer.length; i++){
        cartoona += `<tr>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button onclick="setData(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>
        `;
    }
    document.getElementById('tablebody').innerHTML = cartoona;
}

function deleteProduct(productIndex){
    productContainer.splice(productIndex,1);
    displayProducts();
}

function searchProducts(){
    var term = searchInput.value;
    var cartoona = ``;
    for(var i = 0; i<productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            cartoona += `<tr>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].description}</td>
            <td><button class="btn btn-outline-warning btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>
            `;
        }
    }
    document.getElementById('tablebody').innerHTML = cartoona;
    
}

function setData(index){
    indexUpdate = index;
    var currentElement = productContainer[index];
     productNameInput.value = currentElement.name;
     productPriceInput.value = currentElement.price;
     productCategoryInput.value = currentElement.category;
     productDescriptionInput.value = currentElement.description;

     updateBtn.classList.remove("d-none");
     addBtn.classList.add("d-none");
}

function updateProduct(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
    };
      productContainer.splice(indexUpdate, 1, product);
      localStorage.setItem("products", JSON.stringify(productContainer));
      displayProducts();

      updateBtn.classList.add("d-none");
      addBtn.classList.remove("d-none");
}