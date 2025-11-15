document.addEventListener('DOMContentLoaded', () => {
  const openEcom = document.getElementById('open-ecom');
  const home = document.getElementById('home');
  const products = document.getElementById('products');
  const cartSummary = document.getElementById('cart-summary');
  const cartCountEl = document.querySelector('[data-testid="cart-count"]');

  let count = 0;

  openEcom.addEventListener('click', () => {
    home.hidden = true;
    products.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('add-to-cart')) {
      count += 1;
      cartCountEl.textContent = String(count);
      cartSummary.hidden = false;
    }
  });
});
