import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const colors = {
  primary: '#0245ae',
  white: '#ffffff',
  neutral900: '#171717',
  neutral700: '#262626',
  neutral400: '#a3a3a3',
  neutral200: '#f5f5f5',
};

type FieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  containerStyle?: object;
};

function Field({ label, containerStyle, ...inputProps }: FieldProps) {
  return (
    <View style={[styles.field, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.neutral400}
        selectionColor={colors.primary}
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

function onlyDigits(value: string, limit: number) {
  return value.replace(/\D/g, '').slice(0, limit);
}

function formatDate(value: string) {
  const digits = onlyDigits(value, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join('/');
}

function formatPhone(value: string) {
  const digits = onlyDigits(value, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const canContinue = Boolean(name.trim() && email.trim() && birthDate && phone);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityLabel="Go back"
            hitSlop={12}
            onPress={() => undefined}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Bem vindo ao Meu CDC!</Text>

          <View style={styles.form}>
            <Field
              autoCapitalize="words"
              autoComplete="name"
              label="Nome de quem vai usar a conta"
              onChangeText={setName}
              placeholder="Digite o nome completo"
              returnKeyType="next"
              value={name}
            />
            <Field
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              label="Email"
              onChangeText={setEmail}
              placeholder="Digite seu email"
              returnKeyType="next"
              value={email}
            />
            <View style={styles.row}>
              <Field
                containerStyle={styles.halfField}
                keyboardType="number-pad"
                label="Data de nascimento"
                onChangeText={(value) => setBirthDate(formatDate(value))}
                placeholder="DD/MM/AAAA"
                value={birthDate}
              />
              <Field
                containerStyle={styles.halfField}
                keyboardType="phone-pad"
                label="Telefone"
                onChangeText={(value) => setPhone(formatPhone(value))}
                placeholder="(99) 9 9999-9999"
                value={phone}
              />
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!canContinue}
            onPress={() => undefined}
            style={({ pressed }) => [
              styles.continueButton,
              pressed && canContinue && styles.buttonPressed,
              !canContinue && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  screen: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 10,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.neutral900,
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 30,
    transform: [{ translateY: -2 }],
  },
  title: {
    marginTop: 52,
    color: colors.neutral900,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: -0.135,
  },
  form: { gap: 16, marginTop: 35 },
  field: { gap: 6 },
  label: {
    color: colors.neutral700,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: -0.09,
  },
  input: {
    height: 52,
    borderRadius: 10,
    backgroundColor: colors.neutral200,
    paddingHorizontal: 16,
    color: colors.neutral900,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: -0.0975,
  },
  row: { flexDirection: 'row', gap: 16 },
  halfField: { flex: 1, minWidth: 0 },
  continueButton: {
    height: 52,
    marginTop: 'auto',
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.82 },
  buttonDisabled: { opacity: 0.72 },
  buttonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.0975,
  },
});
