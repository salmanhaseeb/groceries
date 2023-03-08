const API_URL = "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s"

const getItems = async (itemType) => {
  const response = await fetch(`${API_URL}?category=${itemType}`)
  const data = await response.json()

  return data
}

const filterItems = (searchValue, items) => {
  if (searchValue) {
    let filteredData = items.filter((value) => {
      return value?.name?.toLowerCase().includes(searchValue.toLowerCase())
    })
    return filteredData
  }
  return []
}

const addFavouriteItems = (favouriteItemKey, items) => {
  return items[favouriteItemKey]
}

const addToCarts = (cartItem, items) => {
  let item = items[cartItem]
  item = {
    ...item,
    quantity: 1,
  }
  return item
}

const addQuantities = (itemName, cartItems) => {
  let item = cartItems.filter((i) => i.name === itemName)
  if (item.length > 0) {
    let updatedCart = cartItems.map((i) => {
      if (i.name === itemName) {
        return {
          ...i,
          quantity: i.quantity + 1,
        }
      } else {
        return i
      }
    })
    return updatedCart
  } else {
    return cartItems
  }
}
const removeQuantities = (itemName, cartItems) => {
  let item = cartItems.filter((i) => i.name === itemName)
  if (item.length > 0) {
    let updatedCart = cartItems.map((i) => {
      if (i.name === itemName) {
        return {
          ...i,
          quantity: i.quantity - 1,
        }
      } else {
        return i
      }
    })
    return updatedCart
  } else {
    return cartItems
  }
}
const calculateSubTotal = (cartItems) => {
  let subTotal = 0.0
  cartItems.map((item) => {
    let price = item?.price.split("£")[1]
    subTotal = subTotal + parseFloat(item?.quantity) * parseFloat(price)
  })
  return subTotal
}

const itemService = {
  getItems,
  filterItems,
  addFavouriteItems,
  addToCarts,
  addQuantities,
  removeQuantities,
  calculateSubTotal,
}
export default itemService
