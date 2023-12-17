import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";

function RecentExpenses() {
  const expenses = useSelector((state) => state.expenses.expensesValue);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return new Date(expense.date) > date7DaysAgo;
  });
  return (
    <ExpensesOutput
      fallBackText="there is no expenses in the last 7 days"
      expenses={recentExpenses}
      expensesPeriod={"7 days"}
    />
  );
}

export default RecentExpenses;
