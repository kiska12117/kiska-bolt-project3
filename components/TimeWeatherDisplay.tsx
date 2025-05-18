import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TimeWeatherDisplay() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  // Mock weather data - would be replaced with actual API data
  const weatherData = {
    temperature: '24°C',
    condition: 'Sunny',
    icon: '🌤️',
  };
  
  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      
      // Format time: HH:MM:SS
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date: YYYY.MM.DD
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      setCurrentDate(`${year}.${month}.${day}`);
    };
    
    // Initial update
    updateTime();
    
    // Set interval for updates
    const interval = setInterval(updateTime, 1000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, []);
  
  return (
    <View style={styles.container}>
      <BlurView intensity={15} tint="dark" style={styles.contentContainer}>
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.weatherSection}>
          <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
          <View>
            <Text style={styles.weatherTemp}>{weatherData.temperature}</Text>
            <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    zIndex: 10,
    margin: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(102, 204, 255, 0.3)',
  },
  timeSection: {
    padding: 12,
  },
  timeText: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 16,
    color: '#66CCFF',
  },
  dateText: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    color: 'rgba(102, 204, 255, 0.7)',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(102, 204, 255, 0.3)',
  },
  weatherSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  weatherIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  weatherTemp: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 16,
    color: '#66CCFF',
  },
  weatherCondition: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    color: 'rgba(102, 204, 255, 0.7)',
  },
});