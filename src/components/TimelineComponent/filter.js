import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
import { TabView, TabPanel } from 'primereact/tabview';


const myinter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function TimelineComponent() {
  const [morefilter, setMorefilter] = useState(false);
  const [Appliedfilter, setAppliedfilter] = useState(false);
  const [Timelinefilter, setTimelinefilter] = useState(false);
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
            {/*left col*/}
            {/* {router.pathname != "/target/detailedview" ? (
              <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg">
                <div className="xl:p-[0.861vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
                  <i className="red-tsg-three-line"></i>
                </div>
                <div>
                  <div className="relative cust-select">
                    <label
                      htmlFor="username"
                      className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                    >
                      View By
                    </label>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={Backlog}
                      optionLabel="name"
                      placeholder="Backlog"
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
                      Drill By
                    </label>
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={Brand}
                      optionLabel="name"
                      placeholder="Brand"
                      className="w-[178px]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )} */}

            {/*left col*/}

            {/*right col*/}

              <div className="flex items-center justify-end gap-3 w-full">
                <div className="text-[#4FB155] dark:text-[#B1B7BC] font-medium text-xs xl:text-[0.729vw] flex items-center space-x-2 bg-[#EEF8F4] dark:bg-[rgba(255,255,255,0.10)] border dark:border-[rgba(255,255,255,0.10)] py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] rounded-lg cursor-pointer" onClick={() => setAppliedfilter(true)}>
                  <i className="red-tsg-eye"></i>
                  <span>Show Applied Filter</span>
                </div>
                <div
                  className="text-[#4FB155] dark:text-[#CACED1] font-normal text-xs xl:text-[0.729vw] flex items-center space-x-2 py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] bg-white dark:bg-[#283C50] rounded border border-[#4FB155] dark:border-[rgba(40,60,80,0.50)] cursor-pointer"
                  onClick={() => setMorefilter(true)}
                >
                  <i className="red-tsg-filter text-base"></i>
                  <span>More Filters</span>
                </div>
              </div>

            
            {/*right col*/}
          </div>
        </div>

               {/*--show Applied Filter--*/}
               <Sidebar visible={Appliedfilter} position="right" onHide={() => setAppliedfilter(false)}  className="timeline-filter-sidebar">
          <div className='xl:p-[1.250vw] p-5'>
            <div className='flex justify-between items-center'>
              <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Applied Filters</div>
              <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setAppliedfilter(false)}><i className='red-tsg-close'></i></div>
            </div>
            <div className="xl:mt-[1.250vw] mt-5 lg:h-[75vh]">
              {/*checkbox Start*/}
              <div className="mt-5">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Financial Year
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>2022</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>2023</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
              {/*checkbox end*/}
              {/*checkbox Start*/}
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Quarter
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Q1</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Q2</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Q3</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Q4</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
              {/*checkbox end*/}
              {/*checkbox Start*/}
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Month
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Feb</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Mar</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Jun</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Nov</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
              {/*checkbox end*/}
              {/*checkbox Start*/}
              <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Week
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 10</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 30</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 31</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 49</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 50</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  <div className="bg-[#344054] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                    <div className="text-[#E4E7EC] font-medium text-sm xl:text-[0.885vw]"><span>Week 52</span></div>
                    <div className="w-4 h-4 rounded-full bg-[#101828] text-[#FFFFFF] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                </div>
              </div>
              {/*checkbox end*/}
            </div>

            <div className='grid grid-cols-2 gap-3 mt-5'>
              <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setAppliedfilter(false)}>Clear Filter</div>
              <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(true)}>Edit Filter</div>
            </div>

          </div>
        </Sidebar>
        {/*--show Applied Filter End--*/}

        {/*--More Filter--*/}
        <Sidebar visible={morefilter} position="right" onHide={() => setMorefilter(false)} style={{ width: '30vw' }} className="timeline-filter-sidebar">
          <div className='xl:p-[1.250vw] p-5'>
            <div className='flex justify-between items-center'>
              <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Filter</div>
              <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setMorefilter(false)}><i className='red-tsg-close'></i></div>
            </div>
            <div className='xl:mt-[1.250vw] mt-5  dark:border-[#171618] rounded lg:h-[auto]'>
              <div class="timeline-tab">

                <TabView>
                  <TabPanel header=" &nbsp; &nbsp; Basic">
                    <div className='filter-basictab dark:bg-[#171618] pl-4 pr-4 pt-1 pb-8 rounded mt-3'>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block " for="username">Inventory</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Receivables</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Accounts Payable</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Funding</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Revenue</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">VAT</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Working Capital</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Over Due Accounts Receivables</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Ageing Inventory</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">DIO</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      
                    </div>
                    <div className='grid grid-cols-2 gap-3 mt-8 mb-5'>
                        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                      </div>
                  </TabPanel>
                  <TabPanel header=" &nbsp;Timeline">
                  <div className='filter-basictab dark:bg-[#171618] lg:h-[75vh] pl-4 pr-4 pt-1 pb-2 rounded mt-3'>
                    {/*checkbox Start*/}
                    <div className="font-medium xl:text-[0.729vw] text-xs mt-5">
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

                    <div className="font-medium xl:text-[0.729vw] text-xs mt-5">
                      Select Quarter
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
                          className="ml-2 font-medium text-xs"
                        >
                          Q4
                        </label>
                      </div>
                    </div>

                    {/*checkbox end*/}

                    </div>

                    
                    <div className='grid grid-cols-2 gap-3 mt-5'>
                      <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                      <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                    </div>
                    
                  </TabPanel>

                </TabView>

              </div>

            </div>
          </div>
        </Sidebar>
        {/*--More Filter End--*/}

        {/*timeline filter start */}


        <Sidebar
          visible={Timelinefilter}
          position="right"
          onHide={() => setTimelinefilter(false)}
          style={{ width: "40vw" }}
          className="timeline-filter-sidebar"
        >

          <div className='xl:p-[1.250vw] p-5'>
            <div className='flex justify-between items-center'>
              <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Filters</div>
              <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setTimelinefilter(false)}><i className='red-tsg-close'></i></div>
            </div>
            <div className='xl:mt-[1.250vw] mt-5  dark:border-[#171618]  rounded lg:h-[auto]'>
              <div class="timeline-tab">
                <TabView>
                  <TabPanel header=" &nbsp; &nbsp; Basic">
                    <div className='filter-basictab dark:bg-[#171618] pl-4 pr-4 pt-1 pb-2 rounded pb-8 mt-3'>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Inventory</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Receivables</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Accounts Payable</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Funding</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Revenue</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">VAT</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Working Capital</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Over Due Accounts Receivables</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Ageing Inventory</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      <div className='col mt-3 '>
                        <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">DIO</label>
                        <Dropdown optionLabel="name" placeholder="All"
                          className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                      </div>
                      
                    </div>

                    <div className='grid grid-cols-2 gap-3 mt-8 mb-5'>
                        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(false)}>Clear Filter</div>
                        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(false)}>Apply Filter</div>
                      </div>
                  </TabPanel>
                  <TabPanel header=" &nbsp;Timeline">

                    <div className="">

                      <div className=" xl:p-[0.833vw]  dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[75vh] pl-4 pr-4 pt-1 pb-2 rounded mt-3">
                        {/*checkbox Start*/}
                        <div className="font-medium xl:text-[0.729vw] text-xs xl:mt-[0.450vw]">
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
                          className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                          onClick={() => setTimelinefilter(false)}
                        >
                          Apply Filter
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                </TabView>
              </div>
            </div>
          </div>
        </Sidebar>

        {/*timeline filter end */}
      </div>
    </>
  );
}