import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { reset } from "./../redux/itemsSlice"

function Payment({ totalAmount }) {
  const dispatch = useDispatch()

  const [cardNumber, setCardNumber] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")
  const navigate = useNavigate()

  const payPayment = () => {
    toast.success("your order has been placed.")
    dispatch(reset())
    navigate("/")
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Payment
            </h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <label for="card-number" class="form-label">
                  Card Number
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="card-number"
                  onChange={(e) => {
                    setCardNumber(e.target.value)
                  }}
                  placeholder="Card Number"
                  value={cardNumber}
                />
              </div>
              <div className="col-md-7 mt-2">
                <label for="date" class="form-label">
                  Expiration Date
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="date"
                  onChange={(e) => {
                    setExpirationDate(e.target.value)
                  }}
                  placeholder="MM/YY"
                  value={expirationDate}
                />
              </div>
              <div className="col-md-5 mt-2">
                <label for="cvv" class="form-label">
                  CVV
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="cvv"
                  onChange={(e) => {
                    setCvv(e.target.value)
                  }}
                  placeholder="CVV"
                  value={cvv}
                />
              </div>
              <div className="col-md-12 mt-2">
                <label for="card-name" class="form-label">
                  Card Holder Name
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="card-name"
                  onChange={(e) => {
                    setCardHolderName(e.target.value)
                  }}
                  placeholder="Card Holder Name"
                  value={cardHolderName}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => {
                payPayment()
              }}
              data-bs-dismiss="modal"
            >
              pay {totalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
