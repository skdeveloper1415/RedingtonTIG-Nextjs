import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { Dropdown } from "primereact/dropdown";
import { useTheme } from 'next-themes';
import { useDispatch, useSelector } from "react-redux";
import { fetchby_vendors,fetchBY_BU, fetchBY_CLUSTER,fetchBACKLOG_TOPTILE } from "@/redux/slice/backlog";
import { toMillion,toMillionRounded } from '../../../utils/CurrencyUTIL';
import { StringSorter,pivotFilterArray } from '../../../utils';
import LoaderContainer from "@/components/LoaderContainer";
import { fetchBacklog_Summary_Filter } from "@/redux/slice/filter";

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
  const by_vendorsdata = useSelector(state => state.backlog.by_vendors);
  const by_cluster = useSelector(state => state.backlog.BY_CLUSTER); 
  const BY_BU = useSelector(state => state.backlog.BY_BU);
  let BACKLOG_TOPTILE = useSelector(state => state.backlog.BACKLOG_TOPTILE);

  const by_vendorsdataloading = useSelector(state => state.backlog.by_vendorsloading);
  const by_clusterloading = useSelector(state => state.backlog.BY_CLUSTERloading); 
  const BY_BUloading = useSelector(state => state.backlog.BY_BUloading);
  const BACKLOG_TOPTILEloading = useSelector(state => state.backlog.BACKLOG_TOPTILEloading);
  const Dropdown_Data = useSelector(state => state.filter.Backlog_Summary_Filter);
  const[selectedBU,setSelectedBU]=useState({name:"All",code:"All"})
  const[selectedBrand,setSelectedBrand]=useState({name:"All",code:"All"})
  const[BUOptions,setBUOptions]=useState([])
  const[BrandOptions,setBrandOptions]=useState([])
  


  const [topbottom, settopbottom] = useState("DESC");
  const [topbottomcluster, settopbottomcluster] = useState("DESC");
  const [selectedmetric, setSelectedmetric] = useState("Backlog");
  const [selectedmetricfilter, setSelectedmetricfilter] = useState(`SUM("OPENPOVALUE")`);
