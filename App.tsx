import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {
  AbstraxionProvider,
  useLogin,
  useMetaAccount,
} from '@burnt-labs/abstraxion-react-native';

const { width } = Dimensions.get('window');

const SmashTagRitual = () => {
  const { login, logout } = useLogin();
  const { address } = useMetaAccount();

  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'bound'>('idle');

  // Idle breathing pulse
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // When bound, update ritual text
  useEffect(() => {
    if (address) {
      setStatus('bound');
    }
  }, [address]);

  const handleLogin = () => {
    setStatus('authenticating');

    // Tap pulse + flash
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();

    // Flash glow burst
    Animated.sequence([
      Animated.timing(glow, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(glow, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Trigger Meta Account login
    login({ method: 'email', email: 'you@example.com' });
  };

  return (
    <View style={styles.container}>
      {/* Flash aura effect */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glow,
            transform: [{ scale }],
          },
        ]}
      />

      {/* Ritual Sigil */}
      <Pressable onPress={handleLogin} disabled={status !== 'idle'}>
        <Animated.Image
          source={require('./assets/smashsmash.png')}
          style={[styles.glyph, { transform: [{ scale }] }]}
          resizeMode="contain"
        />
      </Pressable>

      {/* Ritual Status */}
      <Text style={styles.text}>
        {status === 'idle' && 'Initiate the Smash Tag Ritual'}
        {status === 'authenticating' && 'Smash Ritual Engaged...'}
        {status === 'bound' && `Bound to:\n${address}`}
      </Text>

      {status === 'bound' && (
        <Pressable onPress={logout}>
          <Text style={styles.logout}>💀 Undo Smash</Text>
        </Pressable>
      )}
    </View>
  );
};

export default function App() {
  return (
    <AbstraxionProvider>
      <SmashTagRitual />
    </AbstraxionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  glyph: {
    width: width * 0.7,
    height: width * 0.7,
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: width * 0.375,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  text: {
    color: '#00FFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  logout: {
    marginTop: 18,
    color: '#FF00FF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
