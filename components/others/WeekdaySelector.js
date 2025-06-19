import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const days = [
  { label: "Pazartesi", value: 1, full: "Pazartesi" },
  { label: "Salı", value: 2, full: "Salı" },
  { label: "Çarşamba", value: 3, full: "Çarşamba" },
  { label: "Perşembe", value: 4, full: "Perşembe" },
  { label: "Cuma", value: 5, full: "Cuma" },
  { label: "Cumartesi", value: 6, full: "Cumartesi" },
  { label: "Pazar", value: 7, full: "Pazar" },
];

const formatTime = (date) =>
  date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const WeekdaySelector = ({selectedDays, setSelectedDays}) => {
 
  const [currentDay, setCurrentDay] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [pickerMode, setPickerMode] = useState("start");


  useEffect(() => {
    if (showErrorModal) {
      Alert.alert(
        "Geçersiz Saat Aralığı",
        "Bitiş saati başlangıç saatinden önce olamaz",
        [
          {
            text: "Tekrar Dene",
            onPress: () => {
              setShowErrorModal(false);
              retryTimeSelection();
            },
          },
          {
            text: "Tamam",
            onPress: () => {
              setShowErrorModal(false);
              setCurrentDay(null);
            },
          },
        ]
      );
    }
  }, [showErrorModal]);

  const openTimePicker = (day) => {
    setCurrentDay(day);
    const now = new Date();
    setStartTime(now);
    setEndTime(new Date(now.getTime() + 60 * 60 * 1000));
    setPickerMode("start");
    setShowStartPicker(true);
  };

  const onStartTimeSelected = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowStartPicker(false);
      return;
    }
    setStartTime(selectedDate);
    setShowStartPicker(false);
    setPickerMode("end");
    setShowEndPicker(true);
  };

  const onEndTimeSelected = (event, selectedDate) => {
    setShowEndPicker(false);

    if (event.type === "dismissed") {
      return;
    }

    const newEndTime = selectedDate;
    setEndTime(newEndTime);

    if (newEndTime <= startTime) {
      setShowErrorModal(true);
      return;
    }

    saveTimeRange(startTime, newEndTime);
  };

const saveTimeRange = (start, end) => {
  const range = {
    dayOfWeek: currentDay,
    startTime: formatTime(start),
    endTime: formatTime(end),
  };

  setSelectedDays((prev) => {
    const isDuplicate = prev.some(
      (item) =>
        item.dayOfWeek === range.dayOfWeek &&
        item.startTime === range.startTime &&
        item.endTime === range.endTime
    );

    if (!isDuplicate) {
      const updated = [...prev, range];
      updated.sort((a, b) => {
        if (a.dayOfWeek !== b.dayOfWeek) {
          return a.dayOfWeek - b.dayOfWeek;
        }
        return a.startTime.localeCompare(b.startTime);
      });
      return updated;
    }

    return prev;
  });

  setCurrentDay(null);
};


const removeTimeRange = (day, index) => {
  setSelectedDays((prev) => {
    const updated = [...prev];
    const filtered = updated.filter(
      (item, i) => !(item.dayOfWeek === Number(day) && updated.filter(d => d.dayOfWeek === Number(day)).indexOf(item) === index)
    );
    return filtered;
  });
};


  const retryTimeSelection = () => {
    setShowErrorModal(false);
    setPickerMode("start");
    setShowStartPicker(true);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Çalışma Saatlerini Ayarla</Text>
      
      {/* Üst satır - Pazartesi, Salı, Çarşamba */}
<View style={styles.daysRow}>
  {days.slice(0, 4).map((day) => {
    const hasSelectedForDay = selectedDays.some(d => d.dayOfWeek === day.value);
    return (
      <TouchableOpacity
        key={day.value}
        style={[styles.dayButton, hasSelectedForDay && styles.selectedDayButton]}
        onPress={() => openTimePicker(day.value)}
      >
        <Text style={[styles.dayText, hasSelectedForDay && styles.selectedDayText]}>
          {day.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>

      
      {/* Alt satır - Perşembe, Cuma, Cumartesi, Pazar */}
 <View style={styles.daysRow}>
  {days.slice(4).map((day) => {
    const hasSelectedForDay = selectedDays.some(d => d.dayOfWeek === day.value);
    return (
      <TouchableOpacity
        key={day.value}
        style={[styles.dayButton, hasSelectedForDay && styles.selectedDayButton]}
        onPress={() => openTimePicker(day.value)}
      >
        <Text style={[styles.dayText, hasSelectedForDay && styles.selectedDayText]}>
          {day.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>


<View style={styles.selectedTimesContainer}>
  {days.map((day) => {
    const dayRanges = selectedDays.filter((d) => d.dayOfWeek === day.value);
    if (dayRanges.length === 0) return null;

    return (
      <View key={day.value} style={styles.dayTimeContainer}>
        <Text style={styles.dayTitle}>{day.full}:</Text>
        {dayRanges.map((range, i) => (
          <View key={i} style={styles.timeRangeContainer}>
            <Text style={styles.timeRangeText}>
              {range.startTime} - {range.endTime}
            </Text>
            <TouchableOpacity
              onPress={() => removeTimeRange(day.value, i)}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={18} color="#ff4444" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  })}
</View>

      {(showStartPicker || showEndPicker) && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>
            {pickerMode === "start" ? "Başlangıç Saati" : "Bitiş Saati"}
          </Text>
          <DateTimePicker
            value={pickerMode === "start" ? startTime : endTime}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={pickerMode === "start" ? onStartTimeSelected : onEndTimeSelected}
            minimumDate={pickerMode === "end" ? new Date(startTime.getTime() + 60000) : undefined}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 4,
    height: 50,
  },
  selectedDayButton: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedTimesContainer: {
    marginTop: 10,
  },
  dayTimeContainer: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  dayTitle: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
    fontSize: 16,
  },
  timeRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  timeRangeText: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    padding: 4,
  },
  pickerContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
});

export default WeekdaySelector;