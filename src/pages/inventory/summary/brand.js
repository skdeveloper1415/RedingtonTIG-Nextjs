import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { Dropdown } from "primereact/dropdown";
import GeoMap from "../../../components/geoMap";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { useTheme } from 'next-themes';

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Index() {
  const [selectedCity, setSelectedCity] = useState(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const cities = [
    { name: "Top 2 Vendors", code: "NY" },
    { name: "Top 1 Vendors", code: "RM" },
    { name: "Top 4 Vendors", code: "LDN" },
    { name: "Top 3 Vendors", code: "IST" },
  ];

  const Backlog = [
    { name: "All", code: "ALL" },
    { name: "Brand", code: "BR" },
    { name: "Business Unit", code: "BU" },
    { name: "Region Wise Ageing", code: "IST" },
    { name: "Cluster", code: "CL" },
    { name: "Business Group", code: "PRS" },
  ];

  const onClickNavigate = async (e) => {
    console.log(e);
    if (e.value.code === "ALL") {
      window.location.href = "/inventory/summary";
    } else if (e.value.code === "BU") {
      window.location.href = "/inventory/summary";
    } else if (e.value.code === "CL") {
      window.location.href = "/inventory/summary/cluster";
    }
  };

  const Keyfacts = [
    { name: "2023-2024", code: "2023-2024" },
    { name: "2022-2023", code: "2022-2023" },
    { name: "2022-2023", code: "2021-2022" },
    { name: "2021-2022", code: "2020-2021" },
  ];

  /*---Timeline Components--*/
  const events = [
    { status: "NUTANIX", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "HUAWEI", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "DELL SERVER", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "CISCO", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "FORTINET", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "HPE Aruba", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "HPE Hybrid IT", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "PALO ALTO", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "ORACLE", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "EMC", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "VERITAS", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "VCE", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "HITACHI", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "SONICWALL", icon: "red-tsg-dot", color: "#98A2B3" },
    { status: "BARRACUDA", icon: "red-tsg-dot", color: "#98A2B3" },
  ];

  const customizedMarker = (item) => {
    return (
      <span className="text-[#029046] text-[10px]">
        <i className={item.icon}></i>
      </span>
    );
  };

  const customizedContent = (item) => {
    return <Card title={item.status}></Card>;
  };

  /*---Timeline Components--*/

  /************Geo Map *******************/
  const mapProps = {
    center: [0, 17],
    zoom: 3,
    currentTheme: "dark",
    themeConfig: {
      dark: {
        layerSwitcher: {
          primary: "",
          secondary: "",
          fontColor: "",
        },
        legend: {
          primary: "",
          secondary: "",
          fontColor: "",
        },
        baseMap:
          "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      },
      light: {
        layerSwitcher: {
          primary: "red",
          secondary: "blue",
          fontColor: "purple",
        },
        legend: {
          primary: "green",
          secondary: "pink",
          fontColor: "purple",
        },
        mapControls: {
          primary: "green",
          secondary: "pink",
        },
        baseMap:
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      },
    },
    baseMapConfig: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    },
    layers: [
      {
        name: "layer1",
        title: "Core Countries",
        type: "geojson",
        opacity: 100,
        enabled: true,
        featureLabelField: "ADMIN",
        renderer: {
          type: "custom",
          config: {
            color: {
              field: "metric",
              breaks: [
                {
                  start: 0,
                  end: 9,
                  color: "#588CFA",
                },
                {
                  start: 10,
                  end: 19,
                  color: "#0033A0",
                },
                {
                  start: 20,
                  end: 29,
                  color: "#7C5CD8",
                },
              ],
            },
          },
        },
      },
      {
        name: "layer2",
        title: "Core Countries",
        type: "geojson",
        opacity: 100,
        enabled: true,
        selectable: false,
      },
    ],
    geoSources: {
      layer1: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
      layer2: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
      layer3: {
        url: "https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson",
      },
    },
    dataSources: {
      layer1: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "DZA",
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: "LBY",
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: "EGY",
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: "TUR",
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: "IRQ",
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: "SAU",
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: "ZAF",
            metric: 25,
            metric2: 10,
            metric3: 20,
          },
        ],
      },
      layer2: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "DZA",
            metric: 15,
            metric2: 10,
            metric3: 10,
          },
          {
            ISO_A3: "LBY",
            metric: 25,
            metric2: 20,
            metric3: 10,
          },
          {
            ISO_A3: "EGY",
            metric: 15,
            metric2: 30,
            metric3: 20,
          },
          {
            ISO_A3: "TUR",
            metric: 5,
            metric2: 40,
            metric3: 30,
          },
          {
            ISO_A3: "IRQ",
            metric: 5,
            metric2: 30,
            metric3: 40,
          },
          {
            ISO_A3: "SAU",
            metric: 25,
            metric2: 20,
            metric3: 30,
          },
          {
            ISO_A3: "ZAF",
            metric: 25,
            metric2: 10,
            metric3: 20,
          },
        ],
      },
      layer3: {
        geoKeys: ["ISO_A3"],
        dataKeys: ["ISO_A3"],
        data: [
          {
            ISO_A3: "NGA",
            metric: 15,
          },
          {
            ISO_A3: "CMR",
            metric: 25,
          },
          {
            ISO_A3: "KEN",
            metric: 15,
          },
        ],
      },
    },
  };
  /************Geo Map *******************/

  const clusterTab = {
    tooltip: {},
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
        "East Africa",
        "Egypt",
        "FWN Africa",
        "Kenya",
        "Kuwait",
        "Qatar",
        "Rome",
        "Saudi",
        "South Africa",
        "U.A.E",
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Oracle",
        stack: "vendor",
        data: [380, 320, 380, 400, 410, 440, 450, 440, 430, 430],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 40,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "NBU",
        stack: "vendor",
        data: [270, 240, 270, 230, 210, 240, 250, 220, 230, 245],
        type: "bar",
        color: "#F5F073",
        barWidth: 40,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "IBU",
        stack: "vendor",
        data: [40, 60, 50, 70, 90, 40, 50, 90, 80, 75],
        type: "bar",
        color: "#4FB155",
        barWidth: 40,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "ESBU",
        stack: "vendor",
        data: [100, 80, 100, 110, 80, 70, 100, 90, 100, 100],
        type: "bar",
        color: "#C8C846",
        barWidth: 40,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "CAABU",
        stack: "vendor",
        data: [170, 120, 130, 180, 150, 140, 180, 160, 150, 152],
        type: "bar",
        color: "#E1DFA9",
        barWidth: 40,
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
    tooltip: {},
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
      data: ["Oracle", "NBU", "IBU", "ESBU", "CAABU"],
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Inventory Value",
        stack: "vendor",
        data: [380, 320, 380, 400, 410],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 85,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "Provisional Value",
        stack: "vendor",
        data: [270, 240, 270, 230, 210],
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

  const b2bStockTab = {
    tooltip: {},
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
      data: ["Oracle", "NBU", "IBU", "ESBU", "CAABU"],
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Inventory Value",
        stack: "vendor",
        data: [380, 320, 380, 400, 410],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 85,
        label: {
          show: true,
          formatter: "${c}K",
        },
      },
      {
        name: "Provisional Value",
        stack: "vendor",
        data: [270, 240, 270, 230, 210],
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

  const b2bStockQuarterlyTab = {
    tooltip: {},
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
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Inventory Value",
        stack: "inventory",
        data: [540, 700, 600, 450],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 30,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          fontSize: 10,
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: "Provisional Value",
        stack: "provisional",
        data: [750, 800, 750, 650],
        type: "bar",
        color: "#F5F073",
        barWidth: 30,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          fontSize: 10,
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: "Provisional Value - B2B",
        stack: "provisionalB2b",
        data: [600, 700, 800, 700],
        type: "bar",
        color: "#4FB155",
        barWidth: 30,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          fontSize: 10,
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: "Inventory Value - B2B",
        stack: "inventoryB2B",
        data: [800, 700, 600, 500],
        type: "bar",
        color: "#C8C846",
        barWidth: 30,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          fontSize: 10,
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const ClusterWiseAgeing = {
    title: {
      text: "Grand Total",
      textStyle: {
        fontSize: 10,
        fontWeight: "400",
        color: "#FFFFFF",
      },
      subtext: "$6.5M",
      left: "center",
      top: "center",
      subtextStyle: {
        fontSize: 10,
        fontWeight: "600",
        align: "center",
        color: "#FFFFFF",
      },
    },
    color: [
      "#029046",
      "#F5F073",
      "#4FB155",
      "#C8C846",
      "#E1DFA9",
      "#CDCB90",
      "#E1DFA9",
      "#A9A771",
    ],
    legend: {
      show: false,
      orient: "horizontal",
      width: "30%",
      itemGap: 50,
      top: "50%",
      itemWidth: 10,
      itemHeight: "10",
      textStyle: {
        fontSize: 8,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "60%"],
        center: ["50%", "50%"],
        width: "100%",
        height: "100%",
        data: [
          { value: 24, name: "Saudi Arabia" },
          { value: 15, name: "Rome" },
          { value: 15, name: "Qatar" },
          { value: 8, name: "Kuwait" },
          { value: 10, name: "Kenya" },
          { value: 5, name: "FWN Africa" },
          { value: 15, name: "Egypt" },
          { value: 6, name: "East Africa" },
        ],
        label: {
          show: true,
          color: "#F9F7F4",
          fontSize: 12,
          padding: [-20, -20, -20, -20],
          position: "outsideFill",
          formatter: function (params) {
            return params.value + "%";
          },
        },
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      },
    ],
  };

  const vendors = {
    tooltip: {},
    grid: {
      top: "10%",
      right: "0%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Vendor 1",
        "Vendor 2",
        "Vendor 3",
        "Vendor 4",
        "Vendor 5",
        "Vendor 6",
      ],
      axisLabel: {
        fontSize: 12,
        color: "#CACED1",
        width: 100,
        overflow: "truncate",
        interval: 0,
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#2B2F31",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#2B2F31",
        },
      },
      name: "Vendor",
      nameGap: 40,
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 12,
        color: "#CACED1",
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
          color: "#2B2F31",
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: "#CACED1",
        formatter: "{value}K",
      },
      name: "Values in $",
      nameGap: 50,
      nameLocation: "middle",
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 12,
        color: "#CACED1",
      },
    },
    series: [
      {
        name: "",
        data: [600, 300, 700, 450, 600, 500],
        type: "bar",
        stack: "total",
        color: "#029046",
        barWidth: 40,
        markPoint: {
          data: [
            {
              type: "max",
            },
          ],
          symbol: "Rect",
          symbolSize: [50, 40],
          symbolOffset: [0, -35],
          itemStyle: {
            color: "#002B15",
          },
          label: {
            show: true,
            formatter: "Jan \n ${c}K",
            lineHeight: 15,
            align: "center",
          },
        },
      },
    ],
  };

  const cluster = {
    tooltip: {},
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
      max: 1200000,
      interval: 200000,
      axisLabel: {
        fontSize: 12,
        color: "#CACED1",
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#2B2F31",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#2B2F31",
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["Egypt", "Kenya", "Qatar", "Rome", "Saudi"],
      axisLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#2B2F31",
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
        color: "#CACED1",
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "",
        data: [700000, 400000, 1000000, 600000, 900000],
        type: "bar",
        stack: "total",
        color: "#4FB155",
        barWidth: 32,
      },
    ],
  };

  const bu = {
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
          formatter: "{c}  \n {b}",
        },
        itemStyle: {
          shadowBlur: 60,
          shadowColor: "rgba(65,115,61,0.8)",
        },
      },
    ],
  };

  const TopCustomersTreemap = {
    series: [
      {
        type: "treemap",
        width: "100%",
        height: "100%",
        label: {
          show: true,
          position: "insideBottomLeft",
          overflow: "breakAll",
        },
        data: [
          {
            name: "AL Khalili Technology LLC",
            value: "321567",
            itemStyle: {
              color: "#83432A",
            },
          },
          {
            name: "SIBCA Electronic Equipment Company",
            value: "412900",
            itemStyle: {
              color: "#769F2E",
            },
          },
          {
            name: "Teklogix DMCC",
            value: "329000",
            itemStyle: {
              color: "#11462B",
            },
          },
          {
            name: "Intertech LLC",
            value: "329000",
            itemStyle: {
              color: "#796B26",
            },
          },
          {
            name: "AL Khalili Technology LLC",
            value: "329000",
            itemStyle: {
              color: "#8DB14D",
            },
          },
          {
            name: "United Technology Group GWC-LLC",
            value: "329000",
            itemStyle: {
              color: "#66755F",
            },
          },
          {
            name: "Mustafa Sultan Office Techno, Co",
            value: "329000",
            itemStyle: {
              color: "#8C8A48",
            },
          },
          {
            name: "Mustafa Sultan Office Technology Co",
            value: "329000",
            itemStyle: {
              color: "#585D72",
            },
          },
          {
            name: "Emerson FZE",
            value: "329000",
            itemStyle: {
              color: "#547440",
            },
          },
          {
            name: "Infocomm Group LLC",
            value: "329000",
            itemStyle: {
              color: "#A9A771",
            },
          },
        ],
      },
    ],
  };

  const topBusiness = {
    tooltip: {},
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
      top: "10%",
      right: "0%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["CSAG", "CIG", "CNG", "Business Grp 1", "Business Grp 2"],
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
      name: "Values in $",
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
        name: "",
        type: "bar",
        stack: "Total",
        itemStyle: {
          color: "transparent",
          borderRadius: [4, 4, 0, 0],
        },
        data: [0, 200, 400, 550, 750],
      },
      {
        name: "Oracle",
        type: "bar",
        stack: "Total",
        label: {
          show: true,
          formatter: "${c}K",
        },
        data: [200, 200, 150, 200, 100],
        itemStyle: {
          color: "#029046",
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const topCustomers = {
    grid: {
      top: "10%",
      right: "0%",
      bottom: "15%",
      left: "3%",
      containLabel: true,
    },
    radar: {
      shape: "circle",
      splitNumber: 6,
      indicator: [
        { name: "Infocomm \n Group LLC", max: 6500 },
        { name: "United Technology \n Group DWC - LLC", max: 16000 },
        { name: "Emerson \n FZE", max: 30000 },
        { name: "InterTech \n LLC", max: 38000 },
        { name: "Al Khalili \n Technology LLC", max: 52000 },
        { name: "Mustafa Sultan Office \n Technology Co", max: 25000 },
        { name: "Sibca Electronic \n Equipment Company", max: 3500 },
        { name: "Teklogix \n DMCC", max: 25000 },
      ],
      axisLine: {
        symbol: "circle",
        symbolSize: [8, 8],
        lineStyle: {
          color: "#6F9E74",
        },
      },
      splitLine: {
        lineStyle: {
          color: ["#2D4F30"].reverse(),
        },
      },
      splitArea: {
        show: false,
      },
      axisName: {
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        lineHeight: 15,
      },
    },

    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        // label: {
        //   show: true,
        //   formatter: "${c}K",
        //   position: "left",
        //   color: "#F2F4F7"
        // },
        itemStyle: {
          color: "rgba(79, 177, 85, 0.4)",
        },
        data: [
          {
            value: [5300, 13000, 25000, 20000, 45000, 20000, 3000, 20000],
          },
        ],
        areaStyle: {
          shadowColor: "rgba(79,177,85,1)",
          shadowBlur: 20,
        },
      },
    ],
  };

  const totalAgeing = {
    tooltip: {},
    grid: {
      top: "5%",
      right: "0%",
      bottom: "12%",
      left: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["91-120", "120-180", "181-270", "271-360", "<360"],
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
      name: "Ageing",
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
      max: 700,
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Inventory Value",
        stack: "vendor",
        data: [450, 490, 500, 550, 650],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 50,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  const quarterlyValue = {
    tooltip: {},
    grid: {
      top: "5%",
      right: "0%",
      bottom: "12%",
      left: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
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
      name: "Quarter",
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
      max: 600,
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
        formatter: "{value}K",
      },
    },
    series: [
      {
        name: "Inventory Value",
        stack: "vendor",
        data: [450, 490, 500, 550],
        type: "bar",
        color: "#029046",
        barGap: 0,
        barWidth: 50,
        label: {
          show: true,
          formatter: "${c}K",
          position: "insideTop",
          padding: [10, 0, 0, 0],
        },
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [activeIndex2, setActiveIndex2] = useState(0);

  return (
    <>
      <Layout pageTitle="Summary | Brand">
        <div className={myinter.className}>
          <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full">
            <div>
              <Link
                href={"/inventory/summary"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
              >
                Summary View
              </Link>
            </div>
            <div>
              <Link
                href={"/inventory/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Detailed View
              </Link>
            </div>
            <div>
              <Link
                href={"/inventory/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>
          <div className="px-[40px] xl:px-[2.083vw] bg-white dark:bg-[#0F1013]">
            <div className="grid grid-cols-12 gap-[24px] xl:gap-[1.250vw]">
              <div className="col-span-12 lg:col-span-6 relative">
                <div className="absolute right-0 top-0 z-10 customiz-timeline bg-[rgba(15,16,19,0.90)] h-full pt-5">
                  <div className="text-[#F2F4F7] font-semibold text-xs text-center">
                    Brands
                  </div>
                  <div className="flex px-1 mt-5">
                    <div className="">
                      <Image
                        src={"/assets/images/brand-timelnechart.png"}
                        width={52}
                        height={808}
                        alt="Brands"
                      />
                    </div>
                    <div>
                      <Timeline
                        value={events}
                        marker={customizedMarker}
                        content={customizedContent}
                      />
                    </div>
                  </div>
                </div>
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
                            onChange={(e) => onClickNavigate(e)}
                            options={Backlog}
                            optionLabel="name"
                            placeholder="Brand"
                            className="w-[178px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*--Filter Seaction*/}
                </div>

                {/*Map Cluster Wise %*/}
                <div className="absolute left-1 bottom-0 z-10">
                  <div className="bg-[#221E29] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                    <div className="flex justify-between items-center gap-2">
                      <div>
                        <div className="text-[#F2F4F7] text-xs xl:text-[0.729vw] -tracking-[0.28px]">
                          Cluster Wise %
                        </div>
                        <div className="text-[#CACED1] text-[10px] font-normal -tracking-[0.2px]">
                          Metrics are *Metrics are selected in the metric picker
                          in the map in...
                        </div>
                      </div>
                      <div className="text-[#98A0A5] text-sm">
                        <i className="red-tsg-map-filter"></i>
                      </div>
                    </div>
                    <div className="bg-[#1A181E] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                      <div className="grid grid-cols-3 gap-3">
                        {/*col*/}
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs">
                            <span className="w-4 h-4 rounded-sm bg-[#01813F] flex items-center justify-center text-[6px]">
                              <i className="red-tsg-right-check text-white"></i>
                            </span>
                            <span>Less Than 20%</span>
                          </div>
                          <div className="text-[#CACED1] font-medium text-sm">
                            <i className="red-tsg-left-arrow text-xs"></i> $1 M
                          </div>
                        </div>
                        {/*col*/}
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs">
                            <span className="w-4 h-4 rounded-sm bg-[#479F4C] flex items-center justify-center text-[6px]">
                              <i className="red-tsg-right-check text-white"></i>
                            </span>
                            <span>Less Than 20%</span>
                          </div>
                          <div className="text-[#CACED1] font-medium text-sm">
                            <i className="red-tsg-left-arrow text-xs"></i> $1 M
                          </div>
                        </div>
                        {/*col*/}
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs">
                            <span className="w-4 h-4 rounded-sm bg-[#60B866] flex items-center justify-center text-[6px]">
                              <i className="red-tsg-right-check text-white"></i>
                            </span>
                            <span>Less Than 20%</span>
                          </div>
                          <div className="text-[#CACED1] font-medium text-sm">
                            <i className="red-tsg-left-arrow text-xs"></i> $1 M
                          </div>
                        </div>
                        {/*col*/}
                      </div>
                    </div>
                  </div>
                </div>
                {/*Map Cluster Wise %*/}
                <div className="relative h-full max-lg:h-screen geo_map -z-0">
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
                <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-[11px] xl:gap-x-[0.573vw] gap-y-[16px] xl:gap-y-[0.833vw]">
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Unit Wise</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
                       <p> $42,862,066.23</p>
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
                       <p> $42,862,066.23</p>
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
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
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Total Inventory Value (90 Days)</p>
                    </div>
                    <div className="flex space-x-[6px]">
                      <div className="dark:text-white text-[#222222] text-[10px] xl:text-[0.625vw] font-semibold">
                        <p>$22,165,169.53</p>
                      </div>
                      <div className="text-[#649A4A] text-[10px] xl:text-[0.625vw] flex">
                      <span className="flex justify-center items-center text-[6px] w-[12px] h-[12px] rounded-full bg-[#02A666] mr-1 up-arrow"><i className="red-tsg-up-line-arrow text-white"></i></span>
                      <span>+2.%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] mt-[40px] xl:mt-[2.083vw]">
                  <ChartWrapper
                    title={
                      activeIndex1 === 0
                        ? "BU - Cluster in US$"
                        : activeIndex1 === 1
                        ? "BU - Total Inventory and Provisional Value"
                        : activeIndex1 === 2
                        ? "BU - B2B and Stock"
                        : activeIndex1 === 3
                        ? "BU - B2B and Stock - Quarterly"
                        : null
                    }
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <Tabs>
                          <div className="echartTabs">
                            <TabList>
                              <Tab onClick={() => setActiveIndex1(0)}>
                                Cluster
                              </Tab>
                              <Tab onClick={() => setActiveIndex1(1)}>
                                Total Inventory
                              </Tab>
                              <Tab onClick={() => setActiveIndex1(2)}>
                                B2B and Stock
                              </Tab>
                              <Tab onClick={() => setActiveIndex1(3)}>
                                B2B and Stock - Quarterly
                              </Tab>
                            </TabList>
                            <TabPanel>
                              <div className="relative" id="echartWrap">
                                <ReactEcharts
                                  option={clusterTab}
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative" id="echartWrap">
                                <ReactEcharts
                                  option={totalInventoryTab}
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative" id="echartWrap">
                                <ReactEcharts
                                  option={b2bStockTab}
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                            </TabPanel>
                            <TabPanel>
                              <div className="relative" id="echartWrap">
                                <ReactEcharts
                                  option={b2bStockQuarterlyTab}
                                  style={{ width: "100%", height: "100%" }}
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
            <div className="grid grid-cols-1 xl:grid-cols-2 mt-[24px] xl:mt-[1.250vw] gap-[24px] xl:gap-[1.250vw]">
              <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                <ChartWrapper
                  title={"Top Brands - Inventory - in US$"}
                  maximizeIcon={true}
                  ExportIcon={true}
                  data={
                    <>
                      <div className="relative" id="echartWrap">
                        <ReactEcharts
                          option={TopCustomersTreemap}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </>
                  }
                />
              </div>
              <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                <ChartWrapper
                  title={"Top Business Group - Inventory - in US$"}
                  maximizeIcon={true}
                  ExportIcon={true}
                  data={
                    <>
                      <div className="relative" id="echartWrap">
                        <ReactEcharts
                          option={topBusiness}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    </>
                  }
                />
              </div>
            </div>
            <div className="mt-[24px] xl:mt-[1.250vw]">
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[24px] xl:gap-[1.250vw]">
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"Top Customers - in US$"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="relative" id="echartWrap">
                          <ReactEcharts
                            option={topCustomers}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={
                      activeIndex2 === 0
                        ? "Brands by Ageing"
                        : activeIndex2 === 1
                        ? "Brands Value Quarterly"
                        : null
                    }
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="relative">
                          <Tabs>
                            <div className="echartTabs">
                              <div className="flex items-center justify-between">
                                <div className="col">
                                  <div className="dark:bg-[#586C5D] bg-[#EEF8F4] border border-[#83C888] dark:border-[#394144] rounded-[6px] text-[12px] xl:text-[0.625vw] text-[#667085] dark:text-[#C6CBD2] py-[5px] px-[16px]">
                                    Total
                                    <span className="font-medium text-[#344054] dark:text-[#F2F4F7] ml-1">
                                      US$ 199,000
                                    </span>
                                  </div>
                                </div>
                                <div className="col">
                                  <TabList>
                                    <Tab onClick={() => setActiveIndex2(0)}>
                                      Total Ageing
                                    </Tab>
                                    <Tab onClick={() => setActiveIndex2(1)}>
                                      Quarterly Value
                                    </Tab>
                                  </TabList>
                                </div>
                              </div>
                              <TabPanel>
                                <div className="relative" id="echartWrap">
                                  <ReactEcharts
                                    option={totalAgeing}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                              </TabPanel>
                              <TabPanel>
                                <div className="relative" id="echartWrap">
                                  <ReactEcharts
                                    option={quarterlyValue}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                              </TabPanel>
                            </div>
                          </Tabs>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"By BU"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="relative" id="echartWrap">
                          <ReactEcharts
                            option={bu}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-[24px] xl:mt-[1.250vw] pb-[20px] custTabs">
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
      </Layout>
    </>
  );
}
