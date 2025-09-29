import { createSlice } from "@reduxjs/toolkit";

const bidSlice = createSlice({
    name:"bid",
    initialState:{
        bid:null
    },
    reducers:{        
        addPlaceBid:(state,action)=> {
            state.bid = action.payload
        },
        removePlacedBid:(state,action)=>{
            state.bid = null;
        },
    }
})


export const { addPlaceBid, removePlacedBid } = bidSlice.actions
export default bidSlice.reducer;