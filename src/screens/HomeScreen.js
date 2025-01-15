// src/screens/HomeScreen.js
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Color Match</Text>
            
            <View style={styles.buttonContainer}>
                <CustomButton 
                    title="Play" 
                    onPress={() => navigation.navigate('Game')}
                    isPrimary={true}
                />
                
                <CustomButton 
                    title="How to Play" 
                    onPress={() => alert('Match the colors to score points!')}
                    isPrimary={false}
                />
            </View>

            <Text style={styles.highScore}>High Score: 0</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 50,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    highScore: {
        fontSize: 20,
        color: COLORS.text,
        fontWeight: 'bold',
    },
});