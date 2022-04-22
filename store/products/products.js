export const state = () => ({
  products: [],
  product: null,
})

export const getters = {
  products(state) {
    return state.products
  },
  product(state) {
    return state.product
  },
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
}

export const actions = {
  async getProducts({ commit }) {
    const response = await this.$axios.$get(`products`)

    commit('SET_PRODUCTS', response)
  },

  async getProduct({ commit }, id) {
    const response = await this.$axios.$get(`products/${id}`)

    commit('SET_PRODUCT', response)
  },
}
