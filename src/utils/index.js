// import { toMillionWithNoDollar1 } from "./CurrencyUTIL"
// import ProgressBar from "@/components/chart/horizontalProgressBarForTable";

export function getCurrentDateTime() {
  const now = new Date();

  // Get current time
  let hours = now.getHours();
  let minutes = now.getMinutes(); 

  // Format time with AM or PM
  let amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  // Pad single digits with leading zeros
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes; 

  // Get current date
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  // Pad single digits with leading zeros
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  const currentDateTime = `${month}/${day}/${year}, ${hours}:${minutes} ${amOrPm}`;

  return currentDateTime;
} 
export const getSpreadSheetData = (data=[], columns=[]) => {

  let spreadSheetData = [];

    let keys = columns.length ? columns.map(col=> col.dataIndex) : data && data.length && data[0] ? Object.keys(data[0]) : [];

    keys.forEach((key,i)=> {
      spreadSheetData.push([1,i+1,key,"top"])
    });

  data && data.forEach((obj,column)=> {
     keys.forEach((key,row)=> {
       let arr=[column+2,row+1];
       

       if(obj[key]) {
         arr.push(obj[key])
        } else {
          arr.push(`-`)
        } 
        spreadSheetData.push(arr);

      }    )
    });

    return spreadSheetData;

}

export const sortAndFilter = (data = [], key, limit = -1) => {
  var processedData = data?.sort((a, b) => (a[key] < b[key] && 10) || -1)
  return processedData.filter((item, index) => {
    if (limit == -1) {
      return true;
    } else if (limit) {
    
      return index < limit;
    } else {
      return false;
    }
  });
};
export const groupByTotal = (data, Row, column, totalcolum) => {

  const groupedData = data.reduce((accumulator, currentValue) => {
    const key = currentValue[Row] + '-' + currentValue[column];
    if (accumulator[key]) {
      accumulator[key][totalcolum] += currentValue[totalcolum];
    } else {
      accumulator[key] = { [Row]: currentValue[Row], [column]: currentValue[column], [totalcolum]: currentValue[totalcolum] };
    }
    return accumulator;
  }, {});

  let groupArray = Object.values(groupedData);
  return groupArray
  
}

