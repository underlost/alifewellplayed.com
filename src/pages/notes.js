import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Archive Page
 *
 * Loads all posts from Ghost and displays them as an archibe.
 * Optional Text and title are displayed from the archiive page in Ghost.
 *
 */
const NotesPage = ({ data, location }) => {
  const posts = data.allGhostPost.edges
  const page = data.ghostPage

  return (
    <>
      <MetaData data={data} location={location} type="website" />
      <Layout>
        <div className="gh-content gh-canvas pt-5">
          <h1 className="content-title h2">{page.title}</h1>
          <section className="content-body load-external-scripts mb-5" dangerouslySetInnerHTML={{ __html: page.html }} />
          <section className="post-feed">
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
        </div>
      </Layout>
    </>
  )
}

NotesPage.propTypes = {
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

export default NotesPage

// This page query loads all posts sorted descending by published date
export const pageQuery = graphql`
  query GhostNotesQuery {
    ghostPage(slug: { eq: "notes" }) {
      ...GhostPageFields
    }
    allGhostPost(sort: { order: DESC, fields: [published_at] }, filter: { tags: { elemMatch: { name: { eq: "#notes" } } } }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
