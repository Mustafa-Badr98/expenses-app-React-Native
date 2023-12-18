import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useDispatch, useSelector } from "react-redux";
import { getDateMinusDays } from "../utils/date";
import { useEffect, useState } from "react";
import { fetchExpenses } from "../utils/http";
import { setExpenses } from "../store/slices/expensesReducer";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expensesValue);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        // setFetchedExpenses(expenses);
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
    // console.log(expenses);
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return new Date(expense.date) > date7DaysAgo;
  });
  const reversedRecentExpenses = recentExpenses.slice().reverse();

  function errorHandler() {
    setError(null);
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      fallBackText="there is no expenses in the last 7 days"
      expenses={reversedRecentExpenses}
      expensesPeriod={"Last 7 days"}
    />
  );
}

export default RecentExpenses;
