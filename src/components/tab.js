function Tabs({ setItemType }) {
  return (
    <ul className="nav nav-pills mb-5" id="pills-tab" role="tablist">
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          type="button"
          onClick={() => {
            setItemType("all")
          }}
        >
          All items
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          type="button"
          onClick={() => {
            setItemType("drinks")
          }}
        >
          Drinks
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          type="button"
          onClick={() => {
            setItemType("fruit")
          }}
        >
          Fruit
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button
          className="nav-link"
          type="button"
          onClick={() => {
            setItemType("bakery")
          }}
        >
          Bakery
        </button>
      </li>
    </ul>
  )
}

export default Tabs
