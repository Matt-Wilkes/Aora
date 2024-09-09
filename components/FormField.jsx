import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import {React, useState } from 'react'
import { icons } from "../constants"

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    
  return (
    // pass in otherStyles prop incase we WANT to render other styles
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      {/* add borders around text box, black background and rounded, on focus */}
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center">
      <TextInput className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        // if password, hide what's being typed
        secureTextEntry={title === 'Password' && !showPassword}
        style={{ flex: 1 }}
      />
      {title === 'Password' && (
        <TouchableOpacity onPress={() => 
        // on press, toggle showPassword, make the password visible/invisible
        setShowPassword(!showPassword)}>
        {/* render relevant eye icon based on password visibility */}
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"
                resizeMode="contain" />
        </TouchableOpacity>
      )}

      </View>
    </View>
  )
}

export default FormField