export  const StringSorter =(data)=>{
  let result=data.sort((a, b) => {
    let nameA = a.name.toUpperCase(); // ignore upper and lowercase
    let nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return result
 }
export const pivotFilterArray=(data,filterColumn)=>{
  let filterArray=[] 

  Array.isArray(data)&&data?.filter(res=>res[filterColumn]!=null).map(item => {
let filterObj={ 
name : item[filterColumn],
code : item[filterColumn]}
filterArray.push(filterObj) 

});
return filterArray.filter((set => f => !set.has(f.name) && set.add(f.name))(new Set))
}

export function transformArray(inputArray) {
  return inputArray?.map(item => {
    const name = item[Object.keys(item)[0]];
    const code = item[Object.keys(item)[0]];
    return { name, code };
  });
}

export function customGroupBy(array, fields, sumFields) {
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
export function customGroupByWithoutSum(array, fields, sumFields) {
  const map = new Map();
  array.forEach(a => {
    const keyVal = fields.map(field => a[field]).join('_');
    const keyObj = {};
    fields.map(field => { keyObj[field] = a[field] });
    if (map.has(keyVal)) {
      const tmp = map.get(keyVal);
      sumFields.forEach(sumField => a[sumField]);
      map.set(keyVal, tmp);

    } else {
      sumFields.forEach(sumField => keyObj[sumField] = a[sumField]);
      map.set(keyVal, keyObj)
    }
  });
  return Array.from(map.values());
}
export const getLegendData = (dimensions, color) => {
  const colors = color || ["#019049", "#FFC222"];
  var colorindex = 0;
  const legendData = dimensions?.map(dimension => {
    let legendObj = { 'label': dimension, 'color': colors[colorindex], 'symbol': 'square' }
    if (colorindex === colors.length)
      colorindex = 0
    else
      colorindex++
    return legendObj
  })
  return legendData
}
 

export function getDistinctValues(arr, prop) {
  return [...new Set(arr.map(obj => obj[prop]))];
}

function sortByKeys(arr, orderArr, propName) {
  const sortedArr = arr.sort((a, b) => {
    const indexA = orderArr.indexOf(a[propName]);
    const indexB = orderArr.indexOf(b[propName]);
    return indexA - indexB;
  });

  return sortedArr;
}
 
export const columnsMapping = (tempObj, a, column, columnsRestored) => {
  Object.keys(a).forEach((keys) => {
    if (column.includes(keys)) {
      tempObj[keys + "_" + a.METRIC_BAND_ORDER] = a[keys];
    }
    if (columnsRestored.includes(keys)) {
      tempObj[keys] = a[keys];
    }
  });
};

export function groupDataByFieldName(data, fieldName, keyName) {
   const groupedData = data?.reduce((result, item) => {
    const field = item[fieldName];
    const key = item[keyName];
    if (!result[field]) {
      result[field] = 0;
    }
    result[field] += key;
    return result;
  }, {});

  return Object.entries(groupedData).map(([name, value]) => ({ name, value }));
}


export const groupByTimeSeries = (data, row, column, columnsRestored) => {
  let tempObj = {};
  let finalData = [];
  let dimensions = [];
  if (data) {
    data.forEach((item) => {
      if (!dimensions.includes(item[row])) {
        dimensions.push(item[row]);
      }
    });
    dimensions.forEach((m) => {
      let flag = false;
      tempObj = {};
      data.forEach((a, index) => {
        if (!flag) {
          tempObj[row] = a[row];
        }
        if (m == a[row]) {
          columnsMapping(tempObj, a, column, columnsRestored);
          flag = true;
        }
      });
      if (flag) {
        finalData.push(tempObj);
      }
    });
  }

  return finalData;

};


export const getPivotChartArray = (data = [], row, column, value, addRow, financialYear) => {

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

export const getPivotChartArrayForecasting = (data = [], row, column,foreCastValue, value, addRow, financialYear) => {

  var item = data.reduce((a, b) => {
    
    a[b[row]] = a[b[row]] || [];
    var obj = {};
    obj[addRow] = b[addRow] ? b[addRow] : 0;
    if(b[foreCastValue] != undefined || b[value] != undefined){
      addRow
      ? a[b[row]].push({ ...obj, ...{ [b[column]]: ([b[value],b[foreCastValue]]) } })
      : a[b[row]].push({ ...{ [b[column]]: ([b[value],b[foreCastValue]]) } });
    return a;
    }else {
      addRow
      ? a[b[row]].push({ ...obj, ...{ [b[column]]: ([b[value],b[foreCastValue]]) } })
      : a[b[row]].push({ ...{ [b[column]]: ([b[value],b[foreCastValue]]) } });
    return a;
    }
   
  }, {});


  var array = Object.keys(item).map(function (k) {
    return { [row]: k, ...Object.assign.apply({}, item[k]) };
  });
  return array.sort();
};




export function addTotalsToData(data, propertyNames, name) {
  // Calculate the total value for each property using reduce and Object.values
  const totalValues = Object.values(data.reduce((acc, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (propertyNames.includes(key)) {
        acc[key] = (acc[key] || 0) + value;
      }
    }
    return acc;
  }, {}));

  // Create a new object with the total values and a name of "Total"
  // const totalObj = { [name]: <span style={{fontWeight:500}}>TOTAL</span> ,...propertyNames.reduce((acc, propName, index) => {
  //   acc[propName] = totalValues[index];
  //   return acc;
  // }, {})};
  const totalObj = { [name]: "TOTAL" ,...propertyNames.reduce((acc, propName, index) => {
    acc[propName] = totalValues[index];
    return acc;
  }, {})};

  // Add the total object at the beginning of the array
  const newData = [totalObj, ...data];

  return newData;
}

export const getPivotArrayDio = (data = [], row, column, value, addRow, financialYear) => {


  // const today = new Date()

  // data.sort(function (a, b) {
  //   let MONTH = { JANUARY: 0, FEBRUARY: 1, MARCH: 2, APRIL: 3, MAY: 4, JUNE: 5, JULY: 6, AUGUST: 7, SEPTEMBER: 8, OCTOBER: 9, NOVEMBER: 10, DECEMBER: 11 };
  //   return a.Financialyear - b.Financialyear || MONTH[a.CalendarMth] - MONTH[b.CalendarMth];
  // });

  var item = data.reduce((a, b) => {
    a[b[row]] = a[b[row]] || [];
    var obj = {};
    if (Array.isArray(addRow)) {
      addRow.map(val => {
        obj[val] = b[val];
        return item
      })
    } else
      obj[addRow] = b[addRow];
    if (b[financialYear] != undefined) {
      const currentString = String(b[financialYear]).slice(-2);
      const year = Number(currentString);

      addRow
        ? a[b[row]].push({ ...obj, ...{ [b[column].slice(0, 3) + "," + year]: b[value] } })
        : a[b[row]].push({ ...{ [b[column].slice(0, 3) + "," + year]: b[value] } });

    } else {
      addRow
        ? a[b[row]].push({ ...obj, ...{ [b[column]]: isNaN(b[value]) ? "-" : b[value] } })
        : a[b[row]].push({ ...{ [b[column]]: isNaN(b[value]) ? "-" : b[value] } });

    }
    return a;
  }, {});


  var array = Object.keys(item).map(function (k) {
    return { [row]: k, ...Object.assign.apply({}, item[k]) };
  });
  return array;
};



// export const generateColumns = (data) => {
//   const excluded = ['countrynamed'];
//   const dynamicColumnsGenerate = data.filter(key => !excluded.includes(key)).map(key => {
//     const row = {};
//     row.title = key;
//     row.dataIndex = key;
//     row.key = key;
//     if (key == 'Total') {
//       row.className = 'total-column-bold'
//       // row.defaultSortOrder="descend"     
//       row.sorter = {
//         compare: (a, b) => a.Total - b.Total,
//         multiple: 2,
//       }
//       row.render = (text, row) => {
//         if (isNaN(text)) {
//           if (text != undefined) {
//             return <b>{text}</b>;
//           } else {
//             return 0
//           }
//         }
//         else {
//           return <strong>{toMillionWithNoDollar1(text)}</strong>;
//         }
//       }
//     }



//     // forecast color changer
//     else if (key == 'FY 2024' || key == 'FY 2025') {
//       row.title = <div style={{ color: '#019049', fontWeight: 'bold' }}>{key}</div>
//       row.render = (text, row) => {
//         if (isNaN(text)) {
//           if (text != undefined) {
//             return <div style={{ color: '#019049' }}>{text}</div>;
//           } else {
//             return 0
//           }
//         } else {
//           return <div style={{ color: '#019049' }}>{toMillionWithNoDollar1(text)}</div>;
//         }
//       }
//     }
//     if (key == 'LP Var%' || key == 'LP Var %' || key == 'LP_Variance' || key == 'Total_shares' || key == 'Share %') {
//       row.render = (text, row) => {
//         if (isNaN(text)) {
//           if (text != undefined) {
//             return text;
//           }
//           else {
//             return 0
//           }
//         } else {
//           return text == null || text == "Infinity" ? 0 : text < 0 ? `(${Math.abs(text)})` : text;
//         }
//       }
//     }
//     else {
//       row.render = (key) => {

//         if (isNaN(key)) {
//           if (key != undefined) {
//             return key;
//           } else {
//             return 0
//           }
//         }
//         else {
//           // return key;
//           return <ProgressBar data={toMillionWithNoDollar1(key)} />;
//         }
//       };
//     }
//     if (key == 'Region' || key == 'CountryName') {
//       row.width = 200;
//     }

//     else {
//       row.width = 80;
//     }
//     return row;
//   });
//   return dynamicColumnsGenerate;
// }

export const mergeData = (level1Data, level2Data,level3Data) => {

  let data1 = JSON.parse(JSON.stringify(level1Data));
  let data2 = JSON.parse(JSON.stringify(level2Data));
  let data3 = JSON.parse(JSON.stringify(level3Data));

  let mergedData = [];
  data1 && data1.map(item => { item.depth = 1; item["metricType"] = "number"; mergedData.push(item) })
  data2 && data2.map(item => { item.depth = 2; item["metricType"] = "number"; mergedData.push(item) })
  data3 && data3.map(item => { item.depth = 3; item["metricType"] = "number"; mergedData.push(item) })
  return mergedData //? mergedData.filter(item =>  (this.state.selectedMetric.toUpperCase() === item.metric_name.toUpperCase()) && ((this.state.financialYear && this.state.financialYear.length === 0) ?  [2023].includes(item.Year):this.state.financialYear.includes(item.Year))) :[]
}

export const getSankeyData = (level1Data=[], level2Data=[],level3Data=[], nestedFields=[],valueFields=[]) => {
  // let { level1Data, level2Data, level3Data, level4Data, } = props;
  // debugger;

  let data1 = JSON.parse(JSON.stringify(level1Data));
  let data2 = JSON.parse(JSON.stringify(level2Data));
  let data3 = JSON.parse(JSON.stringify(level3Data));
  // let data4 = JSON.parse(JSON.stringify(level4Data));

  const mergedData = mergeData(data1, data2,data3)
  // var lastLevelData = data4 || data3 || data2 || data1 || [];
  // let lastLevelData = []
  // if(data2.length > 0){
  //   var lastLevelData =  data2 || data1 || [];
  // }else {
    var lastLevelData = data3 || data2 || data1 || [];
  // }
  
  const getColor = (item) => {
    let color = "#F0AF0787"
    if (item["value"] > item["py_value"]) {
        color = "#03832F99"
    } else if (item["value"] < item["py_value"]) {
        color = "#F0074D87"
    }
    return color;
}


var finalObj = {} 
mergedData.map(item => {
    var depth = item.depth; var key = "", value = "", color = "";
    if (depth === 1) {
        key = item[nestedFields[depth - 1]];
        value = item["value"]
        // share = item["Totalvalue"]
    }
    else if (depth === 2) {
        key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]];
        value = item["value"] 
        // share = item["Totalvalue"]
    } 
    else if (depth === 3) {
        key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]];
        value = item["value"] 
        // share = item["Totalvalue"]
    }
    // else if (depth === 4) {
    //     key = item[nestedFields[depth - 1]] + "_" + item[nestedFields[depth - 2]] + "_" + item[nestedFields[depth - 3]] + "_" + item[nestedFields[depth - 4]];
    //     value = item["value"] 
    //     share = item["Totalvalue"]
    // }
    color = getColor(item)
    finalObj[key] = value 
    finalObj[key + "_actual"] = value
    finalObj[key + "_color"] = color
});


lastLevelData.map(item => {  
    item["metricType"] = "number"
    item["actual"] = finalObj[item[nestedFields[0]] + "_actual"]
    item[valueFields[0]] = finalObj[item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[0]]]) : 0
    item[valueFields[1]] = finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
    item[valueFields[2]] = finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
    // item[valueFields[3]] = finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]] ? Number(finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]]]) : 0
    item["color_1"] = finalObj[item[nestedFields[0]] + "_color"]
    item["color_2"] = finalObj[item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
    item["color_3"] = finalObj[item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
    // item["color_4"] = finalObj[item[nestedFields[3]] + "_" + item[nestedFields[2]] + "_" + item[nestedFields[1]] + "_" + item[nestedFields[0]] + "_color"]
});


return lastLevelData;
}