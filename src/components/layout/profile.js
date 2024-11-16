import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment } from "react";
import { Poppins } from "@next/font/google";
import { TieredMenu } from "primereact/tieredmenu";

const myPoppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const switchAccount = [
    {
        label: 'Switch Account',
        icon: 'application-switch-account',
        items: [
            {
                label: 'IT Admin',
                url: '/itadmin/viewaccess'
            },
            {
                label: 'Business User',
                url: '/businessuser/manageaccess'
            },
            {
                label: 'Business Admin',
                url: '/businessadmin/manageaccess'
            }
        ]
    },
]    

export default function Profile() {
  return (
    <div>
      <span className="flex flex-wrap flex-grow">
        {/* <div className="mr-3"> */}

        {/* </div> */}
        <Menu as="div" className="relative inline-block">
          <div className="flex items-center">
            <Menu.Button className="flex items-center">
              {/* <Avatar  src={profilePic} /> */}
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="max-md:hidden">
                    <Image
                      src={"/assets/images/profile.png"}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-[#555555] dark:text-white/50">
                    Welcome,
                    </div>
                    <div className="text-[#222222] dark:text-white/80 text-[14px] xl:text-[0.729vw]">David Williams</div>
                  </div>
                </div>
              </div>
              <span className="text-[#4B5255] pl-4">
                <i className="red-tsg-arrow-down text-[8px]"></i>
              </span>
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
            <Menu.Items className="absolute right-0 z-10 w-full min-w-[250px] origin-top-right bg-white dark:bg-[#15171B]  p-[16px] xl:p-[0.833vw] rounded-[8px] xl:rounded-[0.417vw] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] profile-dropdown">
              <div className={myPoppins.className}>
                <div className="text-[#000000] dark:text-[#888888] text-[12px] xl:text-[0.729vw] opacity-60 leading-none">
                  Admin Account
                </div>
                <div className="text-[#000000] dark:text-[#FFFFFF] text-[18px] xl:text-[0.938vw] font-semibold">
                  Jhon Nassir Jr.
                </div>
                <ul className="headerProfile">
                  <li className="dark:text-[#C6CBD2]">
                    <Link href={""}>
                      <i className="red-tsg-user-profile"></i> View profile
                    </Link>
                  </li>
                  <li className="dark:text-[#C6CBD2]">
                    <Link href={""}>
                      <i className="red-tsg-lock"></i> Change Password
                    </Link>
                  </li>
                  <li className="divide"></li>
                  <li className="divide"></li>
                  <li className="dark:text-[#C6CBD2]">
                    <Link href={""}>
                      <i className="red-tsg-logout"></i> Log out
                    </Link>
                  </li>
                </ul>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </span>
    </div>
  );
}
