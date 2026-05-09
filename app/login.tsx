import { Link, useRouter } from "expo-router";
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

// Sub-komponen Input
const CustomInput = ({ labelText, ...inputProps }) => (
  <View style={uiStyles.fieldBox}>
    <Text style={uiStyles.inputLabel}>{labelText}</Text>
    <TextInput style={uiStyles.textEntry} {...inputProps} />
  </View>
);

const SignInScreen = () => {
  const nav = useRouter();

  // State untuk form login
  const [authData, setAuthData] = useState({
    userName: "",
    userPass: "",
  });

  // Update input secara dinamis
  const updateInput = (key, val) => {
    setAuthData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // Fungsi login
  const processAuthentication = () => {
    const { userName, userPass } = authData;

    if (!userName || !userPass) {
      Alert.alert("Error", "Nama dan Password harus diisi!");
      return;
    }

    console.log({
      name: userName,
      password: userPass,
    });

    Alert.alert(
      "Sukses",
      `Selamat datang kembali, ${userName}!`,
      [
        {
          text: "OK",
          onPress: () => nav.push("/"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={uiStyles.wrapper}>
      <View style={uiStyles.mainCard}>
        <Text style={uiStyles.heading}>Login</Text>
        <Text style={uiStyles.subHeading}>
          Sign in to Continue
        </Text>

        {/* Forgot Password */}
        <View style={uiStyles.recoveryWrapper}>
          <Link href="/forgot_pass" asChild>
            <TouchableOpacity>
              <Text style={uiStyles.clickableText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Input Nama */}
        <CustomInput
          labelText="Name"
          value={authData.userName}
          onChangeText={(txt) =>
            updateInput("userName", txt)
          }
          autoCapitalize="words"
          placeholder="Masukkan nama"
        />

        {/* Input Password */}
        <CustomInput
          labelText="Password"
          value={authData.userPass}
          onChangeText={(txt) =>
            updateInput("userPass", txt)
          }
          secureTextEntry
          placeholder="Masukkan password"
        />

        {/* Tombol Login */}
        <TouchableOpacity
          style={uiStyles.actionBtn}
          onPress={processAuthentication}
        >
          <Text style={uiStyles.btnText}>Log In</Text>
        </TouchableOpacity>

        
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const uiStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },

  mainCard: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },

  subHeading: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },

  fieldBox: {
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

  actionBtn: {
    backgroundColor: "#3d3d3d",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 3,
  },

  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  bottomText: {
    color: "#666",
    fontSize: 14,
  },

  clickableText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  recoveryWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});