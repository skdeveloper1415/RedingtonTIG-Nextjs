import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNetSales } from '../services/user'


const initialState = {
    by_vendorsloading: false,
    by_vendors: [],

    BY_BUloading: false,
    BY_BU: [],
    
    BACKLOG_TOPTILEloading: false,
    BACKLOG_TOPTILE: [],

    BY_CLUSTERloading: false,
    BY_CLUSTER: [],

    DrillDownLevel_1loading: false,
    DrillDownLevel_1: [],
    
    DrillDownLevel_2loading: false,
    DrillDownLevel_2: [],

    DrillDownLevel_3loading: false,
    DrillDownLevel_3: [],

    Backlog_BU_DetailViewloading: false,
    Backlog_BU_DetailView: [],
    
    Backlog_Cluster_DetailViewloading: false,
    Backlog_Cluster_DetailView: [],

    Backlog_Brand_DetailViewloading: false,
    Backlog_Brand_DetailView: [],

    BacklogDashboad_Valueloading: false,
    BacklogDashboad_Value: [],
 
}




export const fetchby_vendors = createAsyncThunk(
    'fetchby_vendors',
    async (by_vendors, thunkAPI) => {
        by_vendors = { ...by_vendors, elasticQueryName: "BY_VENDORS" }

        const response = await getNetSales(by_vendors);
        return response.data
    }
) 

export const fetchBY_BU = createAsyncThunk(
    'fetchBY_BU',
    async (BY_BU, thunkAPI) => {
        BY_BU = { ...BY_BU, elasticQueryName: "BY_BU" }

        const response = await getNetSales(BY_BU);
        return response.data
    }
) 

export const fetchBACKLOG_TOPTILE = createAsyncThunk(
    'fetchBACKLOG_TOPTILE',
    async (BACKLOG_TOPTILE, thunkAPI) => {
        BACKLOG_TOPTILE = { ...BACKLOG_TOPTILE, elasticQueryName: "BACKLOG_TOPTILE" }
        const response = await getNetSales(BACKLOG_TOPTILE);
        return response.data
    }
) 

export const fetchBY_CLUSTER = createAsyncThunk(
    'fetchBY_CLUSTER',
    async (BY_CLUSTER, thunkAPI) => {
        BY_CLUSTER = { ...BY_CLUSTER, elasticQueryName: "BY_CLUSTER" }

        const response = await getNetSales(BY_CLUSTER);
        return response.data
    }
) 

export const fetchDrillDownLevel_1 = createAsyncThunk(
    'fetchDrillDownLevel_1',
    async (DrillDownLevel_1, thunkAPI) => {
        DrillDownLevel_1 = { ...DrillDownLevel_1, elasticQueryName: "DrillDownLevel_1" }

        const response = await getNetSales(DrillDownLevel_1);
        return response.data
    }
) 

export const fetchDrillDownLevel_2 = createAsyncThunk(
    'fetchDrillDownLevel_2',
    async (DrillDownLevel_2, thunkAPI) => {
        DrillDownLevel_2 = { ...DrillDownLevel_2, elasticQueryName: "DrillDownLevel_2" }
        const response = await getNetSales(DrillDownLevel_2);
        return response.data
    }
) 

export const fetchDrillDownLevel_3 = createAsyncThunk(
    'fetchDrillDownLevel_3',
    async (DrillDownLevel_3, thunkAPI) => {
        DrillDownLevel_3 = { ...DrillDownLevel_3, elasticQueryName: "DrillDownLevel_3" }

        const response = await getNetSales(DrillDownLevel_3);
        return response.data
    }
) 

export const fetchBacklog_BU_DetailView = createAsyncThunk(
    'fetchBacklog_BU_DetailView',
    async (Backlog_BU_DetailView, thunkAPI) => {
        Backlog_BU_DetailView = { ...Backlog_BU_DetailView, elasticQueryName: "Backlog_BU_DetailView" }

        const response = await getNetSales(Backlog_BU_DetailView);
        return response.data
    }
) 

export const fetchBacklog_Cluster_DetailView = createAsyncThunk(
    'fetchBacklog_Cluster_DetailView',
    async (Backlog_Cluster_DetailView, thunkAPI) => {
        Backlog_Cluster_DetailView = { ...Backlog_Cluster_DetailView, elasticQueryName: "Backlog_Cluster_DetailView" }
        const response = await getNetSales(Backlog_Cluster_DetailView);
        return response.data
    }
) 

