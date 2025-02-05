import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvidor'
const SignUp = () => {

  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })


  const submit =async () => {

    if(!form.username || !form.email || !form.password){
      Alert.alert('Error','Please fill in all the fileds')
    }

    setSubmitting(true)

    try {
      const result = await createUser(form.email,form.password,form.username);
      setUser(result);
      setIsLogged(true);
      router.replace('/home')
      
    } catch (error) {
      Alert.alert('Error',error)
    }
    finally{
      setSubmitting(false)
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
            Sign Up to StreamPro
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({
              ...form, username: e
            })}
            otherStyles="mt-10"
            placeholder={'Enter Your Username'}

          />
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
            title="Sign up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              have an Account Already?
            </Text>
            <Link
              style={{color:'blue'}}
            href="sign-in"
              className='text-lg font-psemibold text-blue'
            >Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
