import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesReducer";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  
});
