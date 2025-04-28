import { api } from "@/trpc/react";
import { Text } from "react-native";

export function Hello() {
  const [hello] = api.post.hello.useSuspenseQuery({ text: "World" });

  return <Text style={{ fontSize: 16, color: "#333" }}>{hello.greeting}</Text>;
}
