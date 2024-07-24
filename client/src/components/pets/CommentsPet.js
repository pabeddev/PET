import { useState } from "react";

import { authUserStore } from "../../context/globalContext";
import { addComment } from "../../api/pets";
import "../../css/comments.css";
import { CSpinner } from "@coreui/react";

import { toastData } from "../../context/globalContext";

const CommentsPet = ({ comments, idPet, setComments }) => {
  console.log(comments);

  const { toastError, toastSuccess } = toastData();

  const { user, isAuthenticated } = authUserStore();
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const onClickAddComment = async () => {
    setLoading(true);
    const token = user.dataToken.token;
    if (comment.trim() === "") {
      toastError("El comentario no puede estar vacío");
      setLoading(false);
      return;
    }

    try {
      const response = await addComment(idPet, comment, token);
      setComments((prev) => [...prev, {...response.data.data}]);
      toastSuccess("Comentario agregado con éxito");
    } catch (error) {
      toastError("Error al agregar el comentario");
    }

    setComment("");
    setLoading(false);
  };

  return (
    <div className="my-5 w-100">
      <h3 className="mb-4 text-center">Comentarios de la Mascota Perdida</h3>

      <div className="text-center">
        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
      </div>

      <div className="text-center mb-2 p-4 border rounded input_comment">
        <label htmlFor="commentInput" className="form-label">
          Agregar Comentario
        </label>
        <textarea
          id="commentInput"
          value={comment}
          className="input_textarea_comment"
          onChange={(evt) => setComment(evt.target.value)}
          placeholder="Escribe tu comentario aquí..."
          rows={4}
        ></textarea>
        {isAuthenticated ? (
          <div className="text-center mt-2">
            <button onClick={onClickAddComment} className="btn_comment">
              {!loading ? "Enviar" : <CSpinner color="primary" />}
            </button>
          </div>
        ) : (
          <div className="text-center mt-2">
            <p>Para agregar un comentario, por favor inicia sesión.</p>
            <button className="btn-comment" disabled>
              Iniciar Sesión
            </button>
          </div>
        )}
      </div>

      <div className="comments-list mt-4">
        <h4 className="mb-4">Comentarios</h4>
        <ul className="list-group">
          {comments.length === 0 ? (
            <li className="list-group-item text-center">No hay comentarios</li>
          ) : (
            comments.map((comment, index) => (
              <li
                key={index}
                className="list-group-item mb-3 p-3 border rounded shadow-sm"
              >
                <div>
                  <h5 className="mb-1">
                    <span className="text-primary">Comentario:</span>{" "}
                    {comment.title}
                  </h5>
                  <p className="mb-1 text-muted">
                    Usuario: {comment.user_id.name}
                  </p>
                  <p className="mb-1">{comment.text}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommentsPet;
