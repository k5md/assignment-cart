import React from 'react';
import PropTypes from 'prop-types';

import Item from '../Item';

class Category extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Check that updated cart includes gids from the current category to rerender
    // only categories with items in cart
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

    const { goods, rname } = product;

    return (
      <tbody>
       <tr>
          <td colSpan="5" align="center">
            <h2>{rname}</h2>
          </td>
        </tr>
        <tr className="thead-dark">
          <th>ID</th>
          <th>Название товара</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
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
  product: PropTypes.shape({
    goods: PropTypes.array,
    rname: PropTypes.string,
  }),
  cart: PropTypes.object,
  handleAmountChange: PropTypes.func,
};

export default Category;

