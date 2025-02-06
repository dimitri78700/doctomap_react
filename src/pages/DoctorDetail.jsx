import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importez useParams et Link de react-router-dom pour accéder aux paramètres de l'URL
import "../App.css";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`https://127.0.0.1:8000/api/doctors/${id}`); // adresse de l'API pour récupérer les données du médecin
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error("Erreur lors du chargement des détails du médecin :", error);
      setErrorMessage("Erreur lors du chargement des détails du médecin.");
    }
  };

  if (errorMessage) {
    return (
      <div className="container">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container">
        <p>Aucun médecin trouvé.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Détails du Médecin</h1>
      <div className="doctor-detail">
        <img
          src={doctor.image}
          alt="Image du docteur"
          className="doctor-image"
        />
        <div className="doctor-info">
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
        </div>
      </div>
      <Link to="/" className="back-button">
        Retour à la liste
      </Link>
    </div>
  );
}

export default DoctorDetail;



