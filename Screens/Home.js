import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Tasks from "../Components/Tasks"
import axios from 'axios';


const Home = () => {
    const [task, setTask] = useState("")
    const [taskItems, setTaskItems] = useState([])

    const handleTask = () => {
        setTaskItems([...taskItems, task])
        setTask("")
        const newItems = {
            ...taskItems, task
        }
        fetch("http://localhost:5000/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItems),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Alert.alert("Successfully added your task");
                }
            })
            .catch(error => {
                console.error("Error occurred:", error);
            });

        Keyboard.dismiss();
    }

    const handleDelete = (index) => {
        let prevItems = [...taskItems];
        prevItems.splice(index, 1);
        setTaskItems(prevItems);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.taskWraper}>
                <Text style={styles.sectionTitle}>Today's Task</Text>
            </View>

            <View style={styles.items}>
                {taskItems.map((item, index) => <Pressable
                    key={index} onPress={() => handleDelete(index)}><Tasks index={index} text={item} /></Pressable>)}
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWraper}>
                <TextInput style={styles.input} placeholder='Write a Task' value={task} onChangeText={text => setTask(text)} />
                <Pressable onPress={() => handleTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    taskWraper: {
        padding: 80,
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold"
    },
    items: {
        marginTop: 2
    },
    writeTaskWraper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 260,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {},
});
export default Home;