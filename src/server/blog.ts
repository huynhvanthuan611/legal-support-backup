import { db } from "configs/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export interface Blog {
  ref: string;
  heading: string;
  description: string;
  image: string;
  ref_id?: string;
}

class blogService {
  private static collectionRef = collection(db, "blogs");

  static async createBlog(data: Blog): Promise<Blog> {
    const docRef = await addDoc(blogService.collectionRef, data);
    const createdDoc = await getDoc(docRef);
    return { ...createdDoc.data(), ref: docRef.id } as Blog;
  }

  static async getBlogByRef(ref: string): Promise<Blog | null> {
    const docRef = doc(blogService.collectionRef, ref);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), ref: docSnap.id } as Blog;
    } else {
      return null;
    }
  }

  static async getBlogsByHeading(heading: string): Promise<Blog[]> {
    const q = query(blogService.collectionRef, where("heading", "==", heading));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, ref: doc.id } as Blog;
    });
  }

  static async getAllBlogs(): Promise<Blog[]> {
    const snapshot = await getDocs(blogService.collectionRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, ref_id: doc.id } as Blog;
    });
  }

  static async updateBlog(ref: string, data: Partial<Blog>): Promise<void> {
    const docRef = doc(blogService.collectionRef, ref);
    await updateDoc(docRef, data);
  }

  static async deleteBlog(ref: string): Promise<void> {
    const docRef = doc(blogService.collectionRef, ref);
    await deleteDoc(docRef);
  }
}

export default blogService;
