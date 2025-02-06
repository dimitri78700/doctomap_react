import { useEffect, useState } from 'react';
import '../../src/App.css';

function DoctorList() {
   

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch("https://127.0.0.1:8000/api/doctors");
            const data = await response.json();
            setDoctors(data.member);
        } catch (error) {
            console.error(error);
        }
    };
    
    

    return(
        <div className="container">
        <h1>Liste des Docteurs</h1>
        {doctors.map(doctor => (
        <div key={doctor.id} className="user-card">
            <img src={doctor.image} alt="Image du docteur" className="user-image" />
            <div className="user-info">
                <p><strong>Prénom:</strong> {doctor.firstname}</p>
                <p><strong>Nom de famille:</strong> {doctor.lastname}</p>
                <p><strong>Spécialité:</strong> {doctor.speciality}</p>
                <p><strong>Ville:</strong> {doctor.city}</p>
                <p><strong>Téléphone:</strong> {doctor.phone}</p>
            </div>
        </div>
        ))}
    </div>
    )
}

export default DoctorList;
                    

