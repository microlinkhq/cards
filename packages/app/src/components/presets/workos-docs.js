import Inline from '../inline.macro'
import { Image, Box, Flex, Text, Paragraph, Link } from './scope'

const query = {
  title: 'Single Sign-On',
  description: 'Facilitate greater security, easier account management, and accelerated application onboarding and adoption.',
  category: 'Docs'
}

const code = (
  <Inline>
    <Box>
      <Link href="https://cdn.workos.com" rel="preconnect" />

      <Link
        href="https://cdn.workos.com/www/open-graph/main.css"
        rel="stylesheet"
      />

      <Link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap"
        rel="stylesheet"
      />

      <Box
        sx={{
          color: "white",
          backgroundColor: "#1B1B1F",
          backgroundImage: "linear-gradient(to right, #1B1B22, #1B1B1F)",
          fontFamily: "Untitled Sans, Inter, sans-serif",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "1026px",
            height: "1026px",
            left: "-562px",
            top: "0",
            background:
              "linear-gradient(138.82deg, #262550 16.23%, rgba(38, 37, 120, 0) 84.53%)",
            filter: "blur(52px)",
            zIndex: "0",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: "831px",
            height: "831px",
            left: "-601px",
            top: "254px",
            background:
              "linear-gradient(134.04deg, #50285C 15.71%, rgba(72, 40, 92, 0) 86.01%)",
            filter: "blur(52px)",
            zIndex: "0",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.5,
            mixBlendMode: "luminosity",
            transform: "rotate(180deg)",
            backgroundImage:
              "url(https://workos.imgix.net/images/5b1d3b4d-7644-49e8-9431-6e1413eb6182.png)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 200,
            background:
              "linear-gradient(to top right, #1B1B1FAA, #1B1B1F00, #1B1B1F00)",
          }}
        />

        <Flex
          sx={{
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: 56,
              height: 362,
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {query.title && (
                <Text
                  sx={{
                    display: "block",
                    marginBottom: 12,
                    fontSize: 56,
                    fontWeight: 500,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                  }}
                >
                  {query.title}
                </Text>
              )}

              {query.description && (
                <Text
                  sx={{
                    display: "block",
                    fontSize: 40,
                    lineHeight: 56 / 40,
                    letterSpacing: "-0.01em",
                    color: "rgba(239, 243, 255, 0.635)",
                  }}
                >
                  {query.description}
                </Text>
              )}

              {query.code && (
                <Text
                  sx={{
                    display: "block",
                    fontSize: 34,
                    fontFamily: "IBM Plex Mono, Menlo, monospace",
                    fontWeight: 500,
                    lineHeight: 56 / 34,
                    letterSpacing: "-0.01em",
                    color: "rgba(239, 243, 255, 0.635)",
                  }}
                >
                  {query.code}
                </Text>
              )}
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              flexShrink: 0,
              height: 1.19,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            }}
          />

          <Flex
            sx={{
              alignItems: "center",
              flexGrow: 0,
              flexShrink: 0,
              height: 111,
              paddingLeft: 48,
              paddingRight: 48,
            }}
          >
            <svg
              height="36"
              viewBox="0 0 179 34"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M51.7858 5.1189H56.7186L60.2702 19.74C60.9287 22.4996 61.0594 24.143 61.0594 24.143H61.126C61.126 24.143 61.3554 22.5341 62.0139 19.74L65.4003 5.1189H70.9915L74.5752 19.74C75.2658 22.5981 75.431 24.143 75.431 24.143H75.5297C75.5297 24.143 75.5963 22.5981 76.2523 19.74L79.6732 5.1189H84.606L78.3586 29.1029H72.866L69.085 14.5805C68.2958 11.4266 68.2292 10.0148 68.2292 10.0148H68.1626C68.1626 10.0148 68.096 11.4266 67.3734 14.5805L63.8218 29.1029H58.1664L51.7858 5.1189Z" />
              <path d="M83.7825 20.3897C83.7825 14.9025 87.3341 11.3545 92.696 11.3545C98.0234 11.3545 101.575 14.9025 101.575 20.3897C101.575 25.909 98.0234 29.4916 92.696 29.4916C87.3366 29.4891 83.7825 25.909 83.7825 20.3897ZM96.9703 20.3897C96.9703 16.8417 95.2611 14.836 92.696 14.836C89.9337 14.836 88.3873 17.0708 88.3873 20.3897C88.3873 24.0044 90.0965 26.0075 92.696 26.0075C95.4584 26.0075 96.9703 23.7727 96.9703 20.3897Z" />
              <path d="M103.778 11.6235H108.151V14.8438H108.249C109.006 13.1684 110.814 11.4929 113.905 11.4929C114.43 11.4929 114.761 11.5594 114.99 11.6235V15.992H114.859C114.859 15.992 114.465 15.8615 113.379 15.8615C109.993 15.8615 108.151 17.8646 108.151 21.6098V29.1002H103.778V11.6235Z" />
              <path d="M117.03 5.1189H121.403V12.8064C121.403 17.3401 121.336 18.1606 121.336 18.1606H121.403L127.914 11.6237H133.372L125.746 19.1806L134.593 29.1029H129.428L123.048 21.8737L121.403 23.4827V29.1005H117.03V5.1189Z" />
              <path d="M134.656 17.1983C134.656 9.80654 139.261 4.87866 146.167 4.87866C153.073 4.87866 157.678 9.80654 157.678 17.1983C157.678 24.5902 153.073 29.5181 146.167 29.5181C139.261 29.5181 134.656 24.5902 134.656 17.1983ZM152.908 17.1983C152.908 12.1719 150.212 8.78647 146.165 8.78647C142.117 8.78647 139.424 12.1719 139.424 17.1983C139.424 22.2248 142.12 25.6102 146.165 25.6102C150.209 25.6102 152.908 22.2248 152.908 17.1983Z" />
              <path d="M159.352 21.1196H164.351C164.351 23.9457 166.292 25.5227 169.252 25.5227C171.751 25.5227 173.462 24.2734 173.462 22.4994C173.462 20.4962 172.148 19.9689 167.97 19.1484C164.154 18.392 160.109 17.1108 160.109 12.1163C160.109 7.94487 163.661 4.79102 169.087 4.79102C174.742 4.79102 178.23 7.74776 178.23 12.2149H173.23C173.23 10.0466 171.553 8.69884 169.087 8.69884C166.588 8.69884 165.042 9.91357 165.042 11.6876C165.042 13.5602 166.127 14.2821 169.481 14.9721C174.446 16.0242 178.526 16.581 178.526 22.1002C178.526 26.4737 174.71 29.4305 169.087 29.4305C163.365 29.4305 159.352 26.1115 159.352 21.1196Z" />
              <path
                d="M0 17C0 17.7454 0.196348 18.4908 0.575955 19.1316L7.46124 31.0447C8.16809 32.2608 9.24146 33.2547 10.5766 33.6993C13.2077 34.5755 15.9304 33.4508 17.2263 31.2016L18.8887 28.3247L12.3307 17L20.9176 2.13154C21.4151 1.26846 22.0826 0.562309 22.868 0H12.1867C10.3148 0 8.58697 0.993848 7.65759 2.61539L0.575955 14.8685C0.196348 15.5093 0 16.2546 0 17Z"
                fill="#6363F1"
              />
              <path
                d="M39.2696 17C39.2696 16.2546 39.0732 15.5092 38.6936 14.8684L31.7167 2.79845C30.4208 0.562296 27.6981 -0.562321 25.0671 0.300757C23.7319 0.745373 22.6585 1.73922 21.9517 2.95538L20.3809 5.66231L26.9389 17L18.3519 31.8685C17.8545 32.7185 17.1869 33.4377 16.4015 34H27.0829C28.9548 34 30.6826 33.0062 31.612 31.3846L38.6936 19.1315C39.0732 18.4907 39.2696 17.7454 39.2696 17Z"
                fill="#6363F1"
              />
            </svg>
            <Text
              sx={{
                fontSize: 35,
                marginLeft: 12,
                letterSpacing: "-0.02em",
                lineHeight: 24 / 35,
              }}
            >
              {query.category}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  </Inline>
)

export const workosDocs = { name: 'WorkOS Docs', code, query }
