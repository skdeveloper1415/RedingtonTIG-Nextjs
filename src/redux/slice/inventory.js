import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'


const initialState = {  

    Inventory_DrillDown_Analysis_1loading: false,
    Inventory_DrillDown_Analysis_1: [],
    
    Inventory_DrillDown_Analysis_2loading: false,
    Inventory_DrillDown_Analysis_2: [],

    Inventory_DrillDown_Analysis_3loading: false,
    Inventory_DrillDown_Analysis_3: [],  

    Inventory_Summary_view_4loading: false,
    Inventory_Summary_view_4: [],  

    Inventory_Summary_view_6loading: false,
    Inventory_Summary_view_6: [], 
 
}





export const fetchInventory_DrillDown_Analysis_1 = createAsyncThunk(
    'fetchInventory_DrillDown_Analysis_1',
    async (Inventory_DrillDown_Analysis_1, thunkAPI) => {
        Inventory_DrillDown_Analysis_1 = { ...Inventory_DrillDown_Analysis_1, elasticQueryName: "Inventory_DrillDown_Analysis_1" }
        const response = await getNetSales(Inventory_DrillDown_Analysis_1);
        return response.data
    }
) 

export const fetchInventory_DrillDown_Analysis_2 = createAsyncThunk(
    'fetchInventory_DrillDown_Analysis_2',
    async (Inventory_DrillDown_Analysis_2, thunkAPI) => {
        Inventory_DrillDown_Analysis_2 = { ...Inventory_DrillDown_Analysis_2, elasticQueryName: "Inventory_DrillDown_Analysis_2" }
        const response = await getNetSales(Inventory_DrillDown_Analysis_2);
        return response.data
    }
) 

export const fetchInventory_DrillDown_Analysis_3 = createAsyncThunk(
    'fetchInventory_DrillDown_Analysis_3',
    async (Inventory_DrillDown_Analysis_3, thunkAPI) => {
        Inventory_DrillDown_Analysis_3 = { ...Inventory_DrillDown_Analysis_3, elasticQueryName: "Inventory_DrillDown_Analysis_3" }

        const response = await getNetSales(Inventory_DrillDown_Analysis_3);
        return response.data
    }
) 

export const fetchInventory_Summary_view_4 = createAsyncThunk(
    'fetchInventory_Summary_view_4',
    async (Inventory_Summary_view_4, thunkAPI) => {
        Inventory_Summary_view_4 = { ...Inventory_Summary_view_4, elasticQueryName: "Inventory_Summary_view_4" }

        const response = await getNetSales(Inventory_Summary_view_4);
        return response.data
    }
) 

export const fetchInventory_Summary_view_6 = createAsyncThunk(
    'fetchInventory_Summary_view_6',
    async (Inventory_Summary_view_6, thunkAPI) => {
        Inventory_Summary_view_6 = { ...Inventory_Summary_view_6, elasticQueryName: "Inventory_Summary_view_6" }

        const response = await getNetSales(Inventory_Summary_view_6);
        return response.data
    }
) 




export const inventory = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
       

        builder.addCase(fetchInventory_DrillDown_Analysis_1.fulfilled, (state, action) => {
            state.Inventory_DrillDown_Analysis_1 = action.payload;
            state.Inventory_DrillDown_Analysis_1loading = false;
        }).addCase(fetchInventory_DrillDown_Analysis_1.pending, (state, action) => {
            state.Inventory_DrillDown_Analysis_1loading = true;
        })

        builder.addCase(fetchInventory_DrillDown_Analysis_2.fulfilled, (state, action) => {
            state.Inventory_DrillDown_Analysis_2 = action.payload;
            state.Inventory_DrillDown_Analysis_2loading = false;
        }).addCase(fetchInventory_DrillDown_Analysis_2.pending, (state, action) => {
            state.Inventory_DrillDown_Analysis_2loading = true;
        })

        builder.addCase(fetchInventory_DrillDown_Analysis_3.fulfilled, (state, action) => {
            state.Inventory_DrillDown_Analysis_3 = action.payload;
            state.Inventory_DrillDown_Analysis_3loading = false;
        }).addCase(fetchInventory_DrillDown_Analysis_3.pending, (state, action) => {
            state.Inventory_DrillDown_Analysis_3loading = true;
        })

        builder.addCase(fetchInventory_Summary_view_4.fulfilled, (state, action) => {
            state.Inventory_Summary_view_4 = action.payload;
            state.Inventory_Summary_view_4loading = false;
        }).addCase(fetchInventory_Summary_view_4.pending, (state, action) => {
            state.Inventory_Summary_view_4loading = true;
        })

        builder.addCase(fetchInventory_Summary_view_6.fulfilled, (state, action) => {
            state.Inventory_Summary_view_6 = action.payload;
            state.Inventory_Summary_view_6loading = false;
        }).addCase(fetchInventory_Summary_view_6.pending, (state, action) => {
            state.Inventory_Summary_view_6loading = true;
        })
       
 
}})

export default inventory.reducer
