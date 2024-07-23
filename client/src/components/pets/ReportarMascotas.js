import {useState} from "react";
import {useNavigate} from "react-router-dom";
import mapboxgl from "mapbox-gl";
import {createPost} from "../../api/pets";
import {authUserStore, toastData} from "../../context/globalContext";
import 'css/ReportarMascotas.css'
import {breeds, genders, species, size} from "utilities/maps";
import MapView from "./MapView";
import ImagenesMascotas from "./ImagenesMascotas";
import {CSpinner} from "@coreui/react";

const ReportarMascotas = () => {
    const navigate = useNavigate();
    const {user} = authUserStore();
    const {toastError, toastSuccess} = toastData();
    const [loading, setLoading] = useState(false);
    const [formPage, setFormPage] = useState(1);
    const [gallery, setGallery] = useState([]);
    const [markerCordinates, setMarkerCordinates] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        specie: "Perro",
        breed: "Mestizo",
        gender: "Macho",
        age: "",
        size: "Chico",
        description: "",
        last_seen: "",
        lost_date: "",
        image: "",
        images: [],
        location: "",
        owner: false,
    });

    const handleSubmit = async (evt) => {
        setLoading(true);
        evt.preventDefault();
        if (formData.description.trim() === "") {
            toastError("La descripción es requerida");
            setLoading(false);
            return;
        }
        if (formData.last_seen.trim() === "") {
            toastError("El lugar donde se extravió es requerido");
            setLoading(false);
            return;
        }
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("specie", formData.specie);
        formDataToSend.append("breed", formData.breed);
        formDataToSend.append("gender", formData.gender);
        formDataToSend.append("age", formData.age);
        formDataToSend.append("size", formData.size);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("last_seen", formData.last_seen);
        formDataToSend.append("lost_date", formData.lost_date);
        formDataToSend.append("location", JSON.stringify(markerCordinates));
        formDataToSend.append("owner", formData.owner);
        formDataToSend.append("image", gallery[0].file);

        gallery.forEach((image) => {
            formDataToSend.append("images", image.file);
        })

        try {
            await createPost(formDataToSend, user.dataToken.token);
            setLoading(false);
            toastSuccess("Mascota reportada exitosamente");
            navigate("/pets");
        } catch (error) {
            setLoading(false);
            toastError("Error al reportar la mascota");
        }
    };

    const handleNext = (evt) => {
        evt.preventDefault();
        setFormPage(formPage + 1);
    };

    const handlePrevious = (evt) => {
        evt.preventDefault();
        setFormPage(formPage - 1);
    };

    const handleChange = (evt) => {
        console.log("evt.target", evt.target.value);
        const {name, value, type, checked} = evt.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    mapboxgl.accessToken = "pk.eyJ1IjoibWFpbmxha2UiLCJhIjoiY2x5dmFiOWIwMDBwNDJrcHoyNDhmcmJoNCJ9.-3AL3FN0XWB5D-vJpEkWqA";

    console.log('makerCoor: ', markerCordinates)

    return (
        <div className="container_reportar_mascotas md_container_one">

            <div className="section_background md_none sm_none">

            </div>

            <form className="form_custom">

                <div className="form_title">
                    <h1>Reporta tu mascota</h1>
                </div>

                {/* Carrusel 1 */}
                {
                    formPage === 1 && (
                        <div className="carrusel_custom_1">
                            <div className="form_input_container">
                                <label className="form_label_custom" htmlFor="name">Nombre</label>
                                <input
                                    className="form_input_custom margin-top"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_group_column_custom md_form_group_column_custom">
                                <div className="form_input_container grid_col-4">
                                    <label className="form_label_custom" htmlFor="specie">Especie</label>
                                    <select
                                        className="form_input_custom margin-top"
                                        name="specie"
                                        value={formData.specie}
                                        onChange={handleChange}
                                    >
                                        {species.map((specie) => (
                                            <option key={specie} value={specie}>
                                                {specie}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form_input_container grid_col-4">
                                    <label className="form_label_custom" htmlFor="breed">Raza</label>
                                    <select
                                        className="form_input_custom margin-top"
                                        name="breed"
                                        value={formData.breed}
                                        onChange={handleChange}
                                    >
                                        {breeds[formData.specie].map((breed) => (
                                            <option key={breed} value={breed}>
                                                {breed}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form_input_container grid_col-4">
                                    <label className="form_label_custom" htmlFor="gender">Género</label>
                                    <select
                                        className="form_input_custom margin-top"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        {
                                            genders.map(gender => (
                                                <option key={gender} value={gender}>
                                                    {gender}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form_group_column_custom">
                                <div className="form_input_container grid_col-6">
                                    <label className="form_label_custom" htmlFor="age">Edad</label>
                                    <input
                                        className="form_input_custom margin-top"
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="form_input_container grid_col-6">
                                    <label className="form_label_custom" htmlFor="size">Tamaño</label>
                                    <select
                                        className="form_input_select_custom margin-top"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                    >
                                        {size.map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form_input_container">
                                <label className="form_label_custom" htmlFor="description">Descripción</label>
                                <textarea className="form_input_textarea_custom margin-top" value={formData.description} onChange={handleChange} name="description">
                                 </textarea>
                            </div>

                            <div className="form_input_container">
                                <button
                                    className="button_custom"
                                    onClick={handleNext}
                                >
                                   Siguiente
                                </button>
                            </div>

                        </div>
                    )
                }
                {/*Fin Carrusel 1*/}

                {/* Carrusel 2 */}

                {
                    formPage === 2 && (
                        <div className="carrusel_custom_2">
                            <div className="form_input_container">
                                <label className="form_label_custom" htmlFor="last_seen">Lugar donde se extravió</label>
                                <input
                                    className="form_input_custom margin-top"
                                    type="text"
                                    name="last_seen"
                                    value={formData.last_seen}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form_group_column_custom">
                                <div className="form_input_container grid_col-6">
                                    <label className="form_label_custom" htmlFor="lost_date">Fecha en que se
                                        extravió</label>
                                    <input
                                        className="form_input_custom margin-top"
                                        type="date"
                                        name="lost_date"
                                        value={formData.lost_date}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form_input_container grid_col-6 container_checkbox_custom">
                                    <label className="form_label_custom" htmlFor="owner">¿Eres el dueño?</label>
                                    <input
                                        className="form_input_checkbox_custom margin-top"
                                        type="checkbox"
                                        name="owner"
                                        checked={formData.owner}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                            <div className="form_input_container">
                                <label className="form_label_custom" htmlFor="location">Ubicación</label>
                                <MapView
                                    markerCordinates={markerCordinates}
                                    setMarkerCordinates={setMarkerCordinates}
                                    location={formData.location}
                                    defaultMapCenterCordinates={typeof(markerCordinates) === 'object' && Object.keys(markerCordinates).length > 0 ? markerCordinates :[-92.266184, 14.902344]}
                                />
                            </div>

                            <div className="form_input_container">
                                <label className="form_label_custom" htmlFor="images">Imágenes</label>
                                <ImagenesMascotas
                                    gallery={gallery}
                                    setGallery={setGallery}
                                />
                            </div>

                            <div className="form_input_container_row">
                            <button
                                    className="button_custom"
                                    onClick={handlePrevious}
                                >
                                    Atrás
                                </button>
                                <button
                                    className="button_custom"
                                    onClick={handleSubmit}
                                >
                                    {!loading ? "Reportar1" : <CSpinner color="primary" />}
                                </button>
                            </div>
                        </div>

                    )
                }

                {/*Fin Carrusel 2*/}

            </form>

        </div>
    );
};

export default ReportarMascotas;
