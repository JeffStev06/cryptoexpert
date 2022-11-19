import firebase from "firebase";
//import { Provider } from "react-native-paper/lib/typescript/core/settings";
import { ToastAndroid } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCwX3Uyh8EFQTxgyzWx48GcavB5d7w96Jw",
  authDomain: "cryptoexpertv2.firebaseapp.com",
  projectId: "cryptoexpertv2",
  storageBucket: "cryptoexpertv2.appspot.com",
  messagingSenderId: "487620150756",
  appId: "1:487620150756:web:144b25df5910b1e0eab3f1"
};
const app = firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {

    //console.info("Si llego al metodo")
    googleProvider.addScope('profile');
    googleProvider.addScope('https://www.googleapis.com/auth/drive');
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }else{
      alert("Ya existe tu usuario registrado");
    }
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert("Usuario o Contraseña Invalidos");
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name:name,
      authProvider: "local"
    });
  } catch (err) {
    console.error(err);
   // alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    //console.info("Llego al reset");
    await auth.sendPasswordResetEmail(email);
    alert("Revisa tu Correo Electronico");
  } catch (err) {
    console.error(err);
    //alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

const save = async (collection,data)=>{
  try{
      await db.collection(collection).add(data);
      ToastAndroid.show("Transacción Realizada con Éxito", ToastAndroid.SHORT);
  }catch(err){
    console.error(err);
    ToastAndroid.show("Ocurrio un Error al Realizar tu Transacción, Intenta de Nuevo", ToastAndroid.SHORT);
    
  }
}

const getInformation= async(idUser,collection)=>{
  try{
    let array=[];
      const query=await db.collection(collection).where("id_user","==",idUser).orderBy("invest","desc").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          var obj=doc.data()
          array.push(obj);
          //console.info("Valor en for ="+obj)
        });
        return array;
        //console.info("Estoy Dentro de aguait",array[0].name);
      });
     
  }catch(err){
    console.error(err);
    ToastAndroid.show("Ocurrio un Error al Intentar Cargar Tu Información, Intenta de Nuevo", ToastAndroid.LONG);
  }
}


export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  save,
  getInformation,
};