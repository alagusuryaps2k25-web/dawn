class StickyAtc extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="sticky-bar" class="sticky-atc-bar">
        <div class="sticky-atc-content">
          <div class="sticky-atc-title">
            ${document.title}
          </div>

          <div class="sticky-atc-qty">
            <button id="minus-btn" aria-label="Decrease quantity">-</button>

            <input
              id="qty"
              type="number"
              value="1"
              min="1"
              aria-label="Quantity"
            />

            <button id="plus-btn" aria-label="Increase quantity">+</button>
          </div>

          <button
            id="add-cart-btn"
            aria-label="Add selected product to cart"
          >
            Add To Cart
          </button>
        </div>
      </div>
    `;

    const stickyBar = this.querySelector('#sticky-bar');
    const qtyInput = this.querySelector('#qty');

    const productForm = document.querySelector('product-form');

    window.addEventListener('scroll', () => {
      if (!productForm) return;

      const formBottom = productForm.getBoundingClientRect().bottom;

      stickyBar.style.display = formBottom < 0 ? 'block' : 'none';
    });

    this.querySelector('#plus-btn').addEventListener('click', () => {
      qtyInput.value = Number(qtyInput.value) + 1;
    });

    this.querySelector('#minus-btn').addEventListener('click', () => {
      qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
    });

    this.querySelector('#add-cart-btn').addEventListener('click', async () => {
      const variantInput = document.querySelector('product-form input[name="id"]');

      if (!variantInput) return;

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: Number(variantInput.value),
              quantity: Number(qtyInput.value),
            },
          ],
        }),
      });

      const data = await response.json();

      console.log('Added to cart', data);
    });
  }
}

customElements.define('sticky-atc', StickyAtc);
