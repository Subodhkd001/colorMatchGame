// src/components/CustomButton.js
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CustomButton({ title, onPress, isPrimary }) {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                isPrimary ? styles.primaryButton : styles.secondaryButton
            ]} 
            onPress={onPress}
        >
            <Text style={[
                styles.buttonText,
                isPrimary ? styles.primaryText : styles.secondaryText
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 200,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
    },
    secondaryButton: {
        backgroundColor: COLORS.secondary,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: COLORS.text,
    },
});