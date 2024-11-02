// Get DOM elements
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var productCount = document.getElementById("productCount");

var productContainer;
var currentIndex = null;

// Initialize productContainer from localStorage if available
if (localStorage.getItem("ourProducts") === null) {
   productContainer = [];
} else {
   productContainer = JSON.parse(localStorage.getItem("ourProducts"));
   displayProduct();
}

// Add or Update Product
function addProduct() {
   var product = {
      pName: productName.value,
      price: productPrice.value,
      categ: productCateg.value,
      desc: productDesc.value,
      count: parseInt(productCount.value),
   };

   if (currentIndex !== null) {
      productContainer[currentIndex] = product;
      currentIndex = null;
   } else {
      productContainer.push(product);
   }

   localStorage.setItem("ourProducts", JSON.stringify(productContainer));
   displayProduct();
   clearValue();
}

// Display Products
function displayProduct() {
   var productList = "";
   for (var i = 0; i < productContainer.length; i++) {
      productList += `
         <tr>
               <td>${i + 1}</td>
               <td>${productContainer[i].pName}</td>
               <td>${productContainer[i].price}</td>
               <td>${productContainer[i].categ}</td>
               <td>${productContainer[i].desc}</td>
               <td>${productContainer[i].count}</td>
               <td><button class="btn btn-warning" onclick="editProduct(${i})">Update</button></td>
               <td><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button></td>
         </tr>`;
   }
   document.getElementById("tBody").innerHTML = productList;
}

// Clear Input Fields
function clearValue() {
   productName.value = "";
   productPrice.value = "";
   productCateg.value = "";
   productDesc.value = "";
   productCount.value = "";
}

// Delete All Products
function deleteAll() {
   productContainer = [];
   localStorage.setItem("ourProducts", JSON.stringify(productContainer));
   displayProduct();
}

// Delete a Single Product
function deleteRow(i) {
   productContainer.splice(i, 1);
   localStorage.setItem("ourProducts", JSON.stringify(productContainer));
   displayProduct();
}

// Search Products
function searchProduct(query) {
   var filteredList = "";
   for (var i = 0; i < productContainer.length; i++) {
      if (
         productContainer[i].pName
         .toLowerCase()
         .includes(query.trim().toLowerCase())
      ) {
         filteredList += `
                  <tr>
                     <td>${i + 1}</td>
                     <td>${productContainer[i].pName}</td>
                     <td>${productContainer[i].price}</td>
                     <td>${productContainer[i].categ}</td>
                     <td>${productContainer[i].desc}</td>
                     <td>${productContainer[i].count}</td>
                     <td><button class="btn btn-warning" onclick="editProduct(${i})">Update</button></td>
                     <td><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button></td>
                  </tr>`;
      }
   }
   document.getElementById("tBody").innerHTML = filteredList;
}

// Edit Product - Populate form for updating
function editProduct(index) {
   currentIndex = index;
   var product = productContainer[index];
   productName.value = product.pName;
   productPrice.value = product.price;
   productCateg.value = product.categ;
   productDesc.value = product.desc;
   productCount.value = product.count;
}
