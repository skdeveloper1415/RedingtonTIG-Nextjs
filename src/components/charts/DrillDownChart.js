import React from 'react'
import ReactEcharts from "echarts-for-react";
import { color } from 'echarts';
import { useTheme } from 'next-themes';


export const DrillDownChart = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const drillDownCharts = {

    series: [{
      type: "tree",
      emphasis:false,
      data: [{
        name: (() => {
          return "Software \n $5.67M"

        })(),
        

        label: {
          show: true,
          position: "inside",
          color: '#fff',
          background:'#029046',
          fontSize: '12',
          fontWeight: '500',
          textAlign: 'left',
          borderColor: '0',
          lineHeight: 15,
          emphasis:false
        },
        
        symbolSize: 70,
        itemStyle: {
          color: '#029046',
          emphasis: false
        },
        children: [{
          lineStyle: {
            width: 20,
            color: "#EA547878"
          },
          symbolSize: 0,
          label: {
            show: true,
            position: "right",
            lineHeight: 15,
            color: currentTheme == 'dark' ? '#fff' : '#363A44',
          },
          name: (() => {
            return "Oracle    \n $25.0M"
          })(),
        },
        {
          name: (() => {
            return "Fortinet \n $24.2M"
          })(),
          lineStyle: {
            width: 20,
            color: "rgba(2, 166, 102, 0.47)"
          },
          symbolSize: 0,
          label: {
            show: true,
            position: "right",
            lineHeight: 15,
            color: currentTheme == 'dark' ? '#fff' : '#363A44',
          },
        },
        // 2nd
        {
          lineStyle: {
            width: 20,
            color: "rgba(2, 166, 102, 0.47)"
          },
          symbolSize: 70,
          label: {
            show: true,
            position: "inside",
            color: '#fff',
            fontSize: '12',
            fontWeight: '600',
            textAlign: 'left',
            lineHeight: 15,
            color: '#fff',
          },
          itemStyle: {
            color: '#029046',
          },
          name: "Dell Server \n $47.1M",
          children: [{
            name: "FY-2023 \n $2.4M",
            lineStyle: {
              width: 20,
              color: "#02A66678"
            },
            symbolSize: 0,
            label: {
              show: true,
              position: "right",
              lineHeight: 15,
              color: currentTheme == 'dark' ? '#fff' : '#363A44',
            },
          }, 
          {
            name: "FY-2022 \n $2.0M",
            label: {
              show: true,
              position: "inside",
              color: '#fff',
              fontSize: '12',
              fontWeight: '600',
              textAlign: 'left',
              lineHeight: 15,
              color: '#fff',
            },
            symbolSize: 70,
            itemStyle: {
              color: '#029046',
            },
            collapsed: false,
            children: [{
              name: "January\n $25.0M",
              lineStyle: {
                width: 20,
                color: "#02A66678"
              },
            },
            {
              name: "February\n $24.2M",
              collapsed: false,
              children: [{
                name: "Sales \n $25.0M",
                lineStyle: {
                  width: 20,
                  color: "#02A66678"
                },
                symbolSize:0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: "Target \n $24.2M",
                lineStyle: {
                  width: 24,
                  color: "#EA547878"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: " Achievement \n $47.1M",
                lineStyle: {
                  width: 14,
                  color: "#02A66678"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: " Stretch Amount \n $25.0M",
                lineStyle: {
                  width: 12,
                  color: "#02A66678"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: " Target + Stretch \n $44.3M",
                lineStyle: {
                  width: 12,
                  color: "#EA547878"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: " LTG (Target)  \n $54.3M",
                lineStyle: {
                  width: 12,
                  color: "#02A66678"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: " LTG (Target + Stretch)  \n $25.0M",
                lineStyle: {
                  width: 12,
                  color: "#EA547878"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              },
              {
                name: "Commit (Total)  \n $47.1M",
                lineStyle: {
                  width: 12,
                  color: "#02A66678"
                },
                symbolSize: 0,
                label: {
                  show: true,
                  position: "right",
                  lineHeight: 15,
                  color: currentTheme == 'dark' ? '#fff' : '#363A44',
                },
              }
              ],
              lineStyle: {
                width: 20,
                color: "#02A66678"
              },
              symbolSize: 70,
              label: {
                show: true,
                position: "inside",
                color: '#fff',
                fontSize: '12',
                fontWeight: '600',
                textAlign: 'left',
                lineHeight: 15,
                color: '#fff',
              },
              itemStyle: {
                color: '#029046',
              },
            },
            {
              name: 'March \n $25.0M',
              lineStyle: {
                width: 12,
                color: "#EA547878"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },

            {
              name: 'April\n $24.2M',
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: 'May \n $47.1M',
              lineStyle: {
                width: 12,
                color: "#EA547878"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "June \n $25.0M ",
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "July \n $25.0M ",
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "August \n $44.3M ",
              lineStyle: {
                width: 12,
                color: "#EA547878"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "September \n $2.08M ",
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "October \n $25.0M ",
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "November \n $24.2M",
              lineStyle: {
                width: 12,
                color: "#EA547878"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            },
            {
              name: "December \n $47.1M ",
              lineStyle: {
                width: 12,
                color: "rgba(2, 166, 102, 0.47)"
              },
              symbolSize: 0,
              label: {
                show: true,
                position: "right",
                lineHeight: 15,
                color: currentTheme == 'dark' ? '#fff' : '#363A44',
              },
            }
            ],
            lineStyle: {
              width: 20,
              color: "#EA547878"
            },
          },
         
       
          {
            name: (() => {
              return "FY-2021 \n $1.5M"

            })(),
            lineStyle: {
              width: 18,
              color: "#02A66678",

            },
            symbolSize: 0,
            label: {
              show: true,
              position: "right",
              lineHeight: 15,
              color: currentTheme == 'dark' ? '#fff' : '#363A44',
            },
          },
          {
            name: (() => {
              return "FY-2020 \n $1.6M"

            })(),
            lineStyle: {
              width: 18,
              color: "#EA547878"
            },
            symbolSize: 0,
            label: {
              show: true,
              position: "right",
              lineHeight: 15,
              color: currentTheme == 'dark' ? '#fff' : '#363A44',
            },
          },
          ],
        },
        {
          name: "Huawei \n $44.3M",
          lineStyle: {
            width: 20,
            color: "#02A66678"
          },
          symbolSize: 0,
          label: {
            show: true,
            position: "right",
            lineHeight: 15,
            color: currentTheme == 'dark' ? '#fff' : '#363A44',
          },

        },
        {
          name: "Nutanix \n $2.08M",
          lineStyle: {
            width: 20,
            color: "#02A66678"
          },
          symbolSize: 0,
          label: {
            show: true,
            position: "right",
            lineHeight: 15,
            color: currentTheme == 'dark' ? '#fff' : '#363A44',
          },
        }
        ]
      }],
      itemStyle: {
        emphasis: {
          
          
          emphasis: false,
        },
      },
      label: {
        position: "right",
        color: '#fff',
        lineHeight: 15,
        color: currentTheme == 'dark' ? '#fff' : '#363A44',
      },
      lineStyle: {
        width: 30,
        color: "#fff"
      },
      symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIKSURBVHgB7da9TUMxFEDhe11AywjZgIyQSBR0MAqZAJggsAl0FEhkhGxARqAFpGfsF0ARLJAcna/y++mOru2Mv5Zns5LlokZcZsQktPdaq3VGrof6fhuL1Wb3W/6ulrOTkkfXbXUVOmB59x36bXwa323jvrTVNHTw+kTX+jHvkUt/8T25xoVoUzsteXy9XS9nkxb4NYQz1GFefkqLp0Reti26ujVTZV70M9jAXJMSQjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBoYzMJyB4QwMZ2A4A8MZGM7AcAaGMzCcgeEMDGdgOAPDGRjOwHAGhjMwnIHhDAxnYDgDwxkYzsBwBobrgTchpBqxLlHrYwgpI9dliPoQQhpq3pZYPK/aFN+HWHrTxdNmvGQN8XnT9+sQQm/Zm/b19ha9WL3V+jF3kgFaw7Fla9of898Py/NJieGmZpy2j9PQ3msTu8l2WR7vU/3I3fEFO3Nf7zpxuL0AAAAASUVORK5CYII=",
   
      height: "90%",
      top: '-40',
      left: '60',
      bottom:'-20%',
      
      on: {
        click: function (params) {
          var node = params.data;
          if (node.symbolSize === 0) {
            node.symbolSize = 70;
            if (node.children) {
              node.children.forEach(function (child) {
                child.symbolSize = 70;
              });
            }
          } else {
            node.symbolSize = 0;
            if (node.children) {
              node.children.forEach(function (child) {
                child.symbolSize = 0;
              });
            }
          }
          myChart.setOption(option);
        }
      }
    }]
  }


  return (
    <div>
      <ReactEcharts option={drillDownCharts} style={{ width: '100%', height: '950px' }} />
    </div>
  )
} 
