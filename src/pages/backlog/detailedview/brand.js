import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import Layout from '../../../components/layout/layout';
import { Inter } from '@next/font/google';
import TimelineComponent from "@/components/TimelineComponent";
import CustomTable from "../../../components/custom-table-component/index"
import {
  MinusCircleOutlined, PlusCircleOutlined,PlusOutlined,MinusOutlined
} from "@ant-design/icons";
import { Table, Typography, Select } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { fetchBacklog_BU_DetailView,fetchBacklog_Cluster_DetailView,fetchBacklog_Brand_DetailView} from "@/redux/slice/backlog";
import { toMillion,toMillionRounded } from '../../../utils/CurrencyUTIL';
import ExcelDownloader from '@/components/Downloader/ExcelDownloader';
const { Text } = Typography;
import LoaderContainer from "@/components/LoaderContainer";

const myinter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
})
        
        

export default function Index() {
    /*--checkbox--*/

      const dispatch = useDispatch()
      const AppliedFilters = useSelector(state => state.global.AppliedFilters) 
      const Trigger = useSelector(state => state.global.Trigger) 
      const Backlog_BU_DetailView = useSelector(state => state.backlog.Backlog_BU_DetailView);
      const Backlog_Cluster_DetailView = useSelector(state => state.backlog.Backlog_Cluster_DetailView);
      const Backlog_Brand_DetailView = useSelector(state => state.backlog.Backlog_Brand_DetailView);
      const Backlog_Brand_DetailViewloading = useSelector(state => state.backlog.Backlog_Brand_DetailViewloading);


    const [Metrics, setMetrics] = useState({ name: 'Backlog', code: 'round(sum("OPENPOVALUE"),2)' })
    const [DrillData, setDrillData] = useState({ name: 'All', code: 'All' })
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


    useEffect(() => {
      // let userEmailId = sessionStorage.getItem("userEmailId")
      const body = {
        "elasticQueryName": "",
        "filters": AppliedFilters || [] ,
        "dynamicColumns": [{ columnName: "#{selectmetric}", columnValue: Metrics.code }], 
        "freqFilter": ["NETSALES_FP", "NETSALES_PREV_FP"],
        "userEmail": "Test.PBI@redingtongroup.com"
      };
      handleChangefilter(body, "Test.PBI@redingtongroup.com")
    }, [Trigger,Metrics]);
  
    const handleChangefilter = (body, userEmailId) => {
      // dispatch(fetchBacklog_BU_DetailView(body))
      // dispatch(fetchBacklog_Cluster_DetailView(body))
      dispatch(fetchBacklog_Brand_DetailView(body))
    }



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
            <div><Link href={'/backlog/detailedview/ibudetail'} className='flex items-center space-x-2'><i className='red-tsg-plus text-[#344054]'></i><span>IBU</span></Link></div>
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

  const Drill = [
    { name: "All", code: "All" },
    { name: "Brand", code: "Brand" },
    { name: "Vendor", code: "Vendor" },
  ];
  /*--prime-select--*/

  const Metricsdata = [
    { name: "Backlog", code: 'round(sum("OPENPOVALUE"),2)'},
    { name: "Inventory", code: 'round(sum("INVENTORYVALUE"),2)' },
    { name: "Backlog & Inventory", code: 'round(sum("OPENPOVALUE"+"INVENTORYVALUE"),2)' },
    // { name: "Bookinv", code: "Pending Transactions" },
  ]

  const [name, setName] = useState('BRAND')

   const getPivotChartArray = (data = [], row, column, value, addRow, financialYear) => {

    var item = data.reduce((a, b) => {
      a[b[row]] = a[b[row]] || [];
      var obj = {};
      obj[addRow] = b[addRow] ? b[addRow] : 0;
      addRow
        ? a[b[row]].push({ ...obj, ...{ [b[column]]: (b[value]) } })
        : a[b[row]].push({ ...{ [b[column]]: (b[value]) } });
      return a;
    }, {});
  
  
    var array = Object.keys(item).map(function (k) { 
      return { [row]: k, ...Object.assign.apply({}, item[k]) };
    });
    return array.sort();
  };

  function customGroupBy(array, fields, sumFields) {
    const map = new Map();
    array.forEach(a => {
      const keyVal = fields.map(field => a[field]).join('_');
      const keyObj = {};
      fields.map(field => { keyObj[field] = a[field] });
      if (map.has(keyVal)) {
        const tmp = map.get(keyVal);
        sumFields.forEach(sumField => tmp[sumField] += a[sumField]);
        map.set(keyVal, tmp);

      } else {
        sumFields.forEach(sumField => keyObj[sumField] = a[sumField]);
        map.set(keyVal, keyObj)
      }
    });
    return Array.from(map.values());
  }

  let Backlog_Brand_DetailViewData = customGroupBy(Backlog_Brand_DetailView, ['Week_Day', 'BRAND'], ['Total'])
  let Backlog_Brand_DetailViewDataChild = customGroupBy(Backlog_Brand_DetailView, ['Week_Day', 'BRAND', 'PRODUCTGROUP'], ['Total'])

  // console.log("Backlog_Brand_DetailViewData",Backlog_Brand_DetailViewData)
  // console.log("Backlog_Brand_DetailViewDataChild",Backlog_Brand_DetailViewDataChild)

  let pivotdata = getPivotChartArray(
    Backlog_Brand_DetailViewData,
    "BRAND",
    "Week_Day",
    "Total",
    ""
  )

  
  function calculateTotalForEachObject(array) {
    for (const obj of array) {
      let Total = 0;
      for (const key in obj) {
        if (typeof obj[key] === 'number') {
          Total += obj[key];
        }
      }
      obj.Total = Total;
    }
    return array;
  }
  
  const dataArrayWithTotal = calculateTotalForEachObject(pivotdata);

  let returnsbuCustomHeader = [{
    title: name,
    dataIndex: "BRAND",
    key: "BRAND",
    width: 170,
    render: (value) => {
      if (value === "BRAND") {
        // return <div style={{ fontWeight: 'bold' }}>{value}</div>
        return <div style={{ fontWeight: 'bold' }}>Overall</div>
      } else {
        return <div>{value}</div>
      }
    }
  }
];

// console.log("returnsbuCustomHeader",returnsbuCustomHeader)

let returnsbuCustomHeaderTotal = [
  {
    title: 'Total',
    dataIndex: 'Total',
    key: 'Total',
    render: function (value, record) { return value != undefined ? toMillion(value) : "-" },
    width: 100,
    sorter: (a, b) => a.Total - b.Total,
  },
];

let returnProductCustomHeaderTotal = [
  {
    title: 'Total',
    dataIndex: 'Total',
    key: 'Total',
    render: function (value, record) { return value != undefined ? toMillion(value) : "-" },
    width: 100
  },
];


  let returnProductCustomHeader = [{
    title: "BRAND > PRODUCT",
    dataIndex: "PRODUCTGROUP",
    key: "PRODUCTGROUP",
    width: 170,

  }];

  let sbuTableColumns = [];
  Backlog_Brand_DetailViewData && Backlog_Brand_DetailViewData.forEach((sbu) => {
    let returnsbuTableColumns = {
      title: sbu.Week_Day,
      dataIndex: sbu.Week_Day,
      key: sbu.Week_Day,
      width: 180,
      heigth: 20,
      sorter: (a, b) => {
        return a[sbu.Week_Day] - b[sbu.Week_Day];        
      },
      render: function (value, record) {

        if (value != undefined && isFinite(value)) {
          return toMillion(value);
        }

        else {
          return '-'
        }


      }
    };
    sbuTableColumns.push(returnsbuTableColumns);



  });

  let sbuTableColumnsChild = [];
  Backlog_Brand_DetailViewDataChild && Backlog_Brand_DetailViewDataChild.forEach((sbu) => {
    let returnsbuTableColumns = {
      title: sbu.Week_Day,
      dataIndex: sbu.Week_Day,
      key: sbu.Week_Day,
      // width: 180,
      heigth: 20,
      render: function (value, record) {

        if (value != undefined && isFinite(value)) {
          return toMillion(value);
        }
        else {
          return '-'
        }
      }
    };
    sbuTableColumnsChild.push(returnsbuTableColumns);
  });

  let unique = sbuTableColumns.filter((set => f => !set.has(f.title) && set.add(f.title))(new Set)).sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  })

  // console.log("unique",unique)
  // console.log("sbuTableColumns",sbuTableColumns)

  let uniqueProducts = sbuTableColumnsChild.filter((set => f => !set.has(f.title) && set.add(f.title))(new Set)).sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  })
  var sbuCustomColumns = [...returnsbuCustomHeader, ...unique,...returnsbuCustomHeaderTotal];
  var sbuProductsCustomColumns = [...returnProductCustomHeader, ...uniqueProducts,...returnProductCustomHeaderTotal];

  var holder = {};
  Backlog_Brand_DetailView.forEach(function (d) {
    var value = 'Total';
    if (holder.hasOwnProperty(d.Week_Day)) {
      holder[d.Week_Day] = holder[d.Week_Day] + d[value];
    } else {
      holder[d.Week_Day] = d[value];
    }
  });


  var obj2 = [];

  for (var prop in holder) {
     obj2.push({ BRAND: 'BRAND', Week_Day: prop, value: Number(holder[prop]) });
  }


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
    value={Metrics}
    onChange={(e) => {
      setMetrics(e.value)
    }}
    options={Metricsdata}
    optionLabel="name"
    placeholder="Backlog"
    className="w-[178px]"
    />
    </div>
    </div>
    {/* <div>
    <div className="relative cust-select">
    <label
    htmlFor="username"
    className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
    >
    Drill By
    </label>
    <Dropdown
    value={DrillData}
    onChange={(e) => {
      setDrillData(e.value)
    }}
    options={Drill}
    optionLabel="name"
    placeholder="Brand"
    className="w-[178px]"
    />
    </div>
    </div> */}
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
        <div className='text-[#101828] dark:text-[#CACED1] font-normal text-base xl:text-[0.938vw]'>Detailed View</div>
        <div className='flex items-center gap-2'>
            {/* <div className='text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer mr-6 xl:mr-[0.781vw] xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]'><i className='red-tsg-download'></i><span>Export</span></div> */}
            <div className='text-[#029046] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] flex items-center space-x-2 cursor-pointer mr-6 xl:mr-[0.781vw] xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw]'><ExcelDownloader data={Backlog_Brand_DetailView} /></div>
            <div><Link href={'/backlog/detailedview/brand'} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block active-green'>Brand</Link></div>
            <div><Link href={'/backlog/detailedview'} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>BU</Link></div>
            <div><Link href={'/backlog/detailedview/cluster'} className='text-[#344054] dark:text-[#CACED1] font-medium text-sm xl:text-[0.729vw] rounded-lg xl:px-4 px-[1.042vw] py-2 xl:py-[0.521vw] bg-white dark:bg-[#272F31] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)] inline-block'>Cluster</Link></div>
        </div>
    </div>
    <div className='border border-[#C6CBD2] dark:border-[#14161A] border-t-0 cust_table_css'>
    {/* <DataTable value={sales} footerColumnGroup={footerGroup} scrollable paginator rows={4} rowsPerPageOptions={[5, 10, 25, 50]} paginatorTemplate="PrevPageLink PageLinks NextPageLink" className='custpaginator custIcons custmBtnTable custTable' >
                <Column field="product" headerClassName='header-filter' header="BU" body={BuBodyTemplate}  />
                <Column field="lastYearSale" sortable header="Week 1" body={lastYearProfitBodyTemplate} />
                <Column field="thisYearSale" sortable header="Week 2" body={thisYearProfitBodyTemplate} />
                <Column field="lastYearProfit" sortable header="Week 3" body={lastYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 4" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 5" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 6" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 7" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Week 8" body={thisYearProfitBodyTemplate} />
                <Column field="thisYearProfit" sortable header="Total" body={thisYearProfitBodyTemplate} />
            </DataTable> */}

           <LoaderContainer loading={Backlog_Brand_DetailViewloading}>
            <CustomTable
                          pagination={true}
                          // size="small"
                          className="simpletable parenttable"
                          rowKey="BRAND"
                          tableLayout={"fixed"}
                          customColumns={sbuCustomColumns}
                          dataSource={dataArrayWithTotal}


                          expandable={{
                            indentSize: 25,
                            // columnWidth:"fixed",
                            expandedRowRender: (record) => {

                              let returndata = Backlog_Brand_DetailViewDataChild?.filter((item) =>
                                item.BRAND == record.BRAND
                              )

                              if (returndata && returndata.length > 0) {
                                return <CustomTable
                                  className="childtable"
                                  pagination={false}
                                  showHeader={false}
                                  tableLayout={"fixed"}
                                  size="small"
                                  style={{ fontSize: '12px' }}
                                  expandable={{
                                    indentSize: 25,
                                    expandedRowRender: () => { },
                                    expandIcon: ({ expanded }) => expanded ? (
                                      ''
                                    ) : (
                                      <span>
                                        <MinusOutlined className="mr-2" style={{ visibility: 'hidden' }} />
                                      </span>
                                    )
                                  }

                                  }

                                  customColumns={sbuProductsCustomColumns}
                                  dataSource={calculateTotalForEachObject(getPivotChartArray(
                                    returndata,
                                    "PRODUCTGROUP",
                                    "Week_Day",
                                    "Total",
                                    ""
                                  ))}
                                />;
                              }

                            },
                            expandIcon: ({ expanded, onExpand, record }) =>
                              expanded ? (
                                <span
                                  onClick={(e) => {
                                    onExpand(record, e);
                                    setName('BRAND')
                                  }}
                                >

                                  {/* <MinusCircleOutlined className="mr-2" /> */}
                                  <MinusOutlined className="mr-2" style={{ cursor: 'pointer' }} />

                                </span>
                              ) : (
                                <span
                                  onClick={(e) => {
                                    onExpand(record, e);
                                    setName('BRAND > PRODUCT')

                                  }}
                                >

                                   {/* <PlusOutlined className="mr-2" style={{ cursor: 'pointer' }} />  */}
                                  {record.BRAND != "BRAND" ? <PlusOutlined className="mr-2" style={{ cursor: 'pointer' }} /> : ""}

                                  {/* <PlusCircleOutlined className="mr-2" /> */}


                                </span>
                              )
                          }}
                          summary={(pageData) => {
                            var markers = [];
                            for (var i = 0; i < sbuCustomColumns.length; ++i) {
                              markers[i] = 0;
                            }
                            dataArrayWithTotal && dataArrayWithTotal.forEach((columns) => {
                              for (var i = 0; i < sbuCustomColumns.length; ++i) {
                                if (columns[sbuCustomColumns[i].title] != undefined) {
                                  markers[i] += columns[sbuCustomColumns[i].title];
          
                                }
                              }
                            });
          
          
                            return (
                              <>
                                <Table.Summary.Row className="totalcell  dark:text-[#FFFFFF]">
                                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                  <Table.Summary.Cell index={1}><b>Over all</b></Table.Summary.Cell>
                                  {
                                    sbuCustomColumns.map((data, index) => {
          
                                      if (index > 0) {
                                        return (
                                          <Table.Summary.Cell index={2}>
                                            <Text className="totalcell  dark:text-[#FFFFFF]">{toMillion(markers[index]|| 0)}</Text>
                                          </Table.Summary.Cell>
                                        )
                                      }
          
                                    })
                                  }
                                </Table.Summary.Row>
                              </>
                            )
                          }}
            />
            </LoaderContainer>
    </div>
    </div>
    </div>    
    </div>
      </Layout>
  );
}