import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import ReactMarkdown from 'react-markdown'

const PostCardLink = ({ post }) => {
  const url = `/${post.slug}/`
  const readingTime = readingTimeHelper(post)

  return (
    <article className="post-card post-card-linked py-lg-3 mb-4">
      <header className="post-card-header">

        {post.primary_tag && <p className="post-card-tags h6 text-uppercase mb-1">{post.primary_tag.name}</p>}
        <h2 className="post-card-title h5 text-uppercase"><Link className="post-card-link d-inline" to={url}>{post.title}</Link></h2>

        {post.featured && <span className="h6 text-uppercase mb-1 text-orange sr-only">Featured</span>}

      </header>

      <section className="post-card-excerpt">
        <ReactMarkdown>{post.excerpt}</ReactMarkdown>
      </section>

      <footer className="post-card-footer sr-only">
        {post.tags && <div className="post-card-tags h6 text-uppercase mb-1">Posted in: <Tags post={post} visibility="public" autolink={false} /></div>}

        <div className="sr-only">
          <span>By: { post.primary_author.name }</span>
        </div>
        <div className="post-card-footer-right">
          <div>{readingTime}</div>
        </div>
      </footer>
    </article>
  )
}

PostCardLink.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    primary_tag: PropTypes.PropTypes.object,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    html: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default PostCardLink
