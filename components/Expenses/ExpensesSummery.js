import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constans/styles";

function ExpensesSummery({ periodName, expenses }) {
  const sumExpenses = expenses.reduce((sum, expense) => {
    return sum + parseInt(expense.amount);
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.period}>last {periodName}</Text>
      <Text style={styles.sum}>${sumExpenses.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummery;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});