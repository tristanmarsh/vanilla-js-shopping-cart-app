import { Format } from './utils/index.js'

export const renderProducts = (app) => {
  const { products } = app.selectors
  const { events } = app

  if (!events.find((x) => x.selector === '.addToCart')) {
    app.functions.registerEventListener('.addToCart', (e) => {
      app.functions.addToCart(e.target.id)
    })
  }

  const getTemplateString = () => {
    const products = app.state.products
      ?.map(
        (product) =>
          `<li class='product card' onclick='app.method.'>
              <div>
                <h3>${product.name}</h3>
                <img src='${product.url}' alt='${product.name}' />
                <strong>${Format.centsToDollars(product.price)}</strong>
              </div>

              <button id='${product.id}' class='addToCart'>Add to cart</button>
            </li>`
      )
      .join('')

    return `
    <h1>Products</h1>
    <ul class='products'>${products}</ul>`
  }

  products.innerHTML = getTemplateString()
  products.hidden = false
}
