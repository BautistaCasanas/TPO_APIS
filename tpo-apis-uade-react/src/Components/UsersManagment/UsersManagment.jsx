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

function UserManagement() {
// Datos de ejemplo para usuarios

const { data: users, error, loading } = useFetch("http://localhost:3000/users");
if (error) return <Typography color="error">Error al cargar los usuarios</Typography>;
if (loading) return <CircularProgress />;

return (
    <Box p={3}>
        <Box display="flex" justifyContent="space-between" mb={3}>
            <TextField
                variant="outlined"
                placeholder="Buscar usuarios..."
                size="small"
            />
            <Button variant="contained" color="primary" onClick={() => console.log("Añadir usuario")}>
                Añadir Usuario
            </Button>
        </Box>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <IconButton color="primary" size="small" onClick={() => console.log("Editar usuario")}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton color="secondary" size="small" onClick={() => console.log("Eliminar usuario")}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
)
}

export default UserManagement
