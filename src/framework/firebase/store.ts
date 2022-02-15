import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentSnapshot,
    getDoc, getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import app from "./firebase";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

const db = getFirestore(app)

export async function addMember(no: string, nickname: string, twitterURL: string, youTubeURL: string, twitchURL: string, role: string) {
    try {
        const docRef = await addDoc(collection(db, "members"), {
            no,
            nickname,
            twitterURL,
            youTubeURL,
            twitchURL,
            role,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export async function fetchMembers() {
    const membersRef = collection(db, "members");
    return await getDocs(query(membersRef, orderBy("no")));
}

export async function getMember(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return await getDoc(doc(db, "members", id));
}

export async function deleteMember(id: string): Promise<void> {
    return await deleteDoc(doc(db, "members", id));
}
