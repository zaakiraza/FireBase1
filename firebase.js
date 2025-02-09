import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCU_BU_2LaL4NuaF5u6qrKiu5wFN66BVik",
    authDomain: "practise1-35494.firebaseapp.com",
    projectId: "practise1-35494",
    storageBucket: "practise1-35494.firebasestorage.app",
    messagingSenderId: "896595924891",
    appId: "1:896595924891:web:020cf92fa40f471557f33e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function signUp(details) {
    try {
        const { firstName, email, country, password } = details;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        alert("User Welcome successfully registered");
        const detailsWithoutPassword = { firstName, email, country };
        const docRef = await addDoc(collection(db, "users"), detailsWithoutPassword);
        alert("User ka data store mai gaya");
        setTimeout(() => {
            location.href = '/index.html';
        }, 3000)
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage);
    }
}

export async function login(details) {
    try {
        const { email, password } = details;
        const userCredential = signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        alert("Login successfully");
        setTimeout(() => {
            location.href = '/index.html';
        }, 3000);
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Invalid userName or password");
    }
}