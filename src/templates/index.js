import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import ReadFirstBlock from '../components/ReadFirstBlock'

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  const posts = data.allGhostPost.edges

  return (
    <>
      <MetaData data={data} location={location} type="website" title={`A Life Well Played`} isHome={true} />
      <Layout isHome={true}>
        <>
          {pageContext.humanPageNumber === 1 && <ReadFirstBlock />}
          <div className="container pt-5">
            <section className="post-feed">
              {posts.map(({ node }) => (
                // The tag below includes the markup for each post - components/common/PostCard.js
                <PostCard key={node.id} post={node} />
              ))}
            </section>
            <Pagination pageContext={pageContext} />
          </div>
        </>
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(sort: { order: DESC, fields: [published_at] }, filter: { tags: { elemMatch: { name: { eq: "#blog" } } } }, limit: $limit, skip: $skip) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
