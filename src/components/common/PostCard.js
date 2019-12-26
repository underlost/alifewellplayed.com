import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Remarkable } from 'remarkable'

const md = new Remarkable()

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`
  const readingTime = readingTimeHelper(post)
  const postExcept = md.render(post.excerpt)

  return (
    <article className="post-card mb-5">
      <header className="post-card-header">
        {post.feature_image &&
          <div className="post-card-image" style={{
            backgroundImage: `url(${post.feature_image})` ,
          }}></div>}
        {post.tags && <div className="post-card-tags h6 text-uppercase mb-1"> <Tags post={post} visibility="public" autolink={false} /></div>}
        {post.featured && <span className="h6 text-uppercase mb-1 text-orange">Featured</span>}
        <Link className="post-card-link d-block" to={url}><h2 className="post-card-title h4 text-uppercase">{post.title}</h2></Link>
      </header>
      <section className="post-card-excerpt" dangerouslySetInnerHTML={{ __html: postExcept }} />
      <footer className="post-card-footer sr-only">
        <div className="post-card-footer-left">
          <div className="post-card-avatar">
            {post.primary_author.profile_image ?
              <img className="author-profile-image" src={post.primary_author.profile_image} alt={post.primary_author.name}/> :
              <img className="default-avatar" src="/images/icons/avatar.svg" alt={post.primary_author.name}/>
            }
          </div>
          <span>{ post.primary_author.name }</span>
        </div>
        <div className="post-card-footer-right">
          <div>{readingTime}</div>
        </div>
      </footer>
    </article>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
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

export default PostCard
