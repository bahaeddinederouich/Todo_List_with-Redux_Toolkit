import { configureStore } from "@reduxjs/toolkit"
import groupreducer from "../features/List/listSlice";
const store = configureStore({
    reducer: {
        groups: groupreducer,
    },
})

export default store;