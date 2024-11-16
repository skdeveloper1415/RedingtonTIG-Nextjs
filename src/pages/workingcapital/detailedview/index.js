import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import { Sidebar } from 'primereact/sidebar';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import Layout from '../../../components/layout/layout';
import { Inter } from '@next/font/google';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';

const myinter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})



export default function Index() {
    const [morefilter, setMorefilter] = useState(false);
    const [Appliedfilter, setAppliedfilter] = useState(false);
    /*--checkbox--*/
    const [ingredients, setIngredients] = useState([]);
    const [Timelinefilter, setTimelinefilter] = useState(false);

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }
    /*--checkbox--*/
    /*Select Style--*/
    const [selectedCity, setSelectedCity] = useState(null);

    const options = [
        { value: 'All', label: 'All' },
        { value: 'DIO', label: 'DIO' },
        { value: 'DSO', label: 'DSO' },
        { value: 'DVRO', label: 'DVRO' },
        { value: 'DPO', label: 'DPO' },
        { value: 'GWC', label: 'GWC' },
        { value: 'DNWC', label: 'DNWC' }
    ]
    const select_style = {
        indicatorSeparator: styles => ({ ...styles, display: "none", }),
        dropdownIndicator: styles => ({ ...styles, display: "#888888", padding: "0", }),
        control: (base, provided) => ({
            ...base,
            minHeight: "100%",
            fontWeight: "500",
            boxShadow: 'none',
            borderColor: "#FFFFFF",
            borderRadius: "8px",
            padding: "0",
            "&:hover": {
                borderColor: "#FFFFFF",
                color: "#999999",
            }
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: "0",
            color: '#222222',
            fontSize: "10px",
            fontWeight: '300'
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#222222',
                fontSize: "12px",
                fontWeight: '600'
            }
        },
        input: (provided, state) => ({
            ...provided,
            padding: "0",
            margin: "0",
        })
    };
    /*Select Style--*/

    /*--Table Start--*/
    const [sales] = useState([
        { product: 'BU1', lastYearProfit: 54406, thisYearProfit: 43342 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'BU1', lastYearProfit: 12321, thisYearProfit: 8500 },
        
        
    ]);

    const lastYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.lastYearProfit)}`;
    };

    const thisYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.thisYearProfit)}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US');
    };

    const lastYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.lastYearProfit;
        }

        return formatCurrency(total);
    };

    const thisYearTotal = () => {
        let total = 0;

        for (let sale of sales) {
            total += sale.thisYearProfit;
        }

        return formatCurrency(total);
    };

    const BuBodyTemplate = (rowData) => {
        return (
            <div><Link href={'/workingcapital/detailedview/inventorydetail'} className='flex items-center space-x-2'><i className='red-tsg-plus'></i><span>Inventory</span></Link></div>
        );
    };

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Total" />
                <Column footer={lastYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />


            </Row>
        </ColumnGroup>
    );
    /*--Table end--*/

    return (
        <Layout pageTitle="Detailed View" >
            <div className={myinter.className}>
                <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
                <div>
            <Link
              href={"/workingcapital/summary"}
              className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
            >
              Summary View
            </Link>
          </div>
          <div>
            <Link
              href={"/workingcapital/detailedview"}
              className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
            >
              Detailed View
            </Link>
          </div>
          <div>
            <Link
              href={"/workingcapital/whatifanalysis"}
              className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block "
            >
              What If Analysis
            </Link>
          </div>
          <div>
            <Link
              href={"/workingcapital/drilldown"}
              className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
            >
              Drilldown Analysis
            </Link>
          </div>
                </div>


                <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 pb-10  xl:mt-[3.125vw] mt-[50px]">
                    <div className="rounded-lg xl:pt-[1.302vw] pt-5">
                        <div className="flex justify-between items-center">
                            {/*left col*/}
                            <div className="flex items-center rounded-tl-lg rounded-bl-lg">
                                <div className="xl:p-[0.84vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white"><i className="red-tsg-three-line"></i></div>
                                <div>
                                <div className="relative cust-select  ">
                                    <label
                                        htmlFor="username"
                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                    >
                                        Inventory
                                    </label>
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.value)}
                                        options={options}
                                        optionLabel="value"
                                        placeholder="All"
                                        className="w-[158px]"
                                    />
                                </div>
                                </div>
                                <div>
                                    <div className="relative cust-select ">
                                        <label
                                            htmlFor="username"
                                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                        >
                                            Receivables
                                        </label>
                                        <Dropdown
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.value)}
                                            options={options}
                                            optionLabel="value"
                                            placeholder="All"
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative cust-select  ">
                                        <label
                                            htmlFor="username"
                                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                        >
                                            Funding
                                        </label>
                                        <Dropdown
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.value)}
                                            options={options}
                                            optionLabel="value"
                                            placeholder="All"
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative cust-select  ">
                                        <label
                                            htmlFor="username"
                                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                        >
                                            VAT
                                        </label>
                                        <Dropdown
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.value)}
                                            options={options}
                                            optionLabel="value"
                                            placeholder="All"
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative cust-select  ">
                                        <label
                                            htmlFor="username"
                                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                        >
                                            Working Capital
                                        </label>
                                        <Dropdown
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.value)}
                                            options={options}
                                            optionLabel="value"
                                            placeholder="All"
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative cust-select  w-[8.5vw]">
                                        <label
                                            htmlFor="username"
                                            className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                        >
                                           DIO
                                        </label>
                                        <Dropdown
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.value)}
                                            options={options}
                                            optionLabel="value"
                                            placeholder="All"
                                            className="w-[140px]"
                                        />
                                    </div>
                                </div>
                                


                            </div>
                            {/*left col*/}
                            {/*right col*/}
                            <div className="flex items-center gap-3">
                                <div className="text-[#4FB155] dark:text-[#B1B7BC] font-medium text-xs xl:text-[0.729vw] flex items-center space-x-2 bg-[#EEF8F4] dark:bg-[rgba(255,255,255,0.10)] border dark:border-[rgba(255,255,255,0.10)] py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] rounded-lg cursor-pointer" onClick={() => setAppliedfilter(true)}><i className="red-tsg-eye"></i><span>Show Applied Filter</span></div>
                                <div className="text-[#4FB155] dark:text-[#CACED1] font-normal text-xs xl:text-[0.729vw] flex items-center space-x-2 py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] bg-white dark:bg-[#283C50] rounded border border-[#4FB155] dark:border-[rgba(40,60,80,0.50)] cursor-pointer" onClick={() => setMorefilter(true)}><i className="red-tsg-filter text-base"></i><span>More Filters</span></div>
                            </div>
                            {/*right col*/}
                        </div>
                    </div>

                    <div className='xl:py-[1.250vw] py-5'>
                        <div className='bg-white dark:bg-[#14161A] border border-[#C6CBD2] dark:border-[#14161A] rounded-tl-lg rounded-tr-lg px-5 xl:px-[1.250vw] py-2 flex justify-between items-center'>
                            <div className='text-[#101828] dark:text-[#CACED1] font-normal text-base xl:text-[0.938vw]'>Detailed View</div>
                            <div className='flex items-center gap-2'>
                                <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Daily</Link></div>
                                <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Weekly</Link></div>
                                <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green'>Monthly</Link></div>
                                <div><Link href={'/workingcapital/detailedview/quarterly'} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Quarterly</Link></div>
                                <div className='text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]'><i className='red-tsg-download'></i><span>Export</span></div>
                            </div>
                        </div>
                        {/* <div className='border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css'> */}
                            <div className='border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css iconfil workingqutr'>
                            <DataTable value={sales} footerColumnGroup={footerGroup} scrollable paginator rows={8} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink PageLinks NextPageLink" className='custpaginator custIcons custmBtnTable custTable' tableStyle={{ minWidth: '100%', maxWidth:'100%' }} >
                                <Column field="product" headerClassName='header-filter' header="Particulars" body={BuBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="lastYearSale" sortable header="January" body={lastYearProfitBodyTemplate} style={{ minWidth:'8 rem'}} />
                                <Column field="thisYearSale" sortable header="February" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="lastYearProfit" sortable header="March" body={lastYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="April" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="May" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="June" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="July" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="August" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}} />
                                <Column field="thisYearProfit" sortable header="September" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="October" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="November" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="December" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                                <Column field="thisYearProfit" sortable header="FY 2022-23" body={thisYearProfitBodyTemplate} style={{ minWidth:'8 rem'}}/>
                            </DataTable>
                            </div>
                        {/* </div> */}
                    </div>


                    {/*--show Applied Filter--*/}
                    <Sidebar visible={Appliedfilter} position="right" onHide={() => setAppliedfilter(false)} style={{ width: '30vw' }} className="timeline-filter-sidebar">
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
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>2022</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>2023</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
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
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q1</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q2</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q3</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q4</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
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
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Feb</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Mar</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Jun</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Nov</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
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
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 10</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 30</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 31</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 49</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 50</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 52</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
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
                    {/*--show Applied Filter--*/}

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
                            <div className='xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3  dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[auto]'>
                            <div class="timeline-tab">
                                <TabView>
                                    <TabPanel header=" &nbsp; &nbsp; Basic">
                                        <div className='filter-basictab'>
                                            <div className='col mt-3 '>
                                                <label className="dark:text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Inventory</label>
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
                                            <div className='grid grid-cols-2 gap-3 mt-12 mb-5'>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(false)}>Clear Filter</div>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(false)}>Apply Filter</div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header=" &nbsp;Timeline">

                                        <div className="">

                                            <div className="xl:mt-[1.250vw] mt-5 xl:p-[0.833vw]  dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[75vh]">
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

                    {/*--More Filter--*/}
                    <Sidebar visible={morefilter} position="right" onHide={() => setMorefilter(false)} style={{ width: '30vw' }} className="timeline-filter-sidebar">
                        <div className='xl:p-[1.250vw] p-5'>
                            <div className='flex justify-between items-center'>
                                <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Filter</div>
                                <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setMorefilter(false)}><i className='red-tsg-close'></i></div>
                            </div>
                            <div className='xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3  dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[auto]'>
                            <div class="timeline-tab">

                                <TabView>
                                    <TabPanel header=" &nbsp; &nbsp; Basic">
                                        <div className='filter-basictab'>
                                            <div className='col mt-3 '>
                                                <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Inventory</label>
                                                <Dropdown optionLabel="name" placeholder="All"
                                                    className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                            </div>
                                            <div className='col mt-3  '>
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
                                            <div className='grid grid-cols-2 gap-3 mt-8 mb-5'>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel header=" &nbsp;Timeline">

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


                                        <div className='grid grid-cols-2 gap-3 mt-[380px] mb-5'>
                                            <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                                            <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                                        </div>
                                    </TabPanel>

                                </TabView>

                            </div>

                            </div>
                        </div>
                    </Sidebar>
                    {/*--More Filter--*/}

                </div>
            </div>
        </Layout>
    );
}