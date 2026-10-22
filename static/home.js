/* ================= PRODUCTS ================= */

const products = [
{
id: 1,
name: "Classic Black Shirt",
category: "Shirts",
price: 699,
oldPrice: 999,
rating: 4.5,
image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"
},

{
    id: 2,
    name: "Premium White T-Shirt",
    category: "T-Shirts",
    price: 549,
    oldPrice: 999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"
},

{
    id: 3,
    name: "Blue Slim Fit Jeans",
    category: "Jeans",
    price: 999,
    oldPrice: 1399,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80"
},

{
    id: 4,
    name: "Leather Wallets",
    category: "Accesories",
    price: 179,
    oldPrice: 249,
    rating: 4.8,
    image: "https://i.pinimg.com/736x/64/7e/a0/647ea064165cf113312b979207951220.jpg"
},

{
    id: 5,
    name: "Casual Denim Shirt",
    category: "Shirts",
    price: 749,
    oldPrice: 1150,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=700&q=80"
},

{
    id: 6,
    name: "Oversized Black T-Shirt",
    category: "T-Shirts",
    price: 549,
    oldPrice: 999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80"
},

{
    id: 7,
    name: "Dark Blue Denim",
    category: "Jeans",
    price: 999,
    oldPrice: 1399,
    rating: 4.7,
    image: "https://i.pinimg.com/1200x/52/3f/a2/523fa20131f624ed918d16cd8f90c0e8.jpg"
},

{
    id: 8,
    name: "fwd Timex Watch",
    category: "Accesories",
    price: 299,
    oldPrice: 599,
    rating: 4.8,
    image: "https://i.pinimg.com/736x/80/4d/7c/804d7c5ba3d69a866d1303f94299d564.jpg"
}

];

let cart = [];
let wishlist = [];

/* ================= DISPLAY PRODUCTS ================= */

const productContainer =
document.getElementById("productContainer");

function displayProducts(list) {

productContainer.innerHTML = "";

if (list.length === 0) {

    productContainer.innerHTML = `
        <p style="
            grid-column:1/-1;
            text-align:center;
            padding:40px;
        ">
            No products found.
        </p>
    `;

    return;
}


list.forEach(product => {

    const card = document.createElement("div");

    card.className = "product-card";

    const isLiked =
        wishlist.includes(product.id);

    card.innerHTML = `

        <div class="product-image">

            <img src="${product.image}"
                 alt="${product.name}">

            <button
                class="wishlist ${isLiked ? "liked" : ""}"
                onclick="toggleWishlist(${product.id})">

                <i class="${
                    isLiked
                    ? "fa-solid"
                    : "fa-regular"
                } fa-heart"></i>

            </button>

        </div>


        <div class="product-info">

            <span class="product-category">
                ${product.category}
            </span>

            <h3>
                ${product.name}
            </h3>

            <div class="rating">
                ${getStars(product.rating)}
                (${product.rating})
            </div>

            <div class="price">

                ₹${product.price}

                <span class="old-price">
                    ₹${product.oldPrice}
                </span>

            </div>

            <button
                class="add-cart"
                onclick="addToCart(${product.id})">

                <i class="fa-solid fa-cart-plus"></i>
                Add to Cart

            </button>

        </div>
    `;

    productContainer.appendChild(card);

});

}

function getStars(rating) {

let stars = "";

for (let i = 1; i <= 5; i++) {

    if (i <= Math.floor(rating)) {
        stars += "★";
    } else {
        stars += "☆";
    }

}

return stars;

}

displayProducts(products);

/* ================= FILTER ================= */

const filterButtons =
document.querySelectorAll(".filter");

filterButtons.forEach(button => {

button.addEventListener("click", () => {

    filterButtons.forEach(btn =>
        btn.classList.remove("active")
    );

    button.classList.add("active");

    const category =
        button.dataset.filter;

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered =
            products.filter(
                product =>
                    product.category === category
            );

        displayProducts(filtered);
    }

});

});

/* ================= CATEGORY CARDS ================= */

