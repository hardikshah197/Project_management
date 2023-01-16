import firebase from 'firebase/compat/app';

const firebaseAuth = () => firebase.auth();

export const createUserWithEmailAndPassword = (email, password) => {}
export const signInWithEmailAndPassword = (email, password) => {}

export const signOut = () => {}

export const getUser = () => {};

export const createUser = (id, username, email) => {}

export const authService = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    getUser,
    createUser,
};
