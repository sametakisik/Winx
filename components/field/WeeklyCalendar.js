import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format, addDays, eachDayOfInterval, startOfWeek, addWeeks } from 'date-fns';
import { tr } from 'date-fns/locale';

const WeeklyCalendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const weekStart = startOfWeek(currentWeek, { locale: tr });
  
  // Haftanın 7 gününü oluştur
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6)
  });

  // Hafta değiştirme fonksiyonları
  const goToPreviousWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, -1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  // Hafta aralığını gösteren metin
  const weekRangeText = `${format(weekStart, 'd MMMM', { locale: tr })} - ${format(addDays(weekStart, 6), 'd MMMM yyyy', { locale: tr })}`;

  // Saat aralıkları (09:00 - 23:00)
  const hours = Array.from({length: 15}, (_, i) => 9 + i);

  // Rastgele durum üretme (gerçek uygulamada API'den gelecek)
  const getRandomStatus = () => Math.random() > 0.5 ? 'D' : 'B';

  return (
    <View style={styles.container}>
      {/* Hafta seçim başlığı */}
      <View style={styles.weekSelector}>
        <TouchableOpacity onPress={goToPreviousWeek}>
          <Text style={styles.weekNavButton}>{'<'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToCurrentWeek}>
          <Text style={styles.weekRangeText}>{weekRangeText}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={goToNextWeek}>
          <Text style={styles.weekNavButton}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Günler başlığı */}
          <View style={styles.headerRow}>
            <View style={styles.timeColumn}></View>
            {weekDays.map((day, index) => (
              <View key={`day-${index}`} style={styles.dayHeader}>
                <Text style={styles.dayNameText}>
                  {format(day, 'EEE', { locale: tr }).toUpperCase()}
                </Text>
                <Text style={[
                  styles.dayDateText,
                  format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && styles.todayDateText
                ]}>
                  {format(day, 'd')}
                </Text>
              </View>
            ))}
          </View>

          {/* Takvim satırları */}
          <ScrollView>
            {hours.map((hour, hourIndex) => (
              <View key={`hour-${hourIndex}`} style={styles.timeRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeText}>{`${hour}:00`}</Text>
                </View>
                
                {weekDays.map((day, dayIndex) => {
                  const status = getRandomStatus();
                  return (
                    <View 
                      key={`cell-${dayIndex}-${hourIndex}`}
                      style={[
                        styles.cell,
                        status === 'D' ? styles.bookedCell : styles.availableCell,
                        format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && styles.todayCell
                      ]}
                    >
                      <Text style={styles.cellText}>{status}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  weekRangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  weekNavButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 4,
  },
  dayHeader: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  dayDateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  todayDateText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  timeRow: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
  },
  timeColumn: {
    width: 70,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  cell: {
    width: 64,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  availableCell: {
    backgroundColor: '#E8F5E9', // Yeşil (boş)
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  bookedCell: {
    backgroundColor: '#FFEBEE', // Kırmızı (dolu)
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  cellText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
});

export default WeeklyCalendar;