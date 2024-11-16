import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import GeoMap from '../../../components/geoMap';
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { Dropdown } from "primereact/dropdown";
import { useTheme } from 'next-themes';

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Index() {

  /*--prime-select--*/
  const [selectedCity, setSelectedCity] = useState(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const BU = [
    { name: "All", code: "NY" },
    { name: "Brand", code: "BR", },
    { name: "Business Unit", code: "BUN" },
    { name: "Region Wise Ageing", code: "RWA" },
    { name: "Cluster", code: "Cl" },
    { name: "Business Group", code: "BG" },
  ];

  const onClickNavigate= async (e) => {
    console.log(e)
    if(e.value.code === "BR"){
    window.location.href="/software/summary/brand"
    }else if(e.value.code === "Cl"){
    window.location.href="/software/summary/cluster"
    }
    }

  /*--prime-select--*/
  const clusterTab = {
    // tooltip: {},
    legend: {
      show: true,
      bottom: 0,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    grid: {
      top: "5%",
      right: "0%",
      bottom: "12%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "U.A.E",
        "Saudi",
        "Rome",
        "Qatar",
        "Kenya",
        "FWN Africa",
        "Egypt",
        "East Africa",
      ],
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        width: 100,
        overflow: "truncate",
        interval: 0,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      name: "Values in $",
      nameGap: 40,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 900,
      interval: 100,
      name: "Values in $",
      nameGap: 50,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "Grand Total",
        stack: "vendor",
        data: [380, 320, 380, 400, 410, 440, 450, 440, 430, 430],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 50,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "Software",
        stack: "vendor",
        data: [270, 240, 270, 230, 210, 240, 250, 220, 230, 245],
        type: "bar",
        color: "#F5F073",
        barWidth: 60,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "Software",
        stack: "vendor",
        data: [40, 60, 50, 70, 90, 40, 50, 90, 80, 75],
        type: "bar",
        color: "#E1DFA9",
        barWidth: 60,
        label: {
          show: true,
          formatter: "${c}K",
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const totalInventoryTab = {
    // tooltip: {},
    legend: {
      show: true,
      bottom: 0,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    grid: {
      top: "5%",
      right: "0%",
      bottom: "12%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["East Africa", "Egypt", "FWN Africa", "Kenya", "Qatar","Rome","Saudi","U.A.E"],
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        width: 100,
        overflow: "truncate",
        interval: 0,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      name: "Values in $",
      nameGap: 40,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 900,
      interval: 100,
      name: "Values in $",
      nameGap: 50,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "Professional Service",
        stack: "vendor",
        data: [380, 320, 380, 400, 410, 430, 470, 460],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 50,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "Software",
        stack: "vendor",
        data: [270, 240, 270, 230, 210, 220, 230,240],
        type: "bar",
        color: "#F5F073",
        barWidth: 85,
        label: {
          show: true,
          formatter: "${c}K",
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const ClusterWiseAgeing = {
    title: {
      text: 'Grand Total',
      textStyle: {
        fontSize: 10,
        fontWeight: "400",
        color: "#FFFFFF"
      },
      subtext: '$6.5M',
      left: "center",
      top: "center",
      subtextStyle: {
        fontSize: 10,
        fontWeight: "600",
        align: "center",
         color: "#FFFFFF"
      }
    },
    color: ['#029046','#F5F073', '#4FB155','#C8C846','#E1DFA9','#CDCB90','#E1DFA9','#A9A771'],
    legend: {
        show: false,
        orient: "horizontal",
        width: "30%",
        itemGap: 50,
        top: "50%",
        itemWidth: 10,
        itemHeight:'10',
        textStyle: {
            fontSize: 8,
        }
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '60%'],
            center:['50%','50%'],
            width: "100%",
            height:"100%",
            data: [
                { value: 24, name: 'Saudi Arabia' },
                { value: 15, name: 'Rome' },
                { value: 15, name: 'Qatar' },
                { value: 8, name: 'Kuwait' },
                { value: 10, name: 'Kenya' },
                { value: 5, name: 'FWN Africa' },
                { value: 15, name: 'Egypt' },
                { value: 6, name: 'East Africa' },
            ],
            label: {
                show: true,
                color: "#F9F7F4",
                fontSize:12,
                padding: [-20, -20, -20, -20],
                position: 'outsideFill',
                formatter: function (params) {
                  return params.value + '%'
              },
            },
            top:0,
            right: 0,
            left:0,
            bottom:0
        }
    ]
  };

  const TopCustomersTreemap = {
    
    series: [
      {
        name:'Top Customers',
        type: 'treemap',
        width: "90%",
        height: "90%",
        label: {
        show: true,
        position: 'insideBottomLeft',
        overflow: "breakAll",
        },
        data: [
          {
            name: 'AL Khalili Technology LLC',
            value: "321567",
            itemStyle:{
              color:'#83432A',
            },
            
            
          },
          {
            name: 'SIBCA Electronic Equipment Company',
            value: "412900",
            itemStyle:{
              color:'#769F2E'
            },
          },
          {
            name: 'Teklogix DMCC',
            value: "329000",
            itemStyle:{
              color:'#11462B'
            },
          },
          {
            name: 'Intertech LLC',
            value: "329000",
            itemStyle:{
              color:'#796B26'
            },
          },
          {
            name: 'AL Khalili Technology LLC',
            value: "329000",
            itemStyle:{
              color:'#8DB14D'
            },
          },
          {
            name: 'United Technology Group GWC-LLC',
            value: "329000",
            itemStyle:{
              color:'#66755F'
            },
          },
          {
            name: 'Mustafa Sultan Office Techno, Co',
            value: "329000",
            itemStyle:{
              color:'#8C8A48'
            },
          },
          {
            name: 'Mustafa Sultan Office Technology Co',
            value: "329000",
            itemStyle:{
              color:'#585D72'
            },
          },
          {
            name: 'Emerson FZE',
            value: "329000",
            itemStyle:{
              color:'#547440'
            },
          },
          {
            name: 'Infocomm Group LLC',
            value: "329000",
            itemStyle:{
              color:'#A9A771'
            },
          }
        ]
      }
    ]
  };

  const vendors = {
    tooltip:{
      position:'top',
      trigger:'item',
      padding: [7, 7],
      backgroundColor:'#002B15',
      textStyle: {
        color: '#fff', 
        fontSize: '10',
      },
      
    },
    grid: {
      top: "10%",
      right: "0%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    legend: {
      show: true,
      bottom: 0,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    xAxis: {
      type: "category",
      data: [
        "Quarter 1",
        "Quarter 2",
        "Quarter 3",
        "Quarter 4",
      ],
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        width: 100,
        overflow: "truncate",
        interval: 0,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      nameGap: 40,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 900,
      interval: 100,
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: "{value}K",
      },
      
      nameGap: 50,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "Professional Services",
        data: [
          {
            value: 420,
            label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
          }, 
          {
            value: 810,
            label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
          },
          {
            value: 210,
            label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
          },
          {
            value: 620,
            label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
          },],
        type: "bar",
        color: "#029046",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: 35,
       
      },
      {
        name: "Software",
        data: [
          {
          value: 610,
          label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
        }, 
        {
          value: 450,
          label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
        },
        {
          value: 450,
          label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
        },
        {
          value: 500,
          label:{
            show:true,
            position:'insideTop',
            formatter: "\n ${c}k",
            align: "center",
            fontSize: 10,
            color:"#fff"
          }
        },],
        type: "bar",
        color: "#BCBA79",
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: 35,
      
      },
    ],
  };
  const bu = {
    emphasis:false,
    legend: {
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },

    series: [
      {
        name: "By BU",
        type: "pie",
        emphasis:false,
        radius: "70%",
        center: ["50%", "45%"],
        roseType: "area",
        color: ["#41733D", "#DFDC34", "#AAAC7A", "#B2D5A0", "#4FB155"],
        data: [
          { value: 40, name: "IBU" },
          { value: 38, name: "NBU" },
          { value: 32, name: "CABU" },
          { value: 30, name: "ESBU" },
          { value: 28, name: "ORACLE" },
        ],
        label: {
          color: currentTheme == 'dark' ? '#CACED1' : '#222222',
          lineHeight: 20,
          padding:[-20,-20,-20,-20],
          formatter: "${c}M  \n {b}",
        },
        itemStyle: {
          shadowBlur: 60,
          shadowColor: "rgba(65,115,61,0.8)",
        },
      },
    ],
  };

  const cluster = {
   
    legend: {
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    grid: {
      top: "10%",
      right: "4%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 900,
      interval: 100,
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: "{value}K",
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["UAE","Saudi","Rome","Qatar", "Kenya", "FWN Africa", "Egypt", "East Africa"],
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "Revenue (M)",
        data: [820, 300, 400, 480, 350, 620, 800, 450],
        type: "bar",
        stack: "total",
        color: "#A9A771",
        barWidth: 32,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
        label:{
          show:true,
          position:['99%', '5%'],
          formatter: "\n {c}k",
          fontSize:10,
          color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        }
      },
    ]
  };

  const TopcustomersProfessional= {
    tooltip: {},
    legend: {
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    grid: {
      top: "10%",
      right: "4%",
      bottom: "15%",
      left: "5%",
      width:"100%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 10,
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: "{value}K",
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["Maxbyte Technologies FZC", "Brothers Gas Bottling and Distf", "Beinex Solutions LLC", "Synergerp DWC-LLC"],
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        lineHeight: 20,
        width:'130',
        overflow: "breakAll"
      },
    },
    series: [
      {
        name: "Top Customer",
        data: [72, 50, 55, 47],
        type: "bar",
        stack: "total",
        color: "#AAA951",
        barWidth: 50,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
        label:{
          show:true,
          position:['99%', '5%'],
          formatter: "\n {c}k",
          fontSize:10,
          color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        }
      },
    ]
  };

  const TopcustomersSoftware= {
    legend: {
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#101828',
      },
    },
    tooltip: {},
    grid: {
      top: "10%",
      right: "4%",
      bottom: "15%",
      left: "5%",
      width:"100%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 100,
      
      interval: 10,
      axisLabel: {
        show:true,
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: "{value}K",
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["MAXBYTE TECHNOLOGIES FZC", "IMAGEGRAFIX ENGINEERING SOLUTI", "Raybum Consulting Middle East FZ-L", "Synergerp DWC-LLC"],
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        lineHeight: 20,
        width:'130',
        overflow: "breakAll"
      },
    },
    series: [
      {
        name: "Top Customer",
        data: [62, 70, 60, 51],
        type: "bar",
        stack: "total",
        color: "#AAA951",
        barWidth: 50,
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
        },
        label:{
          show:true,
          position:['99%', '5%'],
          formatter: "\n {c}k",
          fontSize:10,
          color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        }
      },
    ]
  };
  

  
  /************Geo Map *******************/
  const mapProps = {
    center: [0, 17],
    zoom: 3,
    currentTheme: 'dark',
    themeConfig: {
      dark: {
        layerSwitcher: {
          primary: '',
          secondary: '',
          fontColor: '',
        },
        legend: {
          primary: '',
          secondary: '',
          fontColor: '',
        },
        baseMap: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
      },
      light: {
        layerSwitcher: {
          primary: 'red',
          secondary: 'blue',
          fontColor: 'purple',
        },
        legend: {
          primary: 'green',
          secondary: 'pink',
          fontColor: 'purple',
        },
        mapControls: {
          primary: 'green',
          secondary: 'pink',
        },
        baseMap: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      }
    },
    baseMapConfig: {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    },
    layers: [
      {
        name: 'layer1',
        title: 'Core Countries',
        type: 'geojson',
        opacity: 100,
        enabled: true,
        featureLabelField: 'ADMIN',
        renderer: {
          type: 'custom',
          config: {
            color: {
              field: 'metric',
              breaks: [
                {
                  start: 0,
                  end: 9,
                  color: '#588CFA'
                },
                {
                  start: 10,
                  end: 19,
                  color: '#0033A0'
                },
                {
                  start: 20,
                  end: 29,
                  color: '#7C5CD8'
                }
              ],
            },

          }
        }
      },
      {
        name: 'layer2',
        title: 'Core Countries',
        type: 'geojson',
        opacity: 100,
        enabled: true,
        selectable: false,

      },
      // {
      //   name: 'layer3',
      //   title: 'Market Area',
      //   type: 'geojson',
      //   opacity: 100,
      //   enabled: true,
      //   renderer: {
      //     type: 'custom',
      //     config: {
      //       color: {
      //         field: 'metric',
      //         breaks: [
      //           {
      //             start: 0,
      //             end: 9,
      //             color: '#588CFA'
      //           },
      //           {
      //             start: 10,
      //             end: 19,
      //             color: '#0033A0'
      //           },
      //           {
      //             start: 20,
      //             end: 29,
      //             color: '#7C5CD8'
      //           }
      //         ],
      //       }
      //     }
      //   }
      // }
    ],
    geoSources: {
      layer1: {
        url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
      },
      layer2: {
        url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
      },
      layer3: {
        url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
      }
    },
    dataSources: {
      layer1: {
        geoKeys: ['ISO_A3'],
        dataKeys: ['ISO_A3'],
        data: [
          {
            ISO_A3: 'DZA',
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: 'LBY',
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: 'EGY',
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: 'TUR',
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: 'IRQ',
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: 'SAU',
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: 'ZAF',
            metric: 25,
            metric2: 10,
            metric3: 20,
          }
        ],
      },
      layer2: {
        geoKeys: ['ISO_A3'],
        dataKeys: ['ISO_A3'],
        data: [
          {
            ISO_A3: 'DZA',
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: 'LBY',
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: 'EGY',
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: 'TUR',
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: 'IRQ',
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: 'SAU',
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: 'ZAF',
            metric: 25,
            metric2: 10,
            metric3: 20,
          }
        ],
      },
      layer3: {
        geoKeys: ['ISO_A3'],
        dataKeys: ['ISO_A3'],
        data: [
          {
            ISO_A3: 'NGA',
            metric: 15
          },
          {
            ISO_A3: 'CMR',
            metric: 25
          },
          {
            ISO_A3: 'KEN',
            metric: 15
          },
        ],
      },
    }
  }
  /************Geo Map *******************/

  const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);
    console.log("activeInex", activeIndex);
  return (
    <>
      <Layout pageTitle="Summary">
        <div className={myinter.className}>
          <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
            <div>
              <Link
                href={"/software/summary"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
              >
                Summary View
              </Link>
            </div>
            <div>
              <Link
                href={"/software/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Detailed View
              </Link>
            </div>
            <div>
              <Link
                href={"/software/drilldown"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>

          <div className="px-[40px] xl:px-[2.083vw] bg-white dark:bg-[#0F1013] xl:mt-[3.125vw] mt-[50px]">
            <div className="grid grid-cols-12 gap-[24px] xl:gap-[1.250vw]">
              <div className="col-span-12 lg:col-span-6 relative">
              <div className="absolute left-[1.25rem] top-[1.25rem]">
                  {/*--Filter Seaction*/}
                  <div className="flex justify-between items-center">
                    {/*left col*/}
                    <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg z-10">
                      <div className="xl:p-[0.821vw] p-3.5 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
                        <i className="red-tsg-three-line"></i>
                      </div>
                      <div>
                        <div className="relative cust-select">
                          <label
                            htmlFor="username"
                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                          >
                            BU
                          </label>
                          <Dropdown
                            value={selectedCity}
                            onChange={e => onClickNavigate(e)}
                            options={BU}
                            optionLabel="name"
                            placeholder="All"
                            className="w-[178px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*--Filter Seaction*/}
                </div>
              <div className="absolute right-1 bottom-20 z-10">
                  <div className="geomap-popup border border-[#1B1D20] rounded-[10px] p-3 xl:p-[0.833vw] w-[200px] xl:w-[16.283vw] flex flex-col items-center gap-3">
                  <div className="text-[#FFFFFF] text-xs xl:text-[0.929vw] font-medium -tracking-[0.28px] text-center leading-5">CAABU - Cluster Wise <br></br> Ageing 90 Days</div>
                  <div className="w-[250px] h-[200px]">
                  <ReactEcharts option={ClusterWiseAgeing} style={{height:"100%", width:'100%'}}/>
                  </div>

                  <div className="w-full">
                  <div className="grid grid-cols-3 gap-1 gap-y-2">
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                    <div className="bg-[#029046] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Saudi Arabia</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#F5F073] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Rome</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#4FB155] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Qatar</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#C8C846] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kuwait</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kenya</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#CDCB90] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">FWN Africa</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">Egypt</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  {/*col*/}
                  <div className="flex flex-col items-center gap-y-1">
                  <div className="bg-[#A9A771] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                    <div className="text-[#FFFFFF] font-normal text-[10px]">East Africa</div>
                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                  </div>
                  {/*col*/}
                  </div>
                  </div>
                  </div>
                  </div> 

                  {/*Map Cluster Wise %*/}
                  <div className="absolute left-1 bottom-0 z-10">
                  <div className="bg-[#221E29] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                    <div className="flex justify-between items-center gap-2">
                      <div>
                        <div className="text-[#F2F4F7] text-xs xl:text-[0.729vw] -tracking-[0.28px]">Cluster Wise %</div>
                        <div className="text-[#CACED1] text-[10px] font-normal -tracking-[0.2px]">Metrics are *Metrics are selected in the metric picker in the map in...</div>
                      </div>
                      <div className="text-[#98A0A5] text-sm"><i className="red-tsg-map-filter"></i></div>
                    </div>
                    <div className="bg-[#1A181E] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                      <div className="grid grid-cols-3 gap-3 xl:gap-[0.417vw]">
                        {/*col*/}
                        <div className="text-center xl:py-[0.208vw] py-1 xl:px-[0.417vw] px-2">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#01813F] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                          <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                        </div>
                        {/*col*/}
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#479F4C] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                          <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                        </div>
                        {/*col*/}
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#60B866] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                          <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                        </div>
                        {/*col*/}
                      </div>
                    </div>
                  </div>
                  </div>
                  {/*Map Cluster Wise %*/}
                <div className="relative max-lg:h-screen h-full geo_map -z-0">
                  <GeoMap mapProps={mapProps} onClick={() => {}} />
                 
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 w-full">
              <div className="rightCopt">
                  <TimelineComponent />
                </div>
                <div className="dark:text-white text-[#222222] text-[18px] xl:text-[0.938vw] font-medium mb-3">
                  Overall Scorecard
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-x-[11px] xl:gap-x-[0.573vw] gap-y-[16px] xl:gap-y-[0.833vw]">
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Unit Wise</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$22,165,169.53</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Unit Wise</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$12,862,146.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Region Wise Ageing</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total({">"}90 Days)</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Brand Wise Ageing</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                    <p>Grand Total({">"}90 Days)</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Brand</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Category</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Brand Software</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Division</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                    <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Cluster</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Group</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$42,862,066.23</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Wise Stock</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[12px] xl:text-[0.625vw] font-light">
                      <p>Grand Total</p>
                    </div>
                    <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                      <div className="dark:text-white text-[#222222] text-[12px] xl:text-[0.625vw] font-semibold">
                        <p>$22,165,169.53</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="mt-[40px] xl:mt-[2.083vw]">
                  <ChartWrapper
                    title={activeIndex === 0 ? "Cluster Professional Service and Software" : activeIndex === 1 ?
                    "Cluster Professional Service and Software" : activeIndex === 2 ? "Top Customers - In US $" : null}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <Tabs>
                          <div className="echartTabs">
                            <TabList>
                              <Tab onClick={() => setActiveIndex(0)}>Analysis</Tab>
                              <Tab onClick={() => setActiveIndex(1)}>Overview</Tab>
                              <Tab onClick={() => setActiveIndex(2)}>Top Customers</Tab>
                            </TabList>                            
                            <TabPanel>
                              <div className="relative">
                                <ReactEcharts
                                  option={totalInventoryTab}
                                  style={{ width: "100%", height: "450px" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative">
                                <ReactEcharts
                                  option={clusterTab}
                                  style={{ width: "100%", height: "450px" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative">
                              <ReactEcharts
                                  option={TopCustomersTreemap}
                                  style={{ width: "100%", height: "450px" }}
                                />
                              </div>
                            </TabPanel>
                          </div>
                        </Tabs>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
            </div>

            <div className="px-[40px] xl:px-[2.083vw]">
            <div className="mt-[24px] xl:mt-[1.250vw]">
                <div className="grid lg:grid-cols-2 gap-[24px] xl:gap-[1.250vw] mb-[24px] xl:mb-[1.250vw]">
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                <ChartWrapper
                    title={activeIndex1 === 0 ? "Software Brands by Ageing - Quarterly " : activeIndex1 === 1 ?
                    "Top Brands - Software" : null}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                      <Tabs>
                          <div className="echartTabs">
                            <TabList>
                              <Tab onClick={() => setActiveIndex1(0)}>Professional Services</Tab>
                              <Tab onClick={() => setActiveIndex1(1)}>Software</Tab>
                            </TabList>                            
                            <TabPanel>
                              <div className="relative">
                              <ReactEcharts
                                  option={TopCustomersTreemap}
                                  style={{ width: "100%", height: "450px" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative">
                              <ReactEcharts
                                  option={TopCustomersTreemap}
                                  style={{ width: "100%", height: "450px" }}
                                />
                              </div>
                            </TabPanel>
                          </div>
                        </Tabs>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
          <ChartWrapper
                    title={activeIndex2 === 0 ? "Top Customers-Professional Services" : activeIndex2 === 1 ?
                    "Top Customers-Software" : null}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                       <Tabs>
                          <div className="echartTabs">
                            <TabList>
                              <Tab onClick={() => setActiveIndex2(0)}>Professional Services</Tab>
                              <Tab onClick={() => setActiveIndex2(1)}>Software</Tab>
                            </TabList>                            
                            <TabPanel>
                              <div className="relative">
                              <ReactEcharts
                                  option={TopcustomersProfessional}
                                  style={{ width: "100%", height: "450px" }}
                                />
                                 <div className="dark:text-[#CACED1] text-[#555555] text-xs font-medium absolute bottom-6 flex justify-center">
                                 <p className="text-center ml-60">Values in $</p>
                          </div>
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative">
                              <ReactEcharts
                                  option={TopcustomersSoftware}
                                  style={{ width: "100%", height: "450px" }}
                                />
                                 <div className="dark:text-[#CACED1] text-[#555555] text-xs font-medium absolute bottom-6 flex justify-center">
                                 <p className="text-center ml-60">Values in $</p>
                          </div>
                              </div>
                            </TabPanel>
                          </div>
                        </Tabs>
                      </>
                    }
                  />
                </div>
                </div>


              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[24px] xl:gap-[1.250vw]">
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"Professional Services vs Software - Quarterly 2023"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="flex justify-between items-center custmDrop">
                          <div className="flex items-center gap-x-3">
                            <div className="dark:bg-[rgba(255,255,255,0.10)] bg-white border border-[#E6E6E6] dark:border-[rgba(230,230,230,0.10)] px-[5px] py-[4px] rounded dark:text-[#CACED1] text-[#667085] text-[9px] flex items-center justify-center"><i className="red-tsg-left-arrow"></i></div>
                            <div className="dark:text-[#CACED1] text-[#667085] font-medium text-sm xl:text-[0.833vw]">2023</div>
                            <div className="dark:bg-[rgba(255,255,255,0.10)] bg-white border border-[#E6E6E6] dark:border-[rgba(230,230,230,0.10)] px-[5px] py-[4px] rounded dark:text-[#CACED1] text-[#667085] text-[9px] flex items-center justify-center"><i className="red-tsg-right-arrow"></i></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] text-[#888888]">
                                View By
                              </span>
                            </div>
                            <div className="col">
                              <select
                                placeholder="Quarter"
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 dark:bg-[#27272A] bg-white dark:text-[#C2C3C3] text-[#555555] text-sm placeholder-[#C2C3C3] rounded-[4px] border border-[#E6E6E6] dark:border-[#344054] focus:outline-none"
                              >
                                <option>Year</option>
                                <option>Quarter</option>
                                <option>Month</option>
                                <option>Week</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <ReactEcharts
                            option={vendors}
                            style={{ width: "100%", height: "400px" }}
                          />
                          <div className="dark:text-[#CACED1] text-[#555555] text-sm font-medium absolute echartleft-text">
                            Values in $
                          </div>
                          <div className="dark:text-[#CACED1] text-[#555555] text-sm font-medium absolute bottom-6 inset-x-2/4">
                          Quarter
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"Business Unit Wise Ageing"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                      <div className="dark:text-[#CACED1] text-[#667085] font-normal text-sm xl:text-[0.729vw] relative -top-3 flex items-center gap-x-1"><i className="red-tsg-right-arrow text-[8px]"></i> 90 Days - Total Value in US$</div>
                        <ReactEcharts
                          option={bu}
                          style={{ width: "100%", height: "400px" }}
                        />
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"Top Cluster - Software"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="relative">
                          <ReactEcharts
                            option={cluster}
                            style={{ width: "100%", height: "400px" }}
                          />
                          <div className="dark:text-[#808989] text-[#555555] text-sm font-medium absolute echartleft-text">
                            Cluster
                          </div>
                          <div className="dark:text-[#808989] text-[#555555] text-sm font-medium absolute echartbottom-text">
                            Values in $
                          </div>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
              <div className="mt-[24px] xl:mt-[1.250vw] mb-[20px] custTabs">
              <Tabs>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white shadow-[0px_5px_5px_0px_rgba(0,0,0,0.08)] rounded-[8px] xl:rounded-[0.417vw] p-[10px]">
                  <div className="relative">
                    <div className="absolute right-0 top-[10px]">
                      <Link href={""}>
                        <i className="red-tsg-volume text-[#555555] text-[18px] xl:text-[0.938vw]"></i>
                      </Link>
                    </div>
                    <TabList>
                      <Tab>Key Insights</Tab>
                      <Tab>Notes</Tab>
                    </TabList>
                    <TabPanel>
                      <ul className="tabList">
                        <li>
                          1. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          2. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          3. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          4. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <ul className="tabList">
                        <li>
                          1. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          2. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          3. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          4. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          5. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          6. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          7. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          8. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                      </ul>
                    </TabPanel>
                  </div>
                </div>
              </Tabs>
            </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
