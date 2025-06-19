import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Menu } from "react-native-paper";
import { patchField } from "../../utils/FieldApiService";
import { useUser } from "../../context/UserContext";

// Zemin tipi seçeneklerini güncelledim ("Zemin" eklendi)
const floorTypeOptions = [
  { label: "Doğal Zemin", value: 0 },
  { label: "Yapay Zemin", value: 1 },
  { label: "Parke Zemin", value: 2 },
  { label: "Kum Zemin", value: 3 },
];

const lightingOptions = [
  { label: "Var", value: true },
  { label: "Yok", value: false },
];

const cameraOptions = [
  { label: "Var", value: true },
  { label: "Yok", value: false },
];

const scoreBoardOptions = [
  { label: "Var", value: true },
  { label: "Yok", value: false },
];

const tribuneOptions = [
  { label: "Var", value: true },
  { label: "Yok", value: false },
];

const indoorOptions = [
  { label: "Kapalı Saha", value: true },
  { label: "Açık Saha", value: false },
];

const FieldDimensionsCard = ({
  fetchField,
  fieldId,
  openingDays,
  height,
  width,
  floorType,
  capacity,
  isIndoor,
  lightingAvailable,
  hasCamera,
  hasScoreBoard,
  hasTribune,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editHourMode, setEditHourMode] = useState(false);
const {userType} = useUser
  // State'leri güncellenebilir hale getir
  const [editableHeight, setEditableHeight] = useState(height);
  const [editableWidth, setEditableWidth] = useState(width);
  const [editableCapacity, setEditableCapacity] = useState(capacity);
  const [editableFloorType, setEditableFloorType] = useState(floorType);
  const [editableIsIndoor, setEditableIsIndoor] = useState(isIndoor);
  const [editableLightingAvailable, setEditableLightingAvailable] =
    useState(lightingAvailable);
  const [editableHasCamera, setEditableHasCamera] = useState(hasCamera);
  const [editableHasScoreBoard, setEditableHasScoreBoard] =
    useState(hasScoreBoard);
  const [editableHasTribune, setEditableHasTribune] = useState(hasTribune);
  const [editableOpeningDays, setEditableOpeningDays] = useState(openingDays);
  
  // Orijinal değerleri saklamak için state'ler (iptal için)
  const [originalValues, setOriginalValues] = useState({
    height,
    width,
    capacity,
    floorType,
    isIndoor,
    lightingAvailable,
    hasCamera,
    hasScoreBoard,
    hasTribune,
    openingDays,
  });

  useEffect(() => {
    setEditableHeight(height);
    setEditableWidth(width);
    setEditableCapacity(capacity);
    setEditableFloorType(floorType);
    setEditableIsIndoor(isIndoor);
    setEditableLightingAvailable(lightingAvailable);
    setEditableHasCamera(hasCamera);
    setEditableHasScoreBoard(hasScoreBoard);
    setEditableHasTribune(hasTribune);
    setEditableOpeningDays(openingDays);
    
    // Orijinal değerleri güncelle
    setOriginalValues({
      height,
      width,
      capacity,
      floorType,
      isIndoor,
      lightingAvailable,
      hasCamera,
      hasScoreBoard,
      hasTribune,
      openingDays,
    });
  }, [
    height,
    width,
    capacity,
    floorType,
    isIndoor,
    lightingAvailable,
    hasCamera,
    hasScoreBoard,
    hasTribune,
    openingDays,
  ]);

  const getChangedFields = () => {
    const changes = {};
    if (editableHeight !== height) changes.height = editableHeight;
    if (editableWidth !== width) changes.width = editableWidth;
    if (editableCapacity !== capacity) changes.capacity = editableCapacity;
    if (editableFloorType !== floorType) changes.floorType = editableFloorType;
    if (editableIsIndoor !== isIndoor) changes.isIndoor = editableIsIndoor;
    if (editableLightingAvailable !== lightingAvailable)
      changes.lightingAvailable = editableLightingAvailable;
    if (editableHasCamera !== hasCamera) changes.hasCamera = editableHasCamera;
    if (editableHasScoreBoard !== hasScoreBoard)
      changes.hasScoreBoard = editableHasScoreBoard;
    if (editableHasTribune !== hasTribune)
      changes.hasTribune = editableHasTribune;
    return changes;
  };

  const handleEditPress = async () => {
    if (editMode) {
      const changedFields = getChangedFields();
      try {
        const result = await patchField(fieldId, changedFields);
        await fetchField();
      } catch (error) {
        console.error("Hata:", error);
        alert("Güncelleme sırasında hata oluştu");
      }
    }
    setEditMode(!editMode);
  };

  const handleHoursEditPress = async () => {
    if (editHourMode) {
      try {
        // Sadece saat bilgilerini güncelle
        const result = await patchField(fieldId, {
          weeklyOpenings: editableOpeningDays,
        });
        console.log("Güncellenmiş saatler:", editableOpeningDays);
        await fetchField();
      } catch (error) {
        console.error("Hata:", error);
        alert("Saat güncellemesi sırasında hata oluştu");
      }
    }
    setEditHourMode(!editHourMode);
  };

  // Saat aralıklarını güncelleme fonksiyonu
  const updateOpeningHours = (day, slots) => {
    const updatedDays = [...editableOpeningDays];
    
    // Mevcut günü bul veya yeni oluştur
    const dayIndex = updatedDays.findIndex(d => d.dayOfWeek === day);
    
    if (dayIndex > -1) {
      // Gün zaten varsa güncelle
      updatedDays[dayIndex] = {
        ...updatedDays[dayIndex],
        timeSlots: slots
      };
    } else {
      // Yeni gün ekle
      updatedDays.push({
        dayOfWeek: day,
        timeSlots: slots
      });
    }
    
    setEditableOpeningDays(updatedDays);
  };

  // Saat aralığını silme fonksiyonu
  const deleteTimeSlot = (day, slotIndex) => {
    const updatedDays = [...editableOpeningDays];
    const dayIndex = updatedDays.findIndex(d => d.dayOfWeek === day);
    
    if (dayIndex > -1) {
      updatedDays[dayIndex].timeSlots.splice(slotIndex, 1);
      
      // Eğer hiç zaman aralığı kalmadıysa günü sil
      if (updatedDays[dayIndex].timeSlots.length === 0) {
        updatedDays.splice(dayIndex, 1);
      }
      
      setEditableOpeningDays(updatedDays);
    }
  };

  // Saat aralığını düzenleme fonksiyonu
  const editTimeSlot = (day, slotIndex, newStart, newEnd) => {
    const updatedDays = [...editableOpeningDays];
    const dayIndex = updatedDays.findIndex(d => d.dayOfWeek === day);
    
    if (dayIndex > -1) {
      updatedDays[dayIndex].timeSlots[slotIndex] = {
        ...updatedDays[dayIndex].timeSlots[slotIndex],
        startTime: newStart,
        endTime: newEnd
      };
      setEditableOpeningDays(updatedDays);
    }
  };

  // Değişiklikleri iptal et
  const cancelChanges = () => {
    setEditableHeight(originalValues.height);
    setEditableWidth(originalValues.width);
    setEditableCapacity(originalValues.capacity);
    setEditableFloorType(originalValues.floorType);
    setEditableIsIndoor(originalValues.isIndoor);
    setEditableLightingAvailable(originalValues.lightingAvailable);
    setEditableHasCamera(originalValues.hasCamera);
    setEditableHasScoreBoard(originalValues.hasScoreBoard);
    setEditableHasTribune(originalValues.hasTribune);
    setEditableOpeningDays(originalValues.openingDays);
    
    setEditMode(false);
    setEditHourMode(false);
  };

  function getFormattedOpeningDays(data) {
    const turkishDays = {
      Monday: "Pazartesi",
      Tuesday: "Salı",
      Wednesday: "Çarşamba",
      Thursday: "Perşembe",
      Friday: "Cuma",
      Saturday: "Cumartesi",
      Sunday: "Pazar",
    };
    
    const weekOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const scheduleMap = {};
    data?.forEach((item) => {
      scheduleMap[item.dayOfWeek] = item;
    });

    return weekOrder.map((day) => {
      const turkishDay = turkishDays[day];
      const schedule = scheduleMap[day];
      
      if (!schedule || 
          (schedule.startTime === "00:00:00" && 
          schedule.endTime === "00:00:00")) {
        return `${turkishDay}: Kapalı`;
      }

      const start = schedule.startTime.slice(0, 5);
      let end = schedule.endTime.slice(0, 5);
      
      if (end === "00:00") {
        end = "24:00";
      }
      
      return `${turkishDay}: ${start} - ${end}`;
    }).join("\n");
  }

  // Saat formatını düzelt (HH:mm)
  const formatTime = (time) => {
    if (!time) return "";
    
    // Eğer saat:dd formatında değilse düzelt
    if (time.length === 4 && time.indexOf(':') === -1) {
      return time.substring(0, 2) + ':' + time.substring(2);
    }
    
    return time;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Saha Bilgileri</Text>
       
          {
            userType === "Owner" && <View style={styles.headerIcons}>
         
          {(editMode || editHourMode) && (
            <TouchableOpacity onPress={cancelChanges} style={styles.editButton}>
              <Icon name="close" size={24} color="#f44336" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity onPress={handleHoursEditPress} style={styles.editButton}>
            <Icon
              name={editHourMode ? "check" : "access-time"}
              size={24}
              color={editHourMode ? "#4CAF50" : "#757575"}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
            <Icon
              name={editMode ? "check" : "edit"}
              size={24}
              color={editMode ? "#4CAF50" : "#757575"}
            />
          </TouchableOpacity>
        </View>
          }
          
      </View>
      <View style={styles.divider} />

      <ScrollView>
        <View style={styles.infoContainer}>
          {/* Saat düzenleme modu */}
          {editHourMode ? (
            <TimeSlotEditor 
              openingDays={editableOpeningDays}
              onUpdate={updateOpeningHours}
              onDeleteSlot={deleteTimeSlot}
              onEditSlot={editTimeSlot}
              formatTime={formatTime}
            />
          ) : (
            <InfoRow
              icon="clock-o"
              label="Açık Günler:"
              value={getFormattedOpeningDays(openingDays)}
              editable={false}
            />
          )}

          {/* Diğer bilgiler (sadece saat düzenleme modu kapalıyken görünür) */}
          {!editHourMode && (
            <>
              <InfoRow
                icon="arrows-h"
                label="En:"
                value={editableHeight}
                displayValue={`${editableHeight} m`}
                isNumeric={true}
                editable={editMode}
                unit="m"
                onChangeValue={(val) => setEditableHeight(val)}
              />

              <InfoRow
                icon="arrows-v"
                label="Boy:"
                value={editableWidth}
                displayValue={`${editableWidth} m`}
                isNumeric={true}
                editable={editMode}
                unit="m"
                onChangeValue={(val) => setEditableWidth(val)}
              />

              <InfoRow
                icon="leaf"
                label="Zemin Tipi:"
                value={editableFloorType}
                editable={editMode}
                options={floorTypeOptions}
                onSelect={(value) => setEditableFloorType(value)}
              />

              <InfoRow
                icon="users"
                label="Kapasite:"
                value={editableCapacity}
                displayValue={`${editableCapacity} kişi`}
                isNumeric={true}
                editable={editMode}
                unit="kişi"
                onChangeValue={(val) => setEditableCapacity(val)}
              />

              <InfoRow
                icon="building"
                label="Saha Tipi:"
                value={editableIsIndoor}
                editable={editMode}
                options={indoorOptions}
                onSelect={(value) => setEditableIsIndoor(value)}
              />

              <InfoRow
                icon="lightbulb-o"
                label="Işıklandırma:"
                value={editableLightingAvailable}
                editable={editMode}
                options={lightingOptions}
                onSelect={(value) => setEditableLightingAvailable(value)}
              />

              <InfoRow
                icon="camera"
                label="Kamera Kaydı:"
                value={editableHasCamera}
                editable={editMode}
                options={cameraOptions}
                onSelect={(value) => setEditableHasCamera(value)}
              />

              <InfoRow
                icon="scoreboard"
                label="Skor Tabelası:"
                value={editableHasScoreBoard}
                editable={editMode}
                options={scoreBoardOptions}
                onSelect={(value) => setEditableHasScoreBoard(value)}
              />

              <InfoRow
                icon="flag-checkered"
                label="Seyirci Tribünü:"
                value={editableHasTribune}
                editable={editMode}
                options={tribuneOptions}
                onSelect={(value) => setEditableHasTribune(value)}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  displayValue,
  isNumeric,
  editable,
  onChangeValue,
  options,
  onSelect,
  unit,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const getDisplayValue = () => {
    if (!options) {
      if (editable && isNumeric) return String(value);
      if (displayValue) return displayValue;
      return value;
    }
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <View style={styles.infoRow}>
      {icon === "scoreboard" ? (
        <Icon name={icon} size={23} color="#757575" style={styles.icon} />
      ) : (
        <FontAwesome
          name={icon}
          size={18}
          color="#757575"
          style={styles.icon}
        />
      )}

      <Text style={styles.infoLabel}>{label}</Text>

      {editable && isNumeric ? (
        <TextInput
          style={[
            styles.infoValue,
            { borderBottomWidth: 1, borderColor: "#ccc", padding: 2 },
          ]}
          keyboardType="numeric"
          value={String(value)}
          onChangeText={onChangeValue}
        />
      ) : editable && options ? (
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.menuAnchor}
            >
              <Text style={styles.infoValue}>{getDisplayValue()}</Text>
            </TouchableOpacity>
          }
          style={styles.menu}
        >
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => {
                onSelect(option.value);
                setMenuVisible(false);
              }}
              title={option.label}
            />
          ))}
        </Menu>
      ) : (
        <Text style={styles.infoValue}>{getDisplayValue()}</Text>
      )}
    </View>
  );
};

