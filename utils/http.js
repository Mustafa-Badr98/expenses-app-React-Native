import axios from "axios";

const BACKEND_URL =
  "https://my-first-project-react-n-c52a1-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];
  //   console.log(response.data);
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      des: response.data[key].des,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

export function deleteeExpense(id) {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}
