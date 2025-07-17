package backend.backend.Marcas.controller;

import backend.backend.Marcas.dto.MarcaRequestDTO;
import backend.backend.Marcas.dto.MarcaResponseDTO;
import backend.backend.Marcas.service.MarcaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marcas")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public List<MarcaResponseDTO> listarMarcas() {
        return marcaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public MarcaResponseDTO obtenerMarcaPorId(@PathVariable Long id) {
        return marcaService.obtenerPorId(id);
    }

    @PostMapping
    public MarcaResponseDTO crearMarca(@RequestBody MarcaRequestDTO dto) {
        return marcaService.guardarMarca(dto);
    }

    @PutMapping("/{id}")
    public MarcaResponseDTO actualizarMarca(@PathVariable Long id, @RequestBody MarcaRequestDTO dto) {
        return marcaService.actualizarMarca(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminarMarca(@PathVariable Long id) {
        marcaService.eliminarMarca(id);
    }

    @GetMapping(params = "nombre")
    public MarcaResponseDTO buscarPorNombre(@RequestParam String nombre) {
        return marcaService.buscarPorNombre(nombre);
}

}
