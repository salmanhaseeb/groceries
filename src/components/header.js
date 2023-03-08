import heartFillIcon from "./../img/heart-fill-Icon-2.png"
import { useSelector, useDispatch } from "react-redux"
import Avatar from "./../img/Avatar-1.png"
import Cart from "./../img/Icon.png"
import filter from "./../img/filter-Icon.png"
import { filterItem } from "./../redux/itemsSlice"
import { Link } from "react-router-dom"

function Header() {
  const dispatch = useDispatch()
  const { favouriteItems, cartItems } = useSelector((state) => state.items)
  return (
    <div className="row header-main mb-5">
      <div className="col-md-9 col-sm-12">
        <div className="d-flex flex-column flex-sm-row align-items-center">
          <Link to="/" className="text_decoration">
            <h3 className="groceries mb-0 me-4">GROCERIES</h3>
          </Link>
          <div className="search-main px-4 py-1 w-100 d-flex flex-row align-items-center">
            <input
              placeholder="Search"
              className="search-input border-0 w-100 bg-transparent"
              onKeyUp={(e) => {
                dispatch(filterItem(e.target.value))
              }}
            />{" "}
            <img src={filter} width="33" alt="" />
          </div>
        </div>
      </div>
      <div className="col-md-3 col-sm-12">
        <ul className="nav-icon-list p-0 m-0 d-flex flex-column flex-sm-row justify-content-evenly align-items-center">
          <li className="position-relative">
            <img src={heartFillIcon} width="51" alt="" />
            <span className="position-absolute top-0 start-100 translate-middle bg_red">
              {favouriteItems.length}
            </span>
          </li>
          <li className="">
            <img src={Avatar} width="58" alt="" />
          </li>
          <li className="position-relative">
            <Link to="/checkout">
              <img src={Cart} width="51" alt="" />
              <span className="position-absolute top-0 start-100 translate-middle bg_blue">
                {cartItems.length}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
