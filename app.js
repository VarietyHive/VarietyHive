let products=[];
let cart=[];
let current={};
let isAdmin=false;

/* LOAD PRODUCTS */
async function loadProducts(){

let res = await fetch("/api/products");

products = await res.json();

render();

}

loadProducts();
function closeAdmin(){

let panel = document.getElementById("adminPanel");

if(panel){

panel.style.display = "none";

}

isAdmin = false;

loadProducts();

}
/* RENDER */
function render(){

let box=document.getElementById("products");

box.innerHTML="";

products.forEach((p,i)=>{

box.innerHTML += `

<div class="card">

<img src="${p.img}" width="100%">

<h3>${p.name}</h3>

<p>Rs ${p.price}</p>

<button onclick="addToCart(${i})">Add</button>

<button onclick="viewProduct(${i})">View</button>

${isAdmin ? `
<button onclick="deleteProduct(${i})" style="background:red;color:white">
Delete
</button>
` : ""}

</div>

`;

});

}

/* ADD TO CART */
function addToCart(i){

cart.push(products[i]);

document.getElementById("count").innerText=cart.length;

}

/* VIEW PRODUCT */
function viewProduct(i){

current=products[i];

document.getElementById("modal").style.display="flex";

document.getElementById("mimg").src=current.img;

document.getElementById("mname").innerText=current.name;

document.getElementById("mprice").innerText="Rs "+current.price;

}

/* CLOSE MODAL */
function closeModal(){

document.getElementById("modal").style.display="none";

}

/* ADD FROM MODAL */
function addModal(){

cart.push(current);

document.getElementById("count").innerText=cart.length;

closeModal();

}

/* DELETE PRODUCT */
async function deleteProduct(i){

await fetch("/api/products/"+i,{
method:"DELETE"
});

loadProducts();

}

/* ADMIN PASSWORD */
document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="m"){

let pass = prompt("Enter Admin Password");

if(pass==="1234"){

isAdmin=true;

alert("Admin Mode ON");

renderAdmin();

loadProducts();

}else{

alert("Wrong Password");

}

}

});

/* ADMIN PANEL */
function renderAdmin(){

let old=document.getElementById("adminPanel");

if(old) old.remove();

document.body.innerHTML += `

<div id="adminPanel"
style="
position:fixed;
top:20px;
left:20px;
background:#111;
padding:15px;
border-radius:10px;
z-index:9999;
width:250px;
box-shadow:0 0 20px rgba(0,0,0,0.5);
">

<div style="display:flex;justify-content:space-between;align-items:center">

<h3>Admin Panel</h3>

<button onclick="closeAdmin()"
style="
background:red;
color:white;
border:none;
padding:5px 10px;
cursor:pointer;
border-radius:5px;
">
X
</button>

</div>

<input id="pname"
placeholder="Product Name"
style="width:100%;margin:5px 0;padding:8px">

<input id="pprice"
placeholder="Price"
style="width:100%;margin:5px 0;padding:8px">

<input id="pimg"
placeholder="Image URL"
style="width:100%;margin:5px 0;padding:8px">

<button onclick="addProduct()"
style="
width:100%;
padding:10px;
background:gold;
border:none;
cursor:pointer;
border-radius:5px;
margin-top:10px;
">
Add Product
</button>

</div>

`;

}

/* ADD PRODUCT */
async function addProduct(){

let name=document.getElementById("pname").value;

let price=document.getElementById("pprice").value;

let img=document.getElementById("pimg").value;

if(!name || !price || !img){

alert("Fill all fields");

return;

}

let product={

name:name,

price:price,

img:img

};

await fetch("/api/products",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(product)

});

alert("Product Added Successfully");

loadProducts();

}

/* HERO SLIDER */
let imgs=[

"url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49')",

"url('https://images.unsplash.com/photo-1547996160-81dfa63595aa')"

];

let s=0;

setInterval(()=>{

document.getElementById("hero").style.backgroundImage=imgs[s];

s=(s+1)%imgs.length;

},3000);