import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'


const initialState = {
    Backlog_Timeline_Filterloading: false,
    Backlog_Timeline_Filter: [],

    Backlog_Summary_Filterloading:false,
    Backlog_Summary_Filter:[]
 
}

export const fetchBacklog_Timeline_Filter = createAsyncThunk(
    'fetchBacklog_Timeline_Filter',
    async (Backlog_Timeline_Filter, thunkAPI) => {
        Backlog_Timeline_Filter = { ...Backlog_Timeline_Filter, elasticQueryName: "Backlog_Timeline_Filter" }

        const response = await getNetSales(Backlog_Timeline_Filter);
        return response.data
    }
) 

export const fetchBacklog_Summary_Filter = createAsyncThunk(
    'fetchBacklog_Summary_Filter',
    async (Backlog_Summary_Filter, thunkAPI) => {
        Backlog_Summary_Filter = { ...Backlog_Summary_Filter, elasticQueryName: "Backlog_Summary_Filter" }

        const response = await getNetSales(Backlog_Summary_Filter);
        return response.data
    }
) 




export const filter = createSlice({
    name: 'filter',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBacklog_Timeline_Filter.fulfilled, (state, action) => {
            state.Backlog_Timeline_Filter = action.payload;
            state.Backlog_Timeline_Filterloading = false;
        }).addCase(fetchBacklog_Timeline_Filter.pending, (state, action) => {
            state.Backlog_Timeline_Filterloading = true;
        })

        builder.addCase(fetchBacklog_Summary_Filter.fulfilled, (state, action) => {
            state.Backlog_Summary_Filter = action.payload;
            state.Backlog_Summary_Filterloading = false;
        }).addCase(fetchBacklog_Summary_Filter.pending, (state, action) => {
            state.Backlog_Summary_Filterloading = true;
        })
       


 
}})

export default filter.reducer
