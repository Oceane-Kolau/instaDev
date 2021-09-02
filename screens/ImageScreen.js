import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Image, View, TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from "axios";

export default function ImageScreen() {
    const [picturesScreen, setPicturesScreen] = useState([]);
    useEffect(() => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                FileSystem.cacheDirectory + "ImageManipulator"
            );
            setPicturesScreen(images);
        })();
    }, []);

    return picturesScreen.length > 0 ? (
        <View style={styles.container}>
            <FlatList
                data={picturesScreen}
                keyExtractor={(picturesScreen) => picturesScreen}
                renderItem={(itemData) => {
                    return (
                        <View>
                            <Image
                                style={styles.image}
                                source={{
                                    uri:
                                        FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
                                }}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={async () => {
                                        try {
                                            await FileSystem.deleteAsync(FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item);
                                        } catch (err) {
                                            console.log(err);
                                            alert("Error");
                                        }
                                        console.log(FileSystem.cacheDirectory + itemData.item);
                                    }}>
                                    <Text style={styles.deleteLabel}>Supprimer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={async () => {
                                        const data = new FormData();
                                        data.append("fileData", {
                                            uri:
                                                FileSystem.cacheDirectory +
                                                "ImageManipulator/" +
                                                itemData.item,
                                            type: "image/jpeg",
                                            name: itemData.item,
                                        });
                                        let serverResponse;
                                        try {
                                            serverResponse = await axios({
                                                method: "post",
                                                url: "https://wildstagram.nausicaa.wilders.dev/upload",
                                                data,
                                                headers: { "Content-Type": "multipart/form-data" },
                                            });
                                            if (serverResponse.status === 200) {
                                                alert("La photo a été téléchargée ✨ ");
                                            }
                                        } catch (err) {
                                            console.log(err);
                                            alert("Error");
                                        }
                                    }}>
                                    <Text style={styles.saveLabel}>Enregistrer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        resizeMode: "cover",
        height: 380,
        margin: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    saveButton: {
        padding: 25,
        borderRadius: 4,
        backgroundColor: "steelblue",
        marginBottom: 30,
    },
    deleteButton: {
        padding: 25,
        borderWidth: 2, 
        borderColor: 'steelblue',
        borderRadius: 4,
        marginBottom: 30,
    },
    saveLabel: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 15,
    },
    deleteLabel: {
        color: 'steelblue',
        fontWeight: "bold",
        fontSize: 15,
    },
});