export default {
  cart: (state) => state.cart,
  products: (state) => state.products,
  productsCategory: (state) => state.productsCategory,
  // tổng số lượng sản phẩm trong giỏ hàng
  itemCount: (state) => {
    let count = 0;
    if (state.cart.length <= 0) {
      return 0;
    }
    state.cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  },

  cart_total: (state) => {
    return state.cart.reduce((total, item) => {
      if (item.sale != 0) {
        const discount = ((100 - item.sale) / 100) * item.price;
        return total + discount * item.quantity;
      } else {
        return total + item.price * item.quantity;
      }
    }, 0);
  },

  getPriceSale: (state) => {
    return ((100 - state.product.sale) / 100) * state.product.price;
  },

  getTotalPage: (state) => {
    return Math.ceil(state.products.length / state.pageSize);
  },

  getUser: (state) => state.user,
};
