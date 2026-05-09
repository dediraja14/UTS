import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// 1. Membuat sub-komponen terpisah untuk input email
const EmailInput = ({ labelText, ...props }) => (
  <View style={layoutDesign.fieldGroup}>
    <Text style={layoutDesign.inputLabel}>{labelText}</Text>
    <TextInput style={layoutDesign.textEntry} {...props} />
  </View>
);

// 2. Menggunakan Arrow Function untuk komponen utama
const PasswordRecoveryScreen = () => {
  const navigator = useRouter();

  const [recoveryEmail, setRecoveryEmail] = useState("");

  const submitRecoveryRequest = () => {
    if (!recoveryEmail) {
      Alert.alert("Error", "Mohon masukkan alamat email Anda!");
      return;
    }

    console.log("Kirim link reset ke:", recoveryEmail);

    Alert.alert(
      "Berhasil",
      "Link untuk mereset password telah dikirim ke email Anda.",
      [
        { text: "OK", onPress: () => navigator.push("/login") },
      ]
    );
  };

  return (
    <SafeAreaView style={layoutDesign.mainWrapper}>
      <View style={layoutDesign.contentBox}>
        <Text style={layoutDesign.headerText}>Forgot Password</Text>
        <Text style={layoutDesign.subHeaderText}>New Password</Text>

        {/* 3. Memanggil sub-komponen agar struktur JSX berbeda */}
        <EmailInput
          labelText="Email"
          value={recoveryEmail}
          onChangeText={setRecoveryEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={layoutDesign.actionButton} 
          onPress={submitRecoveryRequest}
        >
          <Text style={layoutDesign.actionButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordRecoveryScreen;

// 4. Mengubah nama variabel styling dan class-nya
const layoutDesign = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  contentBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },
  subHeaderText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  textEntry: {
    height: 55,
    borderColor: "#eee",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: "#3d3d3d",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});