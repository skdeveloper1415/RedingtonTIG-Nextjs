import Image from "next/image";
import Link from "next/link";
import React, { useState,useEffect } from "react";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { useTheme } from 'next-themes';
import { Dropdown } from "primereact/dropdown";
import GeoMap from "../../../components/geoMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory_Summary_view_4, fetchInventory_Summary_view_6} from "@/redux/slice/inventory";
import { toMillion,toMillionRounded } from '../../../utils/CurrencyUTIL';

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Index() {
  const dispatch = useDispatch()
  const [selectedCity, setSelectedCity] = useState(null);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const AppliedFilters = useSelector(state => state.global.AppliedFilters) 
  const Trigger = useSelector(state => state.global.Trigger) 
  const Inventory_Summary_view_4 = useSelector(state => state.inventory.Inventory_Summary_view_4);
  const Inventory_Summary_view_4loading = useSelector(state => state.inventory.Inventory_Summary_view_4loading);

  const Inventory_Summary_view_6 = useSelector(state => state.inventory.Inventory_Summary_view_6);
  const Inventory_Summary_view_6loading = useSelector(state => state.inventory.Inventory_Summary_view_6loading);

  const [selectedmetric, setSelectedmetric] = useState({ name: "Brand", code: "BUSINESSBRAND" });

  useEffect(() => {
    // let userEmailId = sessionStorage.getItem("userEmailId")
    const body = {
      "elasticQueryName": "",
      "filters": AppliedFilters||[] ,
      "dynamicColumns": [{columnName:"#{selectmetric}",columnValue:'sum(INVENTORYVALUE)'},{columnName:"#{dimension}",columnValue: selectedmetric?.code}], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    };
    handleChangefilter(body, "Test.PBI@redingtongroup.com")
  }, [Trigger,selectedmetric]);

  const handleChangefilter = (body, userEmailId) => {
    dispatch(fetchInventory_Summary_view_4(body))
    dispatch(fetchInventory_Summary_view_6(body))
  }


  const cities = [
    { name: "Top 2 Vendors", code: "NY" },
    { name: "Top 1 Vendors", code: "RM" },
    { name: "Top 4 Vendors", code: "LDN" },
    { name: "Top 3 Vendors", code: "IST" },
  ];

  const Backlog = [
    // { name: "All", code: "NY" },
    // { name: "Brand", code: "BR" },
    // { name: "Business Unit", code: "LDN" },
    // { name: "Region Wise Ageing", code: "IST" },
    // { name: "Cluster", code: "CL" },
    // { name: "Business Group", code: "PRS" },
    { name: "All", code: "All" },
    { name: "Brand", code: "BUSINESSBRAND" },
    { name: "Business Unit", code: "MISBUSINESSUNIT" },
    { name: "Cluster", code: "REGION_CLUSTER" },
    { name: "Region Wise Ageing", code: "REGION_CLUSTER" },
    { name: "Business Group", code: "COUNTRYNAME" },
    { name: "Brand Wise Ageing", code: "COUNTRYNAME" },
    { name: "Brand Wise Stock", code: "COUNTRYNAME" },
    { name: "Category", code: "COUNTRYNAME" },
    { name: "Inventory Value", code: "COUNTRYNAME" },
    { name: "Provisional Value", code: "COUNTRYNAME" },
  ];

  const onClickNavigate= async (e) => {
    console.log(e)
    if(e.value.code === "BR"){
    window.location.href="/inventory/summary/brand"
    }
    else if(e.value.code === "BU"){
    window.location.href="/inventory/summary"
    }
    else if(e.value.code === "CL"){
      window.location.href="/inventory/summary/cluster"
      }
    }

  const Keyfacts = [
    { name: "2023-2024", code: "2023-2024" },
    { name: "2022-2023", code: "2022-2023" },
    { name: "2022-2023", code: "2021-2022" },
    { name: "2021-2022", code: "2020-2021" },
  ];

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
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
        // color: "#CACED1",
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
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
        barWidth: 65,
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
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
        barWidth: 65,
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
        barWidth: 65,
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
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
  const bu = {
    legend: {
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
          formatter: "${c}M\n {10%}  \n {b}",
        },
        itemStyle: {
          shadowBlur: 60,
          shadowColor: "rgba(65,115,61,0.8)",
        },
      },
    ],
  };
  

  let colors = ["#83432A","#769F2E","#11462B","#796B26","#8DB14D", "#66755F","#8C8A48","#585D72","#547440","#A9A771"]

  let Inventory_Summary_view_4Datafinal = []
  Inventory_Summary_view_4?.forEach((item,index) => {
    Inventory_Summary_view_4Datafinal.push({
      name: item[selectedmetric?.code],
      value: item["value"],
      itemStyle:{color:colors[index] }
    })
  })

  const TopCustomersTreemap = {
    tooltip:{
      trigger:'item',
      textStyle : {
          fontSize:11,
          width:50
      },
      formatter: function (params) {
        return params?.name + " " +toMillion(params?.value);
      },
      appendToBody : true,
      confine:true
    },
    legend: {
      data: ['abc', 'xyz'],
      // selectedMode: 'single',
      bottom: 0,
      itemGap: 5,
      borderRadius: 5
    },

    series: [
      {
        type: "treemap",
        width: "100%",
        height: "90%",
        label: {
          show: true,
          formatter: function (params) {
            return params?.name +'\n'+ toMillion(params?.value);
          },
          position: "insideBottomLeft",
          overflow: "breakAll",
        },
        data: Inventory_Summary_view_4Datafinal,
        breadcrumb:{
          show: false,
        },
        legend:{
          show:true,
        },
        animation: true,
        leafDepth: 1,
        nodeClick: false,
        roam: false,
      },
    ],
  };

  const topBusiness = {
    tooltip:{
      position:'top',
      trigger:'item',
      padding: [7, 7],
      backgroundColor:currentTheme == 'dark' ? '#002B15' : 'black',
      textStyle: {
        color: '#fff', 
        fontSize: '10',
      },
    },
    legend: {
      show: true,
      bottom: 0,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    grid: {
      top: "10%",
      right: "0%",
      bottom: "15%",
      left: "3%",
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
        barWidth: 60,
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

  let Inventory_Summary_view_6Datafinal = [];
  Inventory_Summary_view_6?.forEach((item,index) => {
    Inventory_Summary_view_6Datafinal?.push({
      name: item[selectedmetric?.code],
      max: 39032651
    })
  })

  const topCustomers = {
    grid: {
      top: "10%",
      right: "10%",
      bottom: "15%",
      left: "10%",
      containLabel: true,
    },
    radar: {
      shape: "circle",
      splitNumber: 6,
      indicator: 
      // Inventory_Summary_view_6Datafinal,
      [
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
            // value: [5300, 13000, 25000, 20000, 45000, 20000, 3000, 20000],
            value: Inventory_Summary_view_6?.map(itr => itr["value"]),
          },
        ],
        areaStyle: {
          shadowColor: "rgba(79,177,85,1)",
          shadowBlur: 20,
        },
      },
    ],
  };

  // const meter = {
  //   series: [
  //     {
  //       type: "gauge",
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ["50%", "70%"],
  //       radius: "100%",
  //       min: 0,
  //       max: 1,
  //       splitNumber: 8,
  //       axisLine: {
  //         lineStyle: {
  //           width: 60,
  //           color: [
  //             [0.25, "#029046"],
  //             [0.5, "#F5F073"],
  //             [0.75, "#4FB155"],
  //             [1, "#C8C846"],
  //           ],
  //         },
  //       },

  //       splitLine: {
  //         show: false,
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         color: "white",
  //         fontSize: 14,
  //         distance: 10,
  //         rotate: "tangential",
  //         formatter: function (value) {
  //           if (value === 0.875) {
  //             return "Quarter 4";
  //           } else if (value === 0.625) {
  //             return "Quarter 3";
  //           } else if (value === 0.375) {
  //             return "Quarter 2";
  //           } else if (value === 0.125) {
  //             return "Quarter 1";
  //           }
  //           return "";
  //         },
  //       },

  //       pointer: {
  //         icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
  //         length: "60%",
  //         width: 12,
  //         offsetCenter: ["5%", "-20%"],
  //         itemStyle: {
  //           color: '#029046'
  //         }
  //       },
  //       detail: {
  //         formatter: "Turnover Time \n {value}",
  //         color: "#CACED1",
  //         fontSize: 16,
  //         offsetCenter: [0, "-5%"],
  //       },
  //       data: [
  //         {
  //           value: 0.4,
  //         },
  //       ],
  //     },
  //   ],
  // };


  /******** New Meter Chart ******* */
  // const meter  = {
  //   series: [
  //     {
  //       type: 'gauge',
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ['50%', '70%'],
  //       radius: '94%',
  //       min: 0,
  //       max: 1,
  //       splitNumber: 8,
  //       axisLine: {
  //         lineStyle: {
  //           width: 52,
  //           color: [
  //             [0.25, '#029046'],
  //             [0.5, '#f5f073'],
  //             [0.75, '#029046'],
  //             [1, '#f5f073']
  //           ],
            
  //         }
  //       },
  //       pointer: {
  //         type:'line',
          
  //          itemStyle: {
  //           color: '#029046'
  //         },
  //         length: '76%',
          
          
  //       },
  //       axisTick: {
  //         show:false,
  //         length: 12,
  //         lineStyle: {
  //           color: 'auto',
  //           width: 2
  //         }
  //       },
  //       splitLine: {
  //         show:false,
  //         length: 20,
  //         lineStyle: {
  //           color: 'auto',
  //           width: 5
  //         }
  //       },
  //       axisLabel: {
  //         color: '#464646',
  //         fontSize: 12,
  //         position:'inside',
  //         distance: -10,
          
  //         rotate: 'tangential',
  //         formatter: function (value) {
  //           if (value === 0.875) {
  //             return 'Quarter 4';
  //           } else if (value === 0.625) {
  //             return 'Quarter 3';
  //           } else if (value === 0.375) {
  //             return 'Quarter 2';
  //           } else if (value === 0.125) {
  //             return 'Quarter 1';
  //           }
  //           return '';
  //         }
  //       },
  //       title: {
  //         offsetCenter: [0, '10%'],
  //         fontSize: 10
  //       },
  //       detail: {
          
  //         fontSize: 40,
  //         show:false,
  //         offsetCenter: [0, '-35%'],
  //         valueAnimation: true,
  //         formatter: function (value) {
  //           return Math.round(value * 100) + '';
  //         },
  //         color: 'inherit'
  //       },
  //       data: [
  //         {
  //           value: 0.7,
  //           name: 'Turnover Time'
  //         }
  //       ]
  //     },
      
  //    {
  //       type: 'gauge',
  //       startAngle: 180,
  //       endAngle: 0,
  //       center: ['50%', '70%'],
  //       radius: '72%',
  //       min: 0,
  //       max: 1,
  //       splitNumber: 8,
  //       axisLine: {
  //         lineStyle: {
  //           width: 11,
  //           color: [
  //             [0.25, '#1b5741'],
  //             [0.5, '#9a9a5d'],
  //             [0.75, '#1b5741'],
  //             [1, '#9a9a5d']
  //           ],
            
  //         }
  //       },
  //       pointer: {
  //         show:false, 
  //         length: '66%'
          
  //       },
  //       axisTick: {
  //         show:false,
  //         length: 12,
  //         lineStyle: {
  //           color: 'auto',
  //           width: 2
  //         }
  //       },
  //       splitLine: {
  //         show:false,
  //         length: 20,
  //         lineStyle: {
  //           color: 'auto',
  //           width: 5
  //         }
  //       },
  //       axisLabel: {
  //         show:false,
  //         color: '#464646',
  //         fontSize: 10,
  //         position:'inside',
  //         distance: -10,
          
  //         rotate: 'tangential',
          
  //       },
  //       title: {
  //         offsetCenter: [0, '10%'],
  //         fontSize: 10
  //       },
  //       detail: {
          
  //         fontSize: 40,
  //         show:false,
  //         offsetCenter: [0, '-35%'],
  //         valueAnimation: true,
  //         formatter: function (value) {
  //           return Math.round(value * 100) + '';
  //         },
  //         color: 'inherit'
  //       },
  //       data: [
  //         {
            
  //           value: 0.3,
  //           name: ''
  //         }
  //       ]
  //     }
  //   ]
  // };
  // 
  const meter = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '70%'],
        radius: '96%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 57,
            color: [
              [0.25, '#029046'],
              [0.5, '#F5F073'],
              [0.75, '#029046'],
              [1, '#f5f073']
            ],
            
          }
        },
        pointer: {
          show:false,
          index:10,
          type:'line',
          
           itemStyle: {
            color: 'white'
          },
          length: '100%',
          
          
        },
        axisTick: {
          show:false,
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          show:false,
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 14,
          position:'inside',
          distance: 0,
          
          rotate: 'tangential',
          formatter: function (value) {
            if (value === 0.875) {
              return 'Quarter 4';
            } else if (value === 0.625) {
              return 'Quarter 3';
            } else if (value === 0.375) {
              return 'Quarter 2';
            } else if (value === 0.125) {
              return 'Quarter 1';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '10%'],
          fontSize: 10
        },
        detail: {
          
          fontSize: 40,
          show:false,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '';
          },
          color: 'white'
        },
        data: [
          {
            value: 0.9,
            name: '\n\nTurnover Time \n 35',
            title: {
              fontWeight: "normal",
              fontSize:'15',
              color: "#fff" 
            }
          },
         
        ],
        
      },
      
     {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '70%'],
        radius: '72%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.25, '#112E23'],
              [0.5, '#9a9a5d'],
              [0.75, '#1b5741'],
              [1, '#9a9a5d']
            ],
            
          }
        },
        pointer: {
          show:true, 
          type:'line',
           icon: 'path://M 0 0 L 4 12 L -4 12 Z',
          width: 10,
           itemStyle: {
            color: '#029046'
          },
          length: '117%'
          
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 24,
          itemStyle: {
            borderWidth: 0,
            color: '#029046'
          }
        },
        axisTick: {
          show:false,
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          show:false,
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          show:false,
          color: '#464646',
          fontSize: 10,
          position:'inside',
          distance: -10,
          
          rotate: 'tangential',
          
        },
        title: {
          offsetCenter: [0, '10%'],
          fontSize: 10
        },
        detail: {
          
          fontSize: 40,
          show:false,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 100) + '';
          },
          color: 'inherit'
        },
        data: [
          {
            
            value: 0.3,
            name: ''
          }
        ]
      }
    ]
  };
  
  /******** New Meter Chart ******* */
  
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Layout pageTitle="Summary">
        <div className={myinter.className}>
          <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
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
                href={"/inventory/drilldown"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>
          <div className="px-[40px] xl:px-[2.083vw] bg-white dark:bg-[#0F1013]  xl:mt-[3.125vw] mt-[50px]">
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
                            // value={selectedCity}
                            // onChange={e => onClickNavigate(e)}
                            // options={Backlog}
                            value={selectedmetric}
                            onChange={(e) => {
                              setSelectedmetric(e.value)
                            }}
                            options={Backlog}
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
                  <div className="geomap-popup border border-[#1B1D20] rounded-[10px] p-3 xl:p-[0.833vw] xl:w-[17.583vw] flex flex-col items-center gap-3">
                    <div className="text-[#FFFFFF] text-xs xl:text-[0.929vw] font-medium -tracking-[0.28px] text-center leading-5">
                     <p className="text-start"> CAABU - Cluster Wise {">"} Ageing 90<br></br> Days</p>
                    </div>
                    <div className="w-[250px] h-[200px]">
                      <ReactEcharts
                        option={ClusterWiseAgeing}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>

                    <div className="w-full">
                      <div className="grid grid-cols-3 gap-3 xl:gap-[0.625vw]">
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#029046] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Saudi Arabia
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#F5F073] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Rome
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#4FB155] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Qatar
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#C8C846] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Kuwait
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Kenya
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#CDCB90] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            FWN Africa
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            Egypt
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
                        </div>
                        {/*col*/}
                        {/*col*/}
                        <div className="flex flex-col items-center gap-y-1">
                          <div className="bg-[#A9A771] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                          <div className="text-[#FFFFFF] font-normal text-[10px]">
                            East Africa
                          </div>
                          <div className="text-[#F9F7F4] font-semibold text-xs">
                            $2.2M
                          </div>
                          <div className="text-[#767A87] font-normal text-xs space-x-1">
                            <i className="red-tsg-up-rounded-arrow"></i>
                            <span>+2%</span>
                          </div>
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
                      <p>Total Inventory Value ({">"}90 Days)</p>
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
                  <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border border-[#CAE7CC] dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                    <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                      <p>Business Unit Wise</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                    <p>Provisional Value ({">"}90 Days)</p>
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
                    <p>Grand Total ({">"}90 Days)</p>
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
                    <p>Brand Wise Ageing</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                    <p> Grand Total ({">"}90 Days)</p>
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
                      <p>Brand</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Grand Total ({">"}90 Days)</p>
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
                      <p>Category</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Grand Total ({">"}90 Days)</p>
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
                      <p>Division</p>
                    </div>
                    <div className="dark:text-[#777C81] text-[#667085] text-[10px] xl:text-[0.521vw] font-light">
                      <p>Grand Total ({">"}90 Days)</p>
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
                      <p>Grand Total ({">"}90 Days)</p>
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
                      <p>Grand Total ({">"}90 Days)</p>
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
                      <p>Total Inventory Value ({">"}90 Days)</p>
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
                    title={activeIndex === 0 ? "BU Cluster in US$" : activeIndex === 1 ?
                    "BU - Total Inventory & Provisional Value" : activeIndex === 2 ? "BU - B2B and Stock" : activeIndex === 3 ? "BU - B2B and Stock-Quarterly" : null}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <Tabs>
                          <div className="echartTabs">
                            <TabList>
                            <Tab onClick={() => setActiveIndex(0)}>Cluster</Tab>
                              <Tab onClick={() => setActiveIndex(1)}>Total Inventory</Tab>
                              <Tab onClick={() => setActiveIndex(2)}>B2B and Stock</Tab>
                              <Tab onClick={() => setActiveIndex(3)}>B2B and Stock - Quarterly</Tab>
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
                    title={"Average Inventory Turnover Time - in Days"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                      <div className="relative">
                        <div className="flex items-center justify-end select-box">
                          <div className="relative cust-select2 cust-select2-gauge">
                            <label
                              htmlFor="username"
                              className="absolute z-10 text-xs xl:text-[0.600vw] font-light text-[#888888] dark:text-[#CACED1] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                            >
                              Financial Year
                            </label>
                            <Dropdown
                              value={selectedCity}
                              onChange={(e) => setSelectedCity(e.value)}
                              options={Keyfacts}
                              optionLabel="name"
                              placeholder="2023-2024"
                              className="w-[180px]"
                            />
                          </div>
                        </div>
                        <div className="relative" id="echartWrap">
                          <ReactEcharts
                            option={meter}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0">
                          <div className="flex items-center space-x-2">
                            <div className="bg-[rgba(255,255,255,0.10)] border-l-[2px] border-[#029046] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10)] py-[4px] px-[10px]">
                              <div className="text-[12px] xl:text-[0.625vw] dark:text-[#CACED1] text-[#667085]">1st Quarter <br /> (Apr-Jun)</div>
                              <div className="text-[12px] xl:text-[0.625vw] font-semibold dark:text-white text-[#101828]">60 Days</div>
                            </div>
                            <div className="bg-[rgba(255,255,255,0.10)] border-l-[2px] border-[#F5F073] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10)] py-[4px] px-[10px]">
                              <div className="text-[12px] xl:text-[0.625vw] dark:text-[#CACED1] text-[#667085]">2nd Quarter <br /> (Jul-Sep)</div>
                              <div className="text-[12px] xl:text-[0.625vw] font-semibold dark:text-white text-[#101828]">64 Days</div>
                            </div>
                            <div className="bg-[rgba(255,255,255,0.10)] border-l-[2px] border-[#4FB155] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10)] py-[4px] px-[10px]">
                              <div className="text-[12px] xl:text-[0.625vw] dark:text-[#CACED1] text-[#667085]">3rd Quarter <br /> (Oct-Dec)</div>
                              <div className="text-[12px] xl:text-[0.625vw] font-semibold dark:text-white text-[#101828]">61 Days</div>
                            </div>
                            <div className="bg-[rgba(255,255,255,0.10)] border-l-[2px] border-[#C8C846] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.10)] py-[4px] px-[10px]">
                              <div className="text-[12px] xl:text-[0.625vw] dark:text-[#CACED1] text-[#667085]">4th Quarter <br /> (Jan-Mar)</div>
                              <div className="text-[12px] xl:text-[0.625vw] font-semibold dark:text-white text-[#101828]">62 Days</div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white dark:border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                  <ChartWrapper
                    title={"Business Unit wise Ageing"}
                    subtitle={">90 Days Total-valuse in US$"}
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
