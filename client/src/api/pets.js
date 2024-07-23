import { axiosInstance } from "../utilities/axiosInstance";


export const obtenerMascotas = async () => {
    const data = await axiosInstance.get("/posts/");
    console.log(data.data);
    return data.data;
}


export const createPost = async (formData, token) => {
    return axiosInstance.post("/users/posts/", formData, {
        // headers para form-data
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    });
}

export const getPet = (idPet) => {
    console.log(idPet)
    return axiosInstance.get(`/posts/search?pet=${idPet}`);
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