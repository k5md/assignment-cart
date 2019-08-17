import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CartControls extends React.Component {
  render() {
    const {
      submitCart,
      cart,
      status,
    } = this.props;
    const items = Object.values(cart);
    const totalQuantity = items.reduce((acc, cur) => acc + cur.gquantity, 0);
    const totalPrice = items.reduce((acc, cur) => acc + cur.gquantity * cur.gprice, 0).toFixed(2);

    const sending = status === 'sending';

    return (
      <nav className="d-inline-flex bg-light fixed-bottom justify-content-end cart-controls ">
        <div className="col d-inline-flex flex-row align-items-center justify-content-around">
          <div className="mx-auto">
            <span>Товаров: </span>
            <span>{totalQuantity}</span>
          </div>
          <div className="mx-auto">
            <span>Итого: </span>
            <span>{totalPrice}</span>
          </div>
          <div className="mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitCart}
              disabled={sending}
            >
              <div className={classNames({
                'spinner-border': sending,
                'spinner-border-sm': sending,
                'text-light': sending,
              })}></div>
              В корзину
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

CartControls.propTypes = {
  submitCart: PropTypes.func,
  cart: PropTypes.object,
  status: PropTypes.string,
};

export default CartControls;
