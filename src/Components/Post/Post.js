import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const createdAt = new Date().toISOString();

  const handleFileChange = (e) => {
    setImages(e.target.files); // Capture les fichiers sélectionnés
  };

  const handlePost = () => {
    const formData = new FormData();

    // Ajouter les champs texte au FormData
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("phone", contactInfo.phone);
    formData.append("email", contactInfo.email);
    formData.append("createdAt", createdAt);

    // Ajouter chaque fichier image au FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .post("http://localhost:8080/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Obligatoire pour FormData
        },
      })
      .then((response) => {
        alert("Post créé avec succès !");
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la création du post : " + error.message);
      });
  };

  return (
    <div className="post-form">
      <h1>Créer un Post</h1>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Catégorie"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Localisation"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Téléphone"
        value={contactInfo.phone}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, phone: e.target.value })
        }
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={contactInfo.email}
        onChange={(e) =>
          setContactInfo({ ...contactInfo, email: e.target.value })
        }
        required
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button onClick={handlePost}>Créer le Post</button>
    </div>
  );
};

export default Post;
