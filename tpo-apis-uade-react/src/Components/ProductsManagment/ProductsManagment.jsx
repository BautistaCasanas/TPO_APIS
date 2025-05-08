import {
    Box, Button, CircularProgress, IconButton, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import ProductForm from "./ProductForm";
  import { useState, useEffect } from "react";
  
  function ProductManagement() {
    const [openForm, setOpenForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Obtener el ID del usuario actual desde localStorage
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      setCurrentUserId(userData?.id);
    }, []);
  
    // Obtener los productos del usuario
    useEffect(() => {
      if (!currentUserId) return;
  
      setLoading(true);
      fetch(`http://localhost:3000/products?userId=${currentUserId}`)
        .then(res => {
          if (!res.ok) throw new Error("Error al cargar los productos");
          return res.json();
        })
        .then(data => setProducts(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [refresh, currentUserId]);
  
    const handleSave = async (productData) => {
      if (selectedProduct) {
        // Editar producto
        await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productData,
            id: selectedProduct.id,
            userId: currentUserId
          })
        });
      } else {
        // Crear producto nuevo
        await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productData,
            userId: currentUserId
          })
        });
      }
      setRefresh(!refresh);
    };
  
    const handleDelete = async (id) => {
      await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      });
      setRefresh(!refresh);
    };
  
    if (error) return <Typography color="error">{error}</Typography>;
    if (loading) return <CircularProgress />;
  
    return (
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <TextField
            variant="outlined"
            placeholder="Buscar productos..."
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedProduct(null);
              setOpenForm(true);
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
              {products.map((product) => (
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
                        setSelectedProduct(product);
                        setOpenForm(true);
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSave={handleSave}
          initialData={selectedProduct}
        />
      </Box>
    );
  }
  
  export default ProductManagement;
  