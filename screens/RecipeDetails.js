import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { buscarReceitaPorId, deletarReceita } from '../helpers/database';
import styles from '../styles/details_style';

export default function RecipeDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { recipeID } = route.params;

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregar = async () => {
            try {
                const dados = await buscarReceitaPorId(recipeID);
                setRecipe(dados);
            } catch (error) {
                console.error("Erro ao carregar receita:", error);
            } finally {
                setLoading(false);
            }
        };
        carregar();
    }, [recipeID]);

    const excluir = () => {
        Alert.alert(
            "Excluir Receita",
            "Tem certeza que deseja excluir esta receita?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir", style: "destructive", onPress: async () => {
                        await deletarReceita(recipeID);
                        navigation.navigate("Home");
                    }
                }
            ]
        );
    };

    const editar = () => {
        navigation.navigate('EditRecipe', { recipe });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Receita não encontrada.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{recipe.name}</Text>

            <Text style={styles.section}>Ingredientes:</Text>
            <Text style={styles.description}>{recipe.ingredients}</Text>

            <Text style={styles.section}>Modo de Preparo:</Text>
            <Text style={styles.description}>{recipe.steps}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <Button title="Editar" onPress={editar} />
                <Button title="Excluir" onPress={excluir} color="red" />
            </View>
        </ScrollView>
    );
}
