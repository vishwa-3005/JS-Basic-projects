document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const totalPriceDisplay = document.getElementById("total-price");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.innerHTML = `
    <span>${product.name} ($${product.price.toFixed(2)})</span>
    <button data-id = "${product.id}">Add to Cart</button>
    `;
    productDiv.classList.add("product");
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      cartItems.classList.remove("hidden");
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    save();
    renderCart(product);
  }

  function renderCart(product) {
    emptyCartMsg.classList.add("hidden");
    cartTotal.classList.remove("hidden");

    const cartItem = document.createElement("div");
    cartItem.classList.add("product");
    cartItem.innerHTML = `
    <span>${product.name} : $${product.price.toFixed(2)}</span>
    <button data-id = "${product.id}">remove</button>
    `;
    cartItems.appendChild(cartItem);

    let total = calculateTotal(cart);
    totalPriceDisplay.textContent = parseFloat(total);
  }

  function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function calculateTotal(cart) {
    let sum = cart.reduce((sum, curr) => sum + curr.price, 0);
    //console.log(sum);
    return sum.toFixed(2);
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      //const item = cart.find((item) => item.id === productId);

      cart = cart.filter((item) => item.id !== productId);
      save();
      cartItems.innerText = "";
      cart.forEach((item) => renderCart(item));
      let total = calculateTotal(cart);
      totalPriceDisplay.textContent = total;
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cartItems.textContent = "";
    alert("Checkout succesfull !!");
    cartTotal.classList.add("hidden");
    cartItems.classList.add("hidden");
    emptyCartMsg.classList.remove("hidden");
  });

  cart.forEach((product) => renderCart(product));
});
