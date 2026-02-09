import { View, Text, Pressable, PressableProps } from "react-native";
import React, { ComponentProps, ReactNode } from "react";
import { Colors } from "constants/colors";
import { Ionicons } from "@expo/vector-icons";
type IoniconsProps = ComponentProps<typeof Ionicons>;
type IconButtonProps = IoniconsProps & {
  children: ReactNode;
  onPress: PressableProps["onPress"];
};

const OutlineButton = ({ onPress, name, children }: IconButtonProps) => {
  return (
    <Pressable 
    className="px-3 py-2 m-1 flex-row justify-center items-center border-[1px] border-primary500 active:opacity-70"
    onPress={onPress}
    >
      <Ionicons
        className="mr-2"
        name={name}
        size={18}
        color={Colors.primary500}
      />
      <Text className="text-primary500">{children}</Text>
    </Pressable>
  );
};

export default OutlineButton;
