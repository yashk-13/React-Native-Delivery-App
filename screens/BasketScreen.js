import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../Features/RestaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../Features/BasketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { urlFor } from "../Sanity";
import numeral from "numeral";


const BasketScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const BasketTotal = useSelector(selectBasketTotal)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  const formattedCurrency = numeral(items[0]?.price).format('$0,0.00');
  const SubTotalCurrency = numeral(BasketTotal ).format('$0,0.00');
  const BasketTotalCurrency = numeral(BasketTotal + 5.99).format('$0,0.00');
//   console.log(groupedItemsInBasket);
  return (
    <SafeAreaProvider>
    <SafeAreaView className="pt-5 flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-green-400 bg-white shadow-sm">
          <View>
            <Text className="text-lg font-extrabold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-6 right-5">
            <XCircleIcon color="green" size={30} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center bg-white space-x-4 my-5 py-3 px-3">
            <Image source={{uri:"https://links.papareact.com/wru"}} className="h-7 w-7 rounded-full  p-4"/>
            <Text className="flex-1">Delivery in 40-55 min</Text>

            <TouchableOpacity>
            <Text className=" text-green-400">Change</Text>
            </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key ,items]) => (
            <View key={key} className="flex-row items-center space-x-3 justify-center py-2 px-5 bg-white">
                <Text className="text-green-400">{items.length} x</Text>
                <Image source={{uri:urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full" />
                <Text className="flex-1">{items[0]?.name}</Text>
                <Text className="text-gray-600">{formattedCurrency}</Text>
                <TouchableOpacity>
                    <Text className="text-xs text-green-400 " onPress={()=> dispatch(removeFromBasket({id:key}))}>Remove</Text>
                </TouchableOpacity>
            </View>
            ))}
        </ScrollView>
      </View>

      <View className="p-5 bg-white mt-5 space-y-4 ">
      <View className="flex-row justify-between ">
        <Text className="text-gray-400">Subtotal</Text>
        <Text className="text-gray-400 px-2">{SubTotalCurrency}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-400">Delivery Charge</Text>
        <Text className="text-gray-400 px-2">5.99 </Text>
      </View>

      <View className="flex-row justify-between">
        <Text >Order total</Text>
        <Text className=" font-extrabold px-2">{BasketTotalCurrency}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('PreparingOrderScreen')} className="rounded-lg p-4 bg-green-400">
        <Text className="text-center text-lg text-white font-bold">Place Order</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BasketScreen;
