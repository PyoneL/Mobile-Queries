import firebase from 'firebase';

function setInitiliazeApp(){
    var firebaseConfig = {
        apiKey: "AIzaSyADeGYINcUOJ3B7gYFOZRPbdjDfkHXxvao",
        authDomain: "mobile-trajectory-query.firebaseapp.com",
        databaseURL: "https://mobile-trajectory-query-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "mobile-trajectory-query",
        storageBucket: "mobile-trajectory-query.appspot.com",
        messagingSenderId: "1006108601027",
        appId: "1:1006108601027:web:9d1625de195857377f5076"
    };

    if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
    }
}
const firebaseApp = setInitiliazeApp();
const Db =firebase.firestore();
const taxiCollection =Db.collection('taxi_info');
const locationCollection =Db.collection('location_info');
export {Db, setInitiliazeApp, taxiCollection, locationCollection};