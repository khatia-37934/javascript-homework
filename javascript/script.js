let cart = [];
const cartContainer = document.querySelector(".cardForCart");
const totalPriceEl = document.querySelector(".total-price span");

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const name = card.querySelector(".card-title").textContent;
    const price = card.querySelector(".price").textContent;
    const priceNum = parseInt(price.replace(/\D/g, ""));

    let product = cart.find((p) => p.name === name);

    if (!product) {
      cart.push({ name, price: priceNum, quantity: 1 });
    } else {
      product.quantity++;
    }

    renderCart();
  });
});
function renderCart() {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.name} x${item.quantity} - ${item.price * item.quantity} GEL`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart = cart.filter((p) => p.name !== item.name);
      renderCart();
    });
    div.appendChild(removeBtn);
    cartContainer.appendChild(div);
  });
  let total = 0;
  cart.forEach((item) => (total += item.price * item.quantity));
  totalPriceEl.textContent = total + " GEL";
}
