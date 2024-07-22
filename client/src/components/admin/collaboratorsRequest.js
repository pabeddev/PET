import React, { useEffect, useState } from "react";
import { peticionesColaborador, aceptarPeticion, rechazarPeticion } from "../../api/administradores";
import { authUserStore } from "../../context/globalContext";

const CollaboratorsRequest = () => {
    const [userData, setUserData] = useState([]);
    const { user } = authUserStore();
    const [aceptMessage, setAceptMessage] = useState("");
    const [rejectMessage, setRejectMessage] = useState("");

    useEffect(() => {
        const getRqsts = async () => {
            try {
                const dataCollab = await peticionesColaborador(user.dataToken.token);
                const dataStatus = dataCollab.filter((requests) => requests.status === 'pending');
                setUserData([...dataStatus]);
                console.log(dataStatus)
            } catch (error) {
                console.error("Error al obtener las peticiones de colaboradores:", error);
            }
        };
        getRqsts();
    }, [user.dataToken.token]);

    const handleAceptarSolicitud = async (postId) => {
        try {
            const response = await aceptarPeticion(user.dataToken.token, postId);
            const newData = userData.filter((data) => data._id !== postId);
            setUserData(newData);
            setAceptMessage("Usuario aceptado correctamente");

            setTimeout(() => {
                setAceptMessage("");
            }, 3000);

        } catch (error) {
            console.error("Error al aceptar la solicitud:", error);
        }
    };

    const handleRechazarSolicitud = async (postId) => {
        try {
            const response = await rechazarPeticion(user.dataToken.token, postId);
            const newData = userData.filter((data) => data._id !== postId);
            setUserData(newData);
            setRejectMessage("Usuario rechazado correctamente");

            setTimeout(() => {
                setRejectMessage("");
            }, 3000);

        } catch (error) {
            console.error("Error al rechazar la solicitud:", error);
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="container" style={{ backgroundColor: '#F9F9F9' }}>
            <div className="container mt-5">
                <h1 className="display-4 fw-bold text-center text-body-emphasis">Solicitudes de Administrador</h1>
                {aceptMessage && <div className="alert alert-success">{aceptMessage}</div>}
                {rejectMessage && <div className="alert alert-danger">{rejectMessage}</div>}
                <div className="p-3 mb-2 bg-transparent text-body"></div>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped text-center h6">
                        <thead className="table-dark">
                            <tr>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Dirección</th>
                                <th>Redes Sociales</th>
                                <th>Fecha de publicación</th>
                                <th>Descripción</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((requests) => (
                                <tr key={requests._id}>
                                    <td>{requests.user_id.name}</td>
                                    <td>{requests.email || "N/A"}</td>
                                    <td>{requests.address || "N/A"}</td>
                                    <td>{requests.identifier || "N/A"}</td>
                                    <td>{formatDate(requests.timestamp)}</td>
                                    <td>{requests.user_id.description}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <button className="btn btn-primary btn-sm" onClick={() => handleAceptarSolicitud(requests._id)}>Aceptar solicitud</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleRechazarSolicitud(requests._id)}>Rechazar solicitud</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CollaboratorsRequest;
