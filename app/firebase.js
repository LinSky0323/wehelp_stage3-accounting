// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,Timestamp,doc, deleteDoc } from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJEVTID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export {firebaseConfig}
export function logout(){
  const auth = getAuth();
  signOut(auth).then((userCredential) => {
    const user = userCredential.user;
    // ...

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..

  });
}

export function getauth(){
  return new Promise((resolve,reject)=>{
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        resolve(user)
        unsubscribe()
      }
      else{
        reject("未登入")
      }
    })
  })
  
}
export function signup(email,password){
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("註冊成功")
    // ...

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    // ..

  });
}
export function login(email,password){
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("登入成功")
    // ...

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)

  });
  
}

export async function createAccounting(user,time,io,content,price){
  const db =  getFirestore()
  const ref = collection(db,"accounting",user,time)
  const account = await addDoc(ref,{
    io,
    content,
    price,
    createTime: Timestamp.now()
  })
  return account.id
}
export async function deleteItem(name,time,id){
  const db =  getFirestore()
  deleteDoc(doc(db,"accounting",name,time,id))
}