import { useState } from "react";

import { authUserStore } from "../../context/globalContext";
import { addComment } from "../../api/pets";
import "../../css/comments.css"
import { CSpinner } from "@coreui/react";

const CommentsPet = ({ comments, idPet, setComments }) => {

    console.log(comments)

    const { user, isAuthenticated } = authUserStore();
    const [comment, setComment] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("")

    const onClickAddComment = async () => {
        setLoading(true);
        const token = user.dataToken.token;
        if (comment.trim() === "") {
            setError("El comentario es necesario");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        const response = await addComment(idPet, comment, token);
        console.log("Respuesta mensaje: ", response)

        if (response.error) {
            setError(response.error);
            setTimeout(() => {
                setError("");
            }, 3000);
            setLoading(false);
            return;
        }
        setMensaje("Comentario agregado con éxito");
        setTimeout(() => {
            setMensaje("");
        }, 3000);
        setComment("");
        setLoading(false);
    }

    return (
        <div className="container-fluid my-5">
          <h3 className="mb-4 text-center">Comentarios de la Mascota Perdida</h3>
    
          <div className="text-center">
            {error && <div className="alert alert-danger">{error}</div>}
            {mensaje && <div className="alert alert-success">{mensaje}</div>}
          </div>
    
          <div className="text-center mb-2 p-4 border rounded">
            <label htmlFor="commentInput" className="form-label">Agregar Comentario</label>
            <textarea
              id="commentInput"
              value={comment}
              className="text-center form-control comment-input"
              onChange={evt => setComment(evt.target.value)}
              placeholder="Escribe tu comentario aquí..."
              rows={4}
            ></textarea>
            {isAuthenticated ? (
              <div className="text-center mt-2">
                <button onClick={onClickAddComment} className="btn-comment">
                  {!loading ? "Agregar Comentario" : <CSpinner color="primary" />}
                </button>
              </div>
            ) : (
              <div className="text-center mt-2">
                <p>Para agregar un comentario, por favor inicia sesión.</p>
                <button className="btn-comment" disabled>Iniciar Sesión</button>
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
                  <li key={index} className="list-group-item mb-3 p-3 border rounded shadow-sm">
                    <div>
                      <h5 className="mb-1"><span className="text-primary">Comentario:</span> {comment.title}</h5>
                      <p className="mb-1 text-muted">Usuario: {comment.user.name}</p>
                      <p className="mb-1">{comment.text}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      );
}

export default CommentsPet;