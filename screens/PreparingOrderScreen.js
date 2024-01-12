import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as animatable from 'react-native-animatable'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const PreparingOrderScreen = () => {
  return (
    <SafeAreaProvider>
    <SafeAreaView>
    <animatable.Image source={require("../assets/pizza.gif")} 
    animation="slideInUp"
    iterationCount={1}
    className="h-80 w-80 top-10  m-4"
    />
    <animatable.Text animation="slideInUp"
    iterationCount={1}
    className="text-xl text-center py-5 font-semibold">
      Waiting for restaurant to accept your Order.
    </animatable.Text>
    </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default PreparingOrderScreen