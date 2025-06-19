import { Pressable, StyleSheet, Text, View } from "react-native";

const Button = ({ 
  children, 
  onPress, 
  fullWidth = false, 
  paddingSize, 
  style, 
  textStyle, 
  ...rest
}) => {
  return (
    <View style={[styles.container, fullWidth && styles.fullWidthContainer, rest]}>
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
    backgroundColor: '#00bf63', // default renk
  },
  fullWidthButton: {
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Button;
