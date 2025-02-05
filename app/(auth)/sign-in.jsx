import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvidor'
const SignIn = () => {

const {setUser, setIsLoggedIn} = useGlobalContext();
const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: ''
  })



  const submit =async () => {

    if( form.email ==="" || form.password ===""){
      Alert.alert('Error','Please fill in all the fileds')
    }

    setIsSubmitting(true)

    try {
      await signIn(form.email,form.password);
       const result = await getCurrentUser();
       setUser(result);
       setIsLoggedIn(true)
       Alert.alert("Success", "User signed in successfully");
       router.replace("/home");
      
    } catch (error) {
      Alert.alert('Error',error)
    }
    finally{
      setIsSubmitting(false)
    }

  } 

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[55px]"
          />

          <Text className="text-2xl text-black text-semibold mt-10 font-psemibold">
            Log in to StreamPro
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form, email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder={'Enter Your Email'}
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form, password: e
            })}
            otherStyles="mt-7"
            placeholder={'Enter Your Password'}
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have a Account?
            </Text>
            <Link 
            style={{color:'blue'}}
            href="sign-up" 
            className='text-lg font-psemibold'
            >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
