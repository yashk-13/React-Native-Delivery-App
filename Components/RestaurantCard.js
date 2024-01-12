import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../Sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <Pressable className="bg-white  shadow mx-2" 
    onPress={() => {
      navigation.navigate("Restaurant",{id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,} );

    } }>
      {/* <Text>RestaurantCard</Text> */}
      <Image source={{
         uri:urlFor(imgUrl).url()
         }} className="h-36 w-36 rounded-lg " />
      <View>
        <Text className=" pb-4">{title}</Text>
        <View className="items-center space-x-1 flex-row">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-gray-500 text-sm">
         <Text className="text-green-600">{rating}</Text> . {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
            <MapPinIcon color="grey"  opacity={0.5} size={22}/>
            <Text className="text-xs  text-gray-500">Nearby.{address}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
