import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../Sanity";
import { StarIcon } from "react-native-heroicons/solid";
import {
  MapPinIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import Dishrow from "../Components/Dishrow";
import BasketIcon from "../Components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../Features/RestaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(setRestaurant({
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    }) 
    )
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown:false
    });
  }, [])

  return (
    <>
       <BasketIcon  />
      <ScrollView className="flex-1">
        <View className="relative">
          {/* <Image source={{uri: urlFor{...imgUrl}.url(), }} className="w-full h-56 p-4"/> */}
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 p-4"
          />
        </View>
        <View className=" bg-white">
          <Text className="text-center text-3xl p-2 font-extrabold">
            {title}
          </Text>
          <View className="flex flex-row space-x-1 p-2 text-center">
            <StarIcon color="green" size={22} opacity={0.5} />
            <Text className="text-gray-500 text-xs">
              <Text>{rating}</Text> . {genre}
            </Text>

            <View className="flex flex-row space-x-1">
              <MapPinIcon color="gray" size={22} opacity={0.5} />
              <Text className="text-gray-500 text-xs">Nearby . {address}</Text>
            </View>
          </View>
          <Text className="text-gray-500  p-3">{short_description}</Text>

          <TouchableOpacity className="flex flex-row items-center border-y space-x-2 p-4 border-gray-200">
            <QuestionMarkCircleIcon size={22} color="gray" opacity={0.5} />
            <Text className="pl-2 text-md flex-1 font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon size={22} color="lightblue" />
          </TouchableOpacity>
        </View>

        {/* dishes section */}
        <View className="pb-36">
          <Text className="font-bold text-xl p-4">Menu</Text>
          {dishes.map((dish) => (
            <Dishrow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              price={dish.price}
              image={dish.image}
              description={dish.short_description}
            />
          ))}
        </View>
      </ScrollView>
     
    </>
  );
};

export default RestaurantScreen;
