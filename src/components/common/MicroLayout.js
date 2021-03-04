import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
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
const MicroLayout = ({ data, children, bodyClass }) => {
  const site = data.allGhostSettings.edges[0].node
  //const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  //const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

  const [menuState, setMenuState] = useState(`page nav-is-closed`)
  const toggleMenu = () => {
    setMenuState(state => (state === `page nav-is-closed` ? `page nav-is-active` : `page nav-is-closed`))
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
                  <span className={`icon-bar bottom-bar`} />
                  <span className={`sr-only`}>Toggle navigation</span>
                </button>
              </div>

              <MobileNavigation data={site.navigation} navClass="site-nav-item py-2" />

              <div className="container px-3 px-md-5">
                <div className="site-mast pt-5">
                  <Link className="site-brand d-block text-center" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="site-logo" fillRule="evenodd" strokeMiterlimit={10} clipRule="evenodd" viewBox="0 0 82 82" width="82" height="82">
                      <title>{`A Life Well Played, By Tyler Rilling`}</title>
                      <g className="pixelHeart-container">
                        <circle id="Oval" cx="41" cy="41" r="41" fill="#9ae2e7" />
                        <path
                          className="pixelHeart"
                          fill="#35c5cf"
                          fillRule="nonzero"
                          d="M30.432 61.877v-4.2h-4.186v-4.149h-4.16v-4.2h-4.209v-4.225h-4.163v-8.332h4.126v-4.109h4.158v-4.174h4.211v4.2h4.2v4.146h4.172l.122-.035v-4.112h4.163v-4.2h4.209v4.174H47.2v-4.174h4.2v4.174h4.223v-4.174h4.2v4.234h-4.2v4.05h4.209v4.257h-4.2v-4.172h-4.234v8.247h-4.186v4.225h-4.186v4.186h-4.184v4.146h-4.2v4.211l-4.21.006zm8.357-8.4v-.1.1zm-12.483 0v-.1.1zm20.915-16.7h4.174v-4.052h-4.174v4.052zM42.95 57.814V53.58h4.248v4.234H42.95zm8.457-8.48v-4.225h4.234v4.225h-4.234zm-.012-4.225h.012-.012zM64.024 27.84v-4.22h4.26v4.22h-4.26zm-8.406-3.5v-4.223h4.2v4.223h-4.2z"
                        />
                      </g>
                    </svg>
                  </Link>
                </div>
              </div>
            </header>

            <main className="site-main mx-auto">
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

MicroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
}

const MicroLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
      query MicroGhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        file(relativePath: { eq: "ghost-icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <MicroLayout data={data} {...props} />}
  />
)

export default MicroLayoutSettingsQuery
