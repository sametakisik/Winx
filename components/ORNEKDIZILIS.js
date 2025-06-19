import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const App = () => {
  // Oyuncu verileri
  const players = [
    { id: 1, name: 'Messi', position: 'FW', image: 'https://example.com/messi.jpg' },
    { id: 2, name: 'Ronaldo', position: 'FW', image: 'https://example.com/ronaldo.jpg' },
    { id: 3, name: 'Neymar', position: 'FW', image: 'https://example.com/neymar.jpg' },
    { id: 4, name: 'De Bruyne', position: 'MF', image: 'https://example.com/debruyne.jpg' },
    { id: 5, name: 'Modric', position: 'MF', image: 'https://example.com/modric.jpg' },
    { id: 6, name: 'Van Dijk', position: 'DF', image: 'https://example.com/vandijk.jpg' },
    { id: 7, name: 'Ramos', position: 'DF', image: 'https://example.com/ramos.jpg' },
    { id: 8, name: 'Neuer', position: 'GK', image: 'https://example.com/neuer.jpg' },
  ];

  // Saha üzerindeki oyuncu pozisyonları
  const [squadPlayers, setSquadPlayers] = useState([]);

  // Oyuncu ekleme fonksiyonu
  const addPlayerToSquad = (player) => {
    if (squadPlayers.length < 11) {
      setSquadPlayers([...squadPlayers, {
        ...player,
        x: width / 2 - 25, // Başlangıç x pozisyonu
        y: 200, // Başlangıç y pozisyonu
        id: `${player.id}-${Date.now()}` // Benzersiz ID
      }]);
    }
  };

  // Oyuncu kaldırma fonksiyonu
  const removePlayerFromSquad = (playerId) => {
    setSquadPlayers(squadPlayers.filter(player => player.id !== playerId));
  };

  // Sürüklenebilir oyuncu bileşeni
  const DraggablePlayer = ({ player, onRemove }) => {
    const translateX = useSharedValue(player.x);
    const translateY = useSharedValue(player.y);

    const panGestureEvent = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      },
      onEnd: () => {
        // Sınır kontrolleri
        translateX.value = withSpring(Math.max(0, Math.min(width - 50, translateX.value)));
        translateY.value = withSpring(Math.max(100, Math.min(400, translateY.value)));
      },
    });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

    return (
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.draggablePlayer, animatedStyle]}>
          <TouchableOpacity onPress={() => onRemove(player.id)}>
            <Image source={{ uri: player.image }} style={styles.playerImage} />
            <Text style={styles.playerName}>{player.name}</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>Kadro Oluştur</Text>
      
      {/* Saha Görseli */}
      <View style={styles.fieldContainer}>
        <Image 
          source={require('./assets/saha.jpg')} 
          style={styles.fieldImage}
          resizeMode="contain"
        />
        
        {/* Saha üzerindeki oyuncular */}
        {squadPlayers.map(player => (
          <DraggablePlayer 
            key={player.id} 
            player={player} 
            onRemove={removePlayerFromSquad}
          />
        ))}
      </View>

      {/* Oyuncu Listesi */}
      <View style={styles.playersList}>
        <Text style={styles.sectionTitle}>Oyuncular ({11 - squadPlayers.length} kalan)</Text>
        <View style={styles.playerGrid}>
          {players.map(player => (
            <TouchableOpacity 
              key={player.id} 
              style={styles.playerItem}
              onPress={() => addPlayerToSquad(player)}
              disabled={squadPlayers.length >= 11}
            >
              <Image source={{ uri: player.image }} style={styles.thumbnailImage} />
              <Text style={styles.playerLabel}>{player.name}</Text>
              <Text style={styles.positionLabel}>{player.position}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  fieldContainer: {
    height: 300,
    backgroundColor: '#2e8b57',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  fieldImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  playersList: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  playerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playerItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  playerLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 3,
  },
  positionLabel: {
    fontSize: 10,
    color: '#666',
  },
  draggablePlayer: {
    position: 'absolute',
    width: 50,
    alignItems: 'center',
    zIndex: 1,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  playerName: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default App;