import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../context/GlobalProvidor';

import { images } from '../constants'
import CustomButton from '../components/CustomButton';

export default function App() {

  const {isLoading, isLoggedIn} =useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-white h-full">


      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
          <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap:0,width:'100%'}}>
          <Image
            source={images.logo}
            className="w-[110px] h-[65px]"
            resizeMode="contain"
          />
          <Text className="text-3xl text-black font-bold text-center" >StreamPro</Text>
          </View>
         

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-black font-bold text-center">
            Experience Boundless{"\n"}
            Streaming with{" "}
              <Text style={{color:'blue'}} >StreamPro</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          Where Ideas Meet Action: Venture into the Uncharted with StreamPro
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

