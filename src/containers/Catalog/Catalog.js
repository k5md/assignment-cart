import React, { Component } from 'react';

import { getProducts, addBasket } from '../../utils/API';
import Cart from '../../components/Cart';
import CartControls from '../../components/CartControls';
import CategoryFilter from '../../components/CategoryFilter';


class Catalog extends Component {
  state = {
    products: [],
    cart: {},
    activeCategory: '-1',
    status: 'ready',
    error: null,
  }

  componentDidMount() {
    getProducts().then(
      (products) => {
        const normalizedProducts = products
          .filter(item => item.goods && item.rid)
          .map(item => ({
            ...item,
            goods: item.goods.map(good => ({
              ...good,
              gprice: Number(good.gprice),
            }))
          }));
        this.setState({ products: normalizedProducts });
      },
      (error) => {
        this.setState({ status: 'error', error });
      }
    );
  }

  setActiveCategory = (id) => {
    this.setState({
      activeCategory: id,
    });
  }

  submitCart = () => {
    const { cart } = this.state;
    const items = Object.values(cart);

    // Filter cart to avoid sending post request with empty products field
    if (!items.filter(val => val).length) {
      return;
    }

    const product = items.reduce((acc, cur) => {
      const { gquantity, gid } = cur;
      return gquantity > 0 ? { ...acc, [gid]: gquantity } : acc;
    }, {});

    this.setState({ status: 'sending' });

    addBasket(product,
      () => this.setState({ status: 'ready', error: null }),
      (error) => this.setState({ status: 'error', error }),
    );
  }

  handleAmountChange = (item, quantity) => {
    this.setState((state) => {
      const { cart } = state;
      const { gid, gprice } = item;
      const oldValue = cart[gid] !== undefined ? cart[gid] : { gid, gprice, gquantity: 0};
      const newValue = {
        ...oldValue,
        gquantity: quantity > 0 ? quantity : 0,
      };

      return {
        cart: {
          ...cart,
          [gid]: newValue,
        },
      };
    });
  }

  render() {
    const {
      products,
      cart,
      activeCategory,
      status,
    } = this.state;

    const showAllEntry = [{ rid: '-1', rname: 'Все товары' }];
    const productsWithAll = showAllEntry.concat(products);

    return (
      <div className="container cart-container">
        <div className="row">
          <div className="col-md-4 full-height">
            <CategoryFilter
              products={productsWithAll}
              activeCategory={activeCategory}
              handleSelect={this.setActiveCategory}
            />
          </div>
          <div className="col-md-8 full-height">
            <Cart
              products={products}
              activeCategory={activeCategory}
              cart={cart}
              handleAmountChange={this.handleAmountChange}
            />
            <CartControls
              submitCart={this.submitCart}
              cart={cart}
              status={status}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Catalog;
