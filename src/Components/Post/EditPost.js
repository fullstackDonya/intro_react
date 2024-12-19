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
  const [currentImages, setCurrentImages] = useState([]); // Images actuelles
  const [newImages, setNewImages] = useState([]); // Nouvelles images
  const navigate = useNavigate();

  // Récupération des données actuelles du post
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

        setCurrentImages(post.images || []); // Charger les images existantes
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du post", error);
        alert("Impossible de charger les données du post.");
      });
  }, [id]);

  // Gestion des nouvelles images sélectionnées
  const handleFileChange = (e) => {
    setNewImages(e.target.files); // Capture les nouvelles images
  };

  // Soumission du formulaire pour mettre à jour le post
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("phone", contactInfo.phone);
    formData.append("email", contactInfo.email);

    // Ajouter les nouvelles images au FormData
    for (let i = 0; i < newImages.length; i++) {
      formData.append("images", newImages[i]);
    }

    // Ajouter une liste des images actuelles à conserver
    formData.append("currentImages", JSON.stringify(currentImages));

    axios
      .put(`http://localhost:8080/post/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Post mis à jour avec succès !");
        navigate("/"); // Redirige vers la page d'accueil après la mise à jour
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du post", error);
        alert("Erreur lors de la mise à jour du post.");
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

        {/* Aperçu des images actuelles */}
        <div className="current-images">
          <h3>Images actuelles :</h3>
          {currentImages.length > 0 ? (
            currentImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8080/uploads/${image}`}
                alt={`Image ${index + 1}`}
                className="preview-image"
              />
            ))
          ) : (
            <p>Aucune image disponible</p>
          )}
        </div>

        {/* Ajout de nouvelles images */}
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
