import { Format } from './utils/index.js'

/**
 * - A typical module:
 * - provided the entire app object
 * - returns a render string
 * - ! registers events - candidate for standardizing
 * - renders itself to it's own DOM node provided in the app.selectors
 */
export const renderCart = (app) => {
  const { items } = app.selectors
  const { events } = app

  // register events
  if (!events.find((x) => x.selector === '.removeFromCart')) {
    app.functions.registerEventListener('.removeFromCart', (e) => {
      app.functions.removeFromCart(e.target.id)
    })
  }

  const getTemplateString = () => {
    const cart = app.state.cart
      ?.map(
        (product) =>
          `<li class='item card'>
              
            <h3>${product.name}</h3>
            
            <div>
              <div class="d-flex flex-col">
                <span>Quantity: ${product.quantity}</span>
                <button id='${
                  product.id
                }' class='removeFromCart'>Remove</button>
              </div>

              <img src='${product.url}' alt='${product.name}' />
              <strong>${Format.centsToDollars(product.price)}</strong>
            </div>

          </li>`
      )
      .join('')

    return `
    <ul class='cart'>${cart}</ul>`
  }

  items.innerHTML = getTemplateString()
  items.hidden = false
}

/**
 * Standard component imitating react could be...
 * {
 *   selector: '', // target DOM node to render to
 *   render: (app) => 'string', // return the string literal
 *   events: [{
 *     selector: 'string', // document.querySelector for event delegation
 *     event: 'string', // string or array of strings
 *     fn: () => {}, // function to be called when matched
 *   }]
 * }
 *
 */
