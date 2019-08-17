import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Item from '../Item';

class Category extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { cart, product } = nextProps;
    const cartIds = Object.keys(cart);

    return product.goods.findIndex(item => cartIds.includes(item.gid)) !== -1;
  }

  render() {
    const {
      product,
      cart,
      handleAmountChange,
    } = this.props;

    const { goods } = product;

    return (
      <tbody>
       <tr>
          <td colSpan="5" align="center">
            <h2>{product.rname}</h2>
          </td>
        </tr>
        {goods.map((item) => (
          <Item
            key={item.gid}
            item={item}
            handleAmountChange={handleAmountChange}
            cart={cart}
          />
        ))}
      </tbody>
    );
  }
}

Category.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.object,
  handleAmountChange: PropTypes.func,
};

export default Category;

