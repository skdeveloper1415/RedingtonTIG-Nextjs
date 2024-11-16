// import { Table } from "custom-antd";
import { Table } from "antd";
import { useEffect ,useState} from "react";
import { toMillionWithNoDollar } from "../../utils/CurrencyUTIL";
// import Loader from '../loader'
// import { capitalizeFirstLetter } from "utils";
// import { toMillion , displayNonZeroValue} from "utils/CurrencyUTIL";

const toMillion = (value)=>{
  if(value<0){
          
    return Math.abs(Number(value)) >= 1.0e9
    ? "$"+-(Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? "$"+-(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : "$"+-(Math.abs(Number(value))).toFixed(2)+"M";
}else{
    return Math.abs(Number(value)) >= 1.0e9
    ? "$"+(Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? "$"+(Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : "$"+(Math.abs(Number(value))).toFixed(2)+"M";
}
}

const toMillions = (value)=>{
  if(value<0){
          
    return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : (Math.abs(Number(value))).toFixed(2)+"M";
}else{
    return Math.abs(Number(value)) >= 1.0e9
    ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(value)) >= 1.0e6
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(value)) >= 1.0e3
    ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + "M"
    : (Math.abs(Number(value))).toFixed(2)+"M";
}
}

export default function GenericTable({ dataSource = [],customColumns, className, ...rest }) {
  const { pagination = false } = {...rest};
  const getColumns = (dataSource) => { 
   
    
    // const Obj = dataSource.find(Boolean) || {};
    let newObject = {};
    return Object.keys(dataSource.reduce((result, obj) => {
      return Object.assign(result, obj);
    }, {})).map((column) => {
      return {
        title: (column),
        dataIndex: column,
        render: (text) => {
        
          if (isNaN(text)) {
            if(text != undefined){
              return text;
            }else {
              return 0
            }
          } else {
          
            // return "text";           
            return toMillionWithNoDollar(text);          
          }
        },
        key: column,
      };
    });
  
  };
  console.log("customColumns",customColumns);
  // const [loading, setLoading] = useState(true)
  // useEffect(()=>{
  //  if(dataSource.length>0){
  //   setLoading(false)
  //  }
  // },[loading,dataSource])
  return (
    <>
    
 <Table {...rest} dataSource={dataSource} className={className} columns={customColumns && customColumns.length ? customColumns : dataSource ? getColumns(dataSource) : []}  />
    
   

</>
  );
}




