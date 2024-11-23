package com.aparecida.com.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aparecida.com.Model.Coordenador;
import com.aparecida.com.Model.LoginRequest;
import com.aparecida.com.Services.CoordenadorService;

@RestController
@RequestMapping("/api/coordenadores")
public class CoordenadorController {

    @Autowired
    private CoordenadorService coordenadorService;

    @PostMapping("/cadastroCoord")
    public ResponseEntity<Coordenador> cadastrar(@RequestBody Coordenador coordenador) {
        Coordenador novoCoordenador = coordenadorService.cadastrar(coordenador);
        return ResponseEntity.ok(novoCoordenador);
    }

    @PostMapping("/loginCoord")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            Coordenador coordenador =  coordenadorService.logout(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok("Login bem-sucedido para: " + coordenador.getNome());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    
    @GetMapping("/BuscarCoordenadores")
    public ResponseEntity<List<Coordenador>> buscarTodosOsCoordenadores() {
        List<Coordenador> coordenadores = coordenadorService.buscarTodosOsCoordenadores();
        return new ResponseEntity<>(coordenadores, HttpStatus.OK);
    }
    
    @DeleteMapping("/Deletar/{id}")
    public ResponseEntity<String> deletarCoordenador(@PathVariable Long id) {
        try {
            coordenadorService.deletarCoordenadorPorId(id);
            return new ResponseEntity<>("Reserva deletada com sucesso!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar reserva.", HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    }