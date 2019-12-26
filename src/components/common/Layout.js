import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Fade from 'react-reveal/Fade'
import SvgLogo from '../Logo'
import { Navigation } from '.'
import config from '../../utils/siteConfig'

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
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">
        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <header className="site-head mx-auto mt-3">
            <div className="container px-0">
              <div className="site-mast row no-gutters">
                <div className="site-mast-left col-md-8">
                  <Fade top>
                    <Link className="site-brand d-block" to="/">
                      <SvgLogo />
                    </Link>
                  </Fade>
                </div>
                <div className="site-mast-right col-md-4 align-self-end">
                  { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                  { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                  <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>

                  <nav className="site-nav text-md-right mb-4">
                    {/* The navigation items as setup in Ghost */}
                    <Navigation data={site.navigation} navClass="site-nav-item" />
                  </nav>
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

          <main className="site-main mx-auto px-5 py-5">
            {/* All the main content gets inserted here, index.js, post.js */}
            <Fade bottom>
              {children}
            </Fade>
          </main>

        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className="site-foot text-uppercase">
            <div className="site-foot-nav container px-0">
              <div className="site-mast-left">
                <Link to="/">
                  {site.logo ?
                    <img className="site-logo" src={site.logo} alt={site.title} />
                    : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                  }
                </Link>
              </div>
              <div className="site-foot-nav-left">
                <Link to="/">{site.title}</Link> © 2019
              </div>
              <div className="site-foot-nav-right">
                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
              </div>
            </div>
          </footer>

        </div>
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
