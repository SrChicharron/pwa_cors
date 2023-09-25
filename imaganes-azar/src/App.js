import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("Imagen al azar de un lomito");

  useEffect(() => {
    // Función para cargar una imagen aleatoria al cargar la página
    loadRandomImage();
  }, []);

  const loadRandomImage = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        // console.log("Respuesta de la API:", JSON.stringify(response, null, 2));
        setTitle("Imagen al azar de un lomito");
        setImageUrl(response.data.message);
      })
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);
      });
  };

  const loadRandomImageCORS = () => {
    axios
      .get("http://localhost:3000/proxy/duck")
      .then((response) => {
        setTitle("Imagen Al azar de un Michiote");
        setImageUrl(response.data[0].url);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);
        if (error.name === 'AxiosError' && error.message === 'Network Error') {
          alert('Error de CORS:' +error.message)
        } else {
          alert('Error desconocido')
        }
      });
  }

  console.log(imageUrl)
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <img
          src={imageUrl}
          alt="Imagen aleatoria"
          style={{ height: "30rem", marginBottom: "2rem" }}
        />
        <div className="container__btn">
          <button onClick={loadRandomImage} className="btn btn__change-img" style={{ padding: "1rem" }}>Cambiar Imagen</button>
          <button onClick={loadRandomImageCORS} className="btn" style={{ padding: "1rem" }}>Cambiar de API con CORS</button>

        </div>
      </header>
    </div>
  );
}

export default App;
