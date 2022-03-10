/* eslint-disable */

import Inline from '../inline.macro'
import { Image, Flex, Paragraph, Text, Link } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Fira+Code&family=Source+Sans+Pro'
        rel='stylesheet'
      />
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: '#282A36',
          pl: 5,
          pr: 5,
          border: `10px solid ${query.color}`,
          borderRadius: 4
        }}
      >
        <Flex as='content'>
          <Flex
            sx={{
              background: '#303442',
              borderRadius: 20,
              marginRight: 50
            }}
          >
            <Image
              sx={{
                width: 600
              }}
              src={`https://draculatheme.com/static/img/shop/${query.image}`}
            />
          </Flex>

          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Paragraph
              sx={{
                width: 400,
                maxWidth: '100%',
                fontSize: '50px',
                fontWeight: 300,
                fontFamily: 'Source Sans Pro',
                color: '#f2f2f2'
              }}
            >
              <Text>{query.title}</Text>
            </Paragraph>

            <Paragraph
              sx={{
                display: 'inline-block',
                fontWeight: 400,
                fontSize: 20,
                fontFamily: 'Fira Code',
                color: '#f2f2f2',
                display: 'flex',
                alignItems: 'center',
                mt: 20,
                ml: -1
              }}
            >
              <Flex>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='28'
                  height='28'
                  fill='none'
                  stroke='#6D7290'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='feather feather-dollar-sign'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 1L12 23'></path>
                  <path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6'></path>
                </svg>
                <Text
                  sx={{
                    mt: 0,
                    pl: 2,
                    pr: 2,
                    color: query.color
                  }}
                >
                  {query.price}
                </Text>{' '}
                USD
              </Flex>
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  color: '#bd93f9',
  image: 'dracula-snapback-hat-1.png',
  price: 29.99,
  title: 'Dracula Snapback Hat'
}

export const draculaShop = { name: 'Dracula Shop', code, query }
