// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function MainScreen() {
//   const navigation = useNavigation();
//   const bikeListNavigation = () => {
//     navigation.navigate("BikeList"); 
//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexDirection: "column",
//         padding: "10px",
//         paddingBottom: "50px",
//         paddingTop: "50px",
//       }}
//     >
//       <Text
//         style={{
//           fontSize: "26px",
//           fontWeight: 400,
//           fontFamily: "roboto",
//           marginTop: 10,
//           marginBottom: 20,
//           textAlign: "center",
//         }}
//       >
//         A premium online store for sporter and their stylish choice
//       </Text>
//       <View
//       style={{
//           width: "100%",
//           height: "200px",
//           backgroundColor: "lightcoral",
//           borderRadius: 50,
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center"


//       }}>
//         <Image
//           source={require("./assets/blueBike.png")} // Replace with the actual image path
//           style={{ width: "85%", height: "280px" }}
//         />
//       </View>

//       <Text style={{
//           fontSize: "26px",
//           fontWeight: 700,
//           fontFamily: "Ubuntu",
//           textAlign: "center",
//           marginTop: 30,
//         }}>POWER BIKE <br></br>SHOP</Text>
//        <TouchableHighlight style={{
//            width: "100%",
//            backgroundColor: "red",
//            borderRadius: "30px",
//            marginTop: 50,
//            padding: 20,
//        }} onPress={bikeListNavigation}>
//           <Text style={{
//            color: "white",
//            textAlign: "center"

//           }}>Get Started</Text>
//         </TouchableHighlight>
//     </View>
//   );
// }
// }