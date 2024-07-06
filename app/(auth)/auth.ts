import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { chatClient, generateToken } from '../services/streamService';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';

const router = useRouter();

export const signIn = async (email: string, password: string, setLoading: (loading: boolean) => void) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const userDoc = await getDoc(doc(FIRESTORE_DB, "Users", userCredential.user.uid));

    if (!userDoc.exists()) {
      throw new Error('Benutzerdaten nicht gefunden. Bitte registrieren Sie sich.');
    }

    const user = userDoc.data();
    
    // Token generieren und Benutzer bei getStream anmelden
    const token = generateToken(userCredential.user.uid);
    await chatClient.connectUser({
      id: userCredential.user.uid,
      name: user.vorname + ' ' + user.nachname,
    }, token);

    router.push('(tabs)/pinnwand');
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/wrong-password') {
        alert('Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.');
      } else if (error.code === 'auth/user-not-found') {
        alert('Kein Benutzer mit dieser E-Mail-Adresse gefunden.');
      } else {
        alert(`Firebase Fehler: ${error.message}`);
      }
    } else {
      console.error(error);
      alert('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  } finally {
    setLoading(false);
  }
};

export const signUp = async (
  email: string,
  password: string,
  confirmPassword: string,
  vorname: string,
  nachname: string,
  location: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  if (password !== confirmPassword) {
    alert('Die Passwörter stimmen nicht überein.');
    setLoading(false);
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const user = userCredential.user;
    
    await setDoc(doc(FIRESTORE_DB, "Users", user.uid), {
      email: user.email || '', 
      vorname,
      nachname,
      location
    });

    // Token generieren und Benutzer bei getStream anmelden
    const token = generateToken(user.uid);
    await chatClient.connectUser({
      id: user.uid,
      name: vorname + ' ' + nachname,
    }, token);

    router.push('(tabs)/pinnwand');
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Diese E-Mail-Adresse wird bereits verwendet.');
      } else if (error.code === 'auth/weak-password') {
        alert('Das Passwort ist zu schwach.');
      } else {
        alert(`Firebase Fehler: ${error.message}`);
      }
    } else {
      console.error(error);
      alert('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  } finally {
    setLoading(false);
  }
};