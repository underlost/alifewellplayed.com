import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost
  const readingTime = readingTimeHelper(post)

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container px-0">
          <article className="content">
            {post.feature_image ? (
              <figure className="post-feature-image">
                <img src={post.feature_image} alt={post.title} />
              </figure>
            ) : null}
            <header>
              <p className="h6 text-uppercase text-green">{readingTime}</p>
              <h1 className="content-title h2">{post.title}</h1>
            </header>
            <section className="post-full-content">
              {/* The main post content */}
              <section className="content-body load-external-scripts" dangerouslySetInnerHTML={{ __html: post.html }} />
            </section>
            <footer className="post-footer row no-gutters">
              <div className="post-card-footer-left col-6">
                {post.tags && <div className="post-card-tags h6 text-uppercase mb-1"> <Tags post={post} permalink={`/tag/:slug`} visibility="public" autolink={true} /></div>}
                <small className="h6 text-uppercase d-block">By: { post.primary_author.name }</small>
              </div>
              <div className="post-card-footer-right col-6">
                
              </div>
            </footer>
          </article>
        </div>
      </Layout>
    </>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`
