import { StyleSheet } from "react-native";
export const GRAPH_BOX = StyleSheet.create({
  graphBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d0e8d0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 20,
    alignItems: 'center',
  },
})
export const LABEL = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#228B22",
  },
})

export const CHART_CONFIG = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#32CD32",
  },
};