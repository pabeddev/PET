import { axiosInstance } from "../utilities/axiosInstance";


export const obtenerMascotas = async () => {
    const data = await axiosInstance.get("/posts/");
    console.log(data.data);
    return data.data;
}


export const createPost = async (formData, token) => {

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
    };

    try { 
        const data = await axiosInstance.postForm('/users/posts', formData, config);
        console.log(data);
        return data.data;
    }catch (error) {
        console.log(error)
        if(error.response.status === 500) {
            return { error: "Error al crear la publicacion" }
        }
        if(error.response.status === 401) {
            return { error: error }
        }
    }

}

export const getPet = async (idPet) => {
    try {
        const response = await axiosInstance.get(`/guests/publications/search?pet=${idPet}`);
        return response.data;
    }catch(error) {
        console.log(error);
        if(error.response.status === 500) {
            return { error: "Error al obtener la mascota" }
        }
    }
}

export const addComment = async (idPet, data, token) => {
    const config = {
        headers: {
            // tipo de dato text
            "Content-Type": "text/plain",
            "Authorization": `Bearer ${token}`
        }
    }

    try{
        const response = await axiosInstance.post(`/posts/comment?pet=${idPet}`, data, config);

        return response.data;

    }catch(error) {
        console.log(error);
        if(error.response.status === 500) {
            return { error: "Error al agregar el comentario" }
        }
    }

}