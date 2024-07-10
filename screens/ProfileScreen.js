import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useAuth } from '../services/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          onPress: () => {
            logout();
            navigation.replace('Login');
          }
        }
      ],
      { cancelable: true }
    );
  };

  const menuItems = [
    { icon: 'file-tray-full-outline', text: 'Order' , screen: null },
    { icon: 'heart-outline', text: 'Wishlist', screen: 'Wishlist' },
    { icon: 'gift-outline', text: 'Coupons', screen: 'Coupons' },
    { icon: 'help-circle-outline', text: 'Help Center', screen: null }
  ];

  const accountSettingsItems = [
    { icon: 'person-outline', text: 'Edit Profile' },
    { icon: 'location-outline', text: 'Saved Addresses' },
    { icon: 'language-outline', text: 'Select Language' },
    { icon: 'notifications-outline', text: 'Notification Setting', badge: '5' },
    { icon: 'log-out-outline', text: 'Log Out', onPress: handleLogout }
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => item.screen && navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={24} color="black" />
      <Text style={styles.menuItemText}>{item.text}</Text>
    </TouchableOpacity>
  );

  const renderSettingsItem = ({ item }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={item.onPress}>
      <Ionicons name={item.icon} size={24} color="gray" />
      <Text style={styles.settingsText}>{item.text}</Text>
      {item.badge && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationCount}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <Avatar
          rounded
          size="large"
          source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user ? `${user.firstName} ${user.lastName}` : 'Guest User'}</Text>
        </View>
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.text}
        horizontal
        contentContainerStyle={styles.menu}
      />
      <Text style={styles.sectionTitle}>Account Settings</Text>
    </View>
  );

  return (
    <FlatList
      data={accountSettingsItems}
      renderItem={renderSettingsItem}
      keyExtractor={(item) => item.text}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    marginBottom: 32,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  menuItemText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingsText: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
    color: '#333',
  },
  notificationBadge: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  notificationCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
