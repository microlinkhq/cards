import Inline from '../inline.macro'
import { Box, Fetch, Flex, Image, Link, Spinner, Text, polished } from './scope'

const query = {
  url: 'https://analytics.microlink.io/',
  logo: 'https://cdn.microlink.io/logo/logo.svg',
  title: 'microlink.io API · Analytics',
  theme: 'dark',
  themes: {
    dark: {
      background: '#2e2e42',
      color: '#fafafa',
      lineColor: '#b4e7b7',
      barColor: '#34ace0',
      pieColors: ['#706fd3', '#33d9b2', '#ff793f', '#34ace0']
    },
    light: {
      background: '#fefefe',
      color: '#20222f',
      lineColor: '#7ed6df',
      barColor: '#218c74',
      pieColors: ['#ff7979', '#f9ca24', '#686de0', '#c7ecee']
    }
  }
}

const code = (
  <Inline>
    <Fetch url={query.url}>
      {payload => {
        // Theme
        const { background, barColor, color, lineColor, pieColors } =
          query.themes[query.theme] || query.themes.dark
        const tintBg = polished.darken(0.1, background)

        // Loading state
        if (payload === null) {
          return (
            <Flex
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                background,
                color
              }}
            >
              <Spinner />
            </Flex>
          )
        }

        // Line Chart data (Daily Requests)
        const LC_WIDTH = 840
        const LC_HEIGHT = 184
        const LC_Y_AXIS_WIDTH = 2

        const yAxisMarkers = Array.from(Array(10).keys())

        const largestDay = Object.values(payload.byDay).reduce(
          (acc, day) => (day.reqs > acc.reqs ? day : acc),
          { reqs: 0 }
        )

        const dayData = Object.entries(payload.byDay)
          .map(([name, day]) => ({
            ...day,
            name,
            percent: (day.reqs / largestDay.reqs) * 100
          }))
          .reverse()

        const yCoordinates = dayData.map(
          day => LC_HEIGHT - (LC_HEIGHT / 100) * day.percent + 4
        )

        const xOffset = LC_WIDTH / dayData.length

        const openPath = yCoordinates.reduce((acc, y, index) => {
          if (index === 0) {
            return `M 0,${y}`
          }

          const isLastCoordinate = index === yCoordinates.length - 1
          const x = !isLastCoordinate ? xOffset * index : LC_WIDTH

          return `${acc} L ${x},${y}`
        }, '')

        const closedPath = `${openPath} L ${LC_WIDTH},${LC_HEIGHT} L 0,${LC_HEIGHT}Z`

        // Bar Chart data (Monthly Requests)
        const largestMonth = Object.values(payload.byMonth).reduce(
          (acc, month) => (month.reqs > acc.reqs ? month : acc),
          { reqs: 0 }
        )

        const months = Object.entries(payload.byMonth)
          .map(([name, month]) => ({
            ...month,
            name,
            percent: Math.round((month.reqs / largestMonth.reqs) * 100)
          }))
          .reverse()

        // Pie Chart data (Quarterly Requests)
        const byQuarterTotal = Object.values(payload.byQuarter).reduce(
          (acc, quarter) => acc + quarter.reqs,
          0
        )

        const quarters = Object.entries(payload.byQuarter)
          .map(([name, quarter]) => ({
            ...quarter,
            name,
            percent: Math.round((quarter.reqs / byQuarterTotal) * 100)
          }))
          .reverse()

        const quarterCssPercentages = quarters
          .map((quarter, index, arr) => {
            const prevPercent = index > 0 ? arr[index - 1].percent || 0 : 0
            return quarter.percent + prevPercent
          })
          .map((percent, index) => {
            const color = pieColors[index]
            return `${color} 0, ${color} ${percent}%`
          })
          .join(', ')

        return (
          <>
            <Link
              href='https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=block'
              rel='stylesheet'
            />
            <Flex
              sx={{
                flexDirection: 'column',
                background,
                color,
                border: 1,
                borderColor: tintBg
              }}
            >
              {/* Header */}
              <Flex
                sx={{
                  height: '32px',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  background: tintBg,
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8
                }}
              >
                <Image src={query.logo} sx={{ height: 16, mr: 2 }} />
                <Text sx={{ fontSize: 1, fontWeight: '500', lineHeight: 1 }}>
                  {query.title}
                </Text>
              </Flex>

              <Box sx={{ flex: 1 }}>
                {/* Daily analytics */}
                <Flex
                  sx={{
                    height: '50%',
                    position: 'relative',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 2,
                      background: tintBg,
                      px: 2,
                      pb: 1
                    }}
                  >
                    <Text
                      sx={{
                        fontFamily: 'Fira Code',
                        fontWeight: '500',
                        fontSize: 1
                      }}
                    >
                      Daily Requests
                    </Text>
                  </Box>

                  <Text
                    sx={{
                      position: 'absolute',
                      top: 3,
                      right: 3,
                      fontFamily: 'Fira Code',
                      fontSize: 1
                    }}
                  >
                    🗓 {dayData[0].name} -&gt; {dayData[dayData.length - 1].name}
                  </Text>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: LC_HEIGHT,
                      width: LC_Y_AXIS_WIDTH,
                      background: tintBg
                    }}
                  >
                    <Text
                      sx={{
                        position: 'absolute',
                        left: 1,
                        top: -1,
                        fontFamily: 'Fira Code',
                        fontSize: 1,
                        lineHeight: 1,
                        transform: 'translateY(-100%)'
                      }}
                    >
                      {largestDay.reqs_pretty}
                    </Text>

                    {yAxisMarkers.map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: `${i * 10}%`,
                          height: 2,
                          width: i % 5 === 0 ? 12 : 8,
                          background: tintBg
                        }}
                      />
                    ))}
                  </Box>

                  <svg
                    viewBox={`0 0 ${LC_WIDTH} ${LC_HEIGHT}`}
                    xmlns='http://www.w3.org/2000/svg'
                    style={{
                      width: `calc(100% - ${LC_Y_AXIS_WIDTH}px)`,
                      position: 'relative'
                    }}
                  >
                    <path
                      d={closedPath}
                      fill={polished.rgba(lineColor, 0.15)}
                    />
                    <path
                      d={openPath}
                      fill='none'
                      stroke={lineColor}
                      strokeWidth={1.5}
                    />

                    <g>
                      {yCoordinates.map((y, index) => {
                        const x =
                          index !== yCoordinates.length - 1
                            ? index * xOffset
                            : LC_WIDTH

                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r={2.5}
                            fill={lineColor}
                          />
                        )
                      })}
                    </g>
                  </svg>
                </Flex>

                <Flex sx={{ height: '50%', borderTop: 1, borderColor: tintBg }}>
                  {/* Monthly analytics */}
                  <Box
                    sx={{
                      flex: '1 0 60%',
                      position: 'relative',
                      borderRight: 1,
                      borderColor: tintBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pt: 4
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 2,
                        background: tintBg,
                        px: 2,
                        pb: 1
                      }}
                    >
                      <Text
                        sx={{
                          fontFamily: 'Fira Code',
                          fontWeight: '500',
                          fontSize: 1
                        }}
                      >
                        Monthly Requests
                      </Text>
                    </Box>

                    <Flex
                      sx={{ alignItems: 'stretch', height: 132, width: 420 }}
                    >
                      {months.map(month => (
                        <Flex
                          key={month.name}
                          sx={{
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            width: `${Math.round(100 / months.length)}%`,
                            position: 'relative'
                          }}
                        >
                          <Box
                            sx={{
                              height: `${month.percent}%`,
                              background: barColor,
                              width: '100%',
                              position: 'relative'
                            }}
                          >
                            <Text
                              sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                textAlign: 'center',
                                transform: 'translateY(-100%)',
                                fontFamily: 'Fira Code',
                                fontWeight: '500',
                                fontSize: 1
                              }}
                            >
                              {month.reqs_pretty}
                            </Text>
                          </Box>
                          <Text
                            sx={{
                              position: 'absolute',
                              bottom: -1,
                              left: 0,
                              right: 0,
                              textAlign: 'center',
                              transform: 'translateY(100%)',
                              fontSize: 0,
                              fontWeight: '300'
                            }}
                          >
                            {month.name}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>

                  {/* Quarterly analytics */}
                  <Box sx={{ flex: '1 0 40%', position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 2,
                        background: tintBg,
                        px: 2,
                        pb: 1
                      }}
                    >
                      <Text
                        sx={{
                          fontFamily: 'Fira Code',
                          fontWeight: '500',
                          fontSize: 1
                        }}
                      >
                        Quarterly Requests
                      </Text>
                    </Box>

                    <Flex
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        pt: 4
                      }}
                    >
                      <Box
                        sx={{
                          width: 154,
                          height: 154,
                          background: `conic-gradient(${quarterCssPercentages})`,
                          borderRadius: '50%',
                          mr: 3,
                          flexShrink: 0
                        }}
                      />

                      <Flex sx={{ flexDirection: 'column' }}>
                        {quarters.map((quarter, index) => (
                          <Flex
                            key={quarter.name}
                            sx={{ alignItems: 'baseline', my: 2 }}
                          >
                            <Box
                              sx={{
                                background: pieColors[index],
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                mr: '6px',
                                flexShrink: 0,
                                position: 'relative',
                                top: '3px'
                              }}
                            />
                            <Text sx={{ fontSize: 1, fontWeight: '300' }}>
                              <Text
                                sx={{
                                  fontFamily: 'Fira Code',
                                  fontWeight: '500'
                                }}
                              >
                                {quarter.reqs_pretty}
                              </Text>
                              <br />
                              {quarter.name}
                            </Text>
                          </Flex>
                        ))}
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </>
        )
      }}
    </Fetch>
  </Inline>
)

export const dashboard = { name: 'Dashboard', code, query }
