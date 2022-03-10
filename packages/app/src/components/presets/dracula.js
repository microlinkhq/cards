/* eslint-disable */

import Inline from '../inline.macro'
import { Image, Flex, Paragraph, Text, Link } from './scope'

const code = (
  <Inline>
    <>
      <Link
        href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;700'
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
        <Flex
          as='header'
          sx={{
            position: 'absolute',
            top: 60,
            left: 5,
            display: 'flex',
            alignItems: 'center',
            width: '100%'
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
              viewBox='0 0 24 24'
            >
              <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22'></path>
            </svg>
            <Text
              sx={{
                pl: 2,
                display: 'inline-block',
                fontSize: 20,
                fontFamily: 'Fira Code',
                color: query.color,
                lineHeight: '140%'
              }}
            >
              dracula
            </Text>
            <Text
              style={{
                display: 'inline-block',
                fontSize: 20,
                fontFamily: 'Fira Code',
                color: '#f2f2f2'
              }}
            >
              /{query.repo}
            </Text>
          </Flex>
        </Flex>

        <Flex as='content'>
          <Image
            sx={{
              width: 300,
              marginRight: 50
            }}
            src={`https://draculatheme.com/static/icons/${query.icon}`}
          />
          <Paragraph
            sx={{
              width: '100%',
              fontSize: '40px',
              fontWeight: 300,
              fontFamily: 'Fira Code',
              color: '#f2f2f2'
            }}
          >
            Dark Theme for
            <br />
            <Text sx={{ fontWeight: 700 }}>{query.title}</Text>
          </Paragraph>
        </Flex>

        <Flex
          as='footer'
          sx={{
            position: 'absolute',
            bottom: 40,
            left: 5,
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Flex>
            <Paragraph
              sx={{
                display: 'inline-block',
                fontWeight: 400,
                fontSize: 20,
                fontFamily: 'Fira Code',
                color: '#f2f2f2',
                display: 'flex',
                alignItems: 'center'
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
                  viewBox='0 0 24 24'
                >
                  <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                  <circle cx='12' cy='12' r='3'></circle>
                </svg>
                <Text
                  sx={{
                    pl: 2,
                    pr: 1,
                    color: query.color
                  }}
                >
                  {query.views}
                </Text>{' '}
                views
              </Flex>

              <Flex sx={{ marginLeft: 50 }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='28'
                  height='28'
                  fill='none'
                  stroke='#6D7290'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                >
                  <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2'></path>
                  <circle cx='9' cy='7' r='4'></circle>
                  <path d='M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'></path>
                </svg>
                <Text
                  sx={{
                    pl: 2,
                    pr: 1,
                    color: query.color
                  }}
                >
                  {query.contributors}
                </Text>{' '}
                contributors
              </Flex>
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </>
  </Inline>
)

const query = {
  color: '#ffb86c',
  contributors: 25,
  icon: 'used/pack-1/048-frankenstein.svg',
  repo: 'visual-studio-code',
  title: 'Visual Studio Code',
  views: '238,737'
}

export const dracula = { name: 'Dracula', code, query }
