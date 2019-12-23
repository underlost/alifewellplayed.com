import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { PostItem } from '../components/common'

const ReadFirstBlock = ({ data }) => {
  const posts = data.allGhostPost.edges[0].node

  return (
    <>
      {posts.map(({ node }) => (
        // The tag below includes the markup for each post - components/common/PostCard.js
        <PostItem key={node.id} post={node} />
      ))}
    </>
  )
}

ReadFirstBlock.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
}

const ReadFirstBlockQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostReadFirstQuery {
              allGhostPost(
                sort: { order: DESC, fields: [published_at] }
                filter: { tags: { elemMatch: { name: { eq: "#featured" } } } }
                limit: 5
              ) {
                edges {
                  node {
                    ...GhostPostFields
                  }
                }
              }
            }
        `}
    render={data => <ReadFirstBlock data={data} {...props} />}
  />
)

export default ReadFirstBlockQuery