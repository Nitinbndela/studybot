import React, { useState, useContext, createContext, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Image, Dimensions, FlatList, StatusBar, 
  SafeAreaView, Animated, Alert 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// --- Constants & Mock Data ---
const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#4c669f';
const SECONDARY_COLOR = '#3b5998';
const ACCENT_COLOR = '#FF6B6B';

const EXAM_CATEGORIES = [
  { id: '1', title: 'SSC CGL', icon: 'briefcase', color: ['#FF9966', '#FF5E62'] },
  { id: '2', title: 'Banking', icon: 'landmark', color: ['#56CCF2', '#2F80ED'] },
  { id: '3', title: 'UPSC', icon: 'university', color: ['#11998e', '#38ef7d'] },
  { id: '4', title: 'Railways', icon: 'train', color: ['#8E2DE2', '#4A00E0'] },
];

const POPULAR_COURSES = [
  { id: '1', title: 'Master Arithmetic', tutor: 'Amit Sir', rating: 4.8, students: '12k', image: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg' },
  { id: '2', title: 'Reasoning Elite', tutor: 'Priya Ma\'am', rating: 4.9, students: '8.5k', image: 'https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg' },
  { id: '3', title: 'GS Foundation', tutor: 'Team Alpha', rating: 4.7, students: '20k', image: 'https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg' },
];

// --- Authentication Context ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'Nitin' && password === 'Bundela') {
      setUser({ name: 'Nitin', role: 'Student' });
    } else {
      Alert.alert('Access Denied', 'Invalid Credentials. Hint: Nitin / Bundela');
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Components ---

// 1. Login Screen (Dynamic Gradient)
const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('Nitin'); // Pre-filled for demo
  const [password, setPassword] = useState('Bundela'); // Pre-filled for demo

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#141E30', '#243B55']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.loginCard}>
        <View style={styles.iconCircle}>
          <FontAwesome5 name="user-graduate" size={40} color="#fff" />
        </View>
        <Text style={styles.loginTitle}>EdVerify</Text>
        <Text style={styles.loginSubtitle}>Master Your Future</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={() => login(username, password)}
        >
          <LinearGradient
            colors={[ACCENT_COLOR, '#FF8E53']}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            style={styles.gradientBtn}
          >
            <Text style={styles.loginBtnText}>START LEARNING</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 2. Home Screen
const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const scrollY = new Animated.Value(0);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <LinearGradient colors={item.color} style={styles.categoryGradient}>
        <FontAwesome5 name={item.icon} size={28} color="#fff" />
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseBadge}>LIVE</Text>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.tutorName}>By {item.tutor}</Text>
        <View style={styles.courseStats}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.studentText}>{item.students} Enrolled</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.userName}>{user.name}!</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
           <Image 
             source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
             style={styles.profileImg} 
           />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#666" />
          <TextInput placeholder="Search exams, tests, videos..." style={styles.searchInput} />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={styles.promoGradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
            <View style={{flex: 1}}>
              <Text style={styles.promoTitle}>Super Coaching</Text>
              <Text style={styles.promoSubtitle}>Get 60% OFF on SSC + Bank Combo</Text>
              <TouchableOpacity style={styles.promoBtn}>
                <Text style={styles.promoBtnText}>Claim Now</Text>
              </TouchableOpacity>
            </View>
            <FontAwesome5 name="rocket" size={60} color="rgba(255,255,255,0.2)" style={{position: 'absolute', right: -10, bottom: -10}} />
          </LinearGradient>
        </View>

        {/* Categories */}
        <Text style={styles.sectionHeader}>Explore Exams</Text>
        <FlatList 
          data={EXAM_CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20 }}
        />

        {/* Popular Courses */}
        <View style={styles.sectionHeaderRow}>
           <Text style={styles.sectionHeader}>Recommended For You</Text>
           <Text style={styles.seeAll}>See All</Text>
        </View>
        
        {POPULAR_COURSES.map((course) => (
           <React.Fragment key={course.id}>
             {renderCourse({ item: course })}
           </React.Fragment>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

// 3. Profile Screen (For Logout)
const ProfileScreen = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.userName}>Hello, {user.name}</Text>
      <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

// Dummy Screens for Tab Bar
const LiveClassScreen = () => <View style={styles.centerView}><Text>Live Classes</Text></View>;
const TestsScreen = () => <View style={styles.centerView}><Text>Mock Tests</Text></View>;

// --- Navigation ---
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Live') iconName = 'play-circle';
        else if (route.name === 'Tests') iconName = 'clipboard-list';
        else if (route.name === 'Profile') iconName = 'person';

        return (
          <View style={focused ? styles.activeTab : null}>
            <Ionicons name={iconName} size={size} color={focused ? '#fff' : '#888'} />
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Live" component={LiveClassScreen} />
    <Tab.Screen name="Tests" component={TestsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppContent = () => {
  const { user } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  
  // Login Styles
  loginCard: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignSelf: 'center',
    marginTop: '40%',
    shadowColor: "#000", shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 15,
    alignItems: 'center'
  },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center', alignItems: 'center', marginTop: -70, marginBottom: 20,
    borderWidth: 4, borderColor: '#fff'
  },
  loginTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  loginSubtitle: { fontSize: 14, color: '#888', marginBottom: 30 },
  inputContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f4f8', 
    borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, height: 50, width: '100%' 
  },
  input: { flex: 1, marginLeft: 10, color: '#333' },
  loginBtn: { width: '100%', borderRadius: 10, overflow: 'hidden', marginTop: 10 },
  gradientBtn: { flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold', marginRight: 10 },

  // Home Header Styles
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 },
  greetingText: { fontSize: 16, color: '#888' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  profileImg: { width: 45, height: 45, borderRadius: 25, borderWidth: 2, borderColor: ACCENT_COLOR },

  // Search
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', 
    marginHorizontal: 20, padding: 12, borderRadius: 12, marginBottom: 20 
  },
  searchInput: { marginLeft: 10, flex: 1 },

  // Banners
  promoBanner: { marginHorizontal: 20, height: 140, borderRadius: 20, marginBottom: 30, overflow: 'hidden' },
  promoGradient: { flex: 1, padding: 20, flexDirection: 'row', alignItems: 'center' },
  promoTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  promoSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginVertical: 5 },
  promoBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, alignSelf: 'flex-start', marginTop: 10 },
  promoBtnText: { color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 12 },

  // Categories
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 15, color: '#333' },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
  seeAll: { color: ACCENT_COLOR, fontWeight: 'bold', marginBottom: 15 },
  categoryCard: { marginRight: 15, width: 100, height: 100, borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  categoryGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  categoryTitle: { color: '#fff', marginTop: 8, fontWeight: 'bold', fontSize: 12 },

  // Courses
  courseCard: { 
    flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, 
    marginBottom: 15, borderRadius: 15, padding: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3
  },
  courseImage: { width: 80, height: 80, borderRadius: 10 },
  courseInfo: { marginLeft: 15, flex: 1, justifyContent: 'center' },
  courseBadge: { color: ACCENT_COLOR, fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  courseTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  tutorName: { fontSize: 12, color: '#888', marginBottom: 8 },
  courseStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingBox: { flexDirection: 'row', backgroundColor: '#FFF9C4', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, alignItems: 'center' },
  ratingText: { fontSize: 10, fontWeight: 'bold', marginLeft: 4, color: '#FBC02D' },
  studentText: { fontSize: 10, color: '#888' },

  // Navigation
  tabBar: { 
    position: 'absolute', bottom: 20, left: 20, right: 20, 
    elevation: 0, backgroundColor: '#fff', borderRadius: 25, height: 70, 
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 10,
    borderTopWidth: 0
  },
  activeTab: { 
    backgroundColor: ACCENT_COLOR, width: 50, height: 50, 
    borderRadius: 25, justifyContent: 'center', alignItems: 'center',
    marginTop: -20, shadowColor: ACCENT_COLOR, shadowOpacity: 0.4, shadowRadius: 10
  },
  logoutBtn: { marginTop: 20, backgroundColor: '#FF6B6B', padding: 15, borderRadius: 10, width: 200, alignItems: 'center' }
});
