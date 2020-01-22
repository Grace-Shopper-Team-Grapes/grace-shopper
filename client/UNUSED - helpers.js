(function() {
  const CART = document.getElementById('cart-modal-mask');

  console.log(
    'in helper, ready to toggle cart, CART is',
    document.getElementById('cart-modal-mask')
  );
  const toggleCart = () => {
    const value =
      CART.style.getPropertyValue('display') === 'flex' ? 'none' : 'flex';
    const priority =
      CART.style.getPropertyPriority('display') === 'important'
        ? ''
        : 'important';
    CART.style.setProperty('display', value, priority);
  };

  window.toggleCart = toggleCart;
})();
