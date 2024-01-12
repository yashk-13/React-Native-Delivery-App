import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../Features/BasketSlice'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import numeral from 'numeral'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation()
    const BasketTotal = useSelector(selectBasketTotal)
    const formattedCurrency = numeral(BasketTotal).format('$0,0.00');

    if(items.length === 0 ) return null;
  return (
    <View className="absolute bottom-10  w-full z-50">
        <TouchableOpacity onPress={()=> navigation.navigate("Basket")} className="mx-5  bg-green-300 rounded-lg flex-row items-center space-x-2">
      <Text className="px-1 py-2 font-extrabold text-white text-lg">{items.length}</Text>
      <Text className="flex-1 text-center text-lg font-extrabold text-white">View Basket</Text>
      <Text className="text-lg text-white font-extrabold">
        {formattedCurrency}
      </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon