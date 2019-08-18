import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    const prevProps = this.props;

    try {
      // Check if quantity of current item in updated cart is different to prevent
      // Unnecessary item rerenders
      const { cart: oldCart, item: { gid: oldGid} } = prevProps;
      const { cart: newCart, item: { gid: newGid} } = nextProps;

      const { gquantity: oldQuantity } = oldCart[oldGid];
      const { gquantity: newQuantity } = newCart[newGid];

      return oldQuantity !== newQuantity;
    } catch (e) {
      return true;
    }
  }

  render() {
    const {
      cart,
      item,
      handleAmountChange,
    } = this.props;

    const {
      gid: id,
      gname: name,
      gprice,
    } = item;

    const price = gprice.toFixed(2);
    const quantity = (cart[id] && cart[id].gquantity) ? cart[id].gquantity : 0;
    const totalPrice = (quantity * price).toFixed(2);

    return (
      <tr>
        <td className="align-middle">{id}</td>
        <td className="align-middle">{name}</td>
        <td className="align-middle">{price}</td>
        <td className="align-middle">
        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" onClick={() => handleAmountChange(item, quantity - 1)}>-</button>
          </div>
          <input
            type="text"
            className="form-control text-right"
            value={quantity}
            onChange={(e) => handleAmountChange(item, Number(e.target.value))}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={() => handleAmountChange(item, quantity + 1)}>+</button>
          </div>
        </div>
        </td>
        <td className="align-middle">{totalPrice}</td>
      </tr>
    );
  }
}

Item.propTypes = {
  cart: PropTypes.object,
  item: PropTypes.shape({
    gid: PropTypes.string,
    gname: PropTypes.string,
    gprice: PropTypes.number,
  }),
  handleAmountChange: PropTypes.func,
};

Item.defaultProps = {
  item: {
    gid: '0',
    gname: '',
    gprice: 0,
  }
};

export default Item;
