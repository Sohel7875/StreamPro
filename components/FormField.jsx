import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const FormField = ({
    title, value, placeholder, handleChangeText, otherStyles, ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`"space-y-2 ${otherStyles} "`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className="w-full h-16 px-4 bg-white-100   border-2 border-gray-100 rounded-2xl focus:border-blue-100 items-center flex-row">
                <TextInput
                    className="flex-1 text-black font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#BBC4C2"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
                    </TouchableOpacity>
                )}

            </View>
        </View>
    )
}

export default FormField