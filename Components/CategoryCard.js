import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,

} from "react-native";
import React from "react";

const CategoryCard = ({imgUrl, title}) => {
  return (
    <ScrollView>
      
      <Pressable >
        <Image
         className=" h-20 p-4 m-1 rounded-xl self-center
           w-20 "
          source={{
            uri: imgUrl,
          }}
        />
        <Text className="text-center">{title}</Text>
      </Pressable>
    </ScrollView>
  );
};




export default CategoryCard;
