import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Sidebar } from 'primereact/sidebar';
import Image from "next/image";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Inter } from '@next/font/google';
import { InputText } from "primereact/inputtext";
import { TabView, TabPanel } from 'primereact/tabview';
import Layout from '../../../components/layout/layout';
import TimelineComponent from "@/components/TimelineComponent";
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';


const myinter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})
        
        

export default function Index() {
    const [value, setValue] = useState('');
    const [Timelinefilter, setTimelinefilter] = useState(false);
    const [ClusterEdit, setClusterEdit] = useState(false);
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
        { product: 'E .Africa', lastYearProfit: 54406, thisYearProfit: 43342 },
        { product: 'Egypt', lastYearProfit: 423132, thisYearProfit: 312122 },
        { product: 'FWN Africa', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'Kenya', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'Qatar', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'Rome', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'Saudi', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'South Africa', lastYearProfit: 12321, thisYearProfit: 8500 },
        { product: 'U.A.E', lastYearProfit: 12321, thisYearProfit: 8500 },
    ]);
    

    const lastYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.lastYearProfit)}`;
    };

    const thisYearProfitBodyTemplate = (rowData) => {
        return `${formatCurrency(rowData.thisYearProfit)}`;
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { currency: 'USD' });
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
     
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
      };
    const CommitBodyTemplate = (rowData) => {
        return (
            <div className=''>
                
                    <InputText value={value} onChange={(e) => setValue(e.target.value)}  className='w-32 h-7 placeholder:text-[#344054] dark:placeholder:text-[#898A92] placeholder:text-sm' style={{borderColor:'#C6CBD2', borderRadius:'4px'}} placeholder='6,100,000' />
               
                
            </div>
        );
    };


    const CommitBodyTemplate1 = (rowData) => {
        console.log("rowData",rowData.product);
        return (
            <div className=''>
                {isEditing ? (<>
                    <InputText value={value} onChange={(e) => setValue(e.target.value)}  className='w-32 h-7 placeholder:text-[#344054] dark:placeholder:text-[#898A92] placeholder:text-sm' style={{borderColor:'#C6CBD2', borderRadius:'4px'}} placeholder='6,100,000' />
                    <div className='flex mt-[7px]'>
                     <button className='py-[2px] px-2 border border-[#c6cbd233] mr-[2px]'>Cancel</button>
                     <button className='py-[2px] px-4 ml-[2px] bg-[#029046] text-white border border-[#029046] rounded-sm'>Save</button>
                     </div>
                </>) :
                (
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} onClick={handleEditClick} className='w-32 h-7 placeholder:text-[#344054] dark:placeholder:text-[#898A92] placeholder:text-sm' style={{borderColor:'#C6CBD2', borderRadius:'4px'}} placeholder='6,100,000' />
                )
                
            }
                
            </div>
        );
    };

    const handleEdit = () =>{
        setClusterEdit(true)
        setIsEditing(false)
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='cursor-pointer text-[#667085]' onClick={handleEdit}><i className='red-tsg-edit-pen'></i></div>
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
                <Column />
            </Row>
            <Row>
                <Column footer="YTD" />
                <Column footer={lastYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column footer={thisYearTotal} />
                <Column />
            </Row>
        </ColumnGroup>
    );

    const footerGroupPopup = (
        <ColumnGroup>
            <Row>
                <Column footer="Over all" />
                <Column footer={lastYearTotal} />
                <Column footer={thisYearTotal} />
            </Row>
            <Row>
                <Column footer="YTD" />
                <Column footer={lastYearTotal} />
                <Column footer={thisYearTotal} />
            </Row>
        </ColumnGroup>
    );
    /*--Table end--*/

    /*---Timeline Components--*/
    const events = [
        {country:"East Africa",status: 'Stretch Amount', amount:" From 814,953 to 914,953 ", name:'Jacob Jones ',date: ' Feb 2, 2023 19:28',  image: '/assets/images/timeline-profile.png', icon:'red-tsg-dot'},
        {country:"Egypt",status: 'Commit', amount:" From 814,953 to 914,953 ", name:'Leslie Alexander ',date: 'Jun 20, 2023 23:14',  image: '/assets/images/time-line2.png', icon:'red-tsg-dot'},
        {country:"East Africa",status: 'Stretch Amount', amount:" From 814,953 to 914,953 ", name:'Jacob Jones ',date: ' Feb 2, 2023 19:28',  image: '/assets/images/timeline-profile.png', icon:'red-tsg-dot'},
        {country:"Egypt",status: 'Commit', amount:" From 814,953 to 914,953 ", name:'Leslie Alexander ',date: 'Jun 20, 2023 23:14',  image: '/assets/images/time-line2.png', icon:'red-tsg-dot'},
        {country:"East Africa",status: 'Stretch Amount', amount:" From 814,953 to 914,953 ", name:'Jacob Jones ',date: ' Feb 2, 2023 19:28',  image: '/assets/images/timeline-profile.png', icon:'red-tsg-dot'},
        {country:"Egypt",status: 'Commit', amount:" From 814,953 to 914,953 ", name:'Leslie Alexander ',date: 'Jun 20, 2023 23:14',  image: '/assets/images/time-line2.png', icon:'red-tsg-dot'},
        {country:"East Africa",status: 'Stretch Amount', amount:" From 814,953 to 914,953 ", name:'Jacob Jones ',date: ' Feb 2, 2023 19:28',  image: '/assets/images/timeline-profile.png', icon:'red-tsg-dot'},
        {country:"Egypt",status: 'Commit', amount:" From 814,953 to 914,953 ", name:'Leslie Alexander ',date: 'Jun 20, 2023 23:14',  image: '/assets/images/time-line2.png', icon:'red-tsg-dot'},
    ];

    const customizedMarker = (item) => {
        return (
            <span className="text-[#029046] text-[10px]">
                <i className={item.icon}></i>
            </span>
        );
    };
    const customizedMarker1 = (item1) => {
        return (
            <span className="text-[#029046] text-[10px]">
                <i className={item1.icon}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
           <>
            <Card>
                <div className='darK:text-[#777C81] text-sm xl:text-[0.833vw] font-normal'>{item.country} <span className='dark:text-[#CACED1] font-semibold'>{item.status}</span> Changed<span className='dark:text-[#CACED1] font-semibold'>{item.amount}</span></div>
                <div className='flex items-center gap-2'>
                    <div><Image src={item.image} alt='timeline-profile' width={'32'} height={'32'} /></div>
                    <div className='dark:text-[#777C81] font-medium text-sm xl:text-[0.781vw] space-x-1'><span className='font-semibold'> {item.name}</span><i className='red-tsg-clock'></i><span>{item.date}</span></div>
                </div>
            </Card>
           
        </> 
        );
    };

    console.log("sales",sales);
    const customizedContent2 = (item1) => {
        return (
           
            <Card>
                
                <div className='darK:text-[#777C81] text-sm xl:text-[0.833vw] font-normal'>Egypt <span className='dark:text-[#CACED1] font-semibold'>Commit</span> Changed From <span className='dark:text-[#CACED1] font-semibold'>814,953 to 914,953</span></div>
                <div className='flex items-center gap-2'>
                    <div><Image src={'/assets/images/time-line2.png'} alt='timeline-profile' width={'32'} height={'32'} /></div>
                    <div className='dark:text-[#777C81] font-medium text-sm xl:text-[0.781vw] space-x-1'><span className='font-semibold'>Leslie Alexander</span><i className='red-tsg-clock'></i><span>Jun 20, 2023 23:14</span></div>
                </div>
            </Card>
            
           
        );
    };
    /*---Timeline Components--*/

  return (    
    <Layout pageTitle="Detailed View" >
      <div className={myinter.className}>
      <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
        <div>
          <Link
            href={"/target/summary"}
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
          >
            Summary View
          </Link>
        </div>
        <div>
          <Link
            href={"/target/detailedview"}
            className="text-[#667085] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:hover:bg-[#01813F] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
          >
            Detailed View
          </Link>
        </div>
        <div>
          <Link
            href={"/target/drilldown"}
            className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
          >
            Drilldown Analysis
          </Link>
        </div>
      </div>
      <div className="rightCopt mr-10 xl:mt-[3.125vw] mt-[50px]">
                  <TimelineComponent />
                </div>
    <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 pb-10">
    <div className=''>
    <div className='bg-white dark:bg-[#14161A] border border-[#C6CBD2] dark:border-[#14161A] rounded-tl-lg rounded-tr-lg px-5 xl:px-[1.250vw] py-2 flex justify-between items-center'>
        <div className='text-[#101828] dark:text-[#CACED1] font-normal text-base xl:text-[0.938vw]'>Cluster</div>
        <div className='flex items-center gap-2'>
            <div className='text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer mr-6 xl:mr-[0.781vw] xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]'><i className='red-tsg-download'></i><span>Export</span></div>
            <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Brand</Link></div>
            <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Vendor</Link></div>
            <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>BU</Link></div>
            <div><Link href={''} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] active-green inline-block'>Cluster</Link></div>
        </div>
    </div>
    <div className='border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css'>
    <DataTable value={sales} footerColumnGroup={footerGroup} scrollable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink PageLinks NextPageLink" className='custpaginator custIcons custmBtnTable custTable custHeader' tableStyle={{width:"92rem"}} >
                <Column field="product" headerClassName='header-filter' header="Cluster Name" style={{width:'10rem'}} />
                <Column field="lastYearSale" sortable header="Sales" body={lastYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearSale" sortable header="Target" body={thisYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="lastYearProfit" sortable header="Achievement" body={lastYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit" sortable header="Stretch Amount" body={CommitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit" sortable header="Target + Stretch" body={thisYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit" sortable header="LTG (Target)" body={thisYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit" sortable header="LTG(Target + Stretch)" body={thisYearProfitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit" sortable header="Commit" body={CommitBodyTemplate} style={{width:'10rem'}} />
                <Column field="thisYearProfit"  header="Action" align='center' body={actionBodyTemplate} style={{width:'10rem'}} />
            </DataTable>
    </div>
    </div>
    {/*--ClusterEdit--*/}
    <Sidebar visible={ClusterEdit} position="right" onHide={() => setClusterEdit(false)} style={{width:'40vw'}} className="timeline-filter-sidebar">
    <div className='xl:p-[1.250vw] p-5'>
    <div className='flex justify-between items-center'>
        <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Edit</div>
        <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setClusterEdit(false)}><i className='red-tsg-close'></i></div>
    </div>
    <div className='xl:mt-[1.250vw] mt-5'>
    <TabView>
                <TabPanel header="Details">
                <DataTable value={sales} footerColumnGroup={footerGroupPopup} rows={9} rowsPerPageOptions={[5, 10, 25, 50]} className='custpaginator custIcons custmBtnTable custTable' tableStyle={{width:"20rem"}} >
                <Column field="product" headerClassName='header-filter' header="Cluster Name" style={{width:'3rem'}} />
                <Column field="thisYearProfit" sortable header="Stretch Amount" body={CommitBodyTemplate} style={{width:'5rem'}} />
                <Column field="thisYearProfit" sortable header="Commit" body={CommitBodyTemplate} style={{width:'5rem'}} />
            </DataTable>
                </TabPanel>
                <TabPanel header="History">
                    <div>
                    <Timeline value={events} marker={customizedMarker} content={customizedContent}  />
                    </div>
                </TabPanel>
            </TabView>
    
    
    </div>
<br/><br/>
    <div className='grid grid-cols-2 gap-3 mt-5'>
        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setClusterEdit(false)}>Cancle</div>
        <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setClusterEdit(false)}>Save</div>
    </div>

    </div>
    </Sidebar>
    {/*--ClusterEdit--*/}

    </div>  
    </div>  
    </Layout>
  );
}