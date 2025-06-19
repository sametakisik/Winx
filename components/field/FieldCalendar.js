import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import TimeCard from "../others/TimeCard";
import DateBar from "../../DateBar";
import WeeklyCalendar from "./WeeklyCalendar";

import CreateMatch from "../match/CreateMatch";
import { useUser } from "../../context/UserContext";
import { useBottomSheet } from "../../BottomSheetContext";
import CreateRoom from "../room/CreateRoom";
import { getReservationByFieldId } from "../../utils/ReservationApiService";
import { IconButton } from "react-native-paper";
import PriceEditor from "./PriceEditor";

// Helper function to parse date strings as local dates
const parseLocalDate = (dateTimeStr) => {
  const [datePart, timePart] = dateTimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

const exceptions = [
  {
    id: 4,
    date: "2025-07-06T00:00:00",
    isOpen: false,
  },
    {
    id: 5,
    date: "2025-07-03T00:00:00",
    isOpen: false,
  },
];

const formatDateForException = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateTimes = (start, end) => {
  const result = [];
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);

  while (current <= endTime) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");
    result.push(`${hours}:${minutes}`);
    current.setMinutes(current.getMinutes() + 60);
  }

  return result;
};

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const FieldCalendar = ({ fieldId, price, capacity, weeklyOpenings }) => {
  const { userType } = useUser();

  const [priceEditor, setPriceEditor] = useState(price);

  const [isWeekly, setIsWeekly] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [reservations, setReservations] = useState([]);

  const { openSheet } = useBottomSheet();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getReservationByFieldId(fieldId, selectedDate);
      console.warn("xxxx", selectedDate, response);
      setReservations(response);
    };
    fetchData();
  }, [selectedDate]);

   const isExceptionDay = useMemo(() => {
    return exceptions.some(
      ex => 
        formatDateForException(new Date(ex.date)) === formatDateForException(selectedDate) &&
        !ex.isOpen
    );
  }, [selectedDate]);

  const cardWidth = (Dimensions.get("window").width - 40) / 3;
  const toggleSwitch = () => setIsWeekly((prev) => !prev);

  // Find opening hours for selected day
  const dayOfWeek = dayNames[selectedDate.getDay()];
  const openingForDay = weeklyOpenings?.find((s) => s.dayOfWeek === dayOfWeek);

  // Parse reservations for this field
  const reservedSlots = useMemo(() => {
    return reservations
      .filter((res) => res.fieldId === fieldId)
      .map((res) => ({
        start: parseLocalDate(res.slotStart),
        end: parseLocalDate(res.slotEnd),
      }));
  }, [fieldId]);

  // Generate times only if field is open
  const times = openingForDay
    ? generateTimes(openingForDay.startTime, openingForDay.endTime)
    : [];

  // Combine date and time into ISO string
  const combineDateAndTime = (timeString, date) => {
    const [hours, minutes] = timeString.split(":");
    const baseDate = new Date(date);
    return new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      parseInt(hours),
      parseInt(minutes),
      0,
      0
    ).toISOString();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={styles.switch}>
          <Text
            style={{
              marginRight: 10,
              fontWeight: isWeekly ? "normal" : "bold",
            }}
          >
            Günlük
          </Text>
          <Switch onValueChange={toggleSwitch} value={isWeekly} />
          <Text
            style={{ marginLeft: 10, fontWeight: isWeekly ? "bold" : "normal" }}
          >
            Haftalık
          </Text>
        </View>
        {userType === "Owner" ? (
          <PriceEditor
            fieldId={fieldId}
            price={priceEditor}
            setPrice={setPriceEditor}
          />
        ) : (
          <Text style={styles.price}>
            {price}₺ <Text style={styles.perHour}>/saat</Text>
          </Text>
        )}
        <IconButton />
      </View>

      {!isWeekly ? (
        <>
          <DateBar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

{!openingForDay || isExceptionDay ? (
            <View style={styles.closedContainer}>
              <Text style={styles.closedText}>
                {isExceptionDay 
                  ? "Bu gün saha kapalı" 
                  : "Bu gün saha kapalı"}
              </Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.cardContainer}>
              {times.map((time, index) => {
                const [hour, minute] = time.split(":").map(Number);
                const slotStart = new Date(selectedDate);
                slotStart.setHours(hour, minute, 0, 0);
                const slotEnd = new Date(slotStart);
                slotEnd.setHours(slotStart.getHours() + 1);

                const now = new Date();
                let state = "Boş";

                if (slotStart < now) {
                  state = "Geçmiş";
                } else {
                  const isReserved = reservedSlots.some(
                    (res) => res.start < slotEnd && res.end > slotStart
                  );
                  if (isReserved) state = "Dolu";
                }

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (state === "Boş") {
                        if (userType === "Customer") {
                          openSheet(
                            <CreateRoom
                              fieldId={fieldId}
                              reservationTime={combineDateAndTime(
                                time,
                                selectedDate
                              )}
                              maxPlayer={capacity}
                            />,
                            ["60%", "80%", "90%","99%"]
                          );
                        } else if (userType === "admin") {
                          openSheet(<Text>admin</Text>);
                        }
                      }
                    }}
                  >
                    <View style={{ width: cardWidth, marginBottom: 10 }}>
                      <TimeCard time={time} state={state} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </>
      ) : (
        <WeeklyCalendar />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  closedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  closedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  price: {
    fontSize: 23,
    fontWeight: "800",
    color: "#2EC4B6",
    alignSelf: "center",
  },
  perHour: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8D99AE",
  },
  closedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000", // Changed to red
  },
});

export default FieldCalendar;
