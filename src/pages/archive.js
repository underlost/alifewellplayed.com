import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostItem } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Archive Page
 *
 * Loads all posts from Ghost and displays them as an archibe.
 * Optional Text and title are displayed from the archiive page in Ghost.
 *
 */
const ArchivePage = ({ data, location }) => {
  const posts = data.allGhostPost.edges
  const page = page.ghostPage

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container px-0">
          <h1 className="content-title h1 text-uppercase">{page.title}</h1>
          <section className="post-feed">
            {posts.map(({ node }) => (
              // The tag below includes the markup for each post - components/common/PostCard.js
              <PostItem key={node.id} post={node} />
            ))}
          </section>
        </div>
      </Layout>
    </>
  )
}

ArchivePage.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  page: PropTypes.shape({
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

export default ArchivePage

// This page query loads all posts sorted descending by published date
export const pageQuery = graphql`
  query GhostArchiveQuery {
    ghostPage(slug: { eq: "archive" }) {
      ...GhostPageFields
    }
    allGhostPost(sort: { order: DESC, fields: [published_at] }, filter: { tags: { elemMatch: { name: { eq: "#blog" } } } }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
