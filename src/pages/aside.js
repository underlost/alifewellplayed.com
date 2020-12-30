import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, AsideCard } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Aside Page
 *
 * A somewhat stream of conciousness. WIP
 *
 */
const AsidePage = ({ data, location }) => {
  const posts = data.allGhostPost.edges
  const page = data.ghostPage

  return (
    <>
      <MetaData data={data} location={location} type="website" />
      <Layout>
        <div className="container px-3 px-md-5 pt-5">
          {page ? (
            <article>
              <h1 className="content-title h2">{page.title}</h1>
              <div className="content-body load-external-scripts mb-5" dangerouslySetInnerHTML={{ __html: page.html }} />
            </article>
          ) : null}
          <section className="post-feed">
            {posts.map(({ node }) => (
              <AsideCard key={node.id} post={node} />
            ))}
          </section>
        </div>
      </Layout>
    </>
  )
}

AsidePage.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
    ghostPage: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default AsidePage

// This page query loads all posts sorted descending by published date
export const pageQuery = graphql`
  query GhostAsideQuery {
    ghostPage(slug: { eq: "aside-page" }) {
      ...GhostPageFields
    }
    allGhostPost(sort: { order: DESC, fields: [published_at] }, filter: { tags: { elemMatch: { name: { eq: "#aside" } } } }, limit: 12) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
