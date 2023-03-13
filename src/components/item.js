import heartIcon from "./../img/heart-Icon.png"
import heartFillIcon from "./../img/heart-fill-Icon-2.png"
import buyButton from "./../img/buy-button.png"
import FilledCart from "./../img/Icon.png"

function Item({
  item,
  favouriteItems,
  addFavouriteItem,
  removeFavouriteItem,
  cartItems,
  addToCart,
  addItemQuantity,
  removeCartItem,
}) {
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 100) + "..." : str
  }
  const checkFavourites = () => {
    return favouriteItems?.some((fitem) => item.name === fitem.name)
  }
  const checkCart = () => {
    return cartItems?.some((citem) => item.name === citem.name)
  }
  const checkRemaining = () => {
    let i = cartItems?.find((citem) => item.name === citem.name)
    if (i) {
      return item.available - i.quantity
    } else {
      return item.available
    }
  }
  return (
    <div className="row box">
      <div className="col-sm-12 col-md-7 col-lg-7 d-flex justify-content-center align-items-center">
        <img src={item?.img} width="200" alt="" />
      </div>
      <div className="col-sm-12 col-md-5 col-lg-5 product-details d-flex flex-column justify-content-between">
        <div>
          <h5 className="box-product-heading">{item?.name}</h5>
          <p className="box-product-detail">{truncate(item?.description)}</p>
          {checkRemaining() > 5 ? (
            <p className="availability-status green">Available</p>
          ) : checkRemaining() > 0 ? (
            <p className="availability-status">Only {checkRemaining()} left</p>
          ) : (
            <p className="availability-status bg-danger">Out of Stock</p>
          )}
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <p className="product-price mb-0">{item?.price}</p>
          <div>
            {checkCart() ? (
              <img
                className="me-3"
                src={FilledCart}
                width="28"
                alt=""
                onClick={() => {
                  checkRemaining() > 0 && addItemQuantity()
                }}
              />
            ) : (
              <img
                className="me-3"
                src={buyButton}
                width="28"
                alt=""
                onClick={() => {
                  checkRemaining() > 0 && addToCart()
                }}
              />
            )}

            {checkFavourites() ? (
              <img
                src={heartFillIcon}
                width="32"
                alt=""
                onClick={() => {
                  removeFavouriteItem()
                }}
              />
            ) : (
              <img
                src={heartIcon}
                width="32"
                alt=""
                onClick={() => {
                  addFavouriteItem()
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
