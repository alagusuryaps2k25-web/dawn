class StickyAtc extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div id="sticky-bar" style="
        display:none;
        position:fixed;
        bottom:0;
        left:0;
        right:0;
        background:red;
        padding:50px;
        border-top:1px solid #fff;
        z-index:999;
      ">
        <button id="add-cart-btn">
          Add To Cart
        </button>
      </div>
    `;

    const stickyBar = this.querySelector('#sticky-bar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        stickyBar.style.display = 'block';
      } else {
        stickyBar.style.display = 'none';
      }
    });

    const button = this.querySelector('#add-cart-btn');

    button.addEventListener('click', async () => {
      const variantId = document.querySelector('.product-variant-id').value;
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: Number(variantId),
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      console.log('Added:', data);
    });
  }
}

customElements.define('sticky-atc', StickyAtc);
