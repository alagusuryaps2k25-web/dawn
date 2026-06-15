const grid = document.getElementById('product-grid');

if (grid) {
  const saved = localStorage.getItem('shopify-view') || 'grid';
  setView(saved);

  document.getElementById('btn-grid').addEventListener('click', () => setView('grid'));
  document.getElementById('btn-list').addEventListener('click', () => setView('list'));

  function setView(v) {
    grid.classList.toggle('list-view', v === 'list');
    localStorage.setItem('shopify-view', v);
  }
}
