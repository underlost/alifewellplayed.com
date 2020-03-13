import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import dayjs from 'dayjs'

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost
  const readingTime = readingTimeHelper(post)
  const publishedAt = dayjs(post.published_at).format(`MMM D, YYYY`)
  const updatedAt = dayjs(post.updated_at).format(`MMM D, YYYY`)

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container pt-5">
          <article className="content">
            {post.feature_image ? (
              <figure className="post-feature-image">
                <img className="w-100" src={post.feature_image} alt={post.title} />
              </figure>
            ) : null}
            <header>
              <p className="h6 text-uppercase text-green d-inline-block mb-1 pr-2">{readingTime}</p>
              {post.tags && (
                <div className="post-byline-item post-card-tags h6 text-uppercase mb-1 d-inline-block">
                  in <Tags post={post} permalink={`/tag/:slug`} visibility="public" autolink={true} />
                </div>
              )}
              <h1 className="content-title h2 mb-1">{post.title}</h1>
              <time className="post-byline-item d-block h6 text-uppercase mb-4" dateTime={post.published_at}>
                <span className="sr-only">Published on </span>
                {publishedAt}
              </time>
            </header>
            {/* The main post content */}
            <section className="content-body load-external-scripts mb-4" dangerouslySetInnerHTML={{ __html: post.html }} />
            <footer className="post-footer row no-gutters">
              <div className="post-card-footer-right col-12">
                <small className="post-byline-item h6 text-uppercase d-block sr-only">By: {post.primary_author.name}</small>
                <time className="post-byline-item d-block h6 text-uppercase sr-only" dateTime={post.updated_at}>
                  Last Updated: {updatedAt}
                </time>
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
      published_at: PropTypes.string,
      updated_at: PropTypes.string,
      primary_author: PropTypes.object,
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
