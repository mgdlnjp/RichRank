import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const FREQUENCIES = [
  // { label: 'Horaire', value: 'hourly', factor: 2080 }, // Retiré
  { label: "Journalier", value: "daily", factor: 260 }, // 5j * 52 semaines
  { label: "Hebdomadaire", value: "weekly", factor: 52 },
  { label: "Mensuel", value: "monthly", factor: 12 },
];

const DOLLAR = { symbol: "$", millionaire: 10000000, billionaire: 1000000000 };

export default function App() {
  const [salary, setSalary] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [result, setResult] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const salaryInputRef = useRef(null);

  const handleCalculate = () => {
    // Forcer le focus sur le champ salaire
    if (salaryInputRef.current) {
      salaryInputRef.current.focus();
    }

    const freq = FREQUENCIES.find((f) => f.value === frequency);
    const annual = parseFloat(salary || 0) * freq.factor;

    let status = "";
    if (annual >= DOLLAR.billionaire) {
      status = "Milliardaire 💎";
    } else if (annual >= DOLLAR.millionaire) {
      status = "Millionnaire 🤑";
    } else {
      status = "Pas encore millionnaire 😅";
    }

    setResult({
      annual,
      status,
      symbol: DOLLAR.symbol,
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.crownIcon}>👑</Text>
            </View>
            <Text style={styles.title}>Rich Rank</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.labelCentered}>Fréquence</Text>
              <View style={styles.rowCentered}>
                {FREQUENCIES.map((f) => (
                  <TouchableOpacity
                    key={f.value}
                    style={[
                      styles.chip,
                      frequency === f.value && styles.chipSelected,
                    ]}
                    onPress={() => setFrequency(f.value)}
                  >
                    <Text
                      style={
                        frequency === f.value
                          ? styles.chipTextSelected
                          : styles.chipText
                      }
                    >
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.labelCentered}>Ton salaire</Text>
              <TextInput
                ref={salaryInputRef}
                style={styles.input}
                keyboardType="numeric"
                placeholder="Montant"
                value={salary}
                onChangeText={setSalary}
                placeholderTextColor="#888"
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
              <Text style={styles.buttonText}>Calculer</Text>
            </TouchableOpacity>

            {result && (
              <Animated.View
                style={[styles.resultContainer, { opacity: fadeAnim }]}
              >
                <Text style={styles.resultTitle}>{result.status}</Text>
                <Text style={styles.resultTitle}>Revenu annuel estimé</Text>
                <Text style={styles.resultTitle}>
                  {result.annual.toLocaleString()} {result.symbol}
                </Text>
              </Animated.View>
            )}
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>
              © 2024 - Calcul basé sur des estimations standards
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  crownIcon: {
    fontSize: 48,
    marginBottom: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 18,
    alignItems: "center",
  },
  labelCentered: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
    textAlign: "center",
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#23262F",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#FFD700",
    width: 220,
    textAlign: "center",
  },
  rowCentered: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  chip: {
    backgroundColor: "#23262F",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  chipSelected: {
    backgroundColor: "#FFD700",
  },
  chipText: {
    color: "#FFD700",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#23262F",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 18,
    marginBottom: 20,
  },
  buttonText: {
    color: "#23262F",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    backgroundColor: "#23262F",
    borderRadius: 16,
    padding: 24,
    marginTop: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
    textAlign: "center", // Ajouté pour centrage
  },
  resultText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center", // Ajouté pour centrage
  },
  footerContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  footer: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
});
