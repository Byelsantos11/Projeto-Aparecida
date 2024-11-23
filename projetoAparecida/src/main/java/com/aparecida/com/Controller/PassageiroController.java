package com.aparecida.com.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aparecida.com.Model.LoginRequest;
import com.aparecida.com.Model.Passageiro;
import com.aparecida.com.Services.PassageiroService;

@RestController
@RequestMapping("/api/passageiros")
public class PassageiroController {

    @Autowired
    private PassageiroService passageiroservice;

    @PostMapping("/cadastro")
    public ResponseEntity<Passageiro> cadastrar(@RequestBody Passageiro passageiro) {
        Passageiro novoPassageiro = passageiroservice.cadastrar(passageiro);
        return ResponseEntity.ok(novoPassageiro);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            Passageiro passageiro = passageiroservice.logout(loginRequest.getEmail(), loginRequest.getSenha());
            return ResponseEntity.ok("Login bem-sucedido para: " + passageiro.getNome());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
    
    
    @GetMapping("/BuscarPassageiros")
    public ResponseEntity<List<Passageiro>> buscarTodosOsPassageiros() {
        List<Passageiro> passageiros = passageiroservice.buscarTodosOsPassageiros();
        return new ResponseEntity<>(passageiros, HttpStatus.OK);
    }
    
    
    
}

