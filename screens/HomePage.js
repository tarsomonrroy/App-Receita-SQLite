import React, { useState, useEffect } from "react";
import { ScrollView, Text, SafeAreaView, Button } from 'react-native';
import RecipeCard from "../components/RecipeCard";
import styles from "../styles/home_style";
import { listarReceitas } from "../helpers/database";

export default function HomeScreen({ navigation }) {
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
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Bem Vindo,</Text>
            <Text style={styles.subtext}>Confira as receitas salvas!</Text>

            {receitas.map((r) => (
                <RecipeCard
                    key={r.id}
                    title={r.name}
                    description={r.ingredients.split('\n')[0]} // primeira linha dos ingredientes como resumo
                    onPress={() =>
                        navigation.navigate('Details', { recipeID: r.id })
                    }
                />
            ))}

            <Button
                title="Nova Receita"
                onPress={() => navigation.navigate('CreateRecipe')}
            />
        </ScrollView>
    );
}
