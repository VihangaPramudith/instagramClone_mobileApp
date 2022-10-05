import { USER_STATE_CHANGE } from "../constants/index";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export function fetchUser() {
  return ((dispatch) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: docSnap.data(),
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });
}
