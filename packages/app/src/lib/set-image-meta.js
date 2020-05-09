const setContent = (selector, newContent) => {
  const el = document.querySelector(selector)
  if (el) el.content = newContent
}

export const setImageMeta = imageUrl => {
  if (imageUrl) {
    setContent('meta[property="og:image"]', imageUrl)
    setContent('meta[name="twitter:image"]', imageUrl)
    setContent('meta[name="image"]', imageUrl)
    setContent('meta[itemprop="image"]', imageUrl)
  }
}
