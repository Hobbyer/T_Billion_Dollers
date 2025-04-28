import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit'
const screenWidth = Dimensions.get("window").width;

const TemperatureInfo = ({chartConfig}) => {
  return (
    <View>
      <Text style={styles.label}>📈 온도 그래프</Text>
          <LineChart
            data={{
              labels: ["9시", "12시", "15시", "18시"],
              datasets: [{ data: [22.1, 24.3, 25.2, 23.9] }],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
    </View>
  )
}

export default TemperatureInfo

const styles = StyleSheet.create({})