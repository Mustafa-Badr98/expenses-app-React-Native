import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses() {
  const expenses = useSelector((state) => state.expenses.expensesValue) || [];

  return <ExpensesOutput fallBackText="there is no expenses yet." expenses={expenses} expensesPeriod={"All Time"} />;
}

export default AllExpenses;
