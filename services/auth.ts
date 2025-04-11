import { auth, firestore, storage } from "../firebase/config"
import type { User } from "../types"

export const authService = {
  async register(data: {
    email: string
    password: string
    name: string
    age: string
    gender: string
    contact: string
    photo: string | null
  }): Promise<User> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(data.email, data.password)

      let photoURL = null
      if (data.photo) {
        const photoRef = storage().ref(`users/${userCredential.user.uid}/profile`)
        await photoRef.putFile(data.photo)
        photoURL = await photoRef.getDownloadURL()
      }

      const userData: Omit<User, "id"> = {
        name: data.name,
        age: data.age,
        gender: data.gender,
        email: data.email,
        contact: data.contact,
        photoURL,
        createdAt: new Date(),
      }

      await firestore().collection("users").doc(userCredential.user.uid).set(userData)

      return {
        id: userCredential.user.uid,
        ...userData,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password)
      const userDoc = await firestore().collection("users").doc(user.uid).get()

      return {
        id: user.uid,
        ...userDoc.data(),
      } as User
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async logout(): Promise<void> {
    try {
      await auth().signOut()
    } catch (error) {
      throw new Error(error.message)
    }
  },
}

