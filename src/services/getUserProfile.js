import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const getUserProfile = async uid => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error('get user profile', err);
  }
};

export { getUserProfile };