const TimeSlotEditor = ({ openingDays, onUpdate, onDeleteSlot, onEditSlot, formatTime }) => {
  const turkishDays = {
    Monday: "Pazartesi",
    Tuesday: "Salı",
    Wednesday: "Çarşamba",
    Thursday: "Perşembe",
    Friday: "Cuma",
    Saturday: "Cumartesi",
    Sunday: "Pazar",
  };

  const [activeDay, setActiveDay] = useState(null);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const [editingSlots, setEditingSlots] = useState({});

  // Düzenleme modu için state
  const [editing, setEditing] = useState(null); // { day: 'Monday', index: 0 }

  const addTimeSlot = () => {
    if (!newSlot.start || !newSlot.end) return;
    
    // Saat formatını düzelt
    const formattedStart = formatTime(newSlot.start);
    const formattedEnd = formatTime(newSlot.end);
    
    // Saat formatını kontrol et
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formattedStart) || 
        !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formattedEnd)) {
      alert("Lütfen geçerli bir saat formatı girin (HH:mm)");
      return;
    }
    
    const updatedSlots = [
      ...(openingDays.find(d => d.dayOfWeek === activeDay)?.timeSlots || []),
      { startTime: formattedStart + ":00", endTime: formattedEnd + ":00" }
    ];
    
    onUpdate(activeDay, updatedSlots);
    setNewSlot({ start: "", end: "" });
  };

  // Saat girişini formatla
  const handleTimeChange = (type, value) => {
    // Sadece sayıları ve : karakterini kabul et
    const cleaned = value.replace(/[^0-9:]/g, '');
    
    // : karakterinden önceki kısmı al
    const [hours, minutes] = cleaned.split(':');
    
    // Saat kısmını 0-23 arasında sınırla
    let formattedHours = hours;
    if (hours && hours.length > 2) {
      formattedHours = hours.substring(0, 2);
    }
    if (formattedHours > 23) {
      formattedHours = '23';
    }
    
    // Dakika kısmını 0-59 arasında sınırla
    let formattedMinutes = minutes;
    if (minutes && minutes.length > 2) {
      formattedMinutes = minutes.substring(0, 2);
    }
    if (formattedMinutes > 59) {
      formattedMinutes = '59';
    }
    
    // Formatlanmış değeri oluştur
    let formattedValue = formattedHours;
    if (formattedMinutes !== undefined) {
      formattedValue += `:${formattedMinutes}`;
    }
    
    setNewSlot({
      ...newSlot,
      [type]: formattedValue
    });
  };

  // Saat düzenlemeyi başlat
  const startEditing = (day, index, slot) => {
    setEditing({ day, index });
    setEditingSlots({
      ...editingSlots,
      [`${day}-${index}`]: {
        start: slot.startTime.substring(0, 5),
        end: slot.endTime.substring(0, 5)
      }
    });
  };

  // Saat düzenlemeyi kaydet
  const saveEditing = (day, index) => {
    const slotKey = `${day}-${index}`;
    const editedSlot = editingSlots[slotKey];
    
    if (!editedSlot || !editedSlot.start || !editedSlot.end) return;
    
    // Saat formatını düzelt
    const formattedStart = formatTime(editedSlot.start);
    const formattedEnd = formatTime(editedSlot.end);
    
    // Saat formatını kontrol et
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formattedStart) || 
        !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formattedEnd)) {
      alert("Lütfen geçerli bir saat formatı girin (HH:mm)");
      return;
    }
    
    onEditSlot(day, index, formattedStart + ":00", formattedEnd + ":00");
    setEditing(null);
  };

  // Düzenleme değerini güncelle
  const handleEditChange = (day, index, type, value) => {
    const slotKey = `${day}-${index}`;
    
    setEditingSlots({
      ...editingSlots,
      [slotKey]: {
        ...(editingSlots[slotKey] || {}),
        [type]: value
      }
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.timeSlotContainer}
    >
      {Object.entries(turkishDays).map(([engDay, trDay]) => {
        const dayData = openingDays.find(d => d.dayOfWeek === engDay);
        const slots = dayData?.timeSlots || [];
        
        return (
          <View key={engDay} style={styles.dayContainer}>
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => setActiveDay(activeDay === engDay ? null : engDay)}
            >
              <Text style={styles.dayTitle}>{trDay}</Text>
              <Icon
                name={activeDay === engDay ? "expand-less" : "expand-more"}
                size={24}
                color="#4CAF50"
              />
            </TouchableOpacity>
            
            {activeDay === engDay && (
              <View style={styles.timeSlots}>
                {slots.map((slot, index) => {
                  // Düzenleme modunda mı kontrol et
                  const isEditing = editing?.day === engDay && editing?.index === index;
                  
                  return (
                    <View key={index} style={styles.slotRow}>
                      {isEditing ? (
                        <>
                          <TextInput
                            style={[styles.timeInput, styles.editingInput]}
                            value={editingSlots[`${engDay}-${index}`]?.start || ''}
                            onChangeText={(text) => handleEditChange(engDay, index, 'start', text)}
                            placeholder="HH:mm"
                          />
                          <Text style={styles.timeSeparator}>-</Text>
                          <TextInput
                            style={[styles.timeInput, styles.editingInput]}
                            value={editingSlots[`${engDay}-${index}`]?.end || ''}
                            onChangeText={(text) => handleEditChange(engDay, index, 'end', text)}
                            placeholder="HH:mm"
                          />
                          <TouchableOpacity 
                            onPress={() => saveEditing(engDay, index)}
                            style={styles.saveButton}
                          >
                            <Icon name="check" size={20} color="#4CAF50" />
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={styles.slotText}>
                            {slot.startTime.substring(0, 5)} - {slot.endTime.substring(0, 5)}
                          </Text>
                          <View style={styles.slotActions}>
                            <TouchableOpacity 
                              onPress={() => startEditing(engDay, index, slot)}
                              style={styles.editButton}
                            >
                              <Icon name="edit" size={20} color="#2196F3" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                              onPress={() => onDeleteSlot(engDay, index)}
                              style={styles.deleteButton}
                            >
                              <Icon name="delete" size={20} color="#f44336" />
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </View>
                  );
                })}
                
                <View style={styles.addSlotContainer}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="Başlangıç (HH:mm)"
                    value={newSlot.start}
                    onChangeText={(text) => handleTimeChange('start', text)}
                  />
                  <TextInput
                    style={styles.timeInput}
                    placeholder="Bitiş (HH:mm)"
                    value={newSlot.end}
                    onChangeText={(text) => handleTimeChange('end', text)}
                  />
                  <TouchableOpacity 
                    style={styles.addButton} 
                    onPress={addTimeSlot}
                  >
                    <Icon name="add" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    minHeight: 32,
  },
  icon: {
    width: 24,
    marginRight: 10,
  },
  infoLabel: {
    fontWeight: "600",
    color: "#555",
    width: 120,
  },
  infoValue: {
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  menuAnchor: {
    flex: 1,
    justifyContent: "center",
  },
  menu: {
    marginTop: 30,
  },
  timeSlotContainer: {
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeSlots: {
    padding: 12,
    backgroundColor: '#fff',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  slotText: {
    fontSize: 16,
    flex: 1,
  },
  slotActions: {
    flexDirection: 'row',
  },
  addSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    height: 40,
  },
  editingInput: {
    height: 40,
    flex: 1,
  },
  addButton: {
    padding: 8,
  },
  timeSeparator: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  saveButton: {
    padding: 8,
    marginLeft: 5,
  },
  editButton: {
    padding: 5,
    marginRight: 5,
  },
  deleteButton: {
    padding: 5,
  },
});

export default FieldDimensionsCard;