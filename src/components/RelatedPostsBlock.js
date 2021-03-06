import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { getPostsFromQuery } from '../utils/blog'
import { includes, orderBy } from 'lodash'
import { PostItem } from '../components/common'

// Related posts based on:
// https://khalilstemmler.com/articles/gatsby-related-posts-component/
// Adaopted for Ghost

const RelatedPosts = ({ posts }) => (
  <div className="related-wrapper pb-5 block-after">
    <section className="realated-posts px-0 py-5">
      <h6 className="h5 text-uppercase text-orange mb-4">Read More</h6>
      <nav className="read-first-list">
        {posts.map(({ article }) => (
          <PostItem key={article.id} post={article} />
        ))}
      </nav>
    </section>
  </div>
)

class RelatedPostsFactory {
  constructor(articles, currentArticleSlug) {
    this.articles = articles.filter(aArticle => aArticle.slug !== currentArticleSlug)
    this.currentArticleSlug = currentArticleSlug
    this.maxArticles = 4
    this.tags = []
  }

  setMaxArticles(m) {
    this.maxArticles = m
    return this
  }

  setTags(tagsArray) {
    this.tags = tagsArray
    return this
  }

  getArticles() {
    const { tags, articles, maxArticles } = this
    const identityMap = {}

    function getSlug(article) {
      //console.log(article)
      return article.slug
    }

    function addToMap(article) {
      const slug = getSlug(article)

      // eslint-disable-next-line no-prototype-builtins
      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          article: article,
          points: 0,
        }
      }
    }

    // eslint-disable-next-line no-shadow
    function addTagsPoints(article, tags) {
      const tagPoint = 1
      const slug = getSlug(article)

      article.tags.forEach((aTag) => {
        if (includes(tags, aTag)) {
          identityMap[slug].points += tagPoint
        }
      })
    }

    function getIdentityMapAsArray() {
      return Object.keys(identityMap).map(slug => identityMap[slug])
    }

    for (let article of articles) {
      addToMap(article)
      addTagsPoints(article, tags)
    }

    const arrayIdentityMap = getIdentityMapAsArray()
    const similarArticles = orderBy(arrayIdentityMap, [`points`], [`desc`])
    return similarArticles.splice(0, maxArticles)
  }
}

const RelatedPostsBlock = props => (
  <StaticQuery
    query={graphql`
      query GhostRelatedPostsQuery {
        allGhostPost(limit: 500, sort: { order: DESC, fields: [published_at] }, filter: { tags: { elemMatch: { name: { eq: "#blog" } } } }) {
          edges {
            node {
              ...GhostPostFields
            }
          }
        }
      }
    `}
    render={(data) => {
      const { tags, currentArticleSlug } = props

      const articles = getPostsFromQuery(data.allGhostPost)
      const similarArticles = new RelatedPostsFactory(articles, currentArticleSlug).setMaxArticles(4).setTags(tags).getArticles()
      return <RelatedPosts posts={similarArticles} />
    }}
  />
)

export default RelatedPostsBlock

RelatedPostsBlock.propTypes = {
  tags: PropTypes.array.isRequired,
  currentArticleSlug: PropTypes.string,
}

RelatedPosts.propTypes = {
  posts: PropTypes.array.isRequired,
}
