import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { OverlayPanel } from 'primereact/overlaypanel';
import { CSVLink } from "react-csv";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useReactToPrint } from "react-to-print";
import ReactFullscreen from 'react-easyfullscreen';
import ExcelDownloader from '../exportn/ExcelDownloader';
import PdfDownloader from '../exportn/PdfDownloader';
import PivotTable from '../pivotchart/index';

export default function ChartWrapper(props) {

  const [visible, setVisible] = useState(false);
  const [infoIcon, setInfoIcon] = useState(props.infoIcon)
  const [tabSection, settabSection] = useState(props.tabSection)
  // const [bulbIcon, setBulbIcon] = useState(props.bulbIcon)
  const [ExportIcon, setExportIcon] = useState(props.ExportIcon)
  const [printIcon, setprintIcon] = useState(true)
  const [pivotIcon, setPivotIcon] = useState(true)
  const [maximizeIcon, setMaximizeIcon] = useState(true)
  const op = useRef(null);
  const maps = useRef(null);
  const Bots = useRef();
  const screen1 = useFullScreenHandle();
  const handleClick = (e) => {
    document.querySelector('body').classList.toggle('echartHeight')
}

  //Print Function
  const handlePrintBots = useReactToPrint({
    content: () => Bots.current,
  });

  const { formatDownloadedData = [], formatFileName = 'Demo', isDetailedExport = false, disablepdf = false, title = 'abc', subtitle = 'abc', data = [] } = props;

  const headers = [
    { label: "First Name", key: "id" },
    { label: "Last Name", key: "name" },
    { label: "Email", key: "value" },
    { label: "Age", key: "age" }
  ];

  const csvReport = {
    data: formatDownloadedData,
    headers: headers,
    filename: `${formatFileName}.csv`
  };

  return (
    <div>
      <ReactFullscreen>
        {({ ref, onToggle, onExit }) => (
          <div ref={ref} className='p-[24px] xl:p-[1.250vw] h-full'>
            <div>
              <div className='flex items-start justify-between pb-4'>
                <div className=''>
                  <div className='text-base text-[#101828] font-semibold'><Link href={'/'}></Link></div>
                  <div className={`text-[#222222] text-[18px] xl:text-[0.938vw] font-medium dark:text-[#fff] ${props.text}`}><p>{props.title}</p></div>
                  <div className={`text-[#fff] text-xs xl:text-[0.625vw] font-light dark:text-[#fff] ${props.text}`}><p>{props.subtitle}</p></div>
                </div>
                <div className='space-x-4 optionbtn flex wrapper_icons items-center'>
                  {
                    infoIcon == false ?
                      <Link href=''><i className='pi pi-info-circle dark:text-[##98A0A5] mt-[7px]'></i></Link>
                      : null
                  }
                  {
                    tabSection == true ?
                      <div className="custabs">
                        <Link href={''} className="custactive" >Map</Link>
                        <Link href={''} >Table</Link>
                      </div>
                      : null
                  }
                  {/* {
                  printIcon == true ?
                    <button href='' onClick={() => { handlePrintBots(); onExit(); }}><i className='pi pi-print text-[#98A2B3] mt-[7px] dark:text-[#363A44]'></i></button>
                    : null
                } */}
                  {
                    maximizeIcon == true ?
                      <Link href=''
                        onClick={() => {
                          onToggle();
                        }}
                      >
                        <i onClick={handleClick} className='red-tsg-linechart-box text-[#555555] text-[20px] xl:text-[0.938vw] dark:text-[#98A0A5]'></i></Link>
                      : null
                  }
                  {
                    ExportIcon == true ?
                      <div>
                        <div className="card flex">
                          <button onClick={(e) => op.current.toggle(e)}><i className='red-tsg-download text-[#555555] dark:text-[#98A0A5] text-[18px] xl:text-[0.938vw]' ></i></button>
                          <OverlayPanel ref={op} className="dropdownList">
                            <div className='flex flex-col ext-left gap-y-2 wrapperOption'>
                              <button><CSVLink {...csvReport}>Export to CSV</CSVLink></button>
                              <ExcelDownloader data={formatDownloadedData} />
                              <PdfDownloader
                                title={title}
                                isDetailedExport={isDetailedExport}
                                data={formatDownloadedData}
                                id={props.id}
                              />
                            </div>
                          </OverlayPanel>
                        </div>
                      </div>
                      : null
                  }
                  {
                    pivotIcon == true ?
                      <>
                        <button onClick={(e) => maps.current.toggle(e)} href=''><i className='red-tsg-three-dots text-[#555555] text-[18px] xl:text-[0.938vw] textcolor mt-[7px] dark:text-[#98A0A5]'></i></button>
                        <OverlayPanel ref={maps} className="dropdownList">
                          <div className='flex flex-col ext-left gap-y-2 wrapperOption'>
                            {/* <Link href={""}><i className="pi pi-file mr-1 text-[18px] xl:text-[0.938vw]"></i> Add note</Link> */}
                            {/* <Link href={""}><i className="red-tsg-download text-[18px] xl:text-[0.938vw] mr-1"></i> Export data </Link> */}
                          <Link href={""}><i className="pi pi-print mr-1 text-[18px] xl:text-[0.938vw]"></i> Print</Link>
                          </div>
                        </OverlayPanel>
                      </>
                      : null
                  }
                </div>
              </div>
              <div className="mt-4 gap-4">
                <div className='grid grid-cols-1 wrapper_icons center-content'>
                  <div ref={Bots}>
                    {props.data}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ReactFullscreen>
    </div>
  )
}