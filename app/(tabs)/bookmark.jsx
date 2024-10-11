import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getLikedPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch} = useAppwrite(() => getLikedPosts(user.$id))
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch the posts again
    await refetch();
    // console.log(posts)r
    setRefreshing(false)
  }

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          // surround the header and search Input
          <View className="my-6 px-4">
            <View className="justify-between items-start flex-row mb-6">
              <Text className="text-2xl font-psemibold text-white">Bookmarks</Text>
            </View>
            <SearchInput/>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center">
            <Text className=" font-pmedium text-xl text-gray-100">Like videos to see them here</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Bookmark