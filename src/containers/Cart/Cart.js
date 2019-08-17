import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Category from '../Category';
import Item from '../Item';

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
  products: PropTypes.array,
  activeCategory: PropTypes.string,
  cart: PropTypes.object,
  handleAmountChange: PropTypes.func,
};

export default Cart;
