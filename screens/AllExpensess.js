import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses() {
  const expenses = useSelector((state) => state.expenses.expensesValue) || [];
  console.log(expenses)
  const reversedExpenses=expenses.slice().reverse()
  return <ExpensesOutput fallBackText="there is no expenses yet." expenses={reversedExpenses} expensesPeriod={"All Time Expenses"} />;
}

export default AllExpenses;
