import { useState, useEffect, useContext } from "react";
import {
  Typography,
  Rating,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  Paper
} from "@mui/material";
import { UserContext } from "../../../Context/UserContext";

const Comentarios = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const { auth } = useContext(UserContext);


  const fetchComments = async () => {
      const res = await fetch(`http://localhost:3000/comments?productId=${(productId)}`);
      if (!res.ok) throw new Error("Error al obtener comentarios");
      const data = await res.json();
      setComments(data);
  };

  useEffect(() => {
    if (productId) fetchComments();
  }, [productId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    const newComment = {
      productId: (productId),
      user: auth.name,
      userId: auth.id,
      rating,
      text: comment,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      });

      if (response.ok) {
        setComment("");
        setRating(0);
        fetchComments(); // Recargar comentarios
      } else {
        throw new Error("Error al guardar el comentario");
      }
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  if (!productId) return <p>Error: ID del producto no definido</p>;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', mt: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Califica este producto
        </Typography>
        <form onSubmit={handleSubmitComment}>
          <Box sx={{ mb: 2 }}>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
            <TextField
              fullWidth
              rows={4}
              placeholder="comenta tu opinion sobre este producto"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={!comment || !rating}
          >
            Publicar
          </Button>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Opiniones de usuarios
        </Typography>
        {comments.length === 0 ? (
          <Typography>No hay comentarios.</Typography>
        ) : (
          comments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  {comment.user[0]}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {comment.user}
                  </Typography>
                  <Rating value={comment.rating} readOnly size="small" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {comment.date}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ ml: 7, mb: 2 }}>
                {comment.text}
              </Typography>
              <Divider />
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default Comentarios;
