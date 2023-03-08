import Minus from "./../img/Minus.png"
import Plus from "./../img/Plus.png"

function CheckoutItem({
  cartItem,
  addQuantity,
  removeQuantity,
  removeCartItem,
  offer = false,
  offerItemQuantity,
}) {
  return (
    <div
      className="checkout-bar w-75 border-0 alert alert-warning alert-dismissible fade show pe-3  m-0 mb-4"
      role="alert"
    >
      <div className="d-flex flex-row justify-content-between row">
        <div className="d-flex flex-row align-items-center col-7">
          <img src={cartItem?.img} width="80" alt="" className="me-4" />
          <div>
            <h5 className="box-product-heading mb_20px">{cartItem?.name}</h5>
            <p className="box-product-detail mb-0">
              Product Type: {cartItem?.type}
            </p>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex flex-row align-items-center mb_20px">
            {!offer && (
              <img
                src={Minus}
                alt=""
                onClick={() => {
                  cartItem?.quantity > 1 ? removeQuantity() : removeCartItem()
                }}
              />
            )}

            <span className="mx-3">
              {offer ? offerItemQuantity : cartItem?.quantity}
            </span>
            {!offer && (
              <img
                src={Plus}
                alt=""
                onClick={() => {
                  addQuantity()
                }}
              />
            )}
          </div>
          {!offer && (
            <p className="availability-status mb-0">
              Only {cartItem?.available} left
            </p>
          )}
        </div>
        <div className="col-2">
          <p className="bar-product-price mb-0">
            {offer ? "free" : cartItem?.price}
          </p>
        </div>
        <div className="col-1 text-end">
          <button
            type="button"
            className="btn-close position-relative"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
