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
  return (
    <div className="row box">
      <div className="col-7 d-flex justify-content-center align-items-center">
        <img src={item?.img} width="200" alt="" />
      </div>
      <div className="col product-details d-flex flex-column justify-content-between">
        <div>
          <h5 className="box-product-heading">{item?.name}</h5>
          <p className="box-product-detail">{truncate(item?.description)}</p>
          {item?.available > 5 ? (
            <p className="availability-status green">Available</p>
          ) : (
            <p className="availability-status">Only {item?.available} left</p>
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
                  removeCartItem()
                }}
              />
            ) : (
              <img
                className="me-3"
                src={buyButton}
                width="28"
                alt=""
                onClick={() => {
                  addToCart()
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
