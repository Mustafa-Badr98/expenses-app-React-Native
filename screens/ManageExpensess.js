import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constans/styles";
import Button from "../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  editExpense,
  selectExpense,
} from "../store/slices/expensesReducer";
import ExpensesForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteeExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageExpenses({ route, navigation }) {
  const expenses = useSelector(selectExpense);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteeExpense(editedExpenseId);
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      dispatch(
        editExpense({
          id: editedExpenseId,
          ...expenseData,
        })
      );
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      console.log(id);
      dispatch(addExpense({ ...expenseData, id }));
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={{ color: "white" }}> {editedExpenseId}</Text> */}
        <ExpensesForm
          defaultValues={selectedExpense}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
        />
      </View>

      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            icon="trash"
            color="red"
            size={24}
            onPress={deleteExpenseHandler}
          />
        )}
      </View>
    </View>
  );
}

export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
