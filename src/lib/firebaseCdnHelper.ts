import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

type fileTypes = "wav" | "png" | "jpg" | "svg" | "mp3" | "jpeg" | "svg+xml"

// Initialize Firebase
initializeApp({
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "axn-myportfolio.firebaseapp.com",
	projectId: "axn-myportfolio",
	storageBucket: "axn-myportfolio.appspot.com",
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

function RandomFileNameGenrator() { return (Math.random() + 1).toString(36).substring(7) }

/**
 * @param blob : a audio blob generated / recorded by the client (i did'nt knew its type hence used any 😅)
 * @returns 
 */
export async function UploadToFirebase(blob: any) {
    const random_name_for_file = RandomFileNameGenrator();
    const storage = getStorage();
    const storageRef = ref(storage, `${random_name_for_file}`);
    const upload = await uploadBytesResumable(storageRef, blob);
	return await getDownloadURL(upload.ref)
}

export async function DeleteFromFirebase(fileUrl : string) {
	const storage = getStorage()
	const storageRef = ref(storage, fileUrl)
	try {
		const res = await deleteObject(storageRef)
		console.log(res)
	} catch (error) {
		console.log(error)
	}
}