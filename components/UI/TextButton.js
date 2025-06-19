import { Pressable, StyleSheet, Text, View } from "react-native";

const TextButton = ({ 
  children, 
  onPress, 
  fullWidth = false, 
  paddingSize, 
  style, 
  textStyle, 
  ...rest // diğer tüm gelen props'lar buraya alınır
}) => {
  return (
    <View style={[styles.container, fullWidth && styles.fullWidthContainer]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          fullWidth && styles.fullWidthButton,
          paddingSize ? { padding: paddingSize } : {},
          style, // dışarıdan gelen stil
        ]}
        {...rest} // örneğin disabled gibi props'lar buradan otomatik geçer
      >
        <Text style={[styles.buttonText, textStyle]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthContainer: {
    alignItems: "stretch",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  fullWidthButton: {
    width: "100%",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TextButton;
