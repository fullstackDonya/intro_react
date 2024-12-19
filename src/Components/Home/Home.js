import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data); 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes", error);
      });
  }, []);

  const handleAdd = () => {
    navigate("/post"); // Redirige vers la page d'ajout d'une recette
  };

  const handleEdit = (id) => {
    navigate(`/edit_post/${id}`); // Redirige vers la page de modification avec l'ID de la recette
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      axios
        .delete(`http://localhost:8080/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Recette supprimée avec succès !");
          // Met à jour l'état pour supprimer la recette de l'affichage
          setPosts(posts.filter((post) => post._id !== id)); // Assurez-vous que la clé est '_id' pour MongoDB
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la recette", error);
        });
    }
  };

  return (
    <div>
      <h1>Liste des recettes</h1>
      <button className="add" onClick={handleAdd}>Ajouter une recette</button>
      <ul>
        {posts.map((post) => (
          <li key={post._id}> {/* Utilisez '_id' si c'est le nom de la clé MongoDB */}
            <p><strong>Titre :</strong> {post.title}</p>
            <p><strong>Ingrédients :</strong> {post.ingredients}</p>
            <p><strong>Instructions :</strong> {post.instructions}</p>
            <p><strong>Type de cuisine :</strong> {post.cuisineType}</p>
            <p><strong>Date :</strong> {post.createdAt}</p>
            
            <button className="update" onClick={() => handleEdit(recipe._id)}>Modifier</button>
            <button className="delete" onClick={() => handleDelete(recipe._id)}>Effacer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
