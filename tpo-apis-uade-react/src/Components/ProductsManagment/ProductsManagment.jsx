import {
  Box, Button, CircularProgress, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function ProductManagement() {
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); //buscadorgit 
  const { auth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token || !auth?.usuario.id) return;

    fetch(`http://localhost:8081/api/products/user/${auth?.usuario.id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
  }, [refresh, auth]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8081/api/products/${id}`, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },
    });
    setRefresh(!refresh);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <TextField
          variant="outlined"  
          placeholder="Buscar productos..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/publicar'); // Redirección para nuevo producto
          }}
        >
          Añadir Producto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1" color="textSecondary">
                    No tenés productos publicados.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => {
                        navigate('/publicar', { state: { initialData: product } });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductManagement;