import { useFetch } from "../../Hooks/useFetch";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductManagement() {
    const { data: products, error, loading } = useFetch("http://localhost:3000/products");

    if (error) return <Typography color="error">Error al cargar los productos</Typography>;
    if (loading) return <CircularProgress />;

    return (
        <Box p={3}>
            <Box display="flex" justifyContent="space-between" mb={3}>
                <TextField
                    variant="outlined"
                    placeholder="Buscar productos..."
                    size="small"
                />
                <Button variant="contained" color="primary" onClick={() => console.log("Añadir producto")}>
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
                                    <IconButton color="primary" size="small" onClick={() => console.log("Editar producto")}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" size="small" onClick={console.log("Producto Eliminado")} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ProductManagement;