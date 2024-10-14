import { View, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import {React, useState } from 'react'
import { icons } from "../constants"
import { usePathname, router } from 'expo-router'

const FilterInput = ({searchText, setSearchText}) => {
    const [filter, setFilter] = useState(searchText || '');
    
  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
      <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={filter}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setFilter(e)}
        style={{ flex: 1 }}
      />
        <TouchableOpacity
        onPress={() => {
          if(!filter) {
            return Alert.alert('Missing query', "Please input something to search results across database")
          }
        setSearchText(filter);
        }}
        >
        {/* search icon */}
            <Image 
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
            />
        </TouchableOpacity>

      </View>
  )
}

export default FilterInput