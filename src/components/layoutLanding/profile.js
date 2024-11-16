import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
import Link from 'next/link';
import Image from 'next/image';
import React, { Fragment } from "react";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Profile() {


    async function logOut() {
        reactLocalStorage.remove(["loggedEmployeeId"])
        reactLocalStorage.remove(["loggedEmployeeFirstName"])
        reactLocalStorage.remove(["loggedEmployeeLastName"])
        reactLocalStorage.remove(["loggedEmployeeProfilePic"])
        reactLocalStorage.remove(["loggedEmployeeRoleId"])
        reactLocalStorage.remove(["loggedEmployeeRoleName"])
        router.push('/')
    }
    
    return (
        
       
        <div>
            <span className="flex flex-wrap flex-grow">
                {/* <div className="mr-3"> */}


                {/* </div> */}
                <Menu as="div" className="relative inline-block text-left">
                    <div className="flex items-center align-center px-2">
                        <Menu.Button className='flex items-center bg-[#043123] rounded-full pr-3'>
                            {/* <Avatar  src={profilePic} /> */}
                            <div className="relative pl-3 py-2 mt-2 pr-3 text-sm font-semibold text-gray-900 md:flex md:mt-0 hover:text-gray-900 focus:text-gray-900 focus:outline-none"><i className="icon user_icon"></i></div>

                            <svg fill="currentColor" viewBox="0 0 20 20" className="inline w-5 h-5 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 dark:text-white"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill="#fff" clipRule="evenodd"></path></svg>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 w-56 mt-3 origin-top-right bg-white divide-y divide-gray-100 dark:divide-[#333] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#232528]">
                            <div className="py-1">
                                <Menu.Item key="MenuItemProfile">
                                    {({ active }) => (
                                        <Link
                                            href="/"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900 dark:bg-[#333231] dark:text-[#F8F8F8]"
                                                    : "text-gray-700 dark:bg-[#232528] dark:text-[#F8F8F8]",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            <i className="mr-6 icon-size user_profile_icon"></i>My Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>

                            <div className="py-1">
                                <Menu.Item key="MenuItemLogout">
                                    {({ active }) => (
                                        <Link
                                           href="/"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900 dark:bg-[#333231] dark:text-[#F8F8F8]"
                                                    : "text-gray-700 dark:text-[#F8F8F8] dark:bg-[#232528]",
                                                "block px-4 py-2 text-sm cursor-pointer"
                                            )}
                                        >
                                            <i className="mr-6 icon-size logout_icon_small"></i> Logout
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </span>
        </div>


    )

}