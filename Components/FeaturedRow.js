import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from "../Sanity";


const FeaturedRow = ({id,title, description}) => {
    const [restaurants, setRestaurants] = useState([])

  //   useEffect(() => {
  //     async function fetchRestaurants  ()  {
  //         try {
  //             const data = await client.fetch(`
  //                 *[_type == "featured" && id == $id ] {
  //                     ...,
  //                     restaurants[]-> {
  //                         ...,
  //                         dishes[]->,
  //                         type->{
  //                             name
  //                         },
  //                     }[0]
  //                 }
  //             `, {id:id}); // Make sure to pass id as an object here
  //             setRestaurants(data);
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     };
  
  //     fetchRestaurants();
  // }, []);
  // console.log(restaurants);

  useEffect(() =>{
    client.fetch(`
    *[_type == "featured"  ] {
        ...,
        restaurants[]->{
            ...,
            dishes[]->,
             type-> {
              name
            }
           },
       }[0]                 
    `,
    ).then(data => {
      setRestaurants(data?.restaurants);
    });

  }, [])
  return (
    <View className="px-2">
        <View className="flex-row mt-4 items-center justify-between px-4">
            <Text className="font-bold text-lg ">{title}</Text>
            <ArrowRightIcon  size={20} color="blue"/>
        </View>
        <Text className="text-xs px-4 text-gray-500">{description}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15}} className="pt-4">
          {/* Restaurant Card  */}
          {restaurants?.map((resto) =>(

              <RestaurantCard 
              key={resto._id}
              id={resto._id}
              imgUrl={resto.image}
              title={resto.name}
              rating={resto.rating}
              genre={resto.type?.name}
              address={resto.address}
              short_description={resto.short_description}
              dishes={resto.dishes}
              long={resto.long}
              lat={resto.lat}
              /> 
             ))} 
         
          
        </ScrollView>
    </View>
  )
}

export default FeaturedRow