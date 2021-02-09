import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import SvgLogo from '../Logo'
import { Navigation } from '.'
import { MobileNavigation } from '.'
// import config from '../../utils/siteConfig'

//CSS
import '../../sass/site.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const site = data.allGhostSettings.edges[0].node
  //const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  //const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

  const [menuState, setMenuState] = useState(`page nav-is-closed`)
  const toggleMenu = () => {
    setMenuState(state => (state === `page nav-is-closed`
      ? `page nav-is-active`
      : `page nav-is-closed`))
  }

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className={menuState}>
        <div className="viewport">
          <div className="viewport-top py-lg-4">
            {/* The main header section on top of the screen */}
            <header className="site-head mx-auto mt-3">

              <div className="toggle-wrapper">
                <button type="button" className="btn navbar-toggler" onClick={toggleMenu}>
                  <span className={`icon-bar top-bar`} />
                  <span className={`icon-bar middle-bar`} />
                  <span className={`icon-bar middle-bar`} />
                  <span className={`icon-bar bottom-bar`} />
                  <span className={`sr-only`}>Toggle navigation</span>
                </button>
              </div>

              <MobileNavigation data={site.navigation} navClass="site-nav-item py-2" />

              <div className="container px-3 px-md-5">
                <div className="site-mast">
                  <div className="site-mast-left">
                    <Link className="site-brand d-block" to="/">
                      <SvgLogo />
                    </Link>
                  </div>
                </div>
                { isHome ?
                  <div className="site-banner">
                    <h1 className="site-banner-title sr-only">{site.title}</h1>
                    <p className="site-banner-desc sr-only">{site.description}</p>
                  </div> :
                  null}
              </div>
            </header>

            <main className="site-main mx-auto py-5">
              {/* All the main content gets inserted here, index.js, post.js */}
              {children}
            </main>

          </div>

          <div className="viewport-bottom">
            {/* The footer at the very bottom of the screen */}
            <footer className="site-footer text-uppercase">
              <div className="site-footer-nav container px-0">
                <div className="site-footer-nav">
                  <Navigation data={site.navigation} navClass="site-footer-nav-item" />
                </div>
                <div className="site-footer-nav">
                  <Link to="/">{site.title}</Link> © 2021
                </div>
              </div>
            </footer>

          </div>
        </div>
        <div className="page-bottom" />
      </div>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayoutSettingsQuery
