import { fetchGetNotes, fetchInsertNotes } from '@/redux/slice/notes'
import { getCurrentDateTime } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Sidebar } from 'primereact/sidebar'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoaderContainer from '../LoaderContainer'

function Notes(props) {
    const dispatch=useDispatch()
    const GetNotesData = useSelector(state => state.notes.GetNotes);
    const GetNotesDataloading = useSelector(state => state.notes.GetNotesloading);
    const [notesvisible, setnotesvisible] = useState(false);
    const [NewnotesVisible, setNewnotesVisible] = useState(false);
    const [NotesCommentsviewVisible, setNotesCommentsviewVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(false);
    const currentDateTime = getCurrentDateTime();
    const [message, setMessage] = useState("");
    const[selectedNotes,setSelectedNotes]=useState({})
   
    const [usermail, setusermail] = useState("Test.PBI@redingtongroup.com");

    // useEffect(() => {
    //     setusermail(sessionStorage.getItem("userEmailId"))

    // }, []
    // )
    const getEmailName = (email) => email?.substring(0, email?.indexOf("@"));
    let UserUnit = "";
    var userinfo = usermail
    var PickLetter = userinfo?.match(/\b(\w)/g)
    var acronym = PickLetter?.join(''); // JSON
    UserUnit = acronym?.slice(0, 1);

   

    const handleSave = (e) => {
        e.preventDefault()
        let userEmailId = localStorage.getItem("userEmailId")
       

        dispatch(fetchInsertNotes(
            {
                "elasticQueryName": "Insert Notes",
                "analytic_Id": `'${props.tabName}'`,
                "userEmailID": `'Test.PBI@redingtongroup.com'`,
                "dynamicColumns": [{ columnName: "#{updated_time}", columnValue: `'${currentDateTime}'` },{ columnName: "#{title}", columnValue: `'${title}'` }],
                "notes": `'${message}'`,
            }
        ));
       
        setTimeout(() => {
            dispatch(fetchGetNotes(
                {
                    "elasticQueryName": "GetNotes",
                    "analytic_Id": `'${props.tabName}'`,
                    "userEmailID": `'Test.PBI@redingtongroup.com'`,
                    "dynamicColumns": [],
                }
            ));
      
        }, 1000); 
        setTitle("")
        setMessage("")
    };

    useEffect(() => {
        let userEmailId = localStorage.getItem("userEmailId")

        dispatch(fetchGetNotes(
            {
                "elasticQueryName": "GetNotes",
                "analytic_Id": `'${props.tabName}'`,
                "userEmailID": `'Test.PBI@redingtongroup.com'`,
                "dynamicColumns": [],
            }
        ));
    }, [props.tabName])
    return (
        <div>
            <div className="relative">
                <Link
                    href={""}
                    className="bg-[#F2EFEB] dark:bg-[#1D2426] border border-[#EAE7E5] dark:border-[#1D2426] text-[#363A44]
                   dark:text-[#C6CBD2] font-medium text-xs xl:text-[0.829vw] p-1 xl:p-[0.517vw] rounded-md space-x-2"
                    onClick={() => setnotesvisible(true)}
                >
                    <i className="red-tsg-notepad text-md dark:text-[#C6CBD2]"></i>
                    <span>Notes</span>
                </Link>
                <span className="bg-green-500 rounded-full w-5 h-5 flex items-center justify-center font-medium text-[9px] text-white absolute -top-4 -right-2">
                {GetNotesData.length}
                </span>
            </div>
            {/*---NotesVisible-----*/}
            <Sidebar 
           
                visible={notesvisible}
                position="right"
                onHide={() => setnotesvisible(false)}
                className="NotesVisible"
            >
                <div className="pt-[0.990vw] pl-[0.990vw] pb-[0.990vw] pr-[0.677vw] relative h-full bg-white dark:bg-[#0F1013]">
                    <div >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => setnotesvisible(false)}
                                    className="cursor-pointer"
                                >
                                    <i className="sig-rectangle-back text-lg dark:text-[#363A44] text-white"></i>
                                </div>
                                <div>
                                    <div className="text-[#363A44] dark:text-white font-medium text-sm xl:text-[0.938vw]">
                                        Notes
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link
                                    href={""}
                                    className="text-white font-medium text-xs xl:text-[0.729vw] bg-[#029046] py-2 xl:py-[0.625vw] px-7 xl:px-[0.967vw] rounded-[10px] inline-block box-shadow01"
                                    onClick={() => setNewnotesVisible(true)}
                                >
                                    Create New
                                </Link>
                            </div>
                        </div>

                        <div className="mt-5 xl:mt-[1.250vw]">
                            <div className="flex gap-2 items-center">
                                <div>
                                    <Link
                                        href={""}
                                        className="text-white font-medium text-xs xl:text-[0.729vw] dark:text-white bg-[#344054] dark:bg-[#344054] py-2 xl:py-[0.625vw] px-3 xl:px-[0.833vw] rounded-[8px] inline-block"
                                    >
                                        All Notes
                                    </Link>
                                </div>
                                {/* <div>
                                    <Link
                                        href={""}
                                        className="text-[#363A44] dark:text-[#98A2B3] font-medium text-xs xl:text-[0.729vw]  py-2 xl:py-[0.625vw] px-3 xl:px-[0.833vw] rounded-[8px] inline-block border dark:border-[#344054]"
                                    >
                                        My Personal Notes
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                        <LoaderContainer loading={GetNotesDataloading}>
                        <div className="xl:mt-[1.510vw] mt-5 space-y-3">
                           {GetNotesData.length==0?<div className='ml-[40%] mt-[50%] dark:text-[#fff] text-dark font-medium text-sm xl:text-[0.938vw]'>No Data</div>
                           :GetNotesData?.map(item=>{
                           return<div
                                className="dark:bg-[#171618] bg-[#F2EFEB] rounded-lg p-3 xl:p-[0.833vw] cursor-pointer"
                                onClick={() => {setNotesCommentsviewVisible(true);setSelectedNotes(item)}}
                            >
                                <div className="flex items-center gap-4 pb-2 xl:pb-[0.573vw]">
                                    <div>
                                        {/* <Image
                                            src={"/assets/images/user1.png"}
                                            width={"40"}
                                            height={"40"}
                                            className="w-full"
                                            alt=""
                                        /> */}
                                        <div className="mx-1 " style={{ cursor: 'pointer', width: 30, height: 30, backgroundColor: '#5e656d', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ marginTop:2,fontSize: 18, color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center',textTransform:'uppercase' }}>{UserUnit}</span>
                               
                     </div>
                                    </div>
                                    <div>
                                        <div className="dark:text-[#fff] text-dark font-medium text-sm xl:text-[0.938vw]">
                                            {getEmailName(item.UserName)}
                                        </div>
                                        <div className="dark:text-[#667085] text-dark font-normal text-xs xl:text-[0.625vw]">
                                            {/* Sale Executive */}
                                        </div>
                                    </div>
                                </div>
                                <div className="dark:text-[#98A2B3] text-dark font-normal text-xs xl:text-[0.625vw] pb-2 xl:pb-[0.573vw] border-b dark:border-[#98A2B3]">
                                    <p>
                                       {item.Title}
                                    </p>
                                </div>
                                <div className="space-x-1 mt-1">
                                    <span className="dark:text-[#667085] text-dark font-normal text-xs xl:text-[0.625vw]">
                                        Created on:
                                    </span>
                                    <span className="dark:text-[#667085] text-gray-400 font-semibold text-xs xl:text-[0.625vw]">
                                        {item.UpdatedTime}
                                    </span>
                                </div>
                            </div>})}
                           
                        </div>
                        </LoaderContainer>
                        <div className="mt-[80%] w-full xl:w-[24.896vw]">
                            <div className="">
                                <div className="w-full">
                                    <Link
                                        href={""}
                                        onClick={() => setnotesvisible(false)}
                                        className="dark:text-[#9EA0A5] font-normal text-xs xl:text-[0.729vw] py-2 xl:py-[0.725vw] px-6 xl:px-[1.667vw] rounded-md box-shadow01 border dark:border-[#C6CBD233] flex justify-center"
                                    >
                                        Close
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
            {/*---NotesVisible-----*/}

            {/*---NotesCommentsviewVisible-----*/}
            <Sidebar
                visible={NotesCommentsviewVisible}
                position="right"
                onHide={() => setNotesCommentsviewVisible(false)}
                className="NotesVisible "
            >
                <div className='h-[100%]'>
                    <div className="pt-[0.990vw] pl-[0.990vw] pb-[0.990vw] pr-[0.677vw] relative h-[100%] bg-white dark:bg-[#0F1013]">
                        <div className="flex justify-between items-center">

                            <div className="text-[#363A44] dark:text-white font-medium text-sm xl:text-[0.938vw]">
                                All Notes
                            </div>
                            <div className="">
                                <div>
                                    <Link
                                        href={""}
                                        onClick={() => setNotesCommentsviewVisible(false)}
                                        className="text-white font-medium text-xs xl:text-[0.729vw] bg-[#344054] py-2 xl:py-[0.625vw] px-7 xl:px-[0.967vw] rounded-[10px] inline-block box-shadow01"
                                    >
                                        <i className="red-tsg-back-line-arrow mr-2"></i>
                                        <span>Back to Notes</span>
                                    </Link>
                                </div>
                            </div>

                        </div>

                        <div className="xl:mt-[1.344vw] mt-5 px-5 xl:px-[1.042vw] space-y-3 xl:space-y-[1.146vw]">
                            <div className="flex gap-4">
                                <div>
                                    {/* <Image
                                        src={"/assets/images/profile.png"}
                                        width={"40"}
                                        height={"40"}
                                        className="w-full"
                                        alt=""
                                    /> */}
                                    <div className="mx-1 " style={{ cursor: 'pointer', width: 30, height: 30, backgroundColor: '#5e656d', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <span style={{ marginTop:2,fontSize: 18, color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center',textTransform:'uppercase' }}>{UserUnit}</span>
                                                
                                        </div>
                                </div>
                                <div>
                                    <div className="dark:text-[#fff] text-gray-400 font-medium text-base xl:text-[0.938vw]">
                                       {getEmailName(selectedNotes?.UserName)}
                                    </div>
                                    <div className="dark:text-[#667085] text-gray-400 font-normal text-xs xl:text-[0.625vw]">
                                        {/* Sale Executive */}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="dark:text-[#98A2B3] text-gray-400 font-normal text-xs xl:text-[0.625vw] leading-4">
                                    <p>
                                        {selectedNotes?.Notes}
                                    </p>                                    
                                </div>
                            </div>
                            {/* <div>
                                <Link
                                    href={""}
                                    className="dark:text-[#fff] text-gray-400 font-medium text-xs xl:text-[0.729vw] dark:bg-[#344054] bg-[#172133] rounded-[8px] py-2 xl:py-[0.625vw] px-7 xl:px-[0.867vw] inline-block space-x-2"
                                > <i className="red-tsg-comment"></i>
                                    <span>Comment</span>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Sidebar>
            {/*---NotesCommentsviewVisible-----*/}

            {/*---NewNotesVisible-----*/}
            <Sidebar
                visible={NewnotesVisible}
                position="right"
                onHide={() => setNewnotesVisible(false)}
                className="NotesVisible"
            >
                <div className="pt-[0.990vw] pl-[0.990vw] pb-[0.990vw] pr-[0.677vw] relative h-full bg-white dark:bg-[#0F1013]">
                    <div>

                        <div className="flex justify-between items-center">

                            <div className="text-[#363A44] dark:text-white font-bold text-sm xl:text-[0.938vw]">
                              Create New
                            </div>
                            <div className="">
                                <div>
                                    <Link
                                        href={""}
                                        onClick={() => setNewnotesVisible(false)}
                                        className="text-white font-medium text-xs xl:text-[0.729vw] bg-[#344054] py-2 xl:py-[0.625vw] px-7 xl:px-[0.967vw] rounded-[10px] inline-block box-shadow01"
                                    >
                                        <i className="red-tsg-back-line-arrow mr-2"></i>
                                        <span>Back to Notes</span>
                                    </Link>
                                </div>
                            </div>

                        </div>


                        <div className="xl:mt-[2.344vw] mt-5 px-5 xl:px-[1.042vw] space-y-3 xl:space-y-[0.938vw]">
                            <div className="flex gap-4">
                                <div>
                                    {/* <Image
                                        src={"/assets/images/profile.png"}
                                        width={"40"}
                                        height={"40"}
                                        className="w-full"
                                        alt=""
                                    /> */}
                                    <div className="mx-1 " style={{ cursor: 'pointer', width: 30, height: 30, backgroundColor: '#5e656d', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{ marginTop:2,fontSize: 18, color: 'white', fontWeight: 500, display: 'flex', alignItems: 'center',textTransform:'uppercase' }}>{UserUnit}</span>
                                            
                                    </div>
                                </div>
                                <div>
                                    <div className="dark:text-[#fff] text-gray-400 font-medium text-base xl:text-[0.938vw]">
                                       {getEmailName(usermail)}
                                    </div>
                                    <div className="dark:text-[#667085] text-gray-400 font-normal text-xs xl:text-[0.625vw]">
                                        {/* Sale Executive */}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="dark:text-[#98A2B3] text-gray-400 font-medium text-xs xl:text-[0.729vw]"
                                    >
                                        Title
                                    </label>
                                </div>
                                <div>
                                    <InputText
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Type here"
                                        required
                                        className="w-full custinputtext xl:h-[2.292vw] h-auto"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="dark:text-[#98A2B3] text-gray-400 font-medium text-xs xl:text-[0.729vw]"
                                    >
                                        Content
                                    </label>
                                </div>
                                <div>
                                    <InputTextarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={5}
                                        cols={30}
                                        required
                                        placeholder="Enter a description..."
                                        className="w-full custinputtext h-[20rem]"
                                    />
                                </div>

                                <div className='mt-[10px]'>

                                <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Comments</span>
</label>
                                    </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3">
                                    {/* <div>
                                        <InputSwitch
                                            checked={checked}
                                            onChange={(e) => setChecked(e.value)}
                                            className="CustSwitch"
                                        />
                                    </div>
                                    <div className="dark:text-[#98A2B3] text-gray-400 font-medium text-sm xl:text-[0.833vw]">
                                        Comments Enabled
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="mt-[40%] w-full xl:w-[24.896vw]">
                            <div className="grid grid-cols-2 gap-[24px] xl:gap-[1.250vw]">

                                <Link
                                    href={""}
                                    onClick={() => setNewnotesVisible(false)}
                                    className="dark:text-[#9EA0A5] font-normal text-xs xl:text-[0.729vw] py-2 xl:py-[0.725vw] px-6 xl:px-[1.667vw] rounded-md box-shadow01 border dark:border-[#C6CBD233] text-center "
                                >
                                    Cancel
                                </Link>


                                <Link
                                    href={""}
                                    onClick={(e)=>{ handleSave(e);setNewnotesVisible(false)}}
                                    className="dark:text-[#fff] text-[#fff] dark:bg-[#029046] bg-[#029046] font-normal text-xs xl:text-[0.729vw] py-2 xl:py-[0.725vw] px-6 xl:px-[1.667vw] rounded-md box-shadow01 border dark:border-[#C6CBD233] text-center"
                                >
                                    Create
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
            {/*---NewNotesVisible-----*/}

        </div>
    )
}

export default Notes
