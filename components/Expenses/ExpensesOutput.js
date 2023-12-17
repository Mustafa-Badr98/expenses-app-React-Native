import { StyleSheet, View,Text } from "react-native";
import ExpensesSummery from "./ExpensesSummery";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constans/styles";

const Dummy_Expenses = [
  {
    id: "e1",
    des: "a pair of shoes",
    amount: 83.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    des: "a pair of cloth",
    amount: 45.99,
    date: new Date("2021-7-19"),
  },
  { id: "e3", des: "a book", amount: 12.99, date: new Date("2021-2-9") },
  { id: "e4", des: "another book", amount: 18.99, date: new Date("2021-2-9") },
  { id: "e5", des: "another book", amount: 18.99, date: new Date("2021-2-9") },
];

function ExpensesOutput({ fallBackText, expenses, expensesPeriod }) {
  let content = <Text style={styles.infoText}> {fallBackText} </Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummery periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    marginTop: 32,
    textAlign: "center",
  },
});
