import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from 'expo-camera';

export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={cameraRef} type={type}>
            </Camera>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.turnButton}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.turnCamera}>Turn Camera</Text>
                </TouchableOpacity>
                <View style={styles.takePictureButton}>
                    <Pressable onPress={async () => {
                        const pictureMetadata = await cameraRef.current.takePictureAsync();
                        await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
                            { resize: { width: 800 } },
                        ])
                    }}>
                        <Text style={styles.takePicture}>Take a picture</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: "white",
        alignItems: "flex-end",
        flexDirection: "row",
    },
    turnButton: {
        backgroundColor: "steelblue",
        padding: 25,
    },
    turnCamera: {
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
        textAlign: "center"
    },
    takePicture: {
        fontWeight: "bold",
        fontSize: 25,
        color: "steelblue",
        textAlign: "center",
    },
    takePictureButton: {
        padding: 25,
    },
});