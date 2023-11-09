// Importation des modules nécessaires depuis React
import React, { useState, useEffect } from 'react';

// Importation des images et du fichier de style CSS
import mobileDivider from './assets/pattern-divider-mobile.svg';
import dice from './assets/icon-dice.svg';
import './App.css';

// Définition du composant principal App
function App() {
  // Utilisation du hook useState pour définir l'état initial de la citation
  const [quote, setQuote] = useState({});

  // Utilisation du hook useEffect pour effectuer une action lors du montage du composant
  useEffect(() => {
    fetchAdvice(); // Appelle la fonction fetchAdvice lors du montage du composant
  }, []); // Le tableau vide en second argument signifie que useEffect s'exécute une seule fois, équivalent à componentDidMount dans les composants de classe

  // Fonction pour récupérer une nouvelle citation depuis l'API
  const fetchAdvice = () => {
    const cacheBuster = new Date().getTime(); // Génère une valeur unique basée sur le timestamp actuel
    fetch(`https://api.adviceslip.com/advice?_=${cacheBuster}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Réponse réseau incorrecte');
        }
        return response.json(); // Parse la réponse JSON
      })
      .then((result) => {
        console.log('Conseil reçu :', result); // Affiche la citation reçue dans la console
        setQuote(result.slip); // Met à jour l'état avec la nouvelle citation
      })
      .catch((error) => {
        console.error('Problème avec l\'opération de récupération :', error); // Affiche les erreurs dans la console
      });
  };

  // Rendu du composant App avec les éléments JSX (HTML)
  return (
    <div className='main-container'>
      <div className='sub-container'>
        <p className='advice-nbr'>ADVICE #{quote.id}</p> {/* Affiche l'ID de la citation */}
        <p className='quote'>" {quote.advice} "</p> {/* Affiche le texte de la citation */}
        <img src={mobileDivider} style={{ backgroundColor: "transparent" }} alt="Séparateur mobile" /> {/* Affiche l'image de séparation */}
        <button onClick={fetchAdvice}> {/* Appelle la fonction fetchAdvice lorsqu'on clique sur le bouton */}
          <img src={dice} alt="Icône de dé" /> {/* Affiche l'icône de dé */}
        </button>
      </div>
    </div>
  );
}

// Exportation du composant App pour l'utiliser dans d'autres parties de l'application
export default App;
