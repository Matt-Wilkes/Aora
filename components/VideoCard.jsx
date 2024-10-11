import { View, Text, Image, TouchableOpacity } from "react-native";
import { React, useState, useEffect } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useGlobalContext } from "../context/GlobalProvider";
import { updateLike } from "../lib/appwrite";

// destructure the video properties straight away
const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    users: { username, avatar },
    likes,
  },
}) => {
  const [liked, setLiked] = useState(null);
  // const [likesArray, setLikesArray] = useState(likes?.map(({ $id }) => $id) || []);
  const [likesArray, setLikesArray] = useState(likes || []);
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();

  const checkLikesByUserId = () => {
    if (likesArray.includes(user.$id)) {
      return true
    } else {
      return false
    }
  };


  useEffect(() => {
    updateLike($id, likesArray)
    if (checkLikesByUserId()) {
      setLiked(true)
    } else {
      setLiked(false)
    };
  }, [likesArray]);



  const handleLike = async () => {
    try {
      if (likesArray.includes(user.$id)) {
        const newLikes = await likesArray.filter((id) => id !== user.$id);
        setLikesArray(newLikes);
      } else {
        setLikesArray(prevLikes => [...prevLikes, user.$id]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <TouchableOpacity onPress={() => {handleLike()}}>
            <MaterialCommunityIcons
              resizeMode="contain"
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{
            uri: video,
          }}
          className="w-full h-60 rounded-xl rounded-[35px] mt-3"
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
