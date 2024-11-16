import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from "primereact/sidebar";
import { useTheme } from "next-themes";

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Index() {

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [Salesfilter, setSalesfilter] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sales] = useState([
    { Metrics: 'Total Sales', TotalValue: '12,19,12,897', LPVar: '2%' },
    { Metrics: 'Acheivement', TotalValue: '23,67,123', LPVar: '2%' },
    { Metrics: 'Stretch Amount', TotalValue: '34,23,567', LPVar: '2%' },
    { Metrics: 'LTG (Target)', TotalValue: '12,56,456', LPVar: '2%' },
    { Metrics: 'LTG (Target+Stretch)', TotalValue: '47,67,678', LPVar: '2%' },
    { Metrics: 'Commit', TotalValue: '41,23,234', LPVar: '4%' },
  ]);
  const saleschart = {
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
      width:'100%',
      height:'300vw',
      containLabel: true,
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
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisTick: { show: false },
      name: 'Quarter',
      nameGap: 40,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
      splitLine: { show: false ,
        color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',},
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 40,
      interval: 10,
      axisLine: {
        show: true,
        lineStyle: {
          // type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: '{value}M'
      },
      name: 'Values in $',
      nameGap: 40,
      nameLocation: 'middle',
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "Current Year",
        data: [18, 38, 16, 30],
        type: "bar",
        color: "#01813F",
        barGap: 0,
        barWidth: 50,
      },
      {
        name: "Last Year",
        data: [27, 22, 28, 24],
        type: "bar",
        color: "#91A845",
        barWidth: 50,
      },
    ],
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
      width:'100%',
      height:'370vw',
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
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
      axisLine: {
        show: true,
        lineStyle: {
          // type: "dashed",
          color: "#2B2F31",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: { show: false },
      name: 'Quarter',
      nameGap: 40,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 2.5,
      interval: 0.5,
      name: 'Values in $',
      nameGap: 40,
      nameLocation: 'middle',
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 11,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
      axisLine: {
        show: true,
        lineStyle: {color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6', },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: '{value}M'
      },
    },
    series: [
      {
        name: "BU 1",
        stack: 'vendor',
        data: [0.1, 0.3, 0.1, 0.7, 0.6, 0.7],
        type: "bar",
        color: currentTheme=='dark'?"#01833f":"#256D85",
        barGap: 0,
        barWidth: 60,
      },
      {
        name: "BU 2",
        stack: 'vendor',
        data: [0.3, 0.2, 0.1, 0.2, 0.2, 0.2],
        type: "bar",
        color: currentTheme=='dark'?"#91A845":"#2794B9",
        barWidth: 50,
      },
      {
        name: "BU 3",
        stack: 'vendor',
        data: [0.1, 0.8, 0.6, 0.2, 0.3, 0.6],
        type: "bar",
        color: currentTheme=='dark'?"#548c90":"#FFA600",
        barWidth: 50,
      },
      {
        name: "BU 4",
        stack: 'vendor',
        data: [0.1, 0.3, 0.2, 0.4, 0.2, 0.4],
        type: "bar",
        color: currentTheme == 'dark'? "#fdf435":"#E6DE32",
     barWidth: 50,
      },
    ],
  };

  return (
    <>
      <Layout pageTitle="Summary">
        <div className={myinter.className}>
          <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
            <div>
              <Link
                href={"/target/summary"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
              >
                Summary View
              </Link>
            </div>
            <div>
              <Link
                href={"/target/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Detailed View
              </Link>
            </div>
            <div>
              <Link
                href={"/target/drilldown"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>
          <div className="rightCopt mr-10 xl:mt-[3.125vw] mt-[50px]">
                  <TimelineComponent />
                </div>
          <div className="px-[40px] xl:px-[2.083vw]">
            <div className="mt-[24px] xl:mt-[1.250vw] mb-[20px]">
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-[24px] xl:gap-[1.250vw]">
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] shadow-[0px_2px_5px_rgba(0,0,0,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={'Metrics'}
                    maximizeIcon={true} ExportIcon={true}
                    data={
                      <>
                        <div className="relative ">
                          <DataTable value={sales} onClick={() => setSalesfilter(true)} className='cursor-pointer custpaginator custIcons custmBtnTable custTable rounded-md' style={{ minWidth: '30rem' }} >
                            <Column field="Metrics" headerClassName='header-filter-r' header="Metrics" style={{ minWidth: '8rem' }} />
                            <Column field="TotalValue" headerClassName='header-filter-r' header="Total Value ($)" style={{ minWidth: '8rem' }} />
                            <Column field="LPVar" headerClassName='header-filter-r' header="LP Var" style={{ minWidth: '8rem' }} />
                          </DataTable>
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] rounded-lg boxshadow2 xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={'Sales - Current Year vs Last Year Period'}
                    maximizeIcon={true} ExportIcon={true}
                    data={
                      <>
                        <div className="flex justify-end custmDrop">
                          <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] daek:text-[#888888] text-[#888888]">
                                View By
                              </span>
                            </div>
                            <div className="col">
                              <select
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 dark:bg-[#27272A] dark:text-[#C2C3C3] text-xs placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                              >
                                <option>Quarter</option>
                                <option>Year</option>
                                <option>Month</option>
                                <option>Week</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <ReactEcharts
                            option={saleschart}
                            opts={{ renderer: 'svg' }}
                            style={{ width: "100%", height: "400px" }}
                          />
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={'By Vendors'}
                    maximizeIcon={true} ExportIcon={true}
                    data={
                      <>
                        <div className="relative w-full">
                          <ReactEcharts
                            option={vendors}
                            opts={{ renderer: 'svg' }}
                            style={{ width: "100%", height: '500px'}}
                          />
                        </div>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={'Cross Dimensional'}
                    maximizeIcon={true} ExportIcon={true}
                    data={
                      <>
                        <div className="flex justify-end custmDrop gap-4 xl:gap-[1.667vw]">
                          <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] dark:text-[#888888] text-[#888888]">
                                Vertical Dimension
                              </span>
                            </div>
                            <div className="col">
                              <select
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 dark:bg-[#27272A] dark:text-[#C2C3C3] text-xs placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                              >
                                <option>BU</option>
                                <option>BU 1</option>
                                <option>BU 2</option>
                                <option>BU 3</option>
                                <option>BU 4</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] dark:text-[#888888] text-[#888888]">
                                Horizontal Dimension
                              </span>
                            </div>
                            <div className="col">
                              <select
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 dark:bg-[#27272A] dark:text-[#C2C3C3] text-xs placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                              >
                                <option>Cluster</option>
                                <option>Top 1 Vendors</option>
                                <option>Top 4 Vendors</option>
                                <option>Top 3 Vendors</option>
                                <option>Top 2 Vendors</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="color-tbl mt-[20px] xl:mt-[1.042vw]">
                          <table className="border border-[#E4E7EC]">
                            <caption className="caption-top text-[0.938vw] text-black dark:text-[#CACED1]">Cluster</caption>
                            <tbody>
                              <tr id="header">
                                <th className="table-header">BU </th>
                                <th className="table-header">Egypt</th>
                                <th className="table-header">Kenya</th>
                                <th className="table-header">Qatar</th>
                                <th className="table-header">Rome</th>
                                <th className="table-header">UAE</th>
                                <th className="table-header">Saudi</th>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#1A1B20]">BU 1</td>
                                <td id="td4">40000</td>
                                <td id="td4">50999</td>
                                <td id="td4">50999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#0F1013]">BU 2</td>
                                <td id="td4">50999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td4">109999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#1A1B20]">BU 3</td>
                                <td id="td3">30999</td>
                                <td id="td4">109999</td>
                                <td id="td4">109999</td>
                                <td id="td5">509999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#0F1013]">BU 4</td>
                                <td id="td4">109999</td>
                                <td id="td5">509999</td>
                                <td id="td4">509999</td>
                                <td id="td4">509999</td>
                                <td id="td4">509999</td>
                                <td id="td3">30999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#1A1B20]">BU 5</td>
                                <td id="td5">509999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td4">109999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#0F1013]">BU 6</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td4">109999</td>
                                <td id="td4">109999</td>
                                <td id="td4">109999</td>
                                <td id="td5">509999</td>
                              </tr>
                              <tr>
                                <td className="dark:bg-[#1A1B20]">BU 7</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td5">509999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                                <td id="td3">30999</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    }
                  />
                </div>
              </div>

              <Sidebar
                visible={Salesfilter}
                blockScroll={true}
                position="right"
                onHide={() => setSalesfilter(false)}
                className="timeline-filter-sidebar" style={{ minWidth: '50vw' }}
              >
                <div className="xl:p-[1.250vw] p-5 relative h-full">
                  <div className="flex justify-between items-center">
                    <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw]">
                      Total Sales
                    </div>
                    <div
                      className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                      onClick={() => setSalesfilter(false)}
                    >
                      <i className="red-tsg-close"></i>
                    </div>
                  </div>
                  <div className="mt-[24px] xl:mt-[1.250vw] pb-[20px]">
                    <div className="grid grid-cols-1 gap-[24px] xl:gap-[1.250vw]">
                      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                        <ChartWrapper
                          title={'Sales - Current Year vs Last Year Period'}
                          maximizeIcon={true} ExportIcon={true}
                          data={
                            <>
                              <div className="flex justify-end custmDrop">
                                <div className="flex items-center gap-2">
                                  <div className="col">
                                    <span className="text-[14px] xl:text-[0.729vw] dark:text-[#888888] text-[#888888]">
                                      View By
                                    </span>
                                  </div>
                                  <div className="col">
                                    <select
                                      id="Sort"
                                      name="Sort"
                                      className="block w-[135px] py-1 px-1 text-xs dark:bg-[#27272A] dark:text-[#C2C3C3]  placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                                    >
                                      <option>Gender</option>
                                      <option>Quarter</option>
                                      <option>Month</option>
                                      <option>Week</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="relative w-full">
                                <ReactEcharts
                                  option={saleschart}
                                  opts={{ renderer: 'svg' }}
                                  style={{ width: "100%", height: "400px" }}
                                />
                              </div>
                            </>
                          }
                        />
                      </div>
                      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                        <ChartWrapper
                          title={'By Vendors'}
                          maximizeIcon={true} ExportIcon={true}
                          data={
                            <>
                              <div className="relative w-full">
                                <ReactEcharts
                                  option={vendors}
                                  opts={{ renderer: 'svg' }}
                                  style={{ width: "100%", height: "500px" }}
                                />
                              </div>
                            </>
                          }
                        />
                      </div>
                      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                        <ChartWrapper
                          title={'Cross Dimensional'}
                          maximizeIcon={true} ExportIcon={true}
                          data={
                            <>
                              <div className="flex justify-end custmDrop gap-4 xl:gap-[1.667vw]">
                                <div className="flex items-center gap-2">
                                  <div className="col">
                                    <span className="text-[14px] xl:text-[0.729vw] text-[#888888]">
                                      Vertical Dimension
                                    </span>
                                  </div>
                                  <div className="col">
                                    <select
                                      id="Sort"
                                      name="Sort"
                                      className="block w-[135px] py-1 px-1 dark:bg-[#27272A] dark:text-[#C2C3C3] text-xs placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                                    >
                                      <option>BU</option>
                                      <option>BU 1</option>
                                      <option>BU 2</option>
                                      <option>BU 3</option>
                                      <option>BU 4</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex items-center  gap-2">
                                  <div className="col">
                                    <span className="text-[14px] xl:text-[0.729vw] text-[#888888]">
                                      Horizontal Dimension
                                    </span>
                                  </div>
                                  <div className="col">
                                    <select
                                      id="Sort"
                                      name="Sort"
                                      className="block w-[135px] py-1 px-1 dark:bg-[#27272A] dark:text-[#C2C3C3] text-black text-xs placeholder-[#C2C3C3] rounded-[4px] border dark:border-[#344054] border-[#E6E6E6] focus:outline-none"
                                    >
                                      <option>Cluster</option>
                                      <option>Top 1 Vendors</option>
                                      <option>Top 4 Vendors</option>
                                      <option>Top 3 Vendors</option>
                                      <option>Top 2 Vendors</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="color-tbl mt-[20px] xl:mt-[1.042vw]">
                                <table className="">
                                  <tbody>
                                    <tr id="header">
                                      <th className="table-header">BU </th>
                                      <th className="table-header">Egypt</th>
                                      <th className="table-header">Kenya</th>
                                      <th className="table-header">Qatar</th>
                                      <th className="table-header">Rome</th>
                                      <th className="table-header">UAE</th>
                                      <th className="table-header">Saudi</th>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#1A1B20]">BU 1</td>
                                      <td id="td4">40000</td>
                                      <td id="td4">50999</td>
                                      <td id="td4">50999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#0F1013]">BU 2</td>
                                      <td id="td4">50999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td4">109999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#1A1B20]">BU 3</td>
                                      <td id="td3">30999</td>
                                      <td id="td4">109999</td>
                                      <td id="td4">109999</td>
                                      <td id="td5">509999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#0F1013]">BU 4</td>
                                      <td id="td4">109999</td>
                                      <td id="td5">509999</td>
                                      <td id="td4">509999</td>
                                      <td id="td4">509999</td>
                                      <td id="td4">509999</td>
                                      <td id="td3">30999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#1A1B20]">BU 5</td>
                                      <td id="td5">509999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td4">109999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#0F1013]">BU 6</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td4">109999</td>
                                      <td id="td4">109999</td>
                                      <td id="td4">109999</td>
                                      <td id="td5">509999</td>
                                    </tr>
                                    <tr>
                                      <td className="bg-[#1A1B20]">BU 7</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td5">509999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                      <td id="td3">30999</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Sidebar>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}