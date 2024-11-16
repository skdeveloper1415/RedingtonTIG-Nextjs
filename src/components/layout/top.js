import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import Profile from "./profile";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { useTheme } from "next-themes";
import { Sidebar } from "primereact/sidebar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import Notes from "../Notes";

export default function Top() {
  const router = useRouter();

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

 

  return (
    <header>
      <div className="w-full bg-white fixed top-0 z-1000 dark:bg-[#0F1013] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] py-[10px] xl:py-[0.521vw] pr-[40px] xl:pr-[2.083vw] top-mainheader ">
        <div className="flex items-center justify-between">
          <div className="col">
            <div className="flex items-center">
              <div className="min-w-[90px] xl:min-w-[4.688vw] text-center leading-none">
                <Link href={"/"} className="inline-block">
                  <Image
                    src={"/assets/images/svg/landing_logo.png"}
                    width={"41"}
                    height={"60"}
                    className="mx-auto"
                    alt="logo"
                  ></Image>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-[16px] xl:gap-[0.833vw]">
                <div className="text-[30px] xl:text-[1.563vw] font-semibold max-md:pl-0 pl-[40px] xl:pl-[2.083vw] text-[#00213E] dark:text-white">
                { router.pathname ===  '/backlog/detailedview' ? 'Backlog': '' || router.pathname ===  '/backlog/detailedview/ibudetail' ? 'Backlog': '' ||  router.pathname ===  '/backlog/summary' ? 'Backlog': '' ||  router.pathname ===  '/backlog/drilldown' ? 'Backlog': ''  || router.pathname ===  '/workingcapital/detailedview' ? 'Working Capital': ''  || router.pathname ===  '/workingcapital/detailedview/inventorydetail' ? 'Working Capital': '' || router.pathname ===  '/workingcapital/detailedview/quarterly' ? 'Working Capital': '' || router.pathname ===  '/inventory/summary' ? 'Inventory': '' || router.pathname ===  '/target/summary' ? 'Target': '' || router.pathname ===  '/target/detailedview' ? 'Target': ''|| router.pathname ===  '/target/drilldown' ? 'Target': '' || router.pathname ===  '/workingcapital/summary' ? 'Working Capital': '' || router.pathname ===  '/workingcapital/whatifanalysis' ? 'Working Capital': '' || router.pathname ===  '/workingcapital/drilldown' ? 'Working Capital': '' || router.pathname ===  '/software/summary' ? 'Software': '' || router.pathname ===  '/software/detailedview' ? 'Software': '' || router.pathname ===  '/software/drilldown' ? 'Software': ''  }
                </div>
                <div className="text-[16px] xl:text-[0.833vw] font-medium" style = {{position:'relative', top:'3px'}}>
                  <Link
                    href={""}
                    className="inline-block bg-[#E5F3EC] dark:bg-[#272A32] rounded-[8px] xl:rounded-[0.417vw] py-[4px] xl:py-[4px] px-[14px] xl:px-[0.729vw] text-[#029046] dark:text-white"
                  >
                    {router.pathname ===  '/software/detailedview' ? 'Detailed View':router.pathname ===  '/software/drilldown' ? 'Drilldown Analysis':router.pathname ===  '/backlog/detailedview' ? 'Detailed View':router.pathname ===  '/backlog/drilldown' ? 'Drilldown Analysis':router.pathname ===  '/backlog/summary' ? 'Summary View':router.pathname ===  '/target/detailedview' ? 'Detailed View':router.pathname ===  '/target/drilldown' ? 'Detailed View':router.pathname ===  '/workingcapital/detailedview' ? 'Detailed View':router.pathname ===  '/workingcapital/whatifanalysis' ? 'What If Analysis':router.pathname ===  '/workingcapital/drilldown' ? 'Drilldown Analysis  ':'Summary View'  }
                    {/* Summary View */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="flex items-center gap-[20px] xl:gap-[2.083vw]">
              <div className="hidden lg:block">
                <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText
                    placeholder="Search"
                    className="placeholder:text-[#888888]"
                  />
                </span>
              </div>
             
             <Notes  tabName={router.pathname}/>
              <div className="space-x-[20px] xl:space-x-[1.042vw] text-[#555555] dark:text-white/40 text-[20px]">
                <Link href={""} className="max-md:hidden">
                  <i className="red-tsg-book"></i>
                </Link>
                <Link href={""} className="max-md:hidden">
                  <i className="red-tsg-persone"></i>
                </Link>
                <Link href={""}>
                  {currentTheme === "dark" ? (
                    <div
                      className="inline-block w-[20px] h-[20px] rounded-full border border-[#555555] bg-[#555555] shadow-[0px_2px_5px_rgba(0,0,0,0.25)] overflow-hidden m-auto"
                      onClick={() => setTheme("light")}
                    >
                      <span className="bg-[rgba(0,0,0,0.8)] inline-block w-[10px] h-[24px]"></span>
                    </div>
                  ) : (
                    <div
                      className="inline-block w-[20px] h-[20px] rounded-full border border-[#555555] bg-[rgba(255,255,255,0.02)] shadow-[0px_2px_5px_rgba(0,0,0,0.25)] overflow-hidden m-auto"
                      onClick={() => setTheme("dark")}
                    >
                      <span className="bg-[#555555] inline-block w-[9px] h-[24px]"></span>
                    </div>
                  )}
                </Link>
              </div>
              <Divider layout="vertical" />
              <div x-data="{ open: false }" className="">
                <div className="relative" x-data="{ open: false }">
                  <Profile />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  );
}
