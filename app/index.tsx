import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";

import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const InputField = ({ label, ...props }) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

export default function SignupScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      setBirthDate(`${day}/${month}/${year}`);
    }
  };

  const handleSignup = () => {
    if (!fullName || !email || !password || !birthDate) {
      Alert.alert("Error", "Semua field wajib diisi");
      return;
    }

    Alert.alert("Sukses", "Akun berhasil dibuat", [
      {
        text: "OK",
        onPress: () => router.push("/login"),
      },
    ]);

    console.log({
      fullName,
      email,
      password,
      birthDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Sign up to continue
          </Text>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}> Login</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Date of Birth</Text>

            <TouchableOpacity
              style={styles.dateButton}
              activeOpacity={0.8}
              onPress={() => setShowPicker(true)}
            >
              <Text
                style={[
                  styles.dateText,
                  {
                    color: birthDate ? "#111" : "#999",
                  },
                ]}
              >
                {birthDate || "Select your birth date"}
              </Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={
                Platform.OS === "ios"
                  ? "spinner"
                  : "default"
              }
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}

          <TouchableOpacity
            style={styles.signupButton}
            activeOpacity={0.8}
            onPress={handleSignup}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#777777",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 25,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  loginText: {
    color: "#777777",
    fontSize: 14,
  },

  loginLink: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },

  inputWrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    marginLeft: 3,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    fontSize: 15,
    color: "#111111",
  },

  dateButton: {
    height: 56,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },

  dateText: {
    fontSize: 15,
  },

  signupButton: {
    backgroundColor: "#111111",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  signupText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});