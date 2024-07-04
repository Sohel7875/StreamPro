import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvidor';

const Home = () => {
  const {user, setUser, setIsLoggedIn}=useGlobalContext()

  const { data: posts, refetch, } = useAppwrite(getAllPosts)
  const { data: latestPosts } = useAppwrite(getLatestPosts)
 

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }


  
  return (
    <SafeAreaView className="bg-white h-full">
      
      
      <FlatList
        data={posts}

        keyExtractor={(item) => item.$id}
        renderItem={( item ) => (
         
        <VideoCard video={item} />
        )}

        ListHeaderComponent={() => (
          <View className="my-6 px-2 space-y-6">
            <View className="justify-between flex-row items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-black-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-black">{user.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image source={images.logo}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-black-100 text-lg font-pregular mb-3">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>

        )}

        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the First one to Upload a video"
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing}
          onRefresh={onRefresh}
        />}

      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})