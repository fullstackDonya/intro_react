import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/recipes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data); // Récupère et affiche les recettes
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des recettes", error);
      });
  }, []);

  const handleAdd = () => {
    navigate("/recipe"); // Redirige vers la page d'ajout d'une recette
  };

  const handleEdit = (id) => {
    navigate(`/edit_recipe/${id}`); // Redirige vers la page de modification avec l'ID de la recette
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      axios
        .delete(`http://localhost:8080/recipe/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Recette supprimée avec succès !");
          // Met à jour l'état pour supprimer la recette de l'affichage
          setRecipes(recipes.filter((recipe) => recipe._id !== id)); // Assurez-vous que la clé est '_id' pour MongoDB
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
        {recipes.map((recipe) => (
          <li key={recipe._id}> {/* Utilisez '_id' si c'est le nom de la clé MongoDB */}
            <p><strong>Titre :</strong> {recipe.title}</p>
            <p><strong>Ingrédients :</strong> {recipe.ingredients}</p>
            <p><strong>Instructions :</strong> {recipe.instructions}</p>
            <p><strong>Type de cuisine :</strong> {recipe.cuisineType}</p>
            <p><strong>Date :</strong> {recipe.createdAt}</p>
            
            <button className="update" onClick={() => handleEdit(recipe._id)}>Modifier</button>
            <button className="delete" onClick={() => handleDelete(recipe._id)}>Effacer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
