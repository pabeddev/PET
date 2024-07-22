import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authUserStore } from "../../context/globalContext";
import UserList from "./userList";
import { obtenerUsuarios, obtenerUsuariosColaboradores } from "../../api/administradores";
import UserCollaboratorList from "./userCollaboratorList";
import UserDetails from "./userDetails";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [collabData, setCollabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = authUserStore();

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const dataUsers = await obtenerUsuarios(user.dataToken.token);
        console.log(dataUsers[1]);
        setUserData(dataUsers || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserData([]);
      }
    };

    const getCollab = async () => {
      try {
        const dataCollabs = await obtenerUsuariosColaboradores(user.dataToken.token);
        console.log(dataCollabs[0]);
        setCollabData(dataCollabs || []);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
        setCollabData([]);
      }
    };

    Promise.all([getUser(), getCollab()]).finally(() => setLoading(false));
  }, [user.dataToken.token]);

  return (
    <div className="container-fluid bg-light" style={{ minHeight: "100vh" }}>
      {loading ? (
        <h1>Cargando...</h1>
      ) : userData.length === 0 && collabData.length === 0 ? (
        <h1>No hay usuarios registrados</h1>
      ) : (
        <div className="container mt-4">
          <h1 className="display-4 fw-bold text-center text-body-emphasis">
            Panel de Administración
          </h1>
          <div className="p-3 mb-2 bg-transparent text-body"></div>
          <div className="row">
            <div className="col-md-6">
              <div className="text-center">
                <h2 className="title">Usuarios</h2>
              </div>
              <UserList users={userData} onUserSelect={handleUserSelect} />
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <h2 className="title">Asociaciones y Rescatistas</h2>
              </div>
              <UserCollaboratorList collaborators={collabData} onUserSelect={handleUserSelect} />
            </div>
          </div>
          {selectedUser && (
            <div className="row mt-4">
              <div className="col-md-6 mx-auto">
                <div className="text-center">
                  <h2 className="title">Detalles del Usuario</h2>
                </div>
                <UserDetails
                  user={selectedUser}
                  onBack={() => setSelectedUser(null)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
