import React, { useEffect } from 'react';
import { useTheme } from "next-themes";
import { useRouter } from 'next/router';
import HRProfileLanding from '../layoutLanding/profile';
import "aos/dist/aos.css";
import AOS from "aos";


export default function LandingTop() {
    const router = useRouter()
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div className='w-full text-gray-700  fixed top-0 z-10 headar-wrapper landing_header dark:shadow-md'>
            <div x-data='{ open: false }' className='flex flex-col px-2 mx-auto md:items-center md:justify-between md:flex-row'>
                <nav className='flex-col flex-grow hidden pb-4 md:flex md:items-center md:pb-0 md:justify-end md:flex-row h-[75px]'>
                    <div className='flex justify-between w-full px-8 pl-8'>
                        <div className='flex items-center justify-between lg:w-44 sm:w-24 max-sm:w-24'  data-aos="fade-down" data-aos-duration="900">
                            <div className='text-[#FFFFFF] text-[20px] font-normal'>Home</div>
                            <div className=''><i className='red-tsg-rectangle-down text-[8px] text-white'></i></div>
                        </div>
                        <div className='flex items-center justify-around'  data-aos="fade-down" data-aos-duration="1000">
                            <div className='flex items-center gap-5'>
                                {/* {currentTheme === 'dark' ? (
                                    <span className='inline-block w-[30px] xl:w-[1.550vw] h-[25px] xl:h-[1.550vw] rounded-full border border-white bg-white shadow-[0px_2px_5px_rgba(0,0,0,0.25)] overflow-hidden m-auto' onClick={() => setTheme('light')}>
                                        <span className='bg-[rgba(0,0,0,0.8)] inline-block w-[10px] xl:w-[0.721vw] h-full'></span>
                                    </span>
                                ) : (
                                    <span className='inline-block w-[30px] xl:w-[1.550vw] h-[25px] xl:h-[1.550vw] rounded-full border border-white bg-[rgba(255,255,255,0.02)] shadow-[0px_2px_5px_rgba(0,0,0,0.25)] overflow-hidden m-auto' onClick={() => setTheme('dark')}>
                                        <span className='bg-white inline-block w-[10px] xl:w-[0.721vw] h-full'></span>
                                    </span>
                                )} */}
                                <div className=''><i className='red-tsg-user text-2xl text-white'></i></div>
                                <div className=''><i className='red-tsg-menu-settings text-2xl text-white'></i></div>
                            </div>
                            <div className='relative ml-5' x-data='{ open: false }'>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}