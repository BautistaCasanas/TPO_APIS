package backend.backend.Marcas.service;

import backend.backend.Marcas.model.Marca;
import backend.backend.Marcas.repository.MarcaRepository;
import backend.backend.Marcas.dto.MarcaRequestDTO;
import backend.backend.Marcas.dto.MarcaResponseDTO;
import backend.backend.Marcas.exception.MarcaNoEncontradaException;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MarcaService {

    private final MarcaRepository marcaRepository;

    @Autowired
    public MarcaService(MarcaRepository marcaRepository) {
        this.marcaRepository = marcaRepository;
    }

    public List<MarcaResponseDTO> obtenerTodas() {
        try {
            return marcaRepository.findAll()
                    .stream()
                    .map(this::convertirAResponseDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al obtener marcas", e);
        }
    }

    public MarcaResponseDTO obtenerPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID inválido");
            }
            Marca marca = marcaRepository.findById(id)
                    .orElseThrow(() -> new MarcaNoEncontradaException(id));
            return convertirAResponseDTO(marca);
        } catch (MarcaNoEncontradaException e) {
            throw e; // deja que el handler global lo maneje
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al buscar la marca", e);
        }
    }

    public MarcaResponseDTO guardarMarca(MarcaRequestDTO dto) {
        try {
            if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
            }

            if (marcaRepository.existsByNombre(dto.getNombre())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe una marca con ese nombre");
            }

            Marca marca = new Marca();
            marca.setNombre(dto.getNombre());
            marca.setDescripcion(dto.getDescripcion());

            return convertirAResponseDTO(marcaRepository.save(marca));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al guardar la marca", e);
        }
    }

    public MarcaResponseDTO actualizarMarca(Long id, MarcaRequestDTO dto) {
        try {
            Marca existente = marcaRepository.findById(id)
                    .orElseThrow(() -> new MarcaNoEncontradaException(id));

            if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio");
            }

            if (!existente.getNombre().equals(dto.getNombre()) &&
                marcaRepository.existsByNombre(dto.getNombre())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ya existe una marca con ese nombre");
            }

            existente.setNombre(dto.getNombre());
            existente.setDescripcion(dto.getDescripcion());

            return convertirAResponseDTO(marcaRepository.save(existente));
        } catch (MarcaNoEncontradaException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar la marca", e);
        }
    }

    public void eliminarMarca(Long id) {
        try {
            if (!marcaRepository.existsById(id)) {
                throw new MarcaNoEncontradaException(id);
            }
            marcaRepository.deleteById(id);
        } catch (MarcaNoEncontradaException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar la marca", e);
        }
    }

    private MarcaResponseDTO convertirAResponseDTO(Marca marca) {
        MarcaResponseDTO dto = new MarcaResponseDTO();
        dto.setId(marca.getId());
        dto.setNombre(marca.getNombre());
        dto.setDescripcion(marca.getDescripcion());
        return dto;
    }

    public MarcaResponseDTO buscarPorNombre(String nombre) {
    if (nombre == null || nombre.isBlank()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es obligatorio para la búsqueda");
    }
    Marca marca = marcaRepository.findByNombreIgnoreCase(nombre)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Marca no encontrada con nombre: " + nombre));
    return convertirAResponseDTO(marca);
    }
}