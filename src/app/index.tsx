import { api } from "@/trpc/react";
import { Suspense } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Hello } from "@/components/hello";

export default function Index() {
  const utils = api.useUtils();

  const handleRefetch = () => {
    utils.post.hello.reset();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 20,
          maxWidth: 800,
          width: "100%",
        }}
      >
        <Suspense fallback={<Text>Loading...</Text>}>
          <Hello />
        </Suspense>
        <TouchableOpacity
          style={{
            backgroundColor: "#0070f3",
            padding: 12,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={handleRefetch}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Refetch
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
