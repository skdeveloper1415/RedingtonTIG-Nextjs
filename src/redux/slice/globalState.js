import { formatDate } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
var today = new Date();    
var month = today.getMonth()+1;
var year = today.getFullYear()
let currentYear;
if (month >= 1 && month <= 3) {
    currentYear = year;
} else {
    currentYear = year+1;
}
const initialState ={ 
  Trigger:false,
  AppliedFilters:[{
    "columnName": "FINANCIALYEAR",
    "columnValue": [currentYear],
    "excludeKeyword": false
}], 
};
 


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setState: (state, action) => {
        return {
            ...state,
            ...action.payload
          };
      
    },
  },
});

export const { setState } = globalSlice.actions;

export default globalSlice.reducer;