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
    const totalPrice = items.reduce((acc, cur) => acc + cur.gquantity * cur.gprice, 0);

    const sending = status === 'sending';

    return (
      <nav className="d-inline-flex bg-light fixed-bottom justify-content-end cart-controls ">
        <div className="col-md-6 d-inline-flex flex-row align-items-center  justify-content-around">
          <div className="mx-5">
            <span>Товаров: </span>
            <span>{totalQuantity}</span>
          </div>
          <div className="mx-5">
            <span>Итого: </span>
            <span>{totalPrice}</span>
          </div>
          <div className="mx-5">
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
