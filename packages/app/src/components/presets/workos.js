import Inline from '../inline.macro'
import { Box, Flex, Image, Text, Paragraph, Link } from './scope'

const query = {
  authorName: 'Michael Grinich',
  authorUrl:
    'https://assets-global.website-files.com/621f84dc15b5ed16dc85a18a/6233039efa60bb0f3f85d22b_610c1aea124ef454246e58be_michael.jpeg',
  category: 'Product',
  title: 'Getting Started with the WorkOS Multi-Factor Authentication API',
  imageUrl:
    'https://assets-global.website-files.com/621f84dc15b5ed16dc85a18a/6268239512f0c10049e7d43b_MFA-guide.png'
}

const code = (
  <Inline>
    <Flex
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Link
        href='https://cdn.workos.com/www/open-graph/main.css'
        rel='stylesheet'
      />
      <Flex
        sx={{
          maxWidth: '50%',
          minWidth: '50%'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            left: 45,
            width: '100%'
          }}
        >
          <svg
            width='126'
            height='24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M36.518 3.613h3.479l2.505 10.321c.464 1.948.556 3.108.556 3.108h.047s.162-1.136.626-3.108l2.388-10.32h3.943l2.527 10.32c.487 2.018.604 3.108.604 3.108h.07s.046-1.09.509-3.108l2.412-10.32h3.479l-4.406 16.93h-3.873l-2.666-10.252c-.557-2.226-.604-3.223-.604-3.223h-.047s-.047.997-.556 3.223l-2.505 10.251h-3.988l-4.5-16.93ZM59.082 14.393c0-3.874 2.505-6.378 6.286-6.378 3.757 0 6.261 2.504 6.261 6.377 0 3.896-2.505 6.425-6.261 6.425-3.78-.001-6.286-2.529-6.286-6.425Zm9.3 0c0-2.505-1.206-3.92-3.014-3.92-1.948 0-3.039 1.577-3.039 3.92 0 2.551 1.206 3.965 3.039 3.965 1.948 0 3.014-1.578 3.014-3.966ZM73.182 8.204h3.084v2.274h.07c.534-1.183 1.808-2.366 3.988-2.366.37 0 .603.047.765.092v3.084h-.092s-.278-.092-1.044-.092c-2.388 0-3.687 1.414-3.687 4.058v5.287h-3.084V8.204ZM82.527 3.613h3.084V9.04c0 3.2-.047 3.78-.047 3.78h.047l4.592-4.615h3.849l-5.378 5.334 6.239 7.004H91.27l-4.5-5.103-1.16 1.136v3.965h-3.084V3.613ZM94.957 12.14c0-5.218 3.248-8.696 8.118-8.696s8.117 3.478 8.117 8.696-3.247 8.696-8.117 8.696c-4.87 0-8.118-3.478-8.118-8.696Zm12.871 0c0-3.548-1.901-5.938-4.755-5.938s-4.753 2.39-4.753 5.938c0 3.548 1.9 5.938 4.753 5.938 2.852 0 4.755-2.39 4.755-5.938ZM112.372 14.908h3.526c0 1.995 1.369 3.108 3.456 3.108 1.762 0 2.969-.882 2.969-2.134 0-1.414-.927-1.786-3.874-2.365-2.69-.534-5.543-1.439-5.543-4.964 0-2.945 2.505-5.171 6.331-5.171 3.988 0 6.448 2.087 6.448 5.24h-3.526c0-1.53-1.182-2.482-2.922-2.482-1.762 0-2.852.858-2.852 2.11 0 1.322.765 1.831 3.131 2.318 3.501.743 6.377 1.136 6.377 5.032 0 3.087-2.69 5.174-6.656 5.174-4.035 0-6.865-2.342-6.865-5.866Z'
              id='logo-text'
              fill='#29363D'
            ></path>
            <path
              d='M0 12c0 .526.138 1.052.406 1.505l4.856 8.409c.498.858 1.255 1.56 2.196 1.874a3.94 3.94 0 0 0 4.69-1.763l1.172-2.031L8.695 12l4.883-8.465 1.173-2.03A4.78 4.78 0 0 1 16.126 0H8.594C7.274 0 6.055.702 5.4 1.846l-4.994 8.65A2.968 2.968 0 0 0 0 12Z'
              id='logo-icon'
              fill='#6363F1'
            ></path>
            <path
              d='M27.692 12c0-.526-.138-1.053-.406-1.505l-4.92-8.52a3.962 3.962 0 0 0-4.69-1.763c-.94.314-1.698 1.015-2.196 1.874l-1.108 1.91L18.997 12l-4.883 8.464-1.173 2.031c-.35.6-.821 1.108-1.375 1.505h7.532c1.32 0 2.539-.702 3.194-1.846l4.994-8.65c.268-.452.406-.978.406-1.504Z'
              id='logo-icon'
              fill='#6363F1'
            ></path>
          </svg>
        </Box>
        <Flex
          sx={{
            paddingLeft: 40,
            paddingRight: 20,
            flexDirection: 'column'
          }}
        >
          <Box>
            <Text
              sx={{
                borderRadius: 4,
                backgroundColor: '#f5f5ff',
                color: '#6363f1',
                display: 'inline',
                fontSize: 16,
                fontWeight: 400,
                fontFamily: 'Untitled Sans',
                lineHeight: '20px',
                padding: '2px 8px'
              }}
            >
              {query.category}
            </Text>
          </Box>
          <Paragraph
            sx={{
              width: '100%',
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-.04em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Untitled Sans',
              color: '#29363D',
              marginTop: 10
            }}
          >
            {query.title}
          </Paragraph>
          <Flex
            sx={{
              alignItems: 'center',
              marginTop: 40
            }}
          >
            <Image
              src={query.authorUrl}
              sx={{
                borderRadius: '50%',
                maxHeight: '40px',
                marginRight: '10px'
              }}
            />
            <Text
              sx={{
                color: '#656B8A',
                fontSize: 18,
                fontWeight: 400,
                fontFamily: 'Untitled Sans'
              }}
            >
              {query.authorName}
            </Text>
          </Flex>
        </Flex>
        <Flex
          sx={{
            backgroundImage:
              'url(https://cdn.workos.com/www/open-graph/pattern.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            width: '100%',
            height: 80,
            position: 'absolute',
            zIndex: 0,
            bottom: 0
          }}
        />
      </Flex>
      <Flex
        sx={{
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        <Image
          src={query.imageUrl}
          sx={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </Flex>
    </Flex>
  </Inline>
)

export const workos = { name: 'WorkOS', code, query }
