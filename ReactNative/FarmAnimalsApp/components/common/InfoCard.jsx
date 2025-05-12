import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FadeInDown } from "react-native-reanimated";

const InfoCard = ({icon,label,value}) => {
  return (
     <Animated.View
       entering={FadeInDown.delay(200).duration(800)}
       style={styles.card}
     >
       <View style={styles.iconWrapper}>{icon}</View>
       <View>
         <Text style={styles.cardLabel}>{label}</Text>
         <Text style={styles.cardValue}>{value}</Text>
       </View>
     </Animated.View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#66bb6a",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
   iconWrapper: {
    marginRight: 16,
  },
  cardLabel: {
    fontSize: 16,
    color: "#e8f5e9",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
