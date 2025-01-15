// src/screens/GameScreen.js
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

export default function GameScreen({ navigation }) {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targetColorIndex, setTargetColorIndex] = useState(0);
    const [colorBlocks, setColorBlocks] = useState([]);
    const [gameActive, setGameActive] = useState(false);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        generateNewRound();
    };

    const generateNewRound = () => {
        // Generate random target color
        const newTargetIndex = Math.floor(Math.random() * COLORS.gameColors.length);
        setTargetColorIndex(newTargetIndex);

        // Shuffle colors for blocks
        let shuffled = [...COLORS.gameColors];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setColorBlocks(shuffled);
    };

    const handleBlockPress = (colorIndex) => {
        if (!gameActive) return;

        if (COLORS.gameColors[targetColorIndex] === colorBlocks[colorIndex]) {
            setScore(prev => prev + 1);
            generateNewRound();
        } else {
            setScore(prev => Math.max(0, prev - 1));
        }
    };

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameActive) {
            setGameActive(false);
            alert(`Game Over! Score: ${score}`);
        }
    }, [timeLeft, gameActive]);

    return (
        <View style={styles.container}>
            {!gameActive ? (
                <TouchableOpacity 
                    style={styles.startButton} 
                    onPress={startGame}
                >
                    <Text style={styles.startButtonText}>Start Game</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Score: {score}</Text>
                        <Text style={styles.headerText}>Time: {timeLeft}s</Text>
                    </View>

                    <Text style={styles.instruction}>
                        Tap the {COLORS.gameColorNames[targetColorIndex]} block!
                    </Text>

                    <View style={styles.grid}>
                        {colorBlocks.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.colorBlock, { backgroundColor: color }]}
                                onPress={() => handleBlockPress(index)}
                            />
                        ))}
                    </View>
                </>
            )}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    instruction: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginVertical: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    colorBlock: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
    },
    startButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
});