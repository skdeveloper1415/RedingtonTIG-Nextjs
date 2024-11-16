import { useRouter } from 'next/router';
import { Sidebar } from 'primereact/sidebar'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "primereact/checkbox";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBacklog_Timeline_Filter } from '@/redux/slice/filter';
import { setState } from '@/redux/slice/globalState';
import AppliedFilter from '../AppliedFilter';

function TimelineFilter(props) {
    const { showWeekFilter = true } = props
    const router = useRouter();
    const dispatch = useDispatch();
    const [trigger, setTrigger] = useState(true);
    const AppliedFilters = useSelector(state => state.global.AppliedFilters)  

    const filter_data = useSelector(state => state.filter.Backlog_Timeline_Filter)
    var today = new Date();    
    var month = today.getMonth()+1;
    var year = today.getFullYear()
    let currentYear;
    if (month >= 1 && month <= 3) {
        currentYear = year;
    } else {
        currentYear = year+1;
    }
    const monthOrder = {
        "April": 0,
        "May": 1,
        "June": 2,
        "July": 3,
        "August": 4,
        "September": 5,
        "October": 6,
        "November": 7,
        "December": 8,
        "January": 9,
        "February": 10,
        "March": 11,
    };
const quarterOrder={
    "Q1":0,
    "Q2":1,
    "Q3":2,
    "Q4":3,
}
    const [selectedYears, setSelectedYears] = useState([currentYear]);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedQuarters, setSelectedQuarters] = useState([]);
    const [selectedWeeks, setSelectedWeeks] = useState([]);
    const quarter_data=filter_data.length==0?[]:filter_data?.filter(item=>{
        const year_Match=selectedYears.length==0||selectedYears.includes(item.Year)
        return year_Match
    })
    const month_data=filter_data.length==0?[]:filter_data?.filter(item=>{ 
              
        const quarter_Match=selectedQuarters.length==0||selectedQuarters.includes(item.Quarter)
        return quarter_Match
    })

    // const week_data=filter_data.length==0?[]:filter_data?.filter(item=>{ 
              
    //     const week_Match=selectedWeeks.length==0||selectedWeeks.includes(item.WEEK_DAY)
    //     return week_Match
    // })
   
    let yearOptions = [...new Set(filter_data?.map(item => item.Year))]?.sort((a, b) => b - a);
    let quarterOptions = [...new Set(quarter_data?.map(item => item.Quarter))]?.sort((a, b) => quarterOrder[a] - quarterOrder[b])
    let monthOptions = [...new Set(month_data?.map(item => item.Month))]?.sort((a, b) => monthOrder[a] - monthOrder[b])
    let weekOptions = [...new Set(filter_data?.map(item => "Week"+' '+item.WEEK_DAY))].sort((a, b) => {
        const numA = parseInt(a.replace("Week ", ""));
        const numB = parseInt(b.replace("Week ", ""));
        return numA - numB;
      });
    // ?.sort(function(a, b){return a-b})

    console.log("weekOptions",weekOptions)


    

    const onYearsChange = (e) => {
        let _selectedYears = [...selectedYears];

        if (e.value == "All") {

            if (e.checked) _selectedYears = yearOptions;
            else _selectedYears = [];
            setSelectedYears(_selectedYears);

        } else {
            if (e.checked) _selectedYears.push(e.value);
            else _selectedYears.splice(_selectedYears.indexOf(e.value), 1);

            setSelectedYears(_selectedYears);

        }

    };

    const onMonthsChange = (e) => {
        let _selectedMonths = [...selectedMonths];
        if (e.value == "All") {

            if (e.checked) _selectedMonths = monthOptions;
            else _selectedMonths = [];
            setSelectedMonths(_selectedMonths);

        } else {

            if (e.checked) _selectedMonths.push(e.value);
            else _selectedMonths.splice(_selectedMonths.indexOf(e.value), 1);

            setSelectedMonths(_selectedMonths);
        }
    };

    const onQuartersChange = (e) => {
        let _selectedQuarters = [...selectedQuarters];
        if (e.value == "All") {

            if (e.checked) _selectedQuarters = quarterOptions;
            else _selectedQuarters = [];
            setSelectedQuarters(_selectedQuarters);

        } else {
            if (e.checked) _selectedQuarters.push(e.value);
            else _selectedQuarters.splice(_selectedQuarters.indexOf(e.value), 1);

            setSelectedQuarters(_selectedQuarters);
        }
    };
    const onWeeksChange = (e) => {
        let _selectedWeeks = [...selectedWeeks];
        if (e.value == "All") {

            if (e.checked) _selectedWeeks = weekOptions;
            else _selectedWeeks = [];
            setSelectedWeeks(_selectedWeeks);

        } else {
            if (e.checked) _selectedWeeks.push(e.value);
            else _selectedWeeks.splice(_selectedWeeks.indexOf(e.value), 1);

            setSelectedWeeks(_selectedWeeks);
        }
    };



    useEffect(() => {
        // let userEmailId = sessionStorage.getItem("userEmailId")
        dispatch(fetchBacklog_Timeline_Filter({
            "elasticQueryName": "",
            "filters": [],
            "dynamicColumns": [],
            "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
            "userEmail": "Test.PBI@redingtongroup.com"
        }))

    }, []);

    const handelAppliedFilters = () => {
        let appliedFilterArrays = [];

        if (selectedYears.length != 0) {
            appliedFilterArrays.push({
                "columnName": "FINANCIALYEAR",
                "columnValue": selectedYears,
                "excludeKeyword": false
            })
        }
        if (selectedMonths.length != 0) {
            appliedFilterArrays.push({
                "columnName": "CALENDARMTH",
                "columnValue": selectedMonths,
                "excludeKeyword": false
            })
        }
        if (selectedQuarters.length != 0) {
            appliedFilterArrays.push({
                "columnName": "FINANCIALQUARTER",
                "columnValue": selectedQuarters,
                "excludeKeyword": false
            })
        }
        if (selectedWeeks.length != 0) {
            const modifiedselectedWeeksArray = selectedWeeks.map((item) => item.replace("Week ", ""));
            appliedFilterArrays.push({
                "columnName": "WEEK_DAY",
                "columnValue": modifiedselectedWeeksArray,
                "excludeKeyword": false
            })
        }

        return appliedFilterArrays
    }

    const appliedFilterFun = (event) => {
        event.preventDefault();
        dispatch(setState({ AppliedFilters: handelAppliedFilters() }))

        setTrigger(!trigger)
        dispatch(setState({ Trigger: trigger }))

        setTimeout(() => {
            props.setTimelinefilter(false)
        }, 1000)

    }
    const handelClear = (event) => {
        event.preventDefault();
        setSelectedYears([currentYear])
        setSelectedMonths([]) 
        setSelectedQuarters([])
        setSelectedWeeks([])

        dispatch(setState({ AppliedFilters: [{
            "columnName": "FINANCIALYEAR",
            "columnValue": selectedYears,
            "excludeKeyword": false
        }]}))
        setTrigger(!trigger)
        dispatch(setState({ Trigger: trigger }))

        setTimeout(() => {
            props.setTimelinefilter(false)
        }, 1000)
    }

   

    return (
        <div>
            <Sidebar
                visible={props.Timelinefilter}
                position="right"
                onHide={() => props.setTimelinefilter(false)}
                className="timeline-filter-sidebar"
            >
                <div className="xl:p-[1.250vw] p-5 relative h-[100%]">
                    <div className="flex justify-between items-center">
                        <div className="text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.458vw] h-[10%]">
                            Timeline Filter
                        </div>
                        <div
                            className="bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 xl:px-[] py-1 xl:py-[] cursor-pointer xl:w-[1.667vw] xl:h-[1.667vw] flex items-center justify-center text-[10px]"
                            onClick={() => props.setTimelinefilter(false)}
                        >
                            <i className="red-tsg-close"></i>
                        </div>
                    </div>
                    <div style={{minHeight:"500px"}} className="xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3 border border-[#E4E7EC] dark:border-[#171618] dark:bg-[#171618] rounded ">
                        {/*checkbox Start*/}
                        <div className="font-medium xl:text-[0.729vw] text-xs text-[#344054] dark:text-[#667085]">
                            Financial Year
                        </div>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
                            <div className="flex items-center">
                                <Checkbox
                                    inputId=""
                                    name={"All"}
                                    value={"All"}
                                    onChange={onYearsChange}
                                    checked={yearOptions.every((value) => selectedYears.includes(value))}
                                />
                                <label
                                    htmlFor=""
                                    className="ml-2 font-bold text-xs xl:text-[0.729vw]"
                                >
                                    {"All"}
                                </label>
                            </div>
                            {yearOptions?.map(item => {
                                return <div className="flex items-center">
                                    <Checkbox
                                        inputId=""
                                        name={item}
                                        value={item}
                                        onChange={onYearsChange}
                                        checked={selectedYears.includes(item)}
                                    />
                                    <label
                                        htmlFor=""
                                        className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                                    >
                                        {item}
                                    </label>
                                </div>
                            })}

                        </div>
                        {/*checkbox end*/}

                        {/*checkbox Start*/}
                        <div className="mt-8">
                            <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                Select Quarter
                            </div>
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085]">
                                <div className="flex items-center">
                                    <Checkbox
                                        inputId=""
                                        name={"All"}
                                        value={"All"}
                                        onChange={onQuartersChange}
                                        checked={quarterOptions.every((value) => selectedQuarters.includes(value))}
                                    />
                                    <label
                                        htmlFor=""
                                        className="ml-2 font-bold text-xs xl:text-[0.729vw]"
                                    >
                                        {"All"}
                                    </label>
                                </div>
                                {quarterOptions?.map(item => {
                                    return <div className="flex items-center">
                                        <Checkbox
                                            inputId=""
                                            name={item}
                                            value={item}
                                            onChange={onQuartersChange}
                                            checked={selectedQuarters.includes(item)}
                                        />
                                        <label
                                            htmlFor=""
                                            className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                                        >
                                            {item}
                                        </label>
                                    </div>
                                })}

                            </div>
                        </div>
                        {/*checkbox end*/}
                        {/*checkbox Start*/}
                        <div className="mt-8">
                            <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                Select Month
                            </div>
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
                                <div className="flex items-center">
                                    <Checkbox
                                        inputId=""
                                        name={"All"}
                                        value={"All"}
                                        onChange={onMonthsChange}
                                        checked={monthOptions.every((value) => selectedMonths.includes(value))}
                                    />
                                    <label
                                        htmlFor=""
                                        className="ml-2 font-bold text-xs xl:text-[0.729vw]"
                                    >
                                        {"All"}
                                    </label>
                                </div>
                                {monthOptions?.map(item => {
                                    return <div className="flex items-center">
                                        <Checkbox
                                            inputId=""
                                            name={item}
                                            value={item}
                                            onChange={onMonthsChange}
                                            checked={selectedMonths.includes(item)}
                                        />
                                        <label
                                            htmlFor=""
                                            className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                                        >
                                            {item}
                                        </label>
                                    </div>
                                })}

                            </div>
                        </div>
                        {/*checkbox end*/}
                        {/*checkbox Start*/}
                        {router.pathname !==  '/backlog/drilldown' ? <div className="mt-8">
                            {showWeekFilter && <><div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                Select Week
                            </div>
                                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-[1.042vw] text-[#344054] dark:text-[#667085] ">
                                    <div className="flex items-center">
                                        <Checkbox
                                            inputId="ingredient1"
                                            name={"All"}
                                            value={"All"}
                                            onChange={onWeeksChange}
                                            checked={weekOptions.every((value) => selectedWeeks.includes(value))}
                                        />
                                        <label
                                            htmlFor="ingredient1"
                                            className="ml-2 font-bold text-xs xl:text-[0.729vw]"
                                        >
                                            {"All"}
                                        </label>
                                    </div>
                                    {weekOptions?.map(item => {
                                        return <div className="flex items-center">
                                            <Checkbox
                                                inputId="ingredient1"
                                                name={item}
                                                value={item}
                                                onChange={onWeeksChange}
                                                checked={selectedWeeks.includes(item)}
                                            />
                                            <label
                                                htmlFor="ingredient1"
                                                className="ml-2 font-medium text-xs xl:text-[0.729vw]"
                                            >
                                                {item}
                                            </label>
                                        </div>
                                    })}

                                </div></>}
                        </div>:null}
                        
                        {/*checkbox end*/}
                    </div>
                    <div className={` lg:w-12/12 mt-[20%]`}>
                        <div className="grid grid-cols-2 gap-3 mt-5">
                            <div
                                className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                                onClick={handelClear}
                            >
                                Clear Filter
                            </div>
                            <div
                                className="rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] text-[#FFFFFF] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer"
                                onClick={appliedFilterFun}
                            >
                                Apply Filter
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
            <AppliedFilter 
            AppliedFilters={props.AppliedFilters} 
            setAppliedFilters={props.setAppliedFilters}
            setTimelinefilter={props.setTimelinefilter}
            showWeekFilter={showWeekFilter}
            selectedYears={selectedYears}
            selectedMonths={selectedMonths}
            selectedQuarters={selectedQuarters}
            selectedWeeks={selectedWeeks}
           
            setSelectedYears={setSelectedYears}           
            setSelectedMonths= {setSelectedMonths}
            setSelectedQuarters={setSelectedQuarters}
            setSelectedWeeks={setSelectedWeeks}

            appliedFilterFun={()=>appliedFilterFun()}
            />
            

        </div>
    )
}

export default TimelineFilter
