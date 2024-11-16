import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts'
import { useTheme } from "next-themes";

export default function VerticalBarChart({ data, yAxisName, yAxisNameGap, yAxisNamePosition, xAxisName, xAxisNameGap, xAxisNamePosition, barColor, formatter, lineColor1, yAxisLabelFormatter, barName, lineName1, lineName2, grid, barWidth, legends, barcolor, colors }) {

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const options = {
    legend: legends,
    grid: grid,
    xAxis: {
      axisLabel: {
        interval: 0,
        fontSize: 8,
        color: '#344054',
      },   
      axisTick:{ show:false },
      name: xAxisName,
      nameLocation: xAxisNamePosition,
      nameGap: xAxisNameGap,
      type: 'category',
      data: data.labels,
      nameTextStyle: { color:currentTheme == "dark" ? "#ffff":'#344054' },
      axisLabel: {
        textStyle: { color: currentTheme == "dark" ? "#C8CBD0": null }
      },
      axisLine: { show:false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: yAxisLabelFormatter,
        color:'#344054',
        fontSize:8
      },
      axisLabel: {
        textStyle: { color: currentTheme == "dark" ? "#C8CBD0": null }
      },
      name: yAxisName,
      nameLocation: yAxisNamePosition,
      nameGap: yAxisNameGap,
      nameTextStyle: { color: currentTheme == "dark" ? "#ffff":  '#344054' },
      splitLine: {
        show: true,
        lineStyle: { type: 'dashed' }
    },
    },
    color: colors,
    series: [
      {
        interval: 0,
        stack:'inventory',
        label: {
          show: true,
          position: "top",
          formatter: formatter,
          color:currentTheme == "dark" ? "#ffff":'#344054',
          fontSize:11
        },        
        itemStyle: {
          borderRadius: [4,4,0,0],
           color: barcolor
        },
        data: data.values,
        barWidth: barWidth,
        type: 'bar',
        name: barName
      },
      {
        interval: 0,
        stack:'inventory',
        label: {
          show: true,
          position: "top",
          formatter: formatter,
          color:currentTheme == "dark" ? "#ffff":'#344054',
          fontSize:11
        },        
        itemStyle: {
          borderRadius: [4,4,0,0],
           color: barcolor
        },
        data: data.values1,
        barWidth: barWidth,
        type: 'bar',
        name: barName
      },
      {
        name: lineName1,
        type: 'line',
        data: data.values2,
        symbolSize: 4,
        symbol: 'circle',
        itemStyle: { color: lineColor1 },
      },
      {
        name: lineName2,
        type: 'line',
        data: data.values3,
        symbolSize: 4,
        symbol: 'circle',
      },
    ]
  };

  console.log(data);

  return (
    <>
      <ReactEcharts
        echarts={echarts}
        option={options}
        opts={{ renderer: 'svg' }}
      />
    </>
  );
}