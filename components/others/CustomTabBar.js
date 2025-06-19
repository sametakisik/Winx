import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isFocused ? styles.activeText : styles.inactiveText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingVertical: 8,
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTab: {
    backgroundColor: "#2ecc71",
    borderColor: "#2ecc71",
  },
  inactiveTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#555",
  },
});

export default CustomTabBar;
