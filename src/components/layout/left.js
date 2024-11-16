import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';



export default function Left() {
    const router = useRouter()
    const isActive = (href) => {
        return router.pathname.includes(href) ? 'active' : 'sidemenu';
    };

    return (
        <div className='fixed left-0 top-0 bg-white dark:bg-[#171920] h-full w-full max-w-[90px] xl:max-w-[4.688vw] pt-[100px] lg:pt-[120px] xl:pt-[6.250vw] px-[16px] xl:px-[0.833vw] text-[#667085] dark:text-[#98A2B3]'>
            <nav>
                <ul>
                    <li>
                        <Link href={"/"}>
                            <span className='icon'><i className='red-tsg-home'></i></span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/backlog/summary"} className={isActive('/backlog')}>
                            <span className='icon'><i className='red-tsg-Backlog'></i></span>
                            <span>Backlog</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/target/summary"} className={isActive('/target')}>
                            <span className='icon'><i className='red-tsg-Target'></i></span>
                            <span>Target</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/inventory/summary"} className={isActive('/inventory/')}>
                            <span className='icon'><i className='red-tsg-Inventory'></i></span>
                            <span>Inventory</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/software/summary"} className={isActive('/software/summary')}>
                            <span className='icon'><i className='red-tsg-Software'></i></span>
                            <span>Software</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/workingcapital/summary"} className={isActive('/workingcapital/summary')}>
                            <span className='icon'><i className='red-tsg-working-capital'></i></span>
                            <span>Working Capital</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}