document.querySelectorAll(".category-card")
.forEach(card => {

    card.addEventListener("click", () => {

        const category =
            card.dataset.category;

        const filter =
            [...filterButtons].find(
                btn =>
                    btn.dataset.filter === category
            );

        if (filter) {
            filter.click();
        }

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});

/* ================= ADD TO CART ================= */

function addToCart(id) {

const product =
    products.find(item => item.id === id);

const existing =
    cart.find(item => item.id === id);


if (existing) {

    existing.quantity++;

} else {

    cart.push({
        ...product,
        quantity: 1
    });

}

updateCart();

showToast(
    `${product.name} added to cart!`
);

}

/* ================= UPDATE CART ================= */

function updateCart() {

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");


let totalItems = 0;
let totalPrice = 0;


cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice +=
        item.price * item.quantity;

});


cartCount.textContent = totalItems;

cartTotal.textContent =
    `₹${totalPrice.toLocaleString("en-IN")}`;


if (cart.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            Your cart is empty.
        </p>
    `;

    return;
}


cartItems.innerHTML = "";


cart.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

        <img src="${item.image}"
             alt="${item.name}">

        <div class="cart-item-info">

            <h4>${item.name}</h4>

            <strong>
                ₹${item.price}
            </strong>

            <div class="quantity">

                <button
                    onclick="changeQuantity(
                        ${item.id}, -1
                    )">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(
                        ${item.id}, 1
                    )">
                    +
                </button>

                <button
                    class="remove-item"
                    onclick="removeFromCart(
                        ${item.id}
                    )">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>
    `;

    cartItems.appendChild(div);

});

}

/* ================= QUANTITY ================= */

function changeQuantity(id, change) {

const item =
    cart.find(item => item.id === id);

if (!item) return;

item.quantity += change;


if (item.quantity <= 0) {

    cart =
        cart.filter(
            item => item.id !== id
        );

}

updateCart();

}

/* ================= REMOVE ================= */

function removeFromCart(id) {

cart =
    cart.filter(item => item.id !== id);

updateCart();

}

/* ================= WISHLIST ================= */

function toggleWishlist(id) {

if (wishlist.includes(id)) {

    wishlist =
        wishlist.filter(item => item !== id);

    showToast("Removed from wishlist");

} else {

    wishlist.push(id);

    showToast("Added to wishlist ❤️");

}

document.getElementById("wishlistCount")
    .textContent = wishlist.length;

const activeFilter =
    document.querySelector(".filter.active")
    ?.dataset.filter || "All";

if (activeFilter === "All") {

    displayProducts(products);

} else {

    displayProducts(
        products.filter(
            p => p.category === activeFilter
        )
    );

}

}

/* ================= CART SIDEBAR ================= */

const cartSidebar =
document.getElementById("cartSidebar");

const overlay =
document.getElementById("overlay");

document.getElementById("cartBtn")
.addEventListener("click", () => {

    cartSidebar.classList.add("active");
    overlay.classList.add("active");

});

document.getElementById("closeCart")
.addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);

function closeCart() {

cartSidebar.classList.remove("active");
overlay.classList.remove("active");

}

/* ================= CHECKOUT ================= */

document.getElementById("checkoutBtn")
.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Thank you for shopping with UrbanMen! " +
        "Checkout page can be connected here."
    );

});

/* ================= SEARCH ================= */

const searchBox =
document.getElementById("searchBox");

const searchInput =
document.getElementById("searchInput");

document.getElementById("searchBtn")
.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});

document.getElementById("closeSearch")
.addEventListener("click", () => {

    searchBox.classList.remove("active");

    searchInput.value = "";

    displayProducts(products);

});

searchInput.addEventListener("input", () => {

const search =
    searchInput.value.toLowerCase().trim();


const filtered =
    products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search)

        ||

        product.category
            .toLowerCase()
            .includes(search)

    );


displayProducts(filtered);

});

/* ================= MOBILE MENU ================= */

const menuBtn =
document.getElementById("menuBtn");

const navbar =
document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

navbar.classList.toggle("active");

});

document.querySelectorAll("nav a")
.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});

/* ================= TOAST ================= */

function showToast(message) {

const toast =
    document.getElementById("toast");

toast.querySelector("span")
    .textContent = message;

toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);

}

/* ================= NEWSLETTER ================= */

document.getElementById("newsletterForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    if (email) {

        showToast(
            "Thanks for subscribing!"
        );

        this.reset();

    }

});

/* ================= SHOP BUTTON ================= */

function scrollToShop() {

document
    .getElementById("shop")
    .scrollIntoView({
        behavior: "smooth"
    });

}

/* ================= INITIAL CART ================= */

updateCart();