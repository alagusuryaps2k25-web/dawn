class CartTest extends HTMLElement {
  async connectedCallback() {
    const response = await fetch('/cart.js');
    const cart = await response.json();

    console.log('Cart Data:', cart);
  }
}

customElements.define('cart-test', CartTest);
