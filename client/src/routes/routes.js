import { AdminDashboard } from "components/admin";

const defaultPathUser = '/user';

export const indexRoutes = {
    main: '/',
}

export const usersRoutes = {
    login: `${defaultPathUser}/login`,
    signUp: `${defaultPathUser}/signup`,
    userPetPost: `${defaultPathUser}/user-pet-post`,
    userPetGet: `${defaultPathUser}/user-pet-get`,
    userHowReport: `${defaultPathUser}/user-how-to-report`,
    userPetAdoption: `${defaultPathUser}/user-pet-adoption`,
    userPetCare: `${defaultPathUser}/user-pet-care`,
    userPetImportance: `${defaultPathUser}/user-pet-importance`,
        
        
}

export const devRoutes = {
    dev: '/dev',
}

export const adminRoutes = {
    adminGetUsers: `${defaultPathUser}/admin-user-get`,
    adminCollaboratorRequest: `${defaultPathUser}/admin-collaborator-request`,
}
