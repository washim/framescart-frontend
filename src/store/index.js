import { createStore } from 'vuex'

const store = createStore({
    state: {
        cart: {
            items: []
        }
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem("cart")) {
                state.cart = JSON.parse(localStorage.getItem("cart"))
            } else {
                localStorage.setItem("cart", JSON.stringify(state.cart))
            }
        },
        addToCart(state, item) {
            const exists = state.cart.items.filter(i => i.product_id == item.product_id);
            if (exists.length) {
                exists[0].quantity += parseInt(item.quantity);
            } else {
                state.cart.items.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }
})

export default store