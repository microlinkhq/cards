import Head from 'next/head'

import { META } from '@/constants'

export const Meta = ({
  children,
  description = META.description,
  image = META.image,
  logo = META.logo,
  title = META.title,
  twitterCardType = 'summary',
  url = META.url
}) => (
  <Head>
    {/* <!-- Search Engine --> */}
    <title key='title'>{title}</title>
    <link rel='canonical' href={url} key='canonical_url' />
    <meta name='description' content={description} key='description' />
    <meta name='image' content={image} key='image' />

    {/* <!-- Schema.org for Google --> */}
    <meta itemProp='name' content={title} key='schema_title' />
    <meta
      itemProp='description'
      content={description}
      key='schema_description'
    />
    <meta itemProp='image' content={image} key='schema_image' />

    {/* <!-- Twitter --> */}
    <meta name='twitter:card' content={twitterCardType} key='twitter_card' />
    <meta name='twitter:title' content={title} key='twitter_title' />
    <meta
      name='twitter:description'
      content={description}
      key='twitter_description'
    />
    <meta name='twitter:image' content={image} key='twitter_image' />
    <meta name='twitter:domain' content={META.url} />
    <meta name='twitter:creator' content={META.twitter} />
    <meta name='twitter:site' content={META.twitter} />

    {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
    <meta property='og:title' content={title} key='og_title' />
    <meta property='og:logo' content={logo} key='og_logo' />
    <meta
      property='og:description'
      content={description}
      key='og_description'
    />
    <meta property='og:image' content={image} key='og_image' />
    <meta property='og:url' content={url} key='og_url' />

    {children}
  </Head>
)
