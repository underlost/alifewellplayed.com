import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import RelatedPostsBlock from '../components/RelatedPostsBlock'
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
        <div className="pb-5">
          <article className="content">
            <header className="gh-header gh-canvas">
              {post.feature_image ? <img className="gh-feature-image" src={post.feature_image} alt={post.title} /> : null}

              {post.primary_tag && <span className="post-card-tags h6 text-uppercase mb-1">{post.primary_tag.name}</span>}
              <h1 className="content-title h1 mb-3 text-primary">{post.title}</h1>
              <div className="post-meta mb-5">
                <time className="post-byline-item d-inline-block h6 text-uppercase pe-5" dateTime={post.published_at}>
                  <span className="sr-only">Published on </span>
                  {publishedAt}
                </time>
                <span className="h6 text-uppercase d-inline-block mb-1 pe-4">{readingTime}</span>
              </div>
            </header>
            {/* The main post content */}
            <section className="gh-content gh-canvas content-body load-external-scripts mb-4" dangerouslySetInnerHTML={{ __html: post.html }} />
            <footer className="post-footer gh-canvas">
              {post.tags && (
                <div className="post-byline-item post-card-tags h6 text-uppercase mb-1 d-inline-block">
                  in <Tags post={post} permalink={`/tag/:slug`} visibility="public" autolink={true} />
                </div>
              )}

              <time className="post-byline-item d-block h6 text-uppercase sr-only" dateTime={post.updated_at}>
                Last Updated: {updatedAt}
              </time>
            </footer>
          </article>

          <div className="gh-canvas">
            <RelatedPostsBlock tags={post.tags} currentArticleSlug={post.slug} />

            <div className="about-author">
              <h6 className="h5 text-uppercase text-green mb-4">About the Author</h6>
              <div className="post-card-author">
                <h6 className="post-byline-item h6 text-uppercase d-block mb-1">{post.primary_author.name}</h6>
                <p className="fs-6">{post.primary_author.bio}</p>
              </div>
            </div>
          </div>
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
      slug: PropTypes.string.isRequired,
      primary_tag: PropTypes.PropTypes.object,
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
