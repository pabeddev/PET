import { Route, Routes } from "react-router-dom";
import './css/App.css';

import Dev from "components/Dev";
// Componentes principales
import { Main, Footer, Navbar } from "components";
// Componentes de administrador
import { AdminDashboard, CollaboratorsRequest } from "components/admin";
// Componentes de asociaciones y rescatistas
import {
  RescueAccount,
  RescueForm,
  SociosAnuncios,
  SociosPanel,
} from "components/associationsRescuers";
// Componentes de mascotas
import {
  MascotasPerdidas,
  MascotaPerdida,
  ReportarMascotas,
} from "components/pets";
// Componentes de usuarios
import { Login, SignUp, UserPost } from "components/users";
// Componentes de información
import {
  Adopcion,
  ComoReporto,
  CuidadosMascotas,
  ImportanciaMascotas,
} from "components/informative";
// Context
import { loaderData } from "context/globalContext";
import { usersRoutes, indexRoutes, pets } from "routes/routes";
import RouteProtect from "routes/RouteProtect/RouteProtect";

import { toastData } from "context/globalContext";

const App = () => {
  const { loadingData } = loaderData();
  const { toaster } = toastData();
  return (
    <>
      {toaster}
      {loadingData ? (
        <div>Loading...</div>
      ) : (
        <div className="container-app">
          
          <Navbar />
          <main className="container-main">
            <Routes>

              {/* Index */}
              <Route
                path={indexRoutes.main}
                element={<Main />}
                loader={<div>Loading... Prueba</div>}
              />

              {/* Rutas para el usuario */}
              <Route path={usersRoutes.login} element={<Login />} />
              <Route path={usersRoutes.signUp} element={<SignUp />} />

              <Route
                path={usersRoutes.userPetPost}
                element={
                  <RouteProtect>
                    <ReportarMascotas />
                  </RouteProtect>
                }
              />
              {/* Rutas para el administrador */}
              <Route path="/Admin-Dashboard" element={<AdminDashboard />} />

              {/* Rutas para el colaborador */}
              <Route
                path="/Collaborator-Request"
                element={<CollaboratorsRequest />}
              />

              {/* Rutas privadas */}

              {/* Rutas de informacion */}
              <Route
                path={pets.pets}
                element={<MascotasPerdidas />}
              />
              <Route
                path={usersRoutes.userPetAdoption}
                element={<Adopcion />}
              />
              <Route
                path={usersRoutes.userPetCare}
                element={<CuidadosMascotas />}
              />
              <Route
                path={usersRoutes.userPetImportance}
                element={<ImportanciaMascotas />}
              />
              <Route path="/Rescatista-Form" element={<RescueForm />} />

              <Route
                path={usersRoutes.userHowReport}
                element={<ComoReporto />}
              />
              <Route path="/Perfil-Asociado" element={<RescueAccount />} />
              <Route path="/Panel-Rescatistas" element={<SociosPanel />} />

              <Route path="/Mis-Mascotas" element={<UserPost />} />
              <Route path="/Mis-Anuncios" element={<SociosAnuncios />} />
              <Route
                path="/Mascota-Perdida/:id_user/:id_pet/"
                element={<MascotaPerdida />}
              />
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      )}
    </>
  );
};

export default App;
