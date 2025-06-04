import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import styles from '../styles/create_style';
import { atualizarReceita } from '../helpers/database';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditRecipe() {
    const navigation = useNavigation();
    const route = useRoute();
    const { recipe } = route.params;

    const [name, setName] = useState(recipe.name);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [steps, setSteps] = useState(recipe.steps);

    const atualizar = async () => {
        if (!name.trim() && !ingredients.trim() && !steps.trim()) {
            Alert.alert('Preencha pelo menos um campo para atualizar.');
            return;
        }

        try {
            await atualizarReceita(recipe.id, name.trim(), ingredients.trim(), steps.trim());
            navigation.navigate('Details', { recipeID: recipe.id });
        } catch (e) {
            console.error('Erro ao atualizar receita:', e);
            Alert.alert('Erro ao atualizar.');
        }
    };

    const cancelar = () => {
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nome da Receita</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome da receita"
            />

            <Text style={styles.label}>Ingredientes</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                value={ingredients}
                onChangeText={setIngredients}
                placeholder="Ingredientes"
                multiline
            />

            <Text style={styles.label}>Modo de Preparo</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                value={steps}
                onChangeText={setSteps}
                placeholder="Passo a passo"
                multiline
            />

            <View style={styles.buttonContainer}>
                <Button title="Atualizar" onPress={atualizar} />
                <Button title="Cancelar" onPress={cancelar} color="gray" />
            </View>
        </ScrollView>
    );
}
