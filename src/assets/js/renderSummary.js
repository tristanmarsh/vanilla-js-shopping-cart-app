import { Format } from './utils/index.js'

export const renderSummary = (app) => {
  const { summary } = app.selectors
  const { events } = app

  // register events
  if (!events.find((x) => x.selector === '#checkout')) {
    app.functions.registerEventListener('#checkout', (e) => {
      const totalCents = app.state.cart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )

      window.alert(
        totalCents === 0
          ? "Don't forget to add something to your cart"
          : 'Sorry our warehouse is busy!'
      )
    })
  }

  const getTemplateString = () => {
    const totalCents = app.state.cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )

    const total = Format.centsToDollars(totalCents)

    return `
      <div class='card summary'>
        <h1>Summary</h1>
        <h2 class="text-right mb-3">${total}</h2>
        <button id="checkout" class="btn btn-success">Checkout</button>
      </div>
    `
  }

  summary.innerHTML = getTemplateString()
  summary.hidden = false
}
