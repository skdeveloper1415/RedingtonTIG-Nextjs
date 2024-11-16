
import LandingLayout from '@/components/layoutLanding/layout';
import ReactEcharts from "echarts-for-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { DrillDownChart } from '@/components/charts/DrillDownChart';
import TimelineComponent from "@/components/TimelineComponent";
import Layout from '@/components/layout/layout';
import { Checkbox, Select } from '@mui/material';
import { Sidebar } from 'primereact/sidebar';


export default function Drilldown() {
    const [selectedMetric, setSelectedMetric] = useState(null);
    const Metric = [
        { name: 'Sales (mLiter)', code: 'NY' },
        { name: 'Brand', code: 'RM' },
        { name: 'Growth YoY (%)', code: 'LDN' },
        { name: 'CAGR %', code: 'IST' },
        // { name: 'GDP Growth %', code: 'PRS' },
        // { name: 'Population', code: 'PRS' },
        // { name: 'Unemployment', code: 'PRS' },
    ];
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    const style = {
        indicatorSeparator: styles => ({ ...styles, display: "none" }),
        dropdownIndicator: styles => ({ ...styles }),
        control: (base, provided) => ({
            ...base,
            border: "0",
            padding: "0",
            minHeight: "100%",
            fontWeight: "semibold",
            boxShadow: 'none',
            "&:hover": {
                borderColor: "red",
                color: "red"
            }
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: "0 !important",
        }),
        input: (provided, state) => ({
            ...provided,
            padding: "0",
            margin: "0",
        })
    };
/*--prime-select--*/
const [selectedCity, setSelectedCity] = useState(null);
const cities = [
    { name: 'All', code: 'NY' },
    { name: 'Brand', code: 'RM' },
    { name: 'vendor', code: 'LDN' },
    { name: 'BU', code: 'IST' },
    { name: 'Cluster', code: 'PRS' }
];
/*--prime-select--*/
  const [Timelinefilter, setTimelinefilter] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const onIngredientsChange = (e) => {
      let _ingredients = [...ingredients];

      if (e.checked)
          _ingredients.push(e.value);
      else
          _ingredients.splice(_ingredients.indexOf(e.value), 1);

      setIngredients(_ingredients);
  }
  /*--checkbox--*/

    return (
        <Layout pageTitle="Drilldown">
        <div>
        <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
        <div>
          <Link
            href={"/target/summary"}
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
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
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block  active-green-btn"
          >
            Drilldown Analysis
          </Link>
        </div>
      </div>
  
          <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 xl:mt-[3.125vw] mt-[50px]">
          <div className="rounded-lg xl:pt-[1.302vw] pt-5">
            <div className="flex justify-between items-center">
              {/*left col*/}
              <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-lg">
                <div className="xl:p-[0.861vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
                  <i className="red-tsg-three-line"></i>
                </div>
                <div>
                  <div className="relative cust-select">
                    <label
                      htmlFor="username"
                      className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                    >
                     All
                    </label>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="Target"
                      className="w-[178px]"
                    />
                  </div>
                </div>
                <div>
                  {/* <div className="relative cust-select">
                    <label
                      htmlFor="username"
                      className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                    >
                      Drill By
                    </label>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="Brand"
                      className="w-[178px]"
                    />
                  </div> */}
                </div>
              </div>
              {/*left col*/}
              {/*right col*/}
              <div>
                {/* <TimelineComponent /> */}
              </div>
              {/*right col*/}
            </div>
          </div>
  
            <div className="xl:py-[1.250vw] py-5">
              <div className="bg-white dark:bg-[#14161A] border border-[#C6CBD2] dark:border-[#14161A] rounded-tl-lg rounded-tr-lg ">
              <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 xl:gap-[1.563vw] gap-[15px] rounded-[8px] bg-white dark:bg-[rgba(9,10,11,0.50)]">
                      <div className="col-span-3 filter-section bg-[#F2F2F2] dark:bg-[#13131680] rounded-tl-[8px] rounded-tr-0">
                          <div className=" xl:p-[1.563vw] p-[20px] text-white">
                              <h6 className="dark:text-[#CACED1] text-[#363A44] text-[12px] xl:text-[0.625vw] font-medium leading-none">Choose Dimensions</h6>
                              <div className="xl:mt-[1.563vw] mt-[20px] dropdowns">
                                  <form action="">
                                      <div className="xl:mb-[1.563vw] mb-[20px] drilldown-select ">
                                          <label for="name" className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff] dropdowncust">
                                          Level 1</label>
                                          <Dropdown value={selectedMetric} onChange={(e) => setSelectedMetric(e.value)} options={Metric} optionLabel="name"
                                              placeholder="Brand" className="w-full xl:mt-[0.481vw] mt-[10px] text-[12px] " />
                                      </div>
                                      <div className="xl:mb-[1.563vw] mb-[20px] drilldown-select">
                                          <label for="name" className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium leading-none dark:text-[#ffff]">
                                          Level 2</label>
                                          <Dropdown value={selectedMetric} onChange={(e) => setSelectedMetric(e.value)} options={Metric} optionLabel="name"
                                              placeholder="Financial Year" className="w-full xl:mt-[0.481vw] mt-[10px] " />
                                      </div>
                                      <div className="xl:mb-[1.563vw] mb-[20px] drilldown-select">
                                          <label for="name" className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff]">
                                          Level 3</label>
                                          <Dropdown value={selectedMetric} onChange={(e) => setSelectedMetric(e.value)} options={Metric} optionLabel="name"
                                              placeholder="Month" className="w-full xl:mt-[0.481vw] mt-[10px] " />
                                      </div>
                                      <div className="xl:mb-[1.563vw] mb-[20px] drilldown-select">
                                          <label for="name" className="text-[#344054] text-[14px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff]">
                                          Level 4</label>
                                          <Dropdown value={selectedMetric} onChange={(e) => setSelectedMetric(e.value)} options={Metric} optionLabel="name"
                                              placeholder="Sales" className="w-full xl:mt-[0.481vw] mt-[10px] " />
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                      <div className="col-span-9 ">
                          {/* <div className="text-[#FFFFFF] text-sm xl:text-[0.938vw] font-medium  opacity-60  xl:mb-[0.563vw] mb-[20px] dark:text-[#363A44]">Drilldown Analysis </div> */}
                          <div className="drilldown xl:p-[1.563vw] p-[20px]">
                              <DrillDownChart />
                              <div className="drilldown-legend xl:p-[0.781vw] p-[15px] rounded-md max-w-md bg-[#F9F7F4] dark:bg-[#131316] relative top-[-100px]">
                                  <h6 className="text-[#363A44] text-[18px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff] dark:opacity-[0.699999988079071]">Applied Dimensions</h6>
                                  <div className="flex gap-[15px] xl:gap-[1vw] xl:mt-[0.535vw] mt-[10px] items-center">
                                      <div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.625vw] font-light leading-6 dark:text-[#4B5255]"> Level 1</div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff]"> BU</div>
                                      </div>
                                      <i className="pi pi-angle-right" style={{ color: '#4C525F99' }}></i>
                                      <div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.625vw] font-light leading-6 dark:text-[#363A44]"> Level 3</div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff]"> Brand</div>
                                      </div>
                                      <i className="pi pi-angle-right" style={{ color: '#4C525F99' }}></i>
                                      <div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.625vw] font-light leading-6 dark:text-[#363A44]"> Level 4</div>
                                          <div className="text-[#363A44] text-[18px] xl:text-[0.729vw] font-medium leading-none dark:text-[#fff]"> Cluster</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
  
            {/*--Timeline Filter--*/}
            <Sidebar
              visible={Timelinefilter}
              position="right"
              onHide={() => setTimelinefilter(false)}
              style={{ width: "40vw" }}
              className="timeline-filter-sidebar"
            >
              <div className="xl:p-[1.250vw] p-5">
                <div className="flex justify-between items-center">
                  <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]">
                    Timeline Filter
                  </div>
                  <div
                    className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer"
                    onClick={() => setTimelinefilter(false)}
                  >
                    <i className="red-tsg-close"></i>
                  </div>
                </div>
                <div className="xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3 border border-[#E4E7EC] dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[75vh]">
                  {/*checkbox Start*/}
                  <div className="font-medium xl:text-[0.729vw] text-xs">
                    Financial Year
                  </div>
                  <div className="mt-3 grid grid-cols-6 gap-4 text-[#344054] dark:text-[#667085] ">
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2023
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2022
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2021
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2020
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2019
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2018
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2017
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2016
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2015
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        inputId="ingredient1"
                        name="pizza"
                        value="Cheese"
                        onChange={onIngredientsChange}
                        checked={ingredients.includes("Cheese")}
                      />
                      <label
                        htmlFor="ingredient1"
                        className="ml-2 font-medium text-xs"
                      >
                        2014
                      </label>
                    </div>
                  </div>
                  {/*checkbox end*/}
  
                  {/*checkbox Start*/}
                  <div className="mt-5">
                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                      Select Quarter
                    </div>
                    <div className="mt-3 grid grid-cols-6 gap-4 text-[#344054] dark:text-[#667085]">
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          All
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Q1
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Q2
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Q3
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2  font-medium text-xs"
                        >
                          Q4
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*checkbox end*/}
                  {/*checkbox Start*/}
                  <div className="mt-5">
                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                      Select Month
                    </div>
                    <div className="mt-3 grid grid-cols-6 gap-4">
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          All
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Apr
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          May
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Jun
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Jul
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Aug
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Sep
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Oct
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Nov
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Dec
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Jan
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Feb
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Mar
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*checkbox end*/}
                  {/*checkbox Start*/}
                  <div className="mt-5">
                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                      Select Week
                    </div>
                    <div className="mt-3 grid grid-cols-6 gap-4">
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          All
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 9
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 10
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 10
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 12
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 29
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 30
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 31
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 32
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 45
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 46
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 47
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox
                          inputId="ingredient1"
                          name="pizza"
                          value="Cheese"
                          onChange={onIngredientsChange}
                          checked={ingredients.includes("Cheese")}
                        />
                        <label
                          htmlFor="ingredient1"
                          className="ml-2 font-medium text-xs"
                        >
                          Week 48
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*checkbox end*/}
                </div>
  
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div
                    className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                    onClick={() => setTimelinefilter(false)}
                  >
                    Clear Filter
                  </div>
                  <div
                    className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#1C1B1D] text-[#FFFFFF] dark:text-[rgba(255,255,255,0.20)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                    onClick={() => setTimelinefilter(false)}
                  >
                    Apply Filter
                  </div>
                </div>
              </div>
            </Sidebar>
            {/*--Timeline Filter--*/}
          </div>
        </div>
      </Layout>
    );
}