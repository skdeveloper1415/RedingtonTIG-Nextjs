import React, { useState, useRef } from 'react';
import Link from "next/link";
import { Sidebar } from 'primereact/sidebar';
import { Checkbox } from 'primereact/checkbox';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import Layout from '../../../components/layout/layout';
import { Row } from 'primereact/row';
import { Inter } from '@next/font/google';
import { Dropdown } from 'primereact/dropdown';
import TimelineComponent from "@/components/TimelineComponent";

const myinter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})
        

export default function Index() {
    /*--checkbox--*/
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
      /*--Table Start--*/
      const [sales] = useState([
        { product: 'BU1', lastYearProfit: 54406, thisYearProfit: 43342 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'BU1', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'BU1', lastYearProfit: 12321, thisYearProfit: 8500 },
    ]);

    const lastYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.lastYearProfit)}`;
    };

    const thisYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.thisYearProfit)}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
            <div><Link href={''} className='flex items-center space-x-2'><i className='red-tsg-plus text-[#344054]'></i><span>IBU</span></Link></div>
        );
    };

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Over all" />
                <Column footer={lastYearTotal} />
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
    const myCustomHeaderFilter = (columnName = '', isFilterApplicable = false) => {
      return <div className="flex justify-between flex-row-reverse gap-2">  
        <div>{columnName}</div>  
        {isFilterApplicable &&  
          <div>  
            <Link href={"/backlog/detailedview"}><i className="red-tsg-back-rounded text-base"></i></Link>  
          </div>
  
        }  
      </div>;
      };
    /*--Table end--*/
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
    <Layout pageTitle="Detailed View" >
      <div className={myinter.className}>
      <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full">
        <div>
          <Link
            href={"/backlog/summary"}
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
          >
            Summary View
          </Link>
        </div>
        <div>
          <Link
            href={"/backlog/detailedview"}
            className="text-[#667085] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:hover:bg-[#01813F] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
          >
            Detailed View
          </Link>
        </div>
        <div>
          <Link
            href={"/backlog/drilldown"}
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
          >
            Drilldown Analysis
          </Link>
        </div>
      </div>
    <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 pb-10">
    {/*--Filter Seaction*/}
    <div className="flex flex-wrap justify-between items-center">
    {/*left col*/}
    <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg">
    <div className="xl:p-[0.861vw] p-3.5 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
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
    {/*left col*/}

    {/*right col*/}
    <div>
    <TimelineComponent />
    </div>
    {/*right col*/}
    </div>
    {/*--Filter Seaction*/}

    <div className=''>
    <div className='bg-white dark:bg-[#14161A] border border-[#C6CBD2] dark:border-[#14161A] rounded-tl-lg rounded-tr-lg px-5 xl:px-[1.250vw] py-2 flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
            <div className='text-[#101828] dark:text-[#CACED1] font-normal text-base xl:text-[0.938vw] flex items-center space-x-3'><span>Detailed View</span></div>
            <div className='text-[#888888] text-sm space-x-2 font-normal'>
                <Link href={'/backlog/detailedview'} className='text-[#0056B8] font-semibold'>BU</Link>
                <span href={''}><i className='red-tsg-right-arrow text-[10px]'></i></span>
                <span href={''}>IBU</span>
            </div>
        </div>
        <div className='flex items-center gap-2'>
        <div className='text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]'><i className='red-tsg-download'></i><span>Export</span></div>
            {/* <div><Link href={''} className='text-[#344054] font-medium text-sm xl:text-[0.938vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white border border-[#C6CBD2] inline-block'>Brand</Link></div>
            <div><Link href={''} className='text-white font-medium text-sm xl:text-[0.938vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-[#029046] border border-[#029046] inline-block'>BU</Link></div>
            <div><Link href={''} className='text-[#344054] font-medium text-sm xl:text-[0.938vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white border border-[#C6CBD2] inline-block'>Cluster</Link></div> */}
        </div>
    </div>
    <div className='border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css'>
    <DataTable value={sales} footerColumnGroup={footerGroup} scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink PageLinks NextPageLink" className='custpaginator custIcons custmBtnTable custTable' >
                <Column field="product" headerClassName='header-filter' header={myCustomHeaderFilter('IBU', true)} body={BuBodyTemplate} style={{width:'10rem'}}  />
                <Column field="lastYearSale" sortable header="Week 1" body={lastYearProfitBodyTemplate} />
                <Column field="thisYearSale" sortable header="Week 2" body={thisYearProfitBodyTemplate} />
                <Column field="lastYearProfit" sortable header="Week 3" body={lastYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 4" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 5" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 6" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 7" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 8" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Total" body={thisYearProfitBodyTemplate} />
            </DataTable>
    </div>
    </div>

    </div>    
    </div>
    </Layout>
  );
}