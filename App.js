import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import RecipeDetails from './screens/RecipeDetails';
import CreateRecipe from './screens/CreateRecipe';
import EditRecipe from './screens/EditRecipe';
import { initDB, criarTabelaReceitas } from './helpers/database';

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        (async () => {
            try {
                await criarTabelaReceitas();
            } catch (e) {
                console.error("Erro ao criar tabela de receitas:", e);
            }
        })();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                />
                <Stack.Screen
                    name="Details"
                    component={RecipeDetails}
                    options={{
                        title: 'Detalhes da Receita'
                    }}
                />
                <Stack.Screen
                    name="CreateRecipe"
                    component={CreateRecipe}
                    options={{
                        title: "Nova Receita"
                    }}
                />
                <Stack.Screen
                    name="EditRecipe"
                    component={EditRecipe}
                    options={{ title: "Editar Receita" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}