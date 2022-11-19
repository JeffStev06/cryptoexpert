/*import React,{ createContext,useState } from 'react';
import firebase from '../firebase/firebase';
//import "firebase/firestore";
//import { Firestore } from '@firebase/firestore';
import auth from '@react-native-firebase/auth';
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/firestore';
export const AuthContext = createContext();


//const db = firebase.getFirestore(app)

export const AuthProvider =({children}) => {
    const[user, setUser]= useState(null);
    
    return(
        <AuthContext.Provider 
        value={{user,setUser,
            
            login:async(email,password)=>{
                try{
                    await auth().signInWithEmailAndPassword(email,password)
                }catch(e){
                    console.log(e);
                }
            },
            register:async(email,password,name)=>
            {
                try{                    
                    await auth().createUserWithEmailAndPassword(email,password).then(()=>{
                        console.log('UID nuevo metodo'+auth().currentUser.uid);
                        firebase.firestore().collection('users').doc(auth().currentUser.uid)
                        .set({
                            userId:auth().currentUser.uid,
                            name:name,
                            email:email,
                            createdAt:firestore.Timestamp.fromDate(new Date()),
                        }).catch(error =>{
                            console.log('No se pudo agregar el usuario a la firestore '+ error);
                        })
                        console.log('Actualmente me estoy muriendo');

                    })
                }catch(e){
                    console.log("Error"+e);
                }
            },
            logout: async () => {
                try{
                    await auth().signOut();
                }catch(e){
                    console.log(e);
                }
            }
            
        }} 
        >
            {children}
        </AuthContext.Provider>
    )
}*/