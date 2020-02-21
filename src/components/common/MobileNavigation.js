import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* MobileNavigation component
*
*/
const MobileNavigation = ({ data, navClass }) => (
  <div className={`site-nav-mobile-wrapper`}>
    <nav className={`site-nav-mobile pt-5`}>
      <ul className={`site-nav-mobile-list`}>
        {data.map((navItem, i) => {
          if (navItem.url.match(/^\s?http(s?)/gi)) {
            return <span className="h2 list-item d-block text-uppercase"><a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a></span>
          } else {
            return <span className="h2 list-item d-block text-uppercase"><Link activeClassName={`active`} className={navClass} to={navItem.url} key={i}>{navItem.label}</Link></span>
          }
        })}
      </ul>
    </nav>
  </div>
)

MobileNavigation.defaultProps = {
  navClass: `site-nav-item`,
}

MobileNavigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  navClass: PropTypes.string,
}

export default MobileNavigation
