import { Image, Text, useWindowDimensions, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

import { AdvancedImage } from "cloudinary-react-native";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "~/src/lib/cloudinary";

export default function PostListItem({ post }) {
  const { width } = useWindowDimensions();

  const image = cld.image(post.image);

  image.resize(
    thumbnail().width(width).height(width).gravity(focusOn(FocusOn.face()))
  );

  const avatar = cld.image(post.user.avatar_url);

  avatar.resize(
    thumbnail().width(50).height(30).gravity(focusOn(FocusOn.face()))
  );

  return (
    <View className="bg-white">
      {/* Header - */}
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-semibold">{post.user.username}</Text>
      </View>

      {/* Content:  */}
      <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />

      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={24} />
        <Ionicons name="chatbubble-outline" size={24} />
        <Feather name="send" size={24} />

        <Feather name="bookmark" size={24} className="ml-auto" />
      </View>
    </View>
  );
}
