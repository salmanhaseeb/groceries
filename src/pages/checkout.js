import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CheckoutItem from "../components/checkoutItem"
import Payment from "../components/payment"
import {
  getItems,
  addQuantity,
  removeQuantity,
  removeCartItem,
  calculateSubTotal,
  DiscountAmount,
} from "./../redux/itemsSlice"

function Checkout() {
  const dispatch = useDispatch()
  const [offerItem, setOfferItem] = useState({
    cocacla: 0,
    cocacolaPrice: 0,
    coffee: 0,
    coffeePrice: 0,
  })
  const offer = {
    cocacla: 6,
    croissants: 3,
  }

  const { items, cartItems, subTotal, discount } = useSelector(
    (state) => state.items
  )

  useEffect(() => {
    dispatch(getItems("all"))
    dispatch(calculateSubTotal())
    checkOffer()
  }, [cartItems])

  const checkOffer = () => {
    let cocaCola = cartItems.find((item) => item.name === "Coca-Cola")
    let croissants = cartItems.find((item) => item.name === "Croissants")
    let coffee = items.find((item) => item.name === "Coffee")
    let updatedOffer = {
      cocacla: parseInt(cocaCola?.quantity / offer?.cocacla || 0),
      cocacolaPrice: parseFloat(cocaCola?.price.split("£")[1]),
      coffee: parseInt(croissants?.quantity / offer?.croissants || 0),
      coffeePrice: parseFloat(coffee?.price.split("£")[1]),
    }
    calculateTotalDiscount(updatedOffer)
    setOfferItem(updatedOffer)
  }
  const calculateTotalDiscount = (discountOffer) => {
    let cocaclaDiscount = discountOffer?.cocacla * discountOffer?.cocacolaPrice
    let coffeeDiscount = discountOffer?.coffee * discountOffer?.coffeePrice
    let totalDiscount = cocaclaDiscount + coffeeDiscount || 0
    debugger
    dispatch(DiscountAmount(totalDiscount))
  }

  return (
    <div className="tabs-main">
      <h3 className="trending-items mb-5">Checkout</h3>
      <div className="box-main d-flex flex-row flex-wrap">
        {cartItems.length > 0
          ? cartItems.map((cartItem, index) => {
              return (
                <CheckoutItem
                  cartItem={cartItem}
                  offerItem={offerItem}
                  items={items}
                  key={index}
                  addQuantity={() => {
                    dispatch(addQuantity(cartItem?.name)).then(() => {
                      dispatch(calculateSubTotal())
                    })
                  }}
                  removeQuantity={() => {
                    dispatch(removeQuantity(cartItem?.name)).then(() => {
                      dispatch(calculateSubTotal())
                    })
                  }}
                  removeCartItem={() => {
                    dispatch(removeCartItem(cartItem?.name)).then(() => {
                      dispatch(calculateSubTotal())
                    })
                  }}
                />
              )
            })
          : "Your Cart is Empty."}
      </div>
      {(offerItem.cocacla > 0 || offerItem.coffee > 0) && (
        <h3 className="trending-items mb-5">Offer items</h3>
      )}
      <div className="box-main d-flex flex-row flex-wrap">
        {offerItem.cocacla > 0 && (
          <CheckoutItem
            offer={true}
            cartItem={items.find((item) => item.name === "Coca-Cola")}
            offerItemQuantity={offerItem.cocacla}
          />
        )}
        {offerItem.coffee > 0 && (
          <CheckoutItem
            offer={true}
            cartItem={items.find((item) => item.name === "Coffee")}
            offerItemQuantity={offerItem.coffee}
          />
        )}
      </div>
      <hr className="w-75" />
      <div className="w-75">
        <div className="row py-3">
          <div className="col-6"></div>
          <div className="col">
            <h5 className="box-product-heading mb-0">Subtotal</h5>
          </div>
          <div className="col">
            <p className="checkout-final-amount mb-0">
              £{(subTotal + discount).toFixed(2)}
            </p>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <hr className="w-75" />
      <div className="w-75">
        <div className="row py-3">
          <div className="col-6"></div>
          <div className="col">
            <h5 className="box-product-heading mb-0">Discount</h5>
          </div>
          <div className="col">
            <p className="checkout-final-amount mb-0">£{discount.toFixed(2)}</p>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <hr className="w-75" />
      <div className="w-75">
        <div className="row py-3">
          <div className="col-6"></div>
          <div className="col">
            <h5 className="box-product-heading mb-0">Total</h5>
          </div>
          <div className="col">
            <p className="checkout-final-amount mb-0">£{subTotal.toFixed(2)}</p>
          </div>
          <div className="col text-end">
            <button
              className="checkout-btn btn px-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <hr className="w-75" />
      <Payment totalAmount={`£${subTotal.toFixed(2)}`} />
    </div>
  )
}

export default Checkout
