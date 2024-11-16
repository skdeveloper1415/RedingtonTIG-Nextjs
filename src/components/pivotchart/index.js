import React, {useState,useEffect} from 'react';

import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from "react-pivottable/TableRenderers";
// import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import 'react-pivottable/pivottable.css';
// import Loader from '../simpleloader'

const Table = ({data=[],rows,cols}) => {
    
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      data.length && setLoading(false)
  
    }, [data])

    const styles = {
      tableHeader: {
        backgroundColor: '#f2f2f2',
        color: 'red',
        fontWeight: 'bold',
        borderBottom: '1px solid #ccc',
        padding:'0px'
      },
    };
    return (
        <> 
    
        <PivotTableUI
       rows={rows ? rows : data && data[0]  ? Object.keys(data[0]) : rows}
       cols={cols}
      
        data={data}
        renderers={Object.assign({}, TableRenderers)}
        onChange={(s) =>  setState(s)}
        {...state}

        tableOptions={{
          tableHeader: styles.tableHeader,
        }}
        
      />

      </>
    )
};

export default Table
 
