import axios, { AxiosHeaders } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recipe.css";

const Recipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [instructions, setInstructions] = useState("");
//   const [createdAt, setCreatedAt] = useState("");
//   const [author, setAuthor] = useState("");
  const navigate = useNavigate();

// Obtenir la date du jour
const createdAt = new Date().toISOString();
const token = localStorage.getItem("token"); 
// const userId = localStorage.getItem("user_id"); 


const handleRecipe = () => {

    axios
      .post(
        "http://localhost:8080/recipe",
        {
          title: title,
          ingredients: ingredients,

          instructions: instructions,
          cuisineType: cuisineType,
          createdAt: createdAt,
          // author: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Recette créée avec succès !");
        navigate("/home");
      })
      .catch((error) => {
        alert("Erreur lors de la création de la recette");
      });
    
};

return (
    <div className="recipe-form">
      <h1>Recipe</h1>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
       <input
        type="text"
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cuisine Type"
        value={cuisineType}
        onChange={(e) => setCuisineType(e.target.value)}
      />
      <button onClick={handleRecipe}>Recipe</button>
    </div>
  );
};

export default Recipe;
