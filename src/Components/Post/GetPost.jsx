import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Post.css";

const GetPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [currentImages, setCurrentImages] = useState([]); 
  // const [newImages, setNewImages] = useState([]); 
  const navigate = useNavigate();
  const { id } = useParams(); 

  const token = localStorage.getItem("token");


  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const post = response.data; 

        if (post) {
          setTitle(post.title);
          setDescription(post.description);
          setPrice(post.price);
          setCategory(post.category);
          setLocation(post.location);
          setCurrentImages(post.images || []); 
        } else {
          alert("Post non trouvé.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du post", error);
        alert("Impossible de charger les données du post.");
      });
  }, [id, token]);

  

  return (
    <div className="post-form">
      <h1>Post</h1>
      <div >
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required disabled
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required disabled
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required disabled
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required disabled
        />
        <input
          type="text"
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required disabled
        />

      </div>
    </div>
  );
};

export default GetPost;
