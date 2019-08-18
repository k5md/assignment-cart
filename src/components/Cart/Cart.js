import React from 'react';
import PropTypes from 'prop-types';

import Category from '../Category';

class Cart extends React.Component {
  render() {
    const {
      products,
      handleAmountChange,
      cart,
      activeCategory,
    } = this.props;

    return (
      <table className="table table-sm table-fixed">
        {products.map((item, index) => {
          if (activeCategory !== '-1' && item.rid !== activeCategory) {
            return null;
          }
          return (
            <Category
              key={item.rid}
              cart={cart}
              handleAmountChange={handleAmountChange}
              product={products[index]}
            />
          );
        })}
      </table>
    );
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      rid: PropTypes.string,
      rname: PropTypes.string,
    }),
  ),
  activeCategory: PropTypes.string,
  cart: PropTypes.object,
  handleAmountChange: PropTypes.func,
};

export default Cart;
