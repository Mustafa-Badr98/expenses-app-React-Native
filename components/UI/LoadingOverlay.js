import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constans/styles";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

export default LoadingOverlay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
