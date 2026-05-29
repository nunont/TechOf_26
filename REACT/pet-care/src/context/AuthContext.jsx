import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred;
  }

  async function register(name, email, password){
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email,
      name
    });
    return cred;
  }

  async function logout(){
    return signOut(auth);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser){
        const docUser = await getDoc(doc(db, 'users', firebaseUser.uid));
        setUserProfile(docUser.exists() ? docUser.data() : null)
      }
      else {
        setUserProfile(null)
      }
      setLoading(false);
    });

    return unsub;
  }, [])

  return (
    <AuthContext.Provider value={{user, userProfile, loading, login, register, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext);
}