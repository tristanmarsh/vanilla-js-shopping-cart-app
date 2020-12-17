import { env } from '../../../env.js'
import { renderCart } from './renderCart.js'
import { renderProducts } from './renderProducts.js'
import { renderSummary } from './renderSummary.js'

/**
 * Encapsulated shopping cart module
 * React Hooks have turned me off of classes
 */
{
  const app = {
    functions: {
      bootstrapApp: () => {
        app.functions.initSelectors(app)
        app.functions.initEventDelegation(app)
        app.functions.enableDevMode(env.dev)
        app.functions.renderApp(app)
      },
      /**
       * Render each of the child app modules
       */
      renderApp: (app) => {
        renderProducts(app)
        renderCart(app)
        renderSummary(app)
        app.functions.enableDevMode(env.dev)
      },
      /**
       * exposes the DOM selectors of the app from ids to app.selectors
       */
      initSelectors: (app) => {
        const ids = ['items', 'summary', 'products', 'dev']
        app.selectors = ids.reduce((acc, id) => {
          const node = document.querySelector(`#${id}`)

          return {
            ...acc,
            [node.id]: node,
          }
        }, {})
      },
      /**
       * Handles click events on dynamic nodes
       */
      initEventDelegation: (app) => {
        const { events } = app

        const delegateClickEvents = (event) => {
          const foundMatches = events.filter((node) =>
            event.target.matches(node.selector)
          )

          foundMatches?.forEach((match) => match.fn(event))
        }

        // register the single click event listener on the document
        window.document.addEventListener('click', delegateClickEvents)
      },
      /**
       * exposes the encapsulated app module to the global
       */
      enableDevMode: (enableBoolean) => {
        const { dev } = app.selectors

        dev.innerHTML = `<pre>${JSON.stringify(app, null, 2)}</pre>`
        dev.classList.add('card')
        dev.hidden = !enableBoolean
        globalThis.app = app
      },
      sortCart: () => {
        app.state.cart = app.state.cart.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      },
      /**
       * Adds or increments the quantity of an item in the cart and re-renders
       */
      addToCart: (productId) => {
        const isInCart = app.state.cart.find((x) => x.id == productId)
        const productDetails = app.state.products.find((x) => x.id == productId)

        const product = {
          ...productDetails,
          quantity: isInCart ? isInCart.quantity + 1 : 1,
        }

        app.state.cart = [
          ...app.state.cart.filter((x) => x.id != productId),
          product,
        ]

        app.functions.sortCart()
        app.functions.renderApp(app)
      },
      /**
       * Deletes all quantities of a product from the cart
       */
      removeFromCart: (productId) => {
        app.state.cart = [...app.state.cart.filter((x) => x.id != productId)]

        app.functions.sortCart()
        app.functions.renderApp(app)
      },
      /**
       * ? Something like an observable from the observer pattern
       */
      registerEventListener: (selector, fn) => {
        app.events.push({ selector, fn })
      },
    },
    state: {
      products: [
        {
          id: 1,
          name: 'Playstation 5',
          price: 74900,
          url:
            'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/8b67ca56eee6436886c3dec299fd0a7b_Large.jpg',
        },
        {
          id: 2,
          name: 'Xbox... The New One™',
          price: 69900,
          url:
            'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/614371a731b440089e1a6e7116f7e924_Large.jpg',
        },
        {
          id: 3,
          name: 'Preowned Wii Fit Plus',
          price: 800,
          url:
            'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/2d1f1ff1749946dab49e22dacbff408e_Original.png',
        },
        {
          id: 4,
          name: 'PlayStation 4 Pro 1TB Glacier White Console',
          price: 54900,
          url:
            'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/20dee85e540346ef829c6cf64f9c4819_Original.jpg',
        },
      ],
      cart: [],
    },
    events: [
      {
        selector: 'h1',
        fn: (e) => {
          console.log('hello')
          e.target.classList.toggle('cool')
        },
      },
      {
        selector: 'h3',
        fn: (e) => {
          console.log('wow')
          e.target.classList.toggle('cool')
        },
      },
    ],
  }

  // bootstrap app
  app.functions.bootstrapApp()
}

/*
# Potential structure

## MarshWork
- The Framework for all Tristan Marsh's Work

### Features

- render
- state
- event delegation

import { createApp } from 'marsh-work'

const [shoppingCart, setState] = createApp({
  name: 'shoppingCart',
  state: [],
  methods: {},
  mountNode: document.querySelector('#root'),
  appEntryPoint: MyApp
})


*/

// function el(type, props = {}, children = '') {
//   const elem = document.createElement(type)

//   Object.keys(props).forEach((prop) => (elem[prop] = props[prop]))

//   let childNode
//   // typeof children === 'string' ? document.createTextNode(children) : children

//   if (typeof children === 'string') {
//     childNode = document.createTextNode(children)
//   } else if (Array.isArray(children)) {
//     childNode = document.createElement('div')
//     children.forEach((child) => childNode.append(child))
//     console.log(childNode)
//   } else if (typeof children === 'function') {
//     childNode = children()
//   } else if (typeof children === 'object') {
//     childNode = children
//   }
//   elem.appendChild(childNode)

//   return elem
// }

// // native elements
// const h1 = (...args) => el('h1', ...args)
// const h2 = (...args) => el('h2', ...args)
// const h3 = (...args) => el('h3', ...args)
// const div = (...args) => el('div', ...args)
// const section = (...args) => el('section', ...args)
// const img = (...args) => el('img', ...args)
// const span = (...args) => el('span', ...args)

// // custom components
// const Body = () =>
//   el('section', { id: 'body' }, [
//     h1({ className: 'nice', style: 'font-size: 2rem' }, 'Hello'),
//     h1({}, 'Hey'),
//     section({ style: 'display: flex' }, [
//       span({}, 'Yo'),
//       span({}, 'Yo'),
//       span({}, 'Yo'),
//     ]),
//   ])

// const Wrapper = el(
//   'div',
//   { id: 'wrapper', style: 'border: 10px solid red' },
//   Body
// )

// document.body.append(Wrapper)
