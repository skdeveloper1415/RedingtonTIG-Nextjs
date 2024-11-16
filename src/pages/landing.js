import React, { useState, useEffect } from 'react';
import Image from "next/image";
import LandingLayout from '../components/layoutLanding/layout';
import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "next-themes";
import { Dropdown } from 'primereact/dropdown';
import Link from "next/link";
import "aos/dist/aos.css";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import { fetchBacklogDashboad_Value} from "@/redux/slice/backlog";
import { toMillion,toMillionRounded } from '../utils/CurrencyUTIL';


export default function Landing() {

  const dispatch = useDispatch()
  const AppliedFilters = useSelector(state => state.global.AppliedFilters) 
  const Trigger = useSelector(state => state.global.Trigger) 
  const BacklogDashboad_Value = useSelector(state => state.backlog.BacklogDashboad_Value);

  console.log("BacklogDashboad_Value",BacklogDashboad_Value)


  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // let userEmailId = sessionStorage.getItem("userEmailId")
    const body = {
      "elasticQueryName": "",
      "filters":AppliedFilters||[] ,
      "dynamicColumns": [], 
      "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
      "userEmail": "Test.PBI@redingtongroup.com"
    };
    handleChangefilter(body, "Test.PBI@redingtongroup.com")
  }, [Trigger]);

  const handleChangefilter = (body, userEmailId) => {
    dispatch(fetchBacklogDashboad_Value(body))
  }

  const Keyfacts = [
    { name: '2023-2024', code: '2023-2024' },
    { name: '2022-2023', code: '2022-2023' },
    { name: '2022-2023', code: '2021-2022' },
    { name: '2021-2022', code: '2020-2021' },
  ]
  const settings = {
    tooltip:{},
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    draggable: true,
    touchMove: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const ByBooking = {
    tooltip: {
      trigger: 'axis',
    },
    legend: { show: false },
    grid: {
      left: '0%',
      right: '3%',
      bottom: '0%',
      top: '0%',
      height: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value', splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      data: ['']
    },
    color: ['#07A55D', '#8CCE47', '#E8D033', '#F27C1E', '#F55A16', '#FD1505'],
    series: [
      {
        name: '1',
        type: 'bar',
        barWidth: 20,
        itemStyle: { borderRadius: [10, 0, 0, 10] },
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [40]
      },
      {
        name: '2',
        type: 'bar',
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [10]
      },
      {
        name: '3',
        type: 'bar',
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [15]
      },
      {
        name: '4',
        type: 'bar',
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [20]
      },
      {
        name: '5',
        type: 'bar',
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [10]
      },
      {
        name: '6',
        type: 'bar',
        itemStyle: { borderRadius: [0, 10, 10, 0] },
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10 },
        data: [5]
      }
    ]
  };
  const SalesvsTarget = {
    legend: {
      show: true,
      top: 10,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff'
      },
    },
    tooltip:{},
    grid: {
      left: '4%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(255,255,255,0.14)' },
      },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#fff'},
      data: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    series: [
      {
        name: 'Last Year',
        type: 'line',
        symbolSize: 10,
        smooth: true,
        stack: 'a',
        lineStyle: { color: 'transparent' },
        itemStyle: { color: '#672582', borderWidth: 2, borderColor: '#fff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#B3886B'
            },
            {
              offset: 1,
              color: 'rgba(1, 72, 35, 0.10)'
            }
          ])
        },
        zlevel:1,
        data: [820, 932, 937, 934, 1490, 1430],
      },
      {
        name: 'Avg. Sales',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 10,
        sampling: 'average',
        lineStyle: { color: 'transparent'},
        itemStyle: { color: '#F5E023', borderWidth: 2, borderColor: '#fff',},
        zlevel: 2,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#B3886B'
            },
            {
              offset: 1,
              color: 'rgba(1, 72, 35, 0.10)'
            }
          ])
        },
        data:[60,255,220,330,140,250]
      },
      {
        name: 'Current Year',
        type: 'line',
        smooth: true,
        stack: 'a',
        symbol: 'circle',
        symbolSize: 16,
        sampling: 'average',
        lineStyle: { color: 'transparent' },
        itemStyle: { color: '#F58220', borderWidth: 2, borderColor: '#fff',},
        areaStyle: { color:'transparent'},
        label:{show:'true',position:'top',color:'#fff'},
        data:[220,355,320,430,100,450]
      },
    ]
  };
  const Inventory = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    
    legend: {
      show: true,
      top: 10,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff'
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          color: '#fff'
        },
        data: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: { show: false },
        splitLine: { show: false },
      }
    ],
    series: [
      {
        name: 'Current Year',
        type: 'bar',
        stack: 'Ad',
        itemStyle: {
          color: '#72C271'
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 232, 201, 234, 290, 230, 210, 200]
      },
      {
        name: 'Last Year',
        type: 'bar',
        label:{
          show:true,
          position:'top',
          color:'white'
        },
        stack: 'Ad',
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#E0CC18' },
            { offset: 1, color: '#3F684E' }
          ])
        },

        emphasis: {
          focus: 'series'
        },
        data: [250, 232, 291, 254, 290, 330, 410, 400]
      },
    ]
  };
  var barcolor = new echarts.graphic.LinearGradient(
    0, 0, 1, 1,
    [
      { offset: 0, color: '#3C664D' },
      { offset: 1, color: '#ABAD79' }
    ]
  );
  const Category = {
    tooltip: {
      trigger: 'axis',
    },
    legend: { show: false },
    grid: {
      left: '-4%',
      right: '3%',
      bottom: '0%',
      top: '0%',
      height: '13%',
      containLabel: true
    },
    xAxis: {
      type: 'value', splitLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      data: ['']
    },
    color: barcolor,
    series: [
      {
        name: '1',
        type: 'bar',
        barWidth: 20,
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        stack: 'total',
        label: { show: true, color: '#fff', fontSize: 10, formatter: '{c}%' },
        data: [40]
      },
    ]
  };
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <LandingLayout pageTitle="Landing">
      <div className="landing-bg">
        <div className="px-20 " >
          <div className="pt-[64px] xl:pt-[3.333vw]" data-aos="fade-up-left" data-aos-duration="400">
            <Image src="/assets/images/whitelogo.png" width={240} height={64} alt="" />
          </div>
          <div className="flex-row grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 max-sm:grid-cols-1 gap-5" data-aos="fade-up" data-aos-duration="500">
            <div className="col-span-4 lg:col-span-4 max-sm:col-span-1 sm:col-span-1 md:col-span-1">
              <div className="mt-[36px] xl:mt-[1.875vw] w-[800px] lg:w-[800px] max-sm:w-auto sm:w-auto md:w-[600px]">
                <h4><span className="">Digital TSG</span>- Dashboard Application</h4>
                <p className="mt-3 text-[#F9FAFB] font-[300] text-[16px] xl:text-[0.833vw] leading-6">Enabling the Sales team of TSG to have access to Inventory, Backlog, Booking details towards achieving targets and plan for the betterment.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[36px] xl:mt-[1.875vw]" data-aos="fade-up-left" data-aos-duration="600">
            <div className="flex items-center pb-4 max-sm:flex-col">
              <span className="p-input-icon-right cust-search-input relative mb-5 w-auto">
                <input type="text" id="" className="focus:outline-none focus:ring-1 focus:ring-green-900" placeholder="Search by Backlogs, Inventory, etc" />
                <i className='red-tsg-search text-md text-[#fff]'></i>
              </span>
            </div>
            <div className="flex items-center pb-4 max-sm:flex-col select-box">
              <div className="">
                <div>
                  <div className='relative cust-select2 cust-selectlight'>
                    <label htmlFor="username" className='absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#fff] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]'>Financial Year</label>
                    <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={Keyfacts} optionLabel="name"
                      placeholder="2023-2024" className="w-[178px] text-white cust-select2 scrollbar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Slider {...settings} className="" data-aos="zoom-in-up" data-aos-duration="900">
              <Link href={'/backlog/summary'}>
                <div className="slide-box">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-[20px] xl:text-[1.042vw] heading-style">Backlog Dashboard</div>
                    <i className="red-tsg-three-dots-box text-white cursor-pointer"></i>
                  </div>
                  <div className="min-h-5">
                    <div className="text-white text-[14px] xl:text-[0.729vw] font-normal mt-5">Highest Weekly Booking - Week {BacklogDashboad_Value[0]?.WEEK_DAY}</div>
                    <div className="text-white text-[32px] xl:text-[1.667vw] font-semibold mt-2">{toMillion(BacklogDashboad_Value[0]?.OPENPOVALUE)}</div>
                    {/* <div className="text-white text-[32px] xl:text-[1.667vw] font-semibold mt-2">500 <span className="text-[14px] xl:text-[0.729vw] font-normal ml-2">LP Var 2% <i className="red-tsg-up-right-arrow text-[8px]"></i></span></div> */}
                  </div>
                  <div className='min-h-chart'>
                    <div>
                      <div className="text-white font-medium text-[14px] xl:text-[0.833vw]">Top BU - By Booking</div>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">IBU</div>
                          <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">2,253k</div>
                        </div>
                        <div>
                          <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Last Year</div>
                          <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">221 <span className="text-[#EA4242] text-[12px] xl:text-[0.625vw]"><i className="red-tsg-down-left-arrow text-[8px] mr-1"></i>-1%</span></div>
                        </div>
                      </div>
                      <div style={{ height: 50 }}>
                        <ReactEcharts option={ByBooking} />
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-white font-medium text-[14px] xl:text-[0.833vw]">Top Cluster - By Booking</div>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">KSA</div>
                          <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">1,357k</div>
                        </div>
                        <div>
                          <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Last Year</div>
                          <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">221 <span className="text-[#EA4242] text-[12px] xl:text-[0.625vw]"><i className="red-tsg-down-left-arrow text-[8px] mr-1"></i>-1%</span></div>
                        </div>
                      </div>
                      <div style={{ height: 50 }}>
                        <ReactEcharts option={ByBooking} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href={'/target/summary'}>
                <div className="slide-box">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-[20px] xl:text-[1.042vw] heading-style">Sales vs Target</div>
                    <i className="red-tsg-three-dots-box text-white cursor-pointer"></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Top BU </div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">$2,526K</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">IBU <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span> </div>
                      </div>
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Top Cluster</div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">$1,226K</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">KSA <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span></div>
                      </div>
                    </div>
                    <div className='min-h-chart'>
                      <ReactEcharts option={SalesvsTarget} />
                    </div>
                  </div>
                </div>
              </Link>
              <Link href={'/inventory/summary'}>
                <div className="slide-box">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-[20px] xl:text-[1.042vw] heading-style">Inventory</div>
                    <i className="red-tsg-three-dots-box text-white cursor-pointer"></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Highest Inventory Level</div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">5,72,77,287 <span className='ml-1 text-[10px] font-normal'>LP var 2%</span> <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span></div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">IBU <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span> </div>
                      </div>
                      {/* <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Top Cluster</div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">$1,226K</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">KSA <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span></div>
                      </div> */}
                    </div>
                    <div className='min-h-chart'>
                      <ReactEcharts option={Inventory} />
                    </div>
                  </div>
                </div>
              </Link>
              <Link href={'/software/summary'}>
                <div className="slide-box">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-[20px] xl:text-[1.042vw] heading-style">Software And Professional Services</div>
                    <i className="red-tsg-three-dots-box text-white cursor-pointer"></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">IBU </div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">781,578%</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">2% to LY <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span> </div>
                      </div>
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Cluster</div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">41,147%</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">5.2% to LY <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-5 min-h-chart mb-2">
                      <div className="col-span-1">
                        <div className="text-[12px] xl:text-[0.625vw] text-white font-medium">Top Quantity By Category</div>
                        <div style={{ height: 40 }} className="mt-4">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">ORACLE</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">CISCO</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">DELL SERVER</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">REDHAT</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">TABLEU</div>
                          <ReactEcharts option={Category} />
                        </div>
                      </div>
                      <div className="col-span-1">
                        <div className="text-[12px] xl:text-[0.625vw] text-white font-medium">Top Value By Category</div>
                        <div style={{ height: 40 }} className="mt-4">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">$280.5K - ORACLE</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">636.5k - CISCO</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">435.5k - DELL SERVER</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">235.3k - REDHAT</div>
                          <ReactEcharts option={Category} />
                        </div>
                        <div style={{ height: 40 }} className="mt-2">
                          <div className="text-[11px] xl:text-[0.573vw] leading-none">125.2k - TABLEU</div>
                          <ReactEcharts option={Category} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href={'/workingcapital/summary'}>
                <div className="slide-box">
                  <div className="flex justify-between items-center">
                    <div className="text-white text-[20px] xl:text-[1.042vw] heading-style">Working Capital</div>
                    <i className="red-tsg-three-dots-box text-white cursor-pointer"></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mt-5">
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Top BU </div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">$2,526K</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">IBU <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span> </div>
                      </div>
                      <div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">Top Cluster</div>
                        <div className="text-white text-[20px] xl:text-[1.042vw] font-medium">$1,226K</div>
                        <div className="text-white text-[14px] xl:text-[0.729vw] leading-6">KSA <span><i className="red-tsg-up-right-arrow ml-1 text-[8px] text-[#72B850]"></i></span></div>
                      </div>
                    </div>
                    <div className='min-h-chart'>
                      <ReactEcharts option={SalesvsTarget} />
                    </div>
                  </div>
                </div>
              </Link>
            </Slider>
          </div>
          <div className="flex justify-center py-5 text-white">
            <div>
              <div className="flex justify-center my-2"><i className="red-tsg-mouse text-[55px] xl:text-[2.886vw]"></i></div>
              <div className="text-[14px] xl:text-[0.729vw] leading-[1.094vw] opacity-50 text-center">Find here all the information you need. You’ll find below the key <br /> analytical areas, chose one based on your needs.</div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}