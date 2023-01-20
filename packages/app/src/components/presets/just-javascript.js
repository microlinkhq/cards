import Inline from '../inline.macro'
import { Box, Flex, Image, Link, Text } from './scope'

const query = {
  author: 'Dan Abramov & Maggie Appleton',
  authorImages: [
    'https://unavatar.io/github/gaearon',
    'https://unavatar.io/twitter/mappletons'
  ],
  logo: 'https://i.imgur.com/0qg7R8r.png',
  subtitle: 'Rebuild your mental model from the inside out.',
  title: 'Explore the<br /> JavaScript Universe'
}

const code = (
  <Inline>
    <Box
      sx={{
        position: 'relative',
        background: '#000',
        borderTop: '14px solid #f37241',
        px: 44,
        py: 40
      }}
    >
      <Link
        href='https://fonts.googleapis.com/css2?family=Fraunces:wght@300;700&display=block'
        rel='stylesheet'
      />
      {/* Planet 1 */}
      <Box
        sx={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#f85639',
          top: '16%',
          left: '66%',
          filter: 'blur(0.5px)',
          '::before': {
            content: '""',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'inherit',
            position: 'absolute',
            bottom: '-24px',
            right: '-6px',
            opacity: 0.4
          }
        }}
      />

      {/* Planet 2 */}
      <Box
        sx={{
          position: 'absolute',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background:
            'linear-gradient(90deg, rgba(249,138,79,1) 0%, rgba(205,94,72,1) 100%)',
          top: '20%',
          left: '80%',
          filter: 'blur(0.5px)'
        }}
      />

      {/* Planet 3 */}
      <Box
        sx={{
          position: 'absolute',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background:
            'linear-gradient(45deg, rgba(243,187,117,1) 0%, rgba(205,95,71,1) 30%, rgba(168,69,64,1) 42%, rgba(156,67,67,1) 50%, rgba(120,62,77,1) 67%, rgba(55,48,60,1) 86%)',
          top: '30%',
          left: '86%',
          filter: 'blur(0.5px)',
          '::before': {
            content: '""',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#783e4d',
            position: 'absolute',
            top: '-28px',
            left: '4px'
          },
          '::after': {
            content: '""',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#6b3721',
            position: 'absolute',
            bottom: '-20px',
            left: '2px'
          }
        }}
      />

      {/* Sun */}
      <Box
        sx={{
          position: 'absolute',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(251,225,173,1) 0%, rgba(245,178,122,1) 40%, rgba(231,121,87,1) 65%, rgba(243,114,65,0.8) 80%, rgba(249,43,35,0.6) 100%)',
          filter: 'blur(12px) saturate(1.2) brightness(1.4)',
          boxShadow: '0px 0px 60px 20px #d65130',
          left: '32%',
          bottom: '-16%'
        }}
      />

      {/* Planet 4 */}
      <Box
        sx={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#ffe4c4',
          top: '54%',
          left: '80%',
          filter: 'blur(0.5px)',
          '::before': {
            content: '""',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: 'inherit',
            position: 'absolute',
            top: '-20px',
            left: '-2px'
          }
        }}
      />

      {/* Text background */}
      <Box
        sx={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          bg: '#000',
          left: 0,
          top: 0,
          transform: 'translate(-15%, 3%)',
          filter: 'blur(1px)'
        }}
      />

      <Box sx={{ position: 'relative', width: '76%' }}>
        <Box sx={{ mb: 20 }}>
          <Image src={query.logo} width={58} height={58} />
        </Box>
        <Box sx={{ mb: 14 }}>
          <Text
            sx={{
              color: '#fff',
              fontFamily: 'Fraunces, serif',
              fontSize: 50,
              fontWeight: 700,
              lineHeight: 1.1
            }}
            dangerouslySetInnerHTML={{ __html: query.title }}
          />
        </Box>
        <Box sx={{ mb: 40 }}>
          <Text
            sx={{
              color: '#ffd6a7',
              fontFamily: 'Fraunces, serif',
              fontSize: 24,
              fontWeight: 300
            }}
          >
            {query.subtitle}
          </Text>
        </Box>

        <Flex sx={{ alignItems: 'center' }}>
          <Flex sx={{ paddingLeft: '14px', mr: '10px' }}>
            {query.authorImages.map((url, index) => (
              <Box
                key={url}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `url('${url}') no-repeat center center / cover`,
                  border: '2px solid #000',
                  ml: '-14px',
                  zIndex: query.authorImages.length - index
                }}
              />
            ))}
          </Flex>
          <Box>
            <Box sx={{ pl: '2px' }}>
              <Text
                sx={{
                  color: '#ffd6a7',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  letterSpacing: '1px',
                  lineHeight: 1
                }}
              >
                With
              </Text>
            </Box>
            <Box>
              <Text sx={{ color: '#fff', fontSize: 18, lineHeight: 1 }}>
                {query.author}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  </Inline>
)

export const justJavascript = { name: 'Just JavaScript', code, query }
