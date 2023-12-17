import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constans/styles";

function ExpensesForm({
  defaultValues,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount : "",
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? defaultValues.date : "",
      isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.des : "",
      isValid: !!defaultValues,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    // console.log(enteredValue);
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: inputs.amount.value,
      date: inputs.date.value,
      des: inputs.description.value,
    };

    const amountIsValid =
      !isNaN(+expenseData.amount) && +expenseData.amount > 0;

    const dateIsValid = new Date(inputs.date.value).toString() !== "Invalid Date";

    const desIsValid = expenseData.des.trim().length > 0;

    console.log(dateIsValid)
    console.log(inputs.date)
    if (!amountIsValid || !dateIsValid || !desIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: desIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const isFormValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expenses </Text>
      <View style={styles.inputsRow}>
        <Input
          isValid={inputs.amount.isValid}
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          isValid={inputs.date.isValid}
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        isValid={inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: 'none',
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {isFormValid && (
        <Text style={styles.errorText}>
          {" "}
          Invalid input , Please Check your inputs
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpensesForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
    color: "white",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginVertical: 16,
  },
});
