import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Platform, KeyboardAvoidingView, View, Text, TextInput, Button, Alert } from 'react-native';
import styles from '../styles/create_style'; // você pode criar ou reaproveitar um estilo
import { adicionarReceita } from '../helpers/database';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CreateRecipe() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const salvarReceita = async () => {
    if (!name.trim() && !description.trim() && !ingredients.trim() && !steps.trim()) {
      Alert.alert('Preencha pelo menos um campo para salvar a receita.');
      return;
    }

    try {
      await adicionarReceita(name.trim(), description.trim(), ingredients.trim(), steps.trim());
      navigation.navigate('Home'); // volta à Home e atualiza por causa do 'focus'
    } catch (e) {
      console.error('Erro ao salvar receita:', e);
      Alert.alert('Erro ao salvar receita.');
    }
  };

  const cancelar = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Nome da Receita</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Bolo de cenoura..."
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Uma breve descrição..."
          />

          <Text style={styles.label}>Ingredientes</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Lista de ingredientes..."
            multiline
          />

          <Text style={styles.label}>Modo de Preparo</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={steps}
            onChangeText={setSteps}
            placeholder="Passo a passo..."
            multiline
          />

          <View style={styles.buttonContainer}>
            <Button title="Salvar" onPress={salvarReceita} />
            <Button title="Cancelar" onPress={cancelar} color="gray" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
