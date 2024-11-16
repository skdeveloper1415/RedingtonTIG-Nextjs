import { setState } from '@/redux/slice/globalState';
import { Sidebar } from 'primereact/sidebar'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function AppliedFilter(props) {
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState(false);
    const router = useRouter();
    const AppliedFilters = useSelector(state => state.global.AppliedFilters)

    const[appliedYears,setAppliedYears]=useState(AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALYEAR")?.[0]?.["columnValue"]||[]);
    const[appliedQuarters,setAppliedQuarters]=useState(AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALQUARTER")?.[0]?.["columnValue"]||[]);
    const[appliedMonths,setAppliedMonths]=useState(AppliedFilters?.filter(item=>item["columnName"]=="CALENDARMTH")?.[0]?.["columnValue"]||[]);
    const[appliedWeeks,setAppliedWeeks]=useState(AppliedFilters?.filter(item=>item["columnName"]=="WEEK_DAY")?.[0]?.["columnValue"]||[]);

    useEffect(()=>{
        setAppliedYears(AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALYEAR")?.[0]?.["columnValue"]||[])
        setAppliedQuarters(AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALQUARTER")?.[0]?.["columnValue"]||[])
        setAppliedMonths(AppliedFilters?.filter(item=>item["columnName"]=="CALENDARMTH")?.[0]?.["columnValue"]||[])
        setAppliedWeeks(AppliedFilters?.filter(item=>item["columnName"]=="WEEK_DAY")?.[0]?.["columnValue"]||[])
    },[AppliedFilters])
    // let appliedYears=AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALYEAR")?.[0]?.["columnValue"]||[]  
    // let appliedQuarters=AppliedFilters?.filter(item=>item["columnName"]=="FINANCIALQUARTER")?.[0]?.["columnValue"]||[] 
    // let appliedMonths=AppliedFilters?.filter(item=>item["columnName"]=="CALENDARMTH")?.[0]?.["columnValue"]||[]  
    // let appliedWeeks=AppliedFilters?.filter(item=>item["columnName"]=="Week")?.[0]?.["columnValue"]||[]
    
    const onYearsChange = (e) => {
        let _selectedYears = [... props.selectedYears];
        let _appliedYears = [... appliedYears];  
           
            _selectedYears.splice(_selectedYears.indexOf(e), 1);
            _appliedYears.splice(_appliedYears.indexOf(e), 1);

            setAppliedYears(_appliedYears);
            props.setSelectedYears(_selectedYears);     

    };

    const onMonthsChange = (e) => {
        let _selectedMonths = [... props.selectedMonths];
        let _appliedMonths = [... appliedMonths]; 

        _selectedMonths.splice(_selectedMonths.indexOf(e), 1);
        _appliedMonths.splice(_appliedMonths.indexOf(e), 1);

        setAppliedMonths(_appliedMonths);
         props.setSelectedMonths(_selectedMonths);
       
    };

    const onQuartersChange = (e) => {
        let _selectedQuarters = [... props.selectedQuarters];
        let _appliedQuarters = [... appliedQuarters]; 

           _selectedQuarters.splice(_selectedQuarters.indexOf(e), 1);
           _appliedQuarters.splice(_appliedQuarters.indexOf(e), 1);

           setAppliedQuarters(_appliedQuarters);
            props.setSelectedQuarters(_selectedQuarters);
        
    };
    const onWeeksChange = (e) => {
        let _selectedWeeks = [... props.selectedWeeks];
        let _appliedWeeks = [... appliedWeeks]; 

             _selectedWeeks.splice(_selectedWeeks.indexOf(e), 1);
             _appliedWeeks.splice(_appliedWeeks.indexOf(e), 1);

             setAppliedWeeks(_appliedWeeks);
             props.setSelectedWeeks(_selectedWeeks);
        
    };
  
  return (
    <div>
       <Sidebar
          visible={props.AppliedFilters}
          position="right"
          onHide={() => props.setAppliedFilters(false)}
          style={{ width: "34vw" }}
          className="timeline-filter-sidebar"
        >
          <div className="xl:p-[1.250vw] p-5 relative h-full">
            <div className="flex justify-between items-center">
              <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw]">
                Applied Filters
              </div>
              <div
                className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                onClick={() => props.setAppliedFilters(false)}
              >
                <i className="red-tsg-close"></i>
              </div>
            </div>
            <div style={{minHeight:"500px"}} className="xl:mt-[1.250vw] mt-5">
              {/*checkbox Start*/}
             {appliedYears.length? <div className="mt-5">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Financial Year
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                  {appliedYears?.map(item=>{
                  return<div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={()=>onYearsChange(item)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>{item}</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  })}
                 
                </div>
              </div>:null}
              {/*checkbox end*/}
              {/*checkbox Start*/}
              {appliedQuarters.length?<div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Quarter
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                {appliedQuarters?.map(item=>{
                  return<div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => onQuartersChange(item)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>{item}</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  })}
                
                </div>
              </div>:null}
              {/*checkbox end*/}
              {/*checkbox Start*/}
              {appliedMonths.length?<div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Month
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                {appliedMonths?.map(item=>{
                  return<div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() =>onMonthsChange(item)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>{item}</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  })}
                 
                </div>
              </div>:null}
              {/*checkbox end*/}
              {/*checkbox Start*/}
              {
                router.pathname !==  '/backlog/drilldown'?
                <>
                {props.showWeekFilter &&appliedWeeks.length?
             <div className="mt-8">
                <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                  Week
                </div>
                <div className="mt-3 flex flex-wrap gap-4">
                {appliedWeeks?.map(item=>{
                  return<div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" onClick={() => onWeeksChange(item)}>
                    <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.729vw]"><span>Week {item}</span></div>
                    <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                      <i className="red-tsg-close"></i></div>
                  </div>
                  })}
                  
                </div>
              </div>:null}
                </>:null
              }
             
              {/*checkbox end*/}
            </div>

            <div className=" w-12/12 mt-[20%]">
              <div className="grid grid-cols-2 gap-3 mt-5">
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={() => props.setTimelinefilter(true)}
                >
                  Edit Filter
                </div>
                <div
                  className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                  onClick={props.appliedFilterFun}
                >
                  Apply Filter
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
    </div>
  )
}

export default AppliedFilter
