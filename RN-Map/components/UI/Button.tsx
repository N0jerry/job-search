import { View, Text, Pressable } from "react-native";
import React, { ReactNode } from "react";

const Button = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: ReactNode;
}) => {
  return (
    <Pressable
      style={{
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4,
      }}
      onPress={onPress}
      className="px-4 py-2 m-1 bg-primary800 active:opacity-70"
    >
      <Text className="text-center text-[16px] color-primary50">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
