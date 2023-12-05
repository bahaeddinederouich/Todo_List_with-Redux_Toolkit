import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('groups') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
const counts = localStorage.getItem('counts') !== null ? JSON.parse(localStorage.getItem('counts')) : [];
const final = localStorage.getItem('final') !== null ? JSON.parse(localStorage.getItem('final')) : "";
const added = localStorage.getItem('added') !== null ? JSON.parse(localStorage.getItem('added')) : false;


const initialState = {
    group: items,
    final: final,
    count: counts,
    added: added,
}


const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        addGroup: (state, action) => {
            const groupname = Object.keys(action.payload)[0];
            let hasObjectWithTitle = state.count.some(obj => obj.title === groupname);
            // console.log(action.payload);
            if (!hasObjectWithTitle) {
                state.group.push(action.payload);
                state.added = false;
                let added = localStorage.getItem('added') !== null ? JSON.parse(localStorage.getItem('added')) : false;
                added = false;
                localStorage.setItem('added', JSON.stringify(added));
                localStorage.setItem('groups', JSON.stringify(state.group.map((item) => item)));
            } else {
                state.added = true;
                // update local storage
                let added = localStorage.getItem('added') !== null ? JSON.parse(localStorage.getItem('added')) : false;
                added = true;
                localStorage.setItem('added', JSON.stringify(added));
            }
        },
        removeGroup: (state, action) => {
            state.group.splice(action.payload, 1);
            state.count.splice(action.payload, 1);
            // Update local storage
            const items = localStorage.getItem('groups') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
            const counts = localStorage.getItem('counts') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
            items.splice(action.payload, 1);
            counts.splice(action.payload, 1);
            localStorage.setItem('groups', JSON.stringify(state.group.map((item) => item)));
            localStorage.setItem('counts', JSON.stringify(state.count.map((item) => item)));
        },
        tofinal: (state, action) => {
            state.final = action.payload;
            // update local storage
            localStorage.setItem('final', JSON.stringify(state.final));
        },
        addtask: (state, action) => {
            const { index, title, value } = action.payload
            state.group[index][title].push({ ["task"]: value, check: "no completed" });
            // Update local storage
            const items = localStorage.getItem('groups') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
            items[index][title].push({ task: value, check: "no completed" });
            localStorage.setItem('groups', JSON.stringify(items));
        },
        removetask: (state, action) => {
            const { indexone, title, indextwo } = action.payload
            state.group[indexone][title][indextwo].check = "no completed";
            state.group[indexone][title].splice(indextwo, 1)
            // Update local storage
            const items = localStorage.getItem('groups') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
            items[indexone][title][indextwo].check = "no completed";
            items[indexone][title].splice(indextwo, 1);
            localStorage.setItem('groups', JSON.stringify(items));
        },
        switchcheck: (state, action) => {
            const { indexone, indextwo, title } = action.payload;
            state.group[indexone][title][indextwo].check = state.group[indexone][title][indextwo].check === "no completed" ? "completed" : "no completed";
            // update local storage
            const items = localStorage.getItem('groups') !== null ? JSON.parse(localStorage.getItem('groups')) : [];
            items[indexone][title][indextwo].check = items[indexone][title][indextwo].check === "no completed" ? "completed" : "no completed";
            localStorage.setItem('groups', JSON.stringify(items));
        },
        countCompleted: (state, action) => {
            const { indexone, title } = action.payload;
            let count = 0;
            let number = 0;
            state.group[indexone][title].forEach((el) => {
                number++;
                if (el.check === "completed") {
                    count = count + 1;
                }
            })
            const hasObjectWithTitle = state.count.some(obj => obj.title === title);
            if (hasObjectWithTitle) {
                const foundObject = state.count.find(obj => obj.title === title);
                foundObject.completed = count;
                foundObject.number = number;
                //upadate
                const counts = localStorage.getItem('counts') !== null ? JSON.parse(localStorage.getItem('counts')) : [];
                const foundObjectlocal = counts.find(obj => obj.title === title);
                foundObjectlocal.completed = count;
                foundObjectlocal.number = number;
                localStorage.setItem('counts', JSON.stringify(counts));
            } else {
                state.count.push({ title: action.payload, completed: 0, number: 0 })
                const counts = localStorage.getItem('counts') !== null ? JSON.parse(localStorage.getItem('counts')) : [];
                counts.push({ title: action.payload, completed: 0, number: 0 })
                localStorage.setItem('counts', JSON.stringify(counts));
            }
        },
        addGroupForTheFirstTime: (state, action) => {
            const hasObjectWithTitle = state.count.some(obj => obj.title === action.payload);
            if (hasObjectWithTitle === false) {
                state.count.push({ title: action.payload, completed: 0, number: 0 });
                const counts = localStorage.getItem('counts') !== null ? JSON.parse(localStorage.getItem('counts')) : [];
                counts.push({ title: action.payload, completed: 0, number: 0 });
                localStorage.setItem('counts', JSON.stringify(counts));
                // localStorage.setItem('counts', JSON.stringify(state.count.map((item) => item)));
            }
        },
        switchgroup: (state) => {
            state.added = !(state.added);
            // update local storage 
            localStorage.setItem('added', JSON.stringify(state.added));
        },

    }
})
export default listSlice.reducer;
export const { addGroup, tofinal, addtask, switchcheck, removeGroup, removetask, countCompleted, addGroupForTheFirstTime, switchgroup } = listSlice.actions