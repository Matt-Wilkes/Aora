import { View, Text, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '../../lib/useAppwrite';
import { getLikedPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import FilterInput from '../../components/FilterInput';

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch} = useAppwrite(() => getLikedPosts(user.$id))
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(null)

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch the posts again
    await refetch();
    // set filteredPosts and searchText back to empty/null
    setRefreshing(false)
    setFilteredPosts(null)
    setSearchText('')
  }

  useEffect(() => {
    console.log('search text: ', searchText)
    if (searchText) {
      setFilteredPosts(posts.filter(({title}) => title.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [searchText])

  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={!filteredPosts ? posts : filteredPosts}
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
            <FilterInput searchText={searchText} setSearchText={setSearchText} />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center">
          {/* render the text based on whether any videos are found */}
            <Text className=" font-pmedium text-xl text-gray-100">{!filteredPosts ? 'Like videos to see them here' : 'No videos found'}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Bookmark