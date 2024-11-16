import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {getNotes} from '../services/user'

const initialState = {

    GetNotesloading : false,
    GetNotes : [],

    InsertNotesloading : false,
    InsertNotes : [],

    UpdateNotesloading : false,
    UpdateNotes : [], 
};

export const fetchGetNotes = createAsyncThunk(
    'fetchGetNotes',
    async (GetNotes, thunkAPI) => {
        GetNotes = { ...GetNotes, elasticQueryName: "Get_Notes" }
  
      const response = await getNotes(GetNotes);
      return response.data
    }
  )
export const fetchInsertNotes = createAsyncThunk(
    'fetchInsertNotes',
    async (InsertNotes, thunkAPI) => {
        InsertNotes = { ...InsertNotes, elasticQueryName: "Insert_Notes" }
  
      const response = await getNotes(InsertNotes);
      return response.data
    }
  )

export const fetchUpdateNotes = createAsyncThunk(
    'fetchUpdateNotes',
    async (UpdateNotes, thunkAPI) => {
        UpdateNotes = { ...UpdateNotes, elasticQueryName: "Update_Notes" }
  
      const response = await getNotes(UpdateNotes);
      return response.data
    }
  )
 
 const notes = createSlice({
    name: 'notes',
    initialState,
    reducers: {
         
    },
    extraReducers : (builder) => {
        builder.addCase(fetchGetNotes.fulfilled, (state, action) => {
          state.GetNotes = action.payload;
          state.GetNotesloading = false;
        }).addCase(fetchGetNotes.pending, (state, action) => {
          state.GetNotesloading = true;
        })
        builder.addCase(fetchInsertNotes.fulfilled, (state, action) => {
          state.InsertNotes = action.payload;
          state.InsertNotesloading = false;
        }).addCase(fetchInsertNotes.pending, (state, action) => {
          state.InsertNotesloading = true;
        })
        builder.addCase(fetchUpdateNotes.fulfilled, (state, action) => {
            state.UpdateNotes = action.payload;
            state.UpdateNotesloading = false;
          }).addCase(fetchUpdateNotes.pending, (state, action) => {
            state.UpdateNotesloading = true;
          })
         
      }
});

export default notes.reducer;