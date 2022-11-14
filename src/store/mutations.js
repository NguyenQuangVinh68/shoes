// import router from "../router/index";
// import axios from "axios";
// cập nhật sản phẩm người dùng mua và lưu vào localstore
function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// async function updateData(productId, data) {
//   console.log(productId);
//   await axios.put(`http://localhost:3000/products/${productId}`, data);
//   return;
// }

export default {
  PRODUCTS_ITEM(state, payload) {
    state.products = payload;
  },

  PRODUCTS_CATEGORY(state, payload) {
    state.productsCategory = payload;
  },

  SET_PRODUCT(state, product) {
    state.product = product;
  },
  VISIBLE_PRODUCTS(state, currentPage) {
    console.log("currentPage", currentPage);
    if (currentPage === 0 || currentPage === undefined) {
      currentPage = 1;
    }
    let start = (currentPage - 1) * state.pageSize;
    console.log("start", start);
    state.visibleProducts = state.products.slice(start, start + state.pageSize);
    state.currentPage = currentPage;
  },

  addToCart(state, product) {
    let item = state.cart.find((i) => i.id === product.id);

    // thêm sản phẩm vào giỏ hàng
    // nếu có rồi thì tăng số lượng lên
    if (item) {
      if (item.stock != 0) {
        item.quantity++;
        item.stock--;
        if (item.stock == 0) {
          item.checkStock = true;
        }
      }
    } else {
      if (product.stock != 0) {
        product.stock--;
        if (product.stock == 0) {
          product.checkStock = true;
        }
        state.cart.push({ ...product, quantity: 1 });
      } else {
        alert("Quantity buy bigger than stock");
      }
    }
    console.log(state.cart, "add cart");

    updateLocalStorage(state.cart);
  },
  // addToCart(state, product) {
  //   let item = state.cart.find((i) => i.id === product.id);
  //   let itemInProduct = state.products.find((i) => i.id === product.id);

  //   // thêm sản phẩm vào giỏ hàng
  //   // nếu có rồi thì tăng số lượng lên
  //   if (item) {
  //     item.quantity++;
  //     itemInProduct.stock = itemInProduct.stock - 1;
  //   } else {
  //     state.cart.push({ ...product, quantity: 1 });
  //     itemInProduct.stock = itemInProduct.stock - 1;
  //   }

  //   // gán checkStock == true để người dùng biết đã hết hàng
  //   if (itemInProduct.stock == 0) {
  //     itemInProduct.checkStock = true;
  //   }

  //   state.product = itemInProduct;
  //   updateData(itemInProduct.id, itemInProduct);
  //   // lưu vào localStorage
  //   updateLocalStorage(state.cart);
  //   console.log(state.cart);
  // },

  removeItemCart(state, product) {
    let item = state.cart.find((i) => i.id === product.id);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.stock++;
      } else {
        item.stock++;
        state.cart = state.cart.filter((i) => i.id !== product.id);
      }
      item.checkStock = false;
    }
    console.log(state.cart, "mutation");
    updateLocalStorage(state.cart);
  },

  clearItemCart(state, product) {
    // cập nhật lại số lượng stock trong data
    let item = state.cart.find((i) => i.id === product.id);
    item.stock += item.quantity;

    // loại bỏ item current khỏi giỏ hàng
    state.cart = state.cart.filter((i) => i.id !== product.id);

    updateLocalStorage(state.cart);
  },

  CLEAR_CART(state) {
    state.cart = [];
    updateLocalStorage(state.cart);
  },

  // lưu lại lịch sử mua hàng của khách hàng => khi refresh sẽ không mất đi những sản phẩm mua trước đó
  updateCartFromLocalStorage(state) {
    const cart = localStorage.getItem("cart");
    if (cart) {
      state.cart = JSON.parse(cart);
    }
  },

  // authentication

  SET_USER(state, payload) {
    state.user = payload;
    if (payload == null) {
      state.isLoggedIn = false;
    }
  },
  CHECK_LOGGED(state, payload) {
    if (payload != null) {
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false;
    }
    state.user = payload;
  },

  // search
  FILTER_SEARCH(state, { textSearch, data }) {
    textSearch = textSearch.trim().toLowerCase();
    state.filterProducts = data.filter((item) => {
      return item.name.toLowerCase().indexOf(textSearch) !== -1;
    });
  },

  // favorite

  FAVORITES(state, payload) {
    state.wishList = payload;
  },

  COMMENT(state, payload) {
    state.comment = payload;
    state.comment.reverse();
  },
};
