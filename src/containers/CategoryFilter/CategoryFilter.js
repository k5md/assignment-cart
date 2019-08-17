import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const CategoryFilter = ({
  products,
  activeCategory,
  handleSelect,
}) => (
  <nav>
    <div className="sidebar-header">
      <h3>Категории товаров</h3>
    </div>
    <ul className="list-unstyled">
      {products.map(product => (
        <li
          key={_.uniqueId()}
          className={classNames({
            'list-item': true,
            'text-success': product.rid === activeCategory,
            'text-primary': product.rid !== activeCategory,
          })}
        >
          <a
            className="btn text-left"
            role="button"
            onClick={() => handleSelect(product.rid)}
          >
            {product.rname}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

CategoryFilter.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      rid: PropTypes.number,
      rname: PropTypes.string,
    })
  ),
  activeCategory: PropTypes.number,
  handleSelect: PropTypes.func,
};

export default CategoryFilter;
