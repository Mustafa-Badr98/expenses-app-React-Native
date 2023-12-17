import { FlatList, Text, View } from "react-native";
import ExpenseItem from "./ExpensesItem";

function renderExpenseItems(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItems}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
