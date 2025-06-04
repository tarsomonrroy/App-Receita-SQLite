import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import styles from "../styles/card_style";

const RecipeCard = ({ title, description, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
    );
}

export default RecipeCard;