const filterFunc=()=>{
  let FiltersArray = [];

        if (selectedBrand.code != "All") {
          FiltersArray.push({
                "columnName": "BUSINESSBRAND",
                "columnValue": selectedBrand.code,
                "excludeKeyword": false
            })
        }
        if (selectedBU.code != "All") {
          FiltersArray.push({
                "columnName": "MISBUSINESSUNIT",
                "columnValue": selectedBU.code,
                "excludeKeyword": false
            })
        }
        return FiltersArray
}
const dropdownFilter=filterFunc()

  useEffect(()=>{
    setBUOptions(pivotFilterArray(Dropdown_Data,"BU"))
    setBrandOptions(pivotFilterArray(Dropdown_Data,"Brand"))
   },[Dropdown_Data])
 useEffect(()=>{
  dispatch(fetchBacklog_Summary_Filter({
    "elasticQueryName": "",
    "filters":[] ,
    "dynamicColumns": [], 
    "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
    "userEmail": "Test.PBI@redingtongroup.com"
  }))
 },[])
  useEffect(() => {
    // let userEmailId = sessionStorage.getItem("userEmailId")
    const body = {
      "elasticQueryName": "",
      "filters":dropdownFilter.concat(AppliedFilters)||[] ,
      "dynamicColumns": [], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    };
    handleChangefilter(body, "Test.PBI@redingtongroup.com")
  }, [selectedmetricfilter,topbottom,topbottomcluster,Trigger,selectedBrand,selectedBU]);

  const handleChangefilter = (body, userEmailId) => {
    dispatch(fetchby_vendors({
      "elasticQueryName": "",
      "filters": dropdownFilter.concat(AppliedFilters)||[],
      "dynamicColumns": [{columnName:"#{selectmetric}",columnValue:selectedmetricfilter},{columnName:"#{sort_order}",columnValue:topbottom}], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    }))
    dispatch(fetchBY_BU({
      "elasticQueryName": "",
      "filters": dropdownFilter.concat(AppliedFilters)||[],
      "dynamicColumns": [{columnName:"#{selectmetric}",columnValue:selectedmetricfilter}], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    }))
    dispatch(fetchBACKLOG_TOPTILE(body))
    dispatch(fetchBY_CLUSTER({
      "elasticQueryName": "",
      "filters": dropdownFilter.concat(AppliedFilters)||[],
      "dynamicColumns": [{columnName:"#{selectmetric}",columnValue:selectedmetricfilter},{columnName:"#{sort_order}",columnValue:topbottomcluster}], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    }))
  }

 
  function camelCase(str) {
    // Using replace method with regEx
    return str?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace(/\s+/g, '');
}

 

  const vendors = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params) {
        var tooltipContent = params[0].marker +' '+ params[0].name + ' : ' +  toMillion(params[0].value) + '<br>';
        return tooltipContent;
      },
    },
    grid: {
      top: topbottom == "DESC"?"10%":"13%",
      right: "0%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: by_vendorsdata?.map(itr => camelCase(itr.BUSINESSBRAND)),
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
      name: 'Vendor',
      nameGap: 40,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "value",
      // min: 0,
      // max: 'dataMax',
      // interval: 100,
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
        // formatter: "{value}K",
        formatter: function (value) {
          return toMillionRounded(value); // Convert to millions and display with one decimal place and 'M' for million
        }
      },
      name: 'Values in $',
      nameGap: topbottom == "DESC"?50:40,
      nameLocation: 'middle',
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "",
        data: by_vendorsdata?.map(itr => itr.Value),
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
          symbolSize: [70, 40],
          symbolOffset: [0, -35],
          itemStyle: {
            color: "#002B15"
          },
          label: {
            show: true,
            // formatter: "Jan \n ${c}K",
            formatter: function (params){
              return "Jan"+"\n"+toMillion(params?.value);
            },
            lineHeight: 15,
            align: "center",
          },
        },
      },
    ],
  };

  const cluster = {
    tooltip: {
      formatter: function(params) {
        console.log('params: ', params);
        var tooltipContent = params?.marker +' '+ params?.name + ' : ' +  toMillion(params?.value) + '<br>';
        return tooltipContent;
      },
    },
    grid: {
      top: "0%",
      right: "7%",
      bottom: "15%",
      left: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: 0,
      // max: 1200000,
      // interval: 200000,
      axisLabel: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
        formatter: function (value) {
          return toMillionRounded(value); // Convert to millions and display with one decimal place and 'M' for million
        }
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
      name: 'Values in $',
      nameGap: 40,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    yAxis: {
      type: "category",
      data:by_cluster?.map(item=> camelCase(item.Cluster)),
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
      name: 'Cluster',
      nameGap: topbottomcluster == "DESC"?85:75,
      nameLocation: 'middle',
      nameRotate: 90,
      nameTextStyle: {
        fontSize: 12,
        color: currentTheme == 'dark' ? '#CACED1' : '#222222',
      },
    },
    series: [
      {
        name: "",
        data:by_cluster?.map(item=>item.Value),
        type: "bar",
        stack: "total",
        color: "#4FB155",
        barWidth: 32,
      },
    ],
  };

  let budata = BY_BU?.map((item => {
    return {
      name: item["BU"],
      value: item["Value"]
    }
  }))

  // const bu = {
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: (params) => {

  //       return `${params.seriesName}<br/>${params.marker}${params.name} ${toMillion(params.value)} `
  //     }
  //   },
  //   legend: {
  //     show:false,
  //     bottom: "0",
  //     left: "",
  //     itemWidth: 10,
  //     itemHeight: 10,
  //     textStyle: {
  //       color: "#667085",
  //     },
  //   },

  //   series: [
  //     {
  //       name: "By BU",
  //       type: "pie",
  //       radius: "70%",
  //       center: ["50%", "45%"],
  //       roseType: "area",
  //       color: ["#41733D", "#DFDC34", "#AAAC7A", "#B2D5A0", "#4FB155"],
  //       data: budata,
  //       label: {
  //         color: currentTheme == 'dark' ? '#CACED1' : '#222222',
  //         lineHeight: 20,
  //         padding: [-20, -20, -20, -20],
  //         // formatter: "{c}  \n {b}",
  //         formatter: (params) => {
  //           return params?.name +"\n"+toMillion(params?.value);
  //         },
  //       },
  //       itemStyle: {
  //         shadowBlur: 60,
  //         shadowColor: "rgba(65,115,61,0.8)",
  //       },
  //     },
  //   ],
  // };

  const bu = {
    tooltip: {
      show:true,
      trigger: 'item',
      formatter: (params) => {
        return `${params.seriesName}<br/>${params.marker}${params.name} ${toMillion(params.value)} `
      }
    },
    legend: {
      show:true,
      bottom: "0",
      left: "",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "#667085",
      },
    },

    series: [
      {
        name: 'By BU',
        type: 'pie',
        radius: '75%',
        bottom:'10%',
        color: ["#41733D", "#DFDC34", "#AAAC7A", "#B2D5A0", "#4FB155"],
        data: budata,
        label: {
          show:false,
          color: currentTheme == 'dark' ? '#CACED1' : '#222222',
          lineHeight: 20,
          padding: [-20, -20, -20, -20],
          // formatter: "{c}  \n {b}",
          formatter: (params) => {
            return params?.name +"\n"+toMillion(params?.value);
          },
        },
      },
    ],
  };

  const images = ["backlog-icon", "inventory-icon", "backlogInventory", "booking" ];


  BACKLOG_TOPTILE = BACKLOG_TOPTILE.map((object, index) => ({
    ...object,
    img: images[index],
  }))

  const handleTopTileFilterClick = (tile) => {
    if(tile?.METRIC_NAME == "Backlog"){
      setSelectedmetric("Backlog")
      setSelectedmetricfilter(`SUM("OPENPOVALUE")`)
    }
    if(tile?.METRIC_NAME == "Inventory"){
      setSelectedmetric("Inventory")
      setSelectedmetricfilter(`sum("INVENTORYVALUE")`)
    }
    if(tile?.METRIC_NAME == "Backlog&Inventory"){
      setSelectedmetric("Backlog&Inventory")
      setSelectedmetricfilter(`SUM("OPENPOVALUE"+"INVENTORYVALUE")`)
    }
    if(tile?.METRIC_NAME == "Booking"){
      setSelectedmetric("Booking")
      setSelectedmetricfilter(`SUM("OPENPOVALUE")`)
    }
    
}

const Top_tile_report = (props) => {  
  return (
    <>
    <div onClick={
      () => props.clickerFunc(props.clicker)
    }>
      {
          props?.METRIC_NAME == selectedmetric?<div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw] active">
          <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold relative z-10">
            {props?.METRIC_NAME}
          </div>
          <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
            <div className="leading-none">
              <i className= {`${props?.img} active`}></i>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-[24px] xl:text-[1.250vw] text-white leading-none">
              {toMillion(props?.Value)}
              </div>
              {/* <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                +2.5%
              </div> */}
            </div>
          </div>
          {/* <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
            <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
            Change from previous period in numbers
          </div> */}
        </div>
          :
          <div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw]">
                <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold relative z-10">
                  {props?.METRIC_NAME}
                </div>
                <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
                  <div className="leading-none">
                    <i className= {`${props?.img} active`}></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[24px] xl:text-[1.250vw] dark:text-white leading-none">
                    {toMillion(props?.Value)}
                    </div>
                    {/* <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                      <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                      +2.5%
                    </div> */}
                  </div>
                </div>
                {/* <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
                  <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
                  Change from previous period in numbers
                </div> */}
              </div>
      }
      </div>
      
    </>
  );
  
};

  return (
    <>
      <Layout pageTitle="Summary">
        <div className={myinter.className}>
          <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
                                                                                                                                       
            <div>
              <Link
                href={"/backlog/summary"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
              >
                Summary View
              </Link>
            </div>
            <div>
              <Link
                href={"/backlog/detailedview"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Detailed View
              </Link>
            </div>
            <div>
              <Link
                href={"/backlog/drilldown"}
                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
              >
                Drilldown Analysis
              </Link>
            </div>
          </div>
     <div className="px-[40px] xl:px-[2.083vw] xl:mt-[3.125vw] mt-[50px]">
            {/*--Filter Seaction*/}
            <div className="flex flex-wrap justify-between items-center">
              {/*left col*/}
              <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg">
                <div className="xl:p-[0.821vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
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
                      value={selectedBU}
                      onChange={(e) => setSelectedBU(e.value)}
                      options={[{name:"All",code:"All"}].concat(StringSorter(BUOptions))}
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
                      Brand
                    </label>
                    <Dropdown
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.value)}
                      options={[{name:"All",code:"All"}].concat(StringSorter(BrandOptions))}
                      optionLabel="name"
                      placeholder="All"
                      className="w-[178px]"
                    />
                  </div>
                </div>
                {/* <div>
                  <div className="relative cust-select">
                    <label
                      htmlFor="username"
                      className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                    >
                      Brand
                    </label>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={Brand}
                      optionLabel="name"
                      placeholder="All"
                      className="w-[178px]"
                    />
                  </div>
                </div> */}
              </div>
              {/*left col*/}

              {/*right col*/}
              <div>
                <TimelineComponent />
              </div>
              {/*right col*/}
            </div>
            {/*--Filter Seaction*/}
            <LoaderContainer loading={BACKLOG_TOPTILEloading}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[24px] xl:gap-[1.250vw]">
              {
                BACKLOG_TOPTILE && BACKLOG_TOPTILE?.map(itr => {
                  return(
                    <Top_tile_report clicker={itr} clickerFunc={handleTopTileFilterClick} METRIC_NAME={itr?.METRIC_NAME} 
                    Value={itr?.Value}  img ={itr?.img}
                    />
                  )
                })
              }
              {/* <div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw] active">
                <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold relative z-10">
                  Backlog
                </div>
                <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
                  <div className="leading-none">
                    <i className="backlog-icon active"></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[24px] xl:text-[1.250vw] text-white leading-none">
                      $87,702,961
                    </div>
                    <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                      <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                      +2.5%
                    </div>
                  </div>
                </div>
                <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
                  <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
                  Change from previous period in numbers
                </div>
              </div> */}
              {/* <div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw]">
                <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold">
                  Inventory
                </div>
                <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
                  <div className="leading-none">
                    <i className="inventory-icon active"></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[24px] xl:text-[1.250vw] dark:text-white leading-none">
                      $87,702,961
                    </div>
                    <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                      <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                      +2.5%
                    </div>
                  </div>
                </div>
                <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
                  <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
                  Change from previous period in numbers
                </div>
              </div>
              <div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw]">
                <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold">
                  Backlog & Inventory
                </div>
                <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
                  <div className="leading-none">
                    <i className="backlogInventory active"></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[24px] xl:text-[1.250vw] dark:text-white leading-none">
                      $87,702,961
                    </div>
                    <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                      <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                      +2.5%
                    </div>
                  </div>
                </div>
                <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
                  <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
                  Change from previous period in numbers
                </div>
              </div>
              <div className="boxBlock py-[16px] xl:py-[0.833vw] px-[24px] xl:px-[1.250vw]">
                <div className="dark:text-[#7F7F89] colorWhite text-[18px] xl:text-[0.938vw] font-semibold">
                  Booking
                </div>
                <div className="flex items-center my-[30px] xl:my-[1.563vw] pl-[49px] xl:pl-[2.552vw] relative">
                  <div className="leading-none">
                    <i className="booking active"></i>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[24px] xl:text-[1.250vw] dark:text-white leading-none">
                      $87,702,961
                    </div>
                    <div className="text-[16px] xl:text-[0.833vw] text-[#649A4A] noColor">
                      <i className="red-tsg-up-line-arrow inline-flex justify-center items-center text-[12px] w-[20px] h-[20px] rounded-full bg-[rgba(121,180,94,0.10)] colorWhite bgColorGreen mr-2"></i>{" "}
                      +2.5%
                    </div>
                  </div>
                </div>
                <div className="text-[#777C81] colorGreen text-[14px] xl:text-[0.729vw]">
                  <i className="mr-[8px] red-tsg-info-circle leading-none"></i>{" "}
                  Change from previous period in numbers
                </div>
              </div> */}
            </div>
            </LoaderContainer>
            <div className="mt-[24px] xl:mt-[1.250vw]">
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[24px] xl:gap-[1.250vw]">
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white boxshadow2 border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={"By Brands"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="flex justify-end custmDrop gap-3 xl:py-[0.314vw]" style={{position: 'relative',  bottom: '4rem',right: '5rem'}}>
                          {/* <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] text-[#888888]">
                                View By
                              </span>
                            </div>
                            <div className="col">
                              <select
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 bg-white dark:bg-[#27272A] text-[#555555] dark:text-[#C2C3C3] text-sm placeholder-[#C2C3C3] rounded-[4px] border border-[#E6E6E6] dark:border-[#344054] focus:outline-none"
                              >
                                <option>Top 5 Vendors</option>
                                <option>Top 1 Vendors</option>
                                <option>Top 4 Vendors</option>
                                <option>Top 3 Vendors</option>
                                <option>Top 2 Vendors</option>
                              </select>
                            </div>
                          </div> */}
                          <div><Link href={''} className= {topbottom == 'DESC'? 'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green':'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'}  onClick={e =>settopbottom("DESC")}>Top 5</Link></div>
                          <div><Link href={''} className= {topbottom == 'ASC'? 'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green':'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'}  onClick={e =>settopbottom("ASC")} >Bottom 5</Link></div>
                        </div>
                        <LoaderContainer loading={by_vendorsdataloading}>
                        <div className="relative" id="echartWrap">                         
                          <ReactEcharts
                            option={vendors}
                            style={{ width: "100%", height: "100%" }}
                          />                        
                        </div>
                        </LoaderContainer>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white boxshadow2 border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={"By BU"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                      <LoaderContainer loading={BY_BUloading}>
                        <div className="relative" id="echartWrap">                        
                          <ReactEcharts
                            option={bu}
                            style={{ width: "100%", height: "100%" }}
                          />                        
                        </div>
                        </LoaderContainer>
                      </>
                    }
                  />
                </div>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white boxshadow2 border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw]">
                  <ChartWrapper
                    title={"By Cluster"}
                    maximizeIcon={true}
                    ExportIcon={true}
                    data={
                      <>
                        <div className="flex justify-end custmDrop gap-3 xl:py-[0.314vw]"  style={{position: 'relative', bottom: '4rem',right: '5rem'}}>
                          {/* <div className="flex items-center gap-2">
                            <div className="col">
                              <span className="text-[14px] xl:text-[0.729vw] text-[#888888]">
                                View By
                              </span>
                            </div>
                            <div className="col">
                              <select
                                id="Sort"
                                name="Sort"
                                className="block w-[135px] py-1 px-1 bg-white dark:bg-[#27272A] text-[#555555] dark:text-[#C2C3C3] text-sm placeholder-[#C2C3C3] rounded-[4px] border border-[#E6E6E6] dark:border-[#344054] focus:outline-none"
                              >
                                <option>Top 5 Vendors</option>
                                <option>Top 1 Vendors</option>
                                <option>Top 4 Vendors</option>
                                <option>Top 3 Vendors</option>
                                <option>Top 2 Vendors</option>
                              </select>
                            </div>
                          </div> */}
                          <div><Link href={''} className= {topbottomcluster == 'DESC'? 'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green':'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'}  onClick={e =>settopbottomcluster("DESC")}>Top 5</Link></div>
                          <div><Link href={''} className= {topbottomcluster == 'ASC'? 'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green':'text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'}  onClick={e =>settopbottomcluster("ASC")} >Bottom 5</Link></div>
                        </div>
                        <LoaderContainer loading={by_clusterloading}>
                        <div className="relative" id="echartWrap">                        
                          <ReactEcharts
                            option={cluster}
                            style={{ width: "100%", height: "100%" }}
                          /> 
                        </div>
                        </LoaderContainer>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mt-[24px] xl:mt-[1.250vw] pb-[20px] custTabs">
              <Tabs>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white boxshadow2 border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] p-[10px]">
                  <div className="relative">
                    <div className="absolute right-0 top-[10px]">
                      <Link href={""}>
                        <i className="red-tsg-volume text-[#555555] text-[18px] xl:text-[0.938vw]"></i>
                      </Link>
                    </div>
                    <TabList>
                      <Tab>Key Insights</Tab>
                      {/* <Tab>Notes</Tab> */}
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
                    {/* <TabPanel>
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
                    </TabPanel> */}
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
