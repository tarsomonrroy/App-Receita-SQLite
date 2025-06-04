import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Platform, KeyboardAvoidingView, Text, Button } from 'react-native';
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/home_style";
import { listarReceitas } from "../helpers/database";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        const carregar = async () => {
            const dados = await listarReceitas();
            setReceitas(dados);
        };

        const unsubscribe = navigation.addListener('focus', carregar);
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView style={styles.container}>
                    <Text style={styles.text}>Bem Vindo,</Text>
                    <Text style={styles.subtext}>Confira as receitas salvas!</Text>

                    {receitas.map((receita) => (
                        <RecipeCard
                            key={receita.id}
                            title={receita.name}
                            description={receita.description}
                            onPress={() => navigation.navigate('Details', { recipeID: receita.id })}
                        />
                    ))}

                    <Button
                        title="Nova Receita"
                        onPress={() => navigation.navigate('CreateRecipe')}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
