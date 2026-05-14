import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

window.add = async () => {
  await addDoc(collection(db,"products"),{
    name: name.value,
    price: price.value,
    image: image.value
  });

  alert("Product Added");
};