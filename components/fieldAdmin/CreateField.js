import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  TextInput,
  Portal,
  Dialog,
  RadioButton,
  Button,
} from "react-native-paper";

const CreateField = () => {
    const route = useRoute();
    const { facilityId } = route.params;

  const [form, setForm] = useState({
    facilityId: facilityId,
    name: "",
    width: "",
    height: "",
    floorType: "",
    hasCamera: "",
    capacity: "",
    isIndoor: "",
    lightingAvailable: "",
    hasScoreBoard: "",
    hasTribune: ""
  });

  const [displayValues, setDisplayValues] = useState({
    floorType: "",
    hasCamera: "",
    isIndoor: "",
    lightingAvailable: "",
    hasScoreBoard: "",
    hasTribune: ""
  });

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  // Dialog visibility states
  const [visibleFloorType, setVisibleFloorType] = useState(false);
  const [visibleHasCamera, setVisibleHasCamera] = useState(false);
  const [visibleIsIndoor, setVisibleIsIndoor] = useState(false);
  const [visibleLighting, setVisibleLighting] = useState(false);
  const [visibleScoreBoard, setVisibleScoreBoard] = useState(false);
  const [visibleTribune, setVisibleTribune] = useState(false);


  // Selected values for dialogs
  const [selectedFloorType, setSelectedFloorType] = useState("");
  const [selectedHasCamera, setSelectedHasCamera] = useState("");
  const [selectedIsIndoor, setSelectedIsIndoor] = useState("");
  const [selectedLighting, setSelectedLighting] = useState("");
  const [selectedScoreBoard, setSelectedScoreBoard] = useState("");
  const [selectedTribune, setSelectedTribune] = useState("");


  const floorTypeOptions = [
    { label: "Doğal Çim", value: 0 },
    { label: "Yapay Çim", value: 1 },
    { label: "Parke Zemin", value: 2 },
    { label: "Kum Zemin", value: 3 },
  ];

  const yesNoOptions = [
    { label: "Var", value: true },
    { label: "Yok", value: false },
  ];

  const indoorOptions = [
    { label: "Kapalı Saha", value: 1 },
    { label: "Açık Saha", value: 2 },
    { label: "Açılıp Kapanabilen Saha", value: 3 },
  ];

  const handleChange = (key, value, displayValue = "") => {
    setForm({ ...form, [key]: value });
    if (displayValue) {
      setDisplayValues({ ...displayValues, [key]: displayValue });
    }
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" });
    }
  };

  const handleSubmit = () => {
    /*
    const newErrors = {};
    if (!form.name) newErrors.name = "Saha adı gereklidir";
    if (!form.width) newErrors.width = "En bilgisi gereklidir";
    if (!form.height) newErrors.height = "Boy bilgisi gereklidir";
    if (!form.floorType) newErrors.floorType = "Zemin tipi gereklidir";
    if (!form.capacity) newErrors.capacity = "Kapasite gereklidir";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
*/
    navigation.navigate("Saha Detaylarını Tamamla", { fieldData: { ...form } });
  };

  const renderDialog = (
    visible,
    setVisible,
    options,
    selectedValue,
    setSelectedValue,
    formKey
  ) => (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>
          {visibleFloorType
            ? "Zemin Tipi"
            : visibleHasCamera
            ? "Kamera Kaydı"
            : visibleIsIndoor
            ? "Saha Tipi"
            : visibleScoreBoard
            ? "Skor Tabelası"
            : visibleLighting
            ? "Işıklandırma"
            : visibleTribune
            ? "Seyirci Tribünü"
            : ""
            }
        </Dialog.Title>

        <Dialog.Content>
          <ScrollView style={{ maxHeight: 300 }}>
            <RadioButton.Group
              onValueChange={(value) => setSelectedValue(value)}
              value={selectedValue}
            >
              {options.map((option) => (
                <RadioButton.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </RadioButton.Group>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>İptal</Button>
          <Button
            onPress={() => {
              const selectedOption = options.find(
                (opt) => opt.value === selectedValue
              );
              handleChange(formKey, selectedValue, selectedOption?.label);
              setVisible(false);
            }}
          >
            Tamam
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Yeni Saha Oluştur</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Saha Adı"
            placeholder="Saha adını girin"
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={Colors.primary}
            error={!!errors.name}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="stadium" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <TextInput
              label="En (cm)"
              placeholder="Örn: 20"
              value={form.width}
              onChangeText={(text) => handleChange("width", text)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              activeOutlineColor={Colors.primary}
              error={!!errors.width}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon name="straighten" size={20} color={Colors.primary} />
                  )}
                />
              }
            />
            {errors.width && (
              <Text style={styles.errorText}>{errors.width}</Text>
            )}
          </View>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TextInput
              label="Boy (cm)"
              placeholder="Örn: 40"
              value={form.height}
              onChangeText={(text) => handleChange("height", text)}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.primary}
              error={!!errors.height}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon name="straighten" size={20} color={Colors.primary} />
                  )}
                />
              }
            />
            {errors.height && (
              <Text style={styles.errorText}>{errors.height}</Text>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <TouchableOpacity onPress={() => setVisibleFloorType(true)}>
              <TextInput
                label="Zemin Tipi"
                value={displayValues.floorType}
                editable={false}
                mode="outlined"
                style={styles.input}
                error={!!errors.floorType}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="grass" size={20} color={Colors.primary} />
                    )}
                  />
                }
                right={<TextInput.Icon icon="menu-down" />}
              />
            </TouchableOpacity>
            {errors.floorType && (
              <Text style={styles.errorText}>{errors.floorType}</Text>
            )}
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TouchableOpacity onPress={() => setVisibleHasCamera(true)}>
              <TextInput
                label="Kamera Kaydı"
                value={displayValues.hasCamera}
                editable={false}
                mode="outlined"
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="videocam" size={20} color={Colors.primary} />
                    )}
                  />
                }
                right={<TextInput.Icon icon="menu-down" />}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Kapasite (kişi)"
            placeholder="Örn: 10"
            value={form.capacity}
            onChangeText={(text) => handleChange("capacity", text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            activeOutlineColor={Colors.primary}
            error={!!errors.capacity}
            left={
              <TextInput.Icon
                icon={() => (
                  <Icon name="people" size={20} color={Colors.primary} />
                )}
              />
            }
          />
          {errors.capacity && (
            <Text style={styles.errorText}>{errors.capacity}</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
            <TouchableOpacity onPress={() => setVisibleIsIndoor(true)}>
              <TextInput
                label="Saha Tipi"
                value={displayValues.isIndoor}
                editable={false}
                mode="outlined"
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="house" size={20} color={Colors.primary} />
                    )}
                  />
                }
                right={<TextInput.Icon icon="menu-down" />}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <TouchableOpacity onPress={() => setVisibleLighting(true)}>
              <TextInput
                label="Işıklandırma"
                value={displayValues.lightingAvailable}
                editable={false}
                mode="outlined"
                style={styles.input}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <Icon name="lightbulb" size={20} color={Colors.primary} />
                    )}
                  />
                }
                right={<TextInput.Icon icon="menu-down" />}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <TouchableOpacity onPress={() => setVisibleScoreBoard(true)}>
            <TextInput
              label="Skor Tabelası"
              value={displayValues.hasScoreBoard}
              editable={false}
              mode="outlined"
              style={styles.input}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon name="videocam" size={20} color={Colors.primary} />
                  )}
                />
              }
              right={<TextInput.Icon icon="menu-down" />}
            />
          </TouchableOpacity>
        </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
          <TouchableOpacity onPress={() => setVisibleTribune(true)}>
            <TextInput
              label="Seyirci Tribünü"
              value={displayValues.hasTribune}
              editable={false}
              mode="outlined"
              style={styles.input}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Icon name="videocam" size={20} color={Colors.primary} />
                  )}
                />
              }
              right={<TextInput.Icon icon="menu-down" />}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Icon name="save" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.submitButtonText}>İleri</Text>
        </TouchableOpacity>

        {/* Dialogs */}
        {renderDialog(
          visibleFloorType,
          setVisibleFloorType,
          floorTypeOptions,
          selectedFloorType,
          setSelectedFloorType,
          "floorType"
        )}
        {renderDialog(
          visibleHasCamera,
          setVisibleHasCamera,
          yesNoOptions,
          selectedHasCamera,
          setSelectedHasCamera,
          "hasCamera"
        )}
        {renderDialog(
          visibleIsIndoor,
          setVisibleIsIndoor,
          indoorOptions,
          selectedIsIndoor,
          setSelectedIsIndoor,
          "isIndoor"
        )}
        {renderDialog(
          visibleLighting,
          setVisibleLighting,
          yesNoOptions,
          selectedLighting,
          setSelectedLighting,
          "lightingAvailable"
        )}
        {renderDialog(
          visibleScoreBoard,
          setVisibleScoreBoard,
          yesNoOptions,
          selectedScoreBoard,
          setSelectedScoreBoard,
          "hasScoreBoard"
        )}
         {renderDialog(
          visibleTribune,
          setVisibleTribune,
          yesNoOptions,
          selectedTribune,
          setSelectedTribune,
          "hasTribune"
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#f9f9f9",
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default CreateField;
