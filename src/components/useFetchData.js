import { useEffect, useState } from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyCXvWalIbI9L4WdG0xmwn-vNFEvJft6IcA",
    authDomain: "hearth-tale-demo-v2.firebaseapp.com",
    projectId: "hearth-tale-demo-v2",
    storageBucket: "hearth-tale-demo-v2.appspot.com",
    messagingSenderId: "577746141304",
    appId: "1:577746141304:web:3faea5999abda59b1d2d8d",
    measurementId: "G-LVK5NDJ012"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const firestoreDb = firebase.firestore();

const useFetchData = (url, storyId) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const abortControl = new AbortController();
        const fetchData = async () => {
            try {
                if (!firebase) return;
                let dataRef = null;
                if (url == "sequels") {
                    dataRef = firestoreDb.collection(url).where("storyId", "==", storyId).orderBy('createdAt', 'desc').limit(10);
                } else if (url == "stories") {
                    dataRef = firestoreDb.collection("stories").orderBy('createdAt', 'desc').limit(20);
                }
                else {
                    throw Error("Unknown URL supplied to db store")
                }

                dataRef.get().then(docs => {
                    setIsLoading(false);
                    setError(null);

                    let allData = [];
                    docs.forEach((doc) => {
                        let docData = doc.data();
                        let fullData = { id: doc.id, data: docData };
                        allData.push(fullData);
                    });
                    setData(allData);
                });
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log("Fetch Aborted");
                }
                else {
                    setIsLoading(false);
                    setError(error.message);
                }
            }
        };
        fetchData();
        return () => abortControl.abort();
    }, []) //data is only fetched once when url is changed

    return { data, isLoading, error }
}

export default useFetchData