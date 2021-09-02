import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image } from 'react-native';
import axios from "axios";

export default function FeedScreen() {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        (async () => {
            const picturesUrl = await axios.get(
                "https://wildstagram.nausicaa.wilders.dev/list"
            );
            setPictures(picturesUrl.data);
        })()
    }, []);

    return pictures.length > 0 ? (
        <View style={styles.container}>
            <FlatList
                data={pictures}
                keyExtractor={(pictures) => pictures}
                renderItem={(itemData) => {
                    console.log("item", itemData);
                    return (
                        <>
                            <Image
                                style={styles.image}
                                source={{
                                    uri:
                                        "https://wildstagram.nausicaa.wilders.dev/files/" +
                                        itemData.item,
                                }}
                            />
                        </>
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
});