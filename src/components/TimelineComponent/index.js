import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import TimelineFilter from "../TimelineFilter";
import AppliedFilter from "../AppliedFilter";

const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function TimelineComponent() {
  const [Timelinefilter, setTimelinefilter] = useState(false);
  const [AppliedFilters, setAppliedFilters] = useState(false);
  /*--checkbox--*/
  const [ingredients, setIngredients] = useState([]);
  const router = useRouter();

  const onIngredientsChange = (e) => {
    let _ingredients = [...ingredients];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };
  /*--checkbox--*/
  /*--prime-select--*/
  const [selectedCity, setSelectedCity] = useState(null);
  const Backlog = [
    { name: "All", code: "NY" },
    { name: "Backlog", code: "RM" },
    { name: "Inventory", code: "LDN" },
    { name: "Backlog & Inventory", code: "IST" },
    { name: "Bookinv", code: "PRS" },
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

  return (
    <>
      <div className="">
        <div className="rounded-lg xl:pt-[1.302vw] py-5">
          <div className="flex justify-between items-center">            
            <div className="flex items-center justify-end gap-3 w-full">
              <div className="text-[#4FB155] dark:text-[#B1B7BC] font-medium text-xs xl:text-[0.729vw] flex items-center space-x-2 bg-[#EEF8F4] dark:bg-[rgba(255,255,255,0.10)] border dark:border-[rgba(255,255,255,0.10)] py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] rounded-lg cursor-pointer" onClick={() => setAppliedFilters(true)}>
                <i className="red-tsg-eye"></i>
                <span>Show Applied Filter</span>
              </div>
              <div
                className="text-[#4FB155] dark:text-[#CACED1] font-normal text-xs xl:text-[0.729vw] flex items-center space-x-2 py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] bg-white dark:bg-[#283C50] rounded border border-[#4FB155] dark:border-[rgba(40,60,80,0.50)] cursor-pointer"
                onClick={() => setTimelinefilter(true)}
              >
                <i className="red-tsg-filter text-base"></i>
                <span>More Filters</span>
              </div>
            </div>
            {/*right col*/}
          </div>
        </div>

        {/*--Timeline Filter--*/}
        <TimelineFilter Timelinefilter={Timelinefilter} setTimelinefilter={setTimelinefilter} AppliedFilters={AppliedFilters} setAppliedFilters={setAppliedFilters}/>
        {/* <Sidebar
          visible={Timelinefilter}
          position="right"
          onHide={() => setTimelinefilter(false)}
          className="timeline-filter-sidebar"
        >
          <div className="xl:p-[1.250vw] p-5 relative h-full">
            <div className="flex justify-between items-center">
              <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw]">
                Timeline Filter
              </div>
              <div
                className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                onClick={() => setTimelinefilter(false)}
              >
                <i className="red-tsg-close"></i>
              </div>
            </div>
            <div className="xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3 border border-[#E4E7EC] dark:border-[#171618] dark:bg-[#171618] rounded">
             
              <div className="font-medium xl:text-[0.729vw] text-xs text-[#344054] dark:text-[#667085]">
                Financial Year
              </div>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                    className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                  >
                    2014
                  </label>
                </div>
              </div>
             
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Select Quarter
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085]">
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2  font-medium text-xs xl:text-[0.729vw]"
                    >
                      Q4
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Select Month
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                    >
                      Mar
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Select Week
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
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
                      className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                    >
                      Week 48
                    </label>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="lg:absolute lg:w-11/12 lg:bottom-5">
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={() => setTimelinefilter(false)}
                >
                  Clear Filter
                </div>
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={() => setTimelinefilter(false)}
                >
                  Apply Filter
                </div>
              </div>
            </div>
          </div>
        </Sidebar> */}
        {/*--Timeline Filter--*/}

        {/*--Applied Filters--*/}
        {/* <AppliedFilter AppliedFilters={AppliedFilters} setAppliedFilters={setAppliedFilters} setTimelinefilter={setTimelinefilter}/> */}
        {/* <Sidebar
          visible={AppliedFilters}
          position="right"
          onHide={() => setAppliedFilters(false)}
          style={{ width: "34vw" }}
          className="timeline-filter-sidebar"
        >
          <div className="xl:p-[1.250vw] p-5 relative h-full">
            <div className="flex justify-between items-center">
              <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw]">
                Applied Filters
              </div>
              <div
                className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                onClick={() => setAppliedFilters(false)}
              >
                <i className="red-tsg-close"></i>
              </div>
            </div>
            <div className="xl:mt-[1.250vw] mt-5">
             
              <div className="mt-5">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Financial Year
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>2022</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>2023</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
             
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Quarter
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Q1</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Q2</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE]py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Q3</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Q4</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Month
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Feb</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Mar</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Jun</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Nov</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
            
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Week
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 10</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 30</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 31</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 49</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 50</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => setTimelinefilter(true)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week 52</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
             
            </div>

            <div className="absolute w-11/12 bottom-5">
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={() => setAppliedFilters(false)}
                >
                  Clear Filter
                </div>
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={() => setAppliedFilters(false)}
                >
                  Edit Filter
                </div>
              </div>
            </div>
          </div>
        </Sidebar> */}
        {/*--Applied Filters--*/}
      </div>
    </>
  );
}