import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    const prevProps = this.props;

    const prevExists = _.has(prevProps, 'item.gid') && _.has(prevProps, 'cart');
    const nextExists = _.has(nextProps, 'item.gid') && _.has(nextProps, 'cart');
    if (prevExists && nextExists) {
      const { cart: oldCart, item: oldItem } = prevProps;
      const { cart: newCart, item: newItem } = nextProps;

      const { gid: oldGid } = oldItem;
      const { gid: newGid } = newItem;

      if (_.has(oldCart, oldGid) && _.has(newCart, newGid)) {
        const { gquantity: oldQuantity } = oldCart[oldGid];
        const { gquantity: newQuantity } = newCart[newGid];

        return oldQuantity !== newQuantity;
      }

      if (_.has(oldCart, oldGid) || _.has(newCart, newGid)) {
        return true;
      }

      return false;
    }
    return true;
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
      gprice: price,
    } = item;
    const quantity = (cart[id] && cart[id].gquantity) ? cart[id].gquantity : 0;

    console.log('item render');
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
        <td className="align-middle">{quantity * price}</td>
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

export default Item;
