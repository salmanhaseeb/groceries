import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Tabs from "./../components/tab"
import Item from "./../components/item"
import {
  getItems,
  addFavouriteItem,
  addQuantity,
  removeFavouriteItem,
  addToCart,
  removeCartItem,
  calculateSubTotal,
} from "./../redux/itemsSlice"

function Home() {
  const dispatch = useDispatch()
  const [itemType, setItemType] = useState("all")
  const { items, filterItems, favouriteItems, cartItems, isError, message } =
    useSelector((state) => state.items)

  useEffect(() => {
    dispatch(getItems(itemType))
  }, [itemType, isError, message, dispatch])

  return (
    <div className="tabs-main">
      <Tabs setItemType={(t) => setItemType(t)} />
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="all-items"
          role="tabpanel"
          aria-labelledby="all-items-tab"
        >
          <h3 className="trending-items mb-5">Trending Items</h3>
          <div className="box-main container-fluid d-flex flex-row flex-wrap">
            {filterItems.length > 0
              ? filterItems.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      key={index}
                      favouriteItems={favouriteItems}
                      addFavouriteItem={() => {
                        dispatch(addFavouriteItem(index))
                      }}
                      removeFavouriteItem={() => {
                        dispatch(removeFavouriteItem(item?.name))
                      }}
                      cartItems={cartItems}
                      addToCart={() => {
                        dispatch(addToCart(index))
                      }}
                      removeCartItem={() => {
                        dispatch(removeCartItem(item.name))
                      }}
                      addItemQuantity={() => {
                        dispatch(addQuantity(item?.name)).then(() => {
                          dispatch(calculateSubTotal())
                        })
                      }}
                    />
                  )
                })
              : items &&
                items.map((item, index) => {
                  return (
                    <Item
                      item={item}
                      key={index}
                      favouriteItems={favouriteItems}
                      addFavouriteItem={() => {
                        dispatch(addFavouriteItem(index))
                      }}
                      removeFavouriteItem={() => {
                        dispatch(removeFavouriteItem(item?.name))
                      }}
                      cartItems={cartItems}
                      addToCart={() => {
                        dispatch(addToCart(index))
                      }}
                      removeCartItem={() => {
                        dispatch(removeCartItem(item.name))
                      }}
                      addItemQuantity={() => {
                        dispatch(addQuantity(item?.name)).then(() => {
                          dispatch(calculateSubTotal())
                        })
                      }}
                    />
                  )
                })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
