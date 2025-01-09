import { Image, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 flex-1">
      {/* Avatar image picker */}

      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square self-center rounded-full bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-square self-center rounded-full bg-slate-300" />
      )}

      <Text
        onPress={pickImage}
        className="text-blue-500 self-center font-semibold m-5"
      >
        Change
      </Text>
      {/* Form */}

      <Text className="mb-2 text-gray-500 font-semibold">Username</Text>
      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 p-3 rounded-md bg-white"
      />

      {/* Button */}
      <View className="mt-auto gap-2">
        <Button title="Update" />
        <Button title="Sign out" />
      </View>
    </View>
  );
}
