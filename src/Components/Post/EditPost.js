import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Post.css";

const EditPost = () => {
  const { id } = useParams(); // Récupère l'ID du post depuis l'URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const post = response.data;
        setTitle(post.title);
        setDescription(post.description);
        setPrice(post.price);
        setCategory(post.category);
        setLocation(post.location);
        setContactInfo(post.contactInfo);
        setImages(post.images || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du post", error);
      });
  }, [id]);

  const handleFileChange = (e) => {
    setImages(e.target.files); // Capture les fichiers sélectionnés
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("contactInfo[phone]", contactInfo.phone);
    formData.append("contactInfo[email]", contactInfo.email);

    // Ajouter les nouvelles images au FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .put(`http://localhost:8080/post/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Post mis à jour avec succès !");
        navigate("/"); // Redirige vers la page d'accueil après la mise à jour
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du post", error);
      });
  };

  return (
    <div className="post-form">
      <h1>Modifier le Post</h1>
      <form onSubmit={handleSubmit}>
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
          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          required
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditPost;