export const fetchBacklog_Brand_DetailView = createAsyncThunk(
    'fetchBacklog_Brand_DetailView',
    async (Backlog_Brand_DetailView, thunkAPI) => {
        Backlog_Brand_DetailView = { ...Backlog_Brand_DetailView, elasticQueryName: "Backlog_Brand_DetailView" }

        const response = await getNetSales(Backlog_Brand_DetailView);
        return response.data
    }
) 

export const fetchBacklogDashboad_Value = createAsyncThunk(
    'fetchBacklogDashboad_Value',
    async (BacklogDashboad_Value, thunkAPI) => {
        BacklogDashboad_Value = { ...BacklogDashboad_Value, elasticQueryName: "BacklogDashboad_Value" }

        const response = await getNetSales(BacklogDashboad_Value);
        return response.data
    }
) 




export const backlog = createSlice({
    name: 'backlog',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchby_vendors.fulfilled, (state, action) => {
            state.by_vendors = action.payload;
            state.by_vendorsloading = false;
        }).addCase(fetchby_vendors.pending, (state, action) => {
            state.by_vendorsloading = true;
        })

        builder.addCase(fetchBY_BU.fulfilled, (state, action) => {
            state.BY_BU = action.payload;
            state.BY_BUloading = false;
        }).addCase(fetchBY_BU.pending, (state, action) => {
            state.BY_BUloading = true;
        })

        builder.addCase(fetchBACKLOG_TOPTILE.fulfilled, (state, action) => {
            state.BACKLOG_TOPTILE = action.payload;
            state.BACKLOG_TOPTILEloading = false;
        }).addCase(fetchBACKLOG_TOPTILE.pending, (state, action) => {
            state.BACKLOG_TOPTILEloading = true;
        })

        builder.addCase(fetchBY_CLUSTER.fulfilled, (state, action) => {
            state.BY_CLUSTER = action.payload;
            state.BY_CLUSTERloading = false;
        }).addCase(fetchBY_CLUSTER.pending, (state, action) => {
            state.BY_CLUSTERloading = true;
        })

        builder.addCase(fetchDrillDownLevel_1.fulfilled, (state, action) => {
            state.DrillDownLevel_1 = action.payload;
            state.DrillDownLevel_1loading = false;
        }).addCase(fetchDrillDownLevel_1.pending, (state, action) => {
            state.DrillDownLevel_1loading = true;
        })

        builder.addCase(fetchDrillDownLevel_2.fulfilled, (state, action) => {
            state.DrillDownLevel_2 = action.payload;
            state.DrillDownLevel_2loading = false;
        }).addCase(fetchDrillDownLevel_2.pending, (state, action) => {
            state.DrillDownLevel_2loading = true;
        })

        builder.addCase(fetchDrillDownLevel_3.fulfilled, (state, action) => {
            state.DrillDownLevel_3 = action.payload;
            state.DrillDownLevel_3loading = false;
        }).addCase(fetchDrillDownLevel_3.pending, (state, action) => {
            state.DrillDownLevel_3loading = true;
        })

        builder.addCase(fetchBacklog_BU_DetailView.fulfilled, (state, action) => {
            state.Backlog_BU_DetailView = action.payload;
            state.Backlog_BU_DetailViewloading = false;
        }).addCase(fetchBacklog_BU_DetailView.pending, (state, action) => {
            state.Backlog_BU_DetailViewloading = true;
        })

        builder.addCase(fetchBacklog_Cluster_DetailView.fulfilled, (state, action) => {
            state.Backlog_Cluster_DetailView = action.payload;
            state.Backlog_Cluster_DetailViewloading = false;
        }).addCase(fetchBacklog_Cluster_DetailView.pending, (state, action) => {
            state.Backlog_Cluster_DetailViewloading = true;
        })

        builder.addCase(fetchBacklog_Brand_DetailView.fulfilled, (state, action) => {
            state.Backlog_Brand_DetailView = action.payload;
            state.Backlog_Brand_DetailViewloading = false;
        }).addCase(fetchBacklog_Brand_DetailView.pending, (state, action) => {
            state.Backlog_Brand_DetailViewloading = true;
        })

        builder.addCase(fetchBacklogDashboad_Value.fulfilled, (state, action) => {
            state.BacklogDashboad_Value = action.payload;
            state.BacklogDashboad_Valueloading = false;
        }).addCase(fetchBacklogDashboad_Value.pending, (state, action) => {
            state.BacklogDashboad_Valueloading = true;
        })

 
}})

export default backlog.reducer
