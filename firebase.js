import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

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

export async function signUp(userDetails, loaderImg) {
    try {
        let { name, email, description, imgURL, password } = userDetails;
        loaderImg.style.display = 'flex';
        let userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        let { password: mypassword, ...detalsWithoutPassword } = userDetails;
        await setDoc(doc(db, "users", userCredentials?.user?.uid), detalsWithoutPassword);
        loaderImg.style.display = 'none';
        alert("Registerd Successfully");
        location.href = '../home/home.html';
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`You Can't Sign In\n${errorMessage}`);
        window.location.reload();
    }
}

export async function login(loginDetals, loaderImg) {
    try {
        const { email, password } = loginDetals;
        loaderImg.style.display = 'flex';
        const res = await signInWithEmailAndPassword(auth, email, password)
        loaderImg.style.display = 'none';
        location.href = '../home/home.html';
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        window.location.reload();
    }
}

export function stateObserver() {
    return new Promise(function (resolve) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                resolve(uid);
            } else {
                alert("No User found");
                location.href = '../login/login.html';
            }
        });
    })
}

export async function getSingleData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        location.href = '../login/login.html';
    }
}

export async function editDetails(obj, uid) {
    try {
        await setDoc(doc(db, "users", uid), obj);
        alert("Updated");
        window.location.reload();
    }
    catch (error) {
        alert(error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
        console.log("==>> signout successfully");
        window.location.href = "../login/login.html";
    } catch (error) { }
}