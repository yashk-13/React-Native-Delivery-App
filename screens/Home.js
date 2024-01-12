import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ChevronDownIcon, UserIcon,AdjustmentsHorizontalIcon,MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../Components/Categories";
import FeaturedRow from "../Components/FeaturedRow";
import client from "../Sanity";



const Home = () => {
  const navigation = useNavigation();
  const [featuredCategories, setfeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // useEffect(() => {
  //   client.fetch(`*[_type == 'featured'] {
  //         ...,
  //         restaurants[]->{
  //           ...,
  //           dishes[]->
  //         }
  //       }`).then((data) =>{
  //       setfeaturedCategories(data)
  //      });

  //     },[]); 
  //   console.log(setfeaturedCategories);  
  useEffect(() => {
     async function fetchData ()  {
      try {
        const data = await client.fetch(`*[_type == 'featured'] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }`);
        setfeaturedCategories(data);
        // console.log(data); // Log the data, not the set function
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white pt-5 flex-1">
        <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
          <Image
            source={{ uri: "https:links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="blue" />
            </Text>
          </View>
          <UserIcon size={35} color="blue" />
        </View>
        {/* Search Section */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row flex-1 bg-gray-200 p-2 rounded-lg ">
                <MagnifyingGlassIcon size={25} color="blue"/>
            <TextInput   placeholder="Restaurants and Cusines" inputMode="search"/>
            </View>
            <AdjustmentsHorizontalIcon size={25} color="blue"/>
        </View>
        {/* Body */}
        <ScrollView>
            {/* Categories */}
            <Categories/>
            {/* FeaturedRow */}
            {featuredCategories?.map(category => (

            <FeaturedRow key={category.name} id={category.id} title={category.name} description={category.short_description}/>
            ))}
            {/* <FeaturedRow id={2} title="Tasty Discounts" description="Everyone been enjoying these discounts"/>
            <FeaturedRow id={3} title="Offers Near you" description="Why Not Support the local Restos"/> */}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
