import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { React, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  // calling custom appwrite hook with function to get all posts
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch the posts again
    await refetch();

    setRefreshing(false)
  }

  console.log(posts)

  return (
    <SafeAreaView className="bg-primary h-full">
    {/* used to render a list of elements */}
      <FlatList
      // needs data, keyExtractor, renderItem
        data={posts}
        // data={[]}
        // get each item and then get the id from it
        keyExtractor={(item) => item.$id}
        // tell RN how we want to render each item, destructure the data from each item
        renderItem={({item}) => (
          // immediate return
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl font-psemibold text-white">JSMastery</Text>
              </View>
              <View className="mt-1.5">
              <Image
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode='contain'
              />
              </View>
            </View>
            <SearchInput/>
            <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
            {/* Trending videos component */}
            <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        // fetch new videos
        RefreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home