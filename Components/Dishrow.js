import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import numeral from 'numeral';
import { urlFor } from "../Sanity";
import { MinusCircleIcon ,PlusCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from "../Features/BasketSlice";

const Dishrow = ({ id, name, price, description, image }) => {

    const formattedCurrency = numeral(price).format('$0,0.00');
    const [isPressed, setisPressed] = useState(false)
    
    const items = useSelector((state) =>selectBasketItemsWithId(state, id))
    const dispatch = useDispatch();

    // console.log(items);
    const addItemToBasket = () => {
        dispatch(addToBasket ( {id, name, price, description, image} ) ); };
     
    const removeItemsfromBasket = () => {
      if (items.length >=0) return;
      dispatch(removeFromBasket({id}));

    }    
  return (
    <>
    <TouchableOpacity onPress={()=>{setisPressed(!isPressed)}}
     className={` bg-white border border-gray-200 ${isPressed && "border-b-0"} `}>
      <View className=" p-4 flex flex-row">
        <View className="mx-4 flex-1">
          <Text className="text-xl">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400">
            {/* <Currency quantity={price} currency="USD" /> */}{formattedCurrency} </Text>
        </View>

        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="h-20 w-20 rounded-md bg-gray-300"
          />
        </View>
      </View>
    </TouchableOpacity>
    {isPressed && (
        <View className="bg-white p-4">
            <View className="flex-row items-center pb-3 space-x-2">
                <TouchableOpacity onPress={removeItemsfromBasket}>
                <MinusCircleIcon size={30} color="green"/>
                </TouchableOpacity>
                <Text className="text-black">{items}</Text>
                {/* <Text>{items ? items.length : 0}</Text> */}
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon size={30} color="green"/>
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
  );
};

export default Dishrow;
