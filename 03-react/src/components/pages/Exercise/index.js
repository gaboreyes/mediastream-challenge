import './assets/styles.css'
import React, { useState, useMemo } from 'react'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const decrementQuantityHandler = (movie) => {
    const index = cart.findIndex(item => item.id === movie.id)
    const newState = [...cart]
    if (newState[index].quantity > 1) {
      newState[index].quantity -= 1
      setCart(newState)
    } else {
      const newCart = cart.filter(item => item.id !== movie.id)
      setCart(newCart)
    }
  }

  const incrementQuantityHandler = (movie) => {
    const index = cart.findIndex(item => item.id === movie.id)
    const newState = [...cart]
    newState[index].quantity += 1
    setCart(newState)
  }

  const addToCartHandler = (movie) => {
    const index = cart.findIndex(item => item.id === movie.id)
    const newState = [...cart]
    if (index !== -1) {
      newState[index].quantity += 1
      setCart(newState)
    } else {
      newState.push({ ...movie, quantity: 1 })
      setCart(newState)
    }
  }

  const getTotal = useMemo(() => {
    let total = 0
    cart.forEach(item => {
      total += item.price * item.quantity
    })
    const arrayIds = cart.map(item => item.id)

    discountRules.forEach(rule => {
      const checkSubset = rule.m.every((el) => arrayIds.includes(el))
      if (checkSubset) {
        console.log(rule.discount)
        total = total - (total * rule.discount)
      }
    })
    return total
  }, [cart])

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((o, index) => (
            <li key={index} className="movies__list-card">
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addToCartHandler(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((x, index) => (
            <li key={index} className="movies__cart-card">
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => decrementQuantityHandler(x)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => incrementQuantityHandler(x)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal}</p>
        </div>
      </div>
    </section>
  )
}
