import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import Layout from "../../../components/layout/layout";
import { Inter } from "@next/font/google";
import TimelineComponent from "@/components/TimelineComponent/filter";
import { Sidebar } from "primereact/sidebar";
import ReactEcharts from "echarts-for-react";
import { graphic } from "echarts";
import { useTheme } from "next-themes";
import { Knob } from "primereact/knob";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Index() {
  const [value, setValue] = useState(0);
  const [EditiInventoryProjection, setEditiInventoryProjection] =
    useState(false);

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  /*--checkbox--*/
  const [ingredients, setIngredients] = useState([]);
  const [chartpopup, setchartpopup] = useState(false);

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };
  /*--checkbox--*/


  /*--Table Start--*/
  const [sales] = useState([
    { product: "BU1", lastYearProfit: 0.02, thisYearProfit: 208000.0 },
    { product: "BU1", lastYearProfit: 423132, thisYearProfit: 312122 },
    { product: "BU1", lastYearProfit: 12321, thisYearProfit: 8500 },
    { product: "BU1", lastYearProfit: 12321, thisYearProfit: 8500 },
  ]);

  const [Ratiofilter, setRatiofilter] = useState(false);

  const lastYearProfitBodyTemplate = (rowData) => {
    return `${formatCurrency(rowData.lastYearProfit)}`;
  };

  const thisYearProfitBodyTemplate = (rowData) => {
    return `${formatCurrency(rowData.thisYearProfit)}`;
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {});
  };

  const lastYearTotal = () => {
    let total = 0;

    for (let sale of sales) {
      total += sale.lastYearProfit;
    }

    return formatCurrency(total);
  };

  const thisYearTotal = () => {
    let total = 0;

    for (let sale of sales) {
      total += sale.thisYearProfit;
    }

    return formatCurrency(total);
  };

  const BuBodyTemplate = (rowData) => {
    return (
      <div>
        <Link
          href={""}
          className="flex items-center space-x-2"
        >
          <span>DIO</span>
        </Link>
      </div>
    );
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer="Over all" />
        <Column footer={lastYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
        <Column footer={thisYearTotal} />
      </Row>
    </ColumnGroup>
  );
  /*--Table end--*/
  /*--prime-select--*/
  const [selectedCity, setSelectedCity] = useState(null);
  const Backlog = [
    { name: "All", code: "NY" },
    { name: "Backlog", code: "RM" },
    { name: "Inventory", code: "LDN" },
    { name: "Backlog & Inventory", code: "IST" },
    { name: "Bookinv", code: "PRS" },
  ];
  const Inventory = [
    { name: "All", code: "NY" },
    { name: "DIO", code: "DI" },
    { name: "DSO", code: "DSO" },
    { name: "DVRO", code: "DV" },
    { name: "GWC", code: "GWC" },
  ];
  const Brand = [
    { name: "All", code: "NY" },
    { name: "DIO", code: "RM" },
    { name: "DSO", code: "LDN" },
    { name: "DVRO", code: "IST" },
    { name: "DPO", code: "PRS" },
    { name: "GWC", code: "PRS" },
    { name: "DNWC", code: "PRS" },
  ];
  /*--prime-select--*/

  /*****************popup Chart **********************/

  /*--LabelbrandLinechart--*/
  const ratiopopup = {
    legend: {
      icon: "roundRect",
      show: true,
      bottom: 0,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#fff",
        fontSize: 11
      },
    },
    grid: {
      top: '10%',
      left: '5%',
      right: '3%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        name: 'Ratios',
        nameGap: 30,
        nameLocation: "middle",
        nameTextStyle: {
          fontSize: 11,
          color: "#CACED1",
        },
        data: ['DIO', 'DSO', 'DVRO', 'DPO', 'GWC', 'DNWC'],
        axisTick: { show: false },
        position: 'bottom',
        axisLine: {
          show: true,
          lineStyle: { color: "rgba(224,224,224,0.30)" }
        },
        axisLabel: {
          color: currentTheme == 'dark' ? '#CACED1' : '#fff',
          width: 90, //fixed number of pixels
          overflow: 'break', // or 'break' to continue in a new line
          interval: 0,
          fontSize: 11,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(224,224,224,0.30)"
          }
        }
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 10,
        interval: 1,
        axisLine: {
          show: true,
          lineStyle: { color: "rgba(224,224,224,0.30)" }
        },
        splitLine: { show: false },
        axisLabel: {
          color: currentTheme == 'dark' ? '#CACED1' : '#fff',
          fontSize: 11,
          formatter: "{value}M"
        },
        name: 'Values in $',
        nameGap: 40,
        nameLocation: "middle",
        nameRotate: 90,
        nameTextStyle: {
          fontSize: 11,
          color: "#CACED1",
        },
      }
    ],
    series: [
      {
        name: 'April - Previous Month',
        type: 'line',
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#256D85',
          color: '#fff',
        },
        emphasis: { focus: 'series' },
        lineStyle: {
          color: "#256D85",
          type: "dashed"
        },
        data: [2.4, 4.4, 7.5, 5, 5.8, 4, 4],
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(37,109,133,0.10)'
            },
            {
              offset: 1,
              color: 'rgba(37,109,133,0.00)'
            }
          ])
        },
      },
      {
        name: 'May - Current Month',
        type: 'line',
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(2, 166, 102, 0.1)'
            },
            {
              offset: 1,
              color: 'rgb(2, 166, 102, 0.1)'
            }
          ])
        },
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#FFA600',
          color: '#fff',
        },
        emphasis: { focus: 'series' },
        lineStyle: {
          color: "#FFA600",
          type: "dashed"
        },
        data: [4.3, 6.2, 8.2, 4.3, 7, 6, 6],
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255,166,0,0.10)'
            },
            {
              offset: 1,
              color: 'rgba(255,166,0,0.00)'
            }
          ])
        },
      },
      {
        name: 'June - Projections - Increase or Decrease (%)',
        type: 'line',
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#2794B9',
          color: '#fff',
        },
        emphasis: { focus: 'series' },
        lineStyle: {
          color: "#2794B9",
          type: "dashed"
        },
        data: [2.4, 4, 5, 6.1, 4.9, 3.2, 3.2],
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(39,148,185,0.10)'
            },
            {
              offset: 1,
              color: 'rgba(39,148,185,0.00)'
            }
          ])
        },
      },
      {
        name: 'June - Projections - Increase or Decrease (By Numbers)',
        type: 'line',
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#46A2F6',
          color: '#fff',
        },
        emphasis: { focus: 'series' },
        lineStyle: {
          color: "#46A2F6",
          type: "dashed"
        },
        data: [1.8, 3, 4, 2.1, 2.5, 2.5, 2.5],
        areaStyle: {
          opacity: 0.8,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(70,162,246,0.10)'
            },
            {
              offset: 1,
              color: 'rgba(70,162,246,0.00)'
            }
          ])
        },
      },
    ]
  };
  /*--LabelbrandLinechart--*/
  /*****************popup Chart end **********************/
  const [ratiotable] = useState([
    { Ratios: 'DIO', April: '230.00', May: '230.00', June1:'230.00', June2:'230.00' },
    { Ratios: 'DSO', April: '240.00', May: '240.00', June1:'240.00', June2:'240.00' },
    { Ratios: 'DVRO', April: '225.00', May: '225.00', June1:'225.00', June2:'225.00' },
    { Ratios: 'DPO', April: '234.00', May: '234.00', June1:'234.00', June2:'234.00' },
    { Ratios: 'GWC', April: '254.00', May: '254.00', June1:'254.00', June2:'254.00' },
    { Ratios: 'DNWC', April: '231.00', May: '231.00', June1:'231.00', June2:'231.00' },
  ]);

  return (
    <Layout pageTitle="Detailed View">
      <div className={myinter.className}>
      <div className="flex bg-[#E5F3EC] dark:bg-[#15171B] w-full">
          
          <div>
              <Link
                href={"/workingcapital/summary"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Summary View
              </Link>
            </div>
            <div>
              <Link
                href={"/workingcapital/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block "
              >
                Detailed View
              </Link>
            </div>
            <div>
              <Link
                href={"/workingcapital/whatifanalysis"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
              >
                What If Analysis
              </Link>
            </div>
            <div>
              <Link
                href={"/workingcapital/drilldown"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block "
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>
        <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 pb-10">
          {/*--Filter Seaction*/}
          <div className="flex flex-wrap justify-between items-center">
            {/*left col*/}
            <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg">
              <div className="xl:p-[0.861vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
                <i className="red-tsg-three-line"></i>
              </div>
              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="text-white absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    Inventory
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="All"
                    className="w-[178px]"
                  />
                </div>
              </div>
              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    Receivables
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="Brand"
                    className="w-[178px]"
                  />
                </div>
              </div>

              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    Funding
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="Brand"
                    className="w-[178px]"
                  />
                </div>
              </div>
              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    VAT
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="Brand"
                    className="w-[178px]"
                  />
                </div>
              </div>
              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    Working Capital
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="Brand"
                    className="w-[178px]"
                  />
                </div>
              </div>
              <div>
                <div className="relative cust-select">
                  <label
                    htmlFor="username"
                    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                  >
                    DIO
                  </label>
                  <Dropdown
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.value)}
                    options={Inventory}
                    optionLabel="name"
                    placeholder="Brand"
                    className="w-[178px]"
                  />
                </div>
              </div>
            </div>
            {/*left col*/}

            {/*right col*/}
            <div className="rightCopt">
                  <TimelineComponent />
                </div>
            {/*right col*/}
          </div>

          {/* Sidebar */}

          <Sidebar
            visible={EditiInventoryProjection}
            position="right"
            onHide={() => setEditiInventoryProjection(false)}
            className="inventoryProjection-sidebar"
          >
            <div className="xl:p-[1.250vw] p-5 relative h-full">
              <div className="flex justify-between items-center">
                <div className="text-[#344054] dark:text-[#F2F4F7]  font-semibold text-2xl xl:text-[1.458vw]">
                  Inventory Projections
                </div>
                <div
                  className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                  onClick={() => setEditiInventoryProjection(false)}
                >
                  <i className="red-tsg-close"></i>
                </div>
              </div>
              <div className="xl:mt-[1.250vw] mt-5 text-[#C8CBD0] font-medium text-sm">
                Overview
              </div>
              <div className="xl:mt-[1.250vw] mt-5 border border-[#E4E7EC] dark:border-[#333]  rounded-lg">
                <div className="grid grid-cols-2 dark:bg-[#171618] text-sm  xl:p-[0.833vw] dark:border-[#333] text-center mb-5 rounded-t-lg">
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    April - Previous Month
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>28,08,753.95</span>
                    </div>
                  </div>
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    May - Current Month
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>21,80,875.40</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 dark:bg-[#171618] text-sm  xl:p-[0.833vw] dark:border-[#333] text-center  mb-5 ">
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    June - Projections - Increase Or Decrease (Percentage)
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>1%</span>
                    </div>
                  </div>
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    June Final Projections (By Percentage)
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>4989629.50</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 dark:bg-[#171618] text-sm  xl:p-[0.833vw] dark:border-[#333] text-center rounded-b-lg">
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    June - Projections - Increase Or Decrease (By Numbers)
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>208000</span>
                    </div>
                  </div>
                  <div className=" dark:text-[#F2F4F7] text-md font-medium ">
                    June Final Projections (By Numbers)
                    <div className="xl:mt-[0.550vw] text-lg font-semibold dark:text-[#898A92]">
                      <span>2180875.50</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" dark:text-[#C8CBD0] text-md font-medium mb-3 mt-5">
                What If (Increase or Decrease by Percentage) - Slider (+ or -)
              </div>

              <div>
                <div className="dark:bg-[#171618] p-3 rounded-md">
                  <div className="grid grid-cols-12 gap-5">
                    <Link
                      icon="pi pi-minus" href=''
                      onClick={() => setValue(value - 1)}
                      disabled={value === 0}
                    >
                      <i className="red-tsg-minus-box"></i>
                    </Link>
                    <div className="col-span-7">
                      {" "}
                      <ProgressBar value={value}></ProgressBar>
                    </div>
                    <Link href=''
                      onClick={() => setValue(value + 1)}
                      disabled={value === 100}
                    ><i className="red-tsg-linechart"></i></Link>
                    <div className="col-span-3 ">
                      <div className=" dark:text-[#898A92] text-xs font-light mb-2">
                        By%
                      </div>
                      <div className="dark:bg-[#303136] rounded-md border border-[#E6E6E61A] px-3 py-2">
                        {value}%
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* <div className="lg:absolute lg:w-11/12 lg:bottom-5">
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div
                    className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                    onClick={() => setEditiInventoryProjection(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                    onClick={() => setEditiInventoryProjection(false)}
                  >
                    
                    Save Changes
                  </div>
                </div>
              </div> */}
            </div>
          </Sidebar>

          {/* end sidebar */}

          {/*--Filter Seaction*/}
          <div className="">
            <div className="bg-white dark:bg-[#14161A] border border-[#C6CBD2] dark:border-[#14161A] rounded-tl-lg rounded-tr-lg px-5 xl:px-[1.250vw] py-2 flex justify-between items-center">
              <div className="text-[#101828] dark:text-[#F2F4F7] font-normal text-base xl:text-[0.938vw]">
                Ratios (These Numbers Change Based On Above Mentioned Numbers)
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer mr-6 xl:mr-[0.781vw] xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]">
                  <i className="red-tsg-download"></i>
                  <span>Export</span>
                </div>
                <div>
                  <Link
                    href={""}
                    className="text-[#344054] dark:text-[#4FB155] font-medium text-sm xl:text-[0.929vw] rounded-lg xl:px-4 px-[0.300vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[#4FB155] inline-block "
                  >
                    <i className="red-tsg-box-four relative top-0.5"></i>
                  </Link>
                </div>
                <div>
                  <Link
                    href={""}
                    onClick={() => setchartpopup(true)}
                    className="text-[#344054] dark:text-[#98A2B3] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[0.300vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block "
                  >
                    <i className="red-tsg-linechart"></i>
                  </Link>
                </div>

                <div>
                  <Link
                    href={"/workingcapital/whatifanalysis"}
                    className="text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block "
                  >
                    Projections
                  </Link>
                </div>
                <div>
                  <Link
                    href={"/workingcapital/whatifanalysis/ratio"}
                    className="text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green"
                  >
                    Ratio
                  </Link>
                </div>
              </div>
            </div>
            <div className="border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css">
              <div className="tableheader2">
                <DataTable
                  value={sales}

                  scrollable

                  rows={4}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                  className="custpaginator custIcons custmBtnTable custTable"
                >
                  <Column
                    field="product"
                    headerClassName="header-filter"
                    header="Ratios"
                    body={BuBodyTemplate}
                  />
                  <Column
                    field="lastYearSale"
                    sortable
                    header="April-Previous Month"
                    body={lastYearProfitBodyTemplate}
                  />
                  <Column
                    field="thisYearSale"
                    sortable
                    header="May - Current Month"
                    body={thisYearProfitBodyTemplate}
                  />
                  <Column
                    field="lastYearProfit"
                    sortable
                    header="June - Projections - Increase Or Decrease (Percentage)"
                    body={lastYearProfitBodyTemplate}
                  />
                  <Column
                    field="thisYearProfit"
                    sortable
                    header="June - Projections - Increase Or Decrease (Percentage)"
                    body={thisYearProfitBodyTemplate}
                    className="p-column-header-content1"
                  />

                </DataTable>
              </div>
            </div>
          </div>
        </div>

        {/*--Chart Popup--*/}
        <Sidebar
          visible={chartpopup}
          position="right"
          onHide={() => setchartpopup(false)}
          className="chartpopup"
          style={{ width: "52.083vw" }}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        >
          <div className="xl:p-[1.250vw] p-5 relative h-full">
            <div className="flex justify-between items-center">
              <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw]">
              Ratios
              </div>
              <div
                className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                onClick={() => setchartpopup(false)}
              >
                <i className="red-tsg-close"></i>
              </div>
            </div>
            <div className="xl:mt-[0.250vw] mt-2 xl:py-[0.833vw] py-3">
              <div className="text-[#344054] dark:text-[#C8CBD0] font-medium text-2xl xl:text-[0.858vw]">
              Ratios - April 2023 (Previous Month), May 2023 (Current Month) and June 2023 ( Projected)
              </div>
              <ReactEcharts
                option={ratiopopup}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
            <div className="xl:mt-[0.250vw] mt-2 xl:py-[0.833vw] py-3">
              <div className="text-[#344054] dark:text-[#C8CBD0] font-medium text-2xl xl:text-[0.858vw]">
              </div>
              <div className="relative">
                <DataTable value={ratiotable} scrollable onClick={() => setRatiofilter(true)} className='cursor-pointer custpaginator custIcons custmBtnTable custTable' style={{ minWidth: '50vw' }} >
                  <Column field="Ratios" sortable header="Ratios" style={{ minWidth: '5rem' }} />
                  <Column field="April" sortable header="April - Previous Month" style={{ minWidth: '11rem' }} />
                  <Column field="May" sortable header="May - Current Month" style={{ minWidth: '10rem' }} />
                  <Column field="June1" sortable header="June - Projections - Increase Or Decrease (Percentage)" style={{ minWidth: '15rem' }} />
                  <Column field="June2" sortable header="June - Projections - Increase Or Decrease (Percentage)" style={{ minWidth: '15rem' }} />
                </DataTable>
              </div>
            </div>
          </div>
        </Sidebar>
        {/*--Chart Popup End--*/}
      </div>
    </Layout>
  );
}
