// slices/expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDate } from "../../utils/date";
const initialExpenses = [
  {
    id: "e1",
    des: "bought a pair of shoes",
    amount: "83.99",
    date: getFormattedDate(new Date("2021-12-19")),
  },
  {
    id: "e2",
    des: "bought a book",
    amount: "15.99",
    date: getFormattedDate(new Date("2023-12-13")),
  },
  {
    id: "e3",
    des: "pied rent",
    amount: "100.99",
    date: getFormattedDate(new Date("2023-12-15")),
  },
  // Add more initial expenses as needed
];

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expensesValue: initialExpenses,
  },
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        id: uuidv4(),
        des: action.payload.des,
        amount: action.payload.amount,
        date: action.payload.date,
      };
      state.expensesValue.push(newExpense); // Corrected from state.expenses to state.expensesValue
    },
    deleteExpense: (state, action) => {
      state.expensesValue = state.expensesValue.filter(
        (expense) => expense.id !== action.payload
      );
    },
    editExpense: (state, action) => {
      const { id, des, amount, date } = action.payload;
      const index = state.expensesValue.findIndex(
        (expense) => expense.id === id
      );
      if (index !== -1) {
        state.expensesValue[index] = { id, des, amount, date };
      }
    },
  },
});

export const { addExpense, deleteExpense, editExpense } = expensesSlice.actions;
export const selectExpense = (state) => state.expenses.expensesValue;
export default expensesSlice.reducer;
