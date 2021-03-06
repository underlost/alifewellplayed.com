import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { PostItem } from '../components/common'

const ReadFirst = ({ data }) => {
  const posts = data.allGhostPost.edges

  return (
    <div className="read-first-wrapper container px-3 px-md-0">
      <section className="read-first post-feed mb-5 pb-5 px-4 py-5 px-md-5">
        <h6 className="h6 text-uppercase text-orange mb-3">Read This First</h6>
        {posts.map(({ node }) => (
          // The tag below includes the markup for each post - components/common/PostCard.js
          <PostItem key={node.id} post={node} />
        ))}
      </section>
    </div>
  )
}

ReadFirst.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
}

const ReadFirstBlock = props => (
  <StaticQuery
    query={graphql`
      query GhostReadFirstQuery {
        allGhostPost(sort: { order: DESC, fields: [published_at] }, filter: { featured: { eq: true } }, limit: 3) {
          edges {
            node {
              ...GhostPostFields
            }
          }
        }
      }
    `}
    render={data => <ReadFirst data={data} {...props} />}
  />
)

export default ReadFirstBlock
