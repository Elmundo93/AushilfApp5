
// Importiere die notwendigen Firebase-Funktionen
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig'; // Pfad anpassen
// Definiere den Typ Post
type Post = {
  id: string;
  category: string;
  createdAt: string;
  location: string;
  nachname: string;
  option: string;
  postText: string;
  vorname: string;

  // weitere Eigenschaften hier hinzufügen
};

// Funktion zum Abrufen der Beiträge
export  const  fetchPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(FIRESTORE_DB, 'Posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);

    // Mappe die abgerufenen Dokumente zu Post-Objekten
    const postsList = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
    
      return {
        id: doc.id,
        category: data.category || '',  // Standardwerte verwenden, wenn notwendig
        createdAt: data.createdAt || '',
        location: data.location || '',
        nachname: data.nachname || '',
        vorname: data.vorname || '',
        option: data.option || '',
        postText: data.postText || '',
        
      } as Post;
    });

   
    return postsList;
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Abrufen der Posts:", error);
    throw error; // Den Fehler weitergeben oder entsprechend behandeln
  }
}