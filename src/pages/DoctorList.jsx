import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("https://127.0.0.1:8000/api/doctors"); // adresse de l'API pour recuperer les donnees du medecin
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      setDoctors(data.member || data); // Utilisation de la clef "member" si elle existe dans la structure de données
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      setErrorMessage("Erreur lors du chargement des données.");
    }
  };
  const handleCardClick = (id) => {
    navigate(`/doctors/${id}`); // Redirige vers la page de détails du docteur
  };

  return (
    <div className="container">
      <h2>Liste des Docteurs de DoctoMap</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {doctors.length === 0 && !errorMessage ? (
        <p>Aucun docteur à afficher.</p>
      ) : ( 
        doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="user-card"
            style={{ cursor: "pointer" }}
          >
            <img
              src={doctor.image}
              alt="Image du docteur"
              className="user-image"
            />
            <div className="user-info">
              <p>
                <strong>Prénom :</strong> {doctor.firstname}
              </p>
              <p>
                <strong>Nom de famille :</strong> {doctor.lastname}
              </p>
              <p>
                <strong>Spécialité :</strong> {doctor.speciality}
              </p>
              <p>
                <strong>Ville :</strong> {doctor.city}
              </p>
              <p>
                <strong>Téléphone :</strong> {doctor.phone}
              </p>
              {/* Bouton pour accéder aux détails */}
              <button
                className="detail-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(doctor.id);
                }}
              >
                Voir détails
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorList;
