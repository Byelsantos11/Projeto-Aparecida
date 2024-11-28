package com.aparecida.com.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aparecida.com.Model.Reservas;
import com.aparecida.com.Services.ReservasService;


@RestController
@RequestMapping("/api/reservas")
public class ReservasController {

    @Autowired
    private ReservasService reservasService;


    @PostMapping("/criarReservas")
    public ResponseEntity<Reservas> criarReserva(@RequestBody Reservas reserva) {
        try {
            Reservas reservaCriada = reservasService.salvarReserva(reserva);
            return new ResponseEntity<>(reservaCriada, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

 
    @GetMapping("/BuscarReservas")
    public ResponseEntity<List<Reservas>> buscarTodasAsReservas() {
        List<Reservas> reservas = reservasService.buscarReservas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    
    @GetMapping("/BuscarPorNome/{nome}")
    public ResponseEntity<List<Reservas>> buscarPorNome(@PathVariable String nome) {
        System.out.println("Buscando reservas para o nome: " + nome);  
        List<Reservas> reservasNome = reservasService.BuscarPorNome(nome);
        if (reservasNome.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reservasNome, HttpStatus.OK);
    }


    
    @PutMapping("/Editar/{id}")
    public ResponseEntity<Reservas> atualizarReserva(@PathVariable Long id, @RequestBody Reservas reserva){
    try {
    		Reservas ReservaAtualizada= reservasService.atualizarReservas(id, reserva);
    		return ResponseEntity.ok(ReservaAtualizada);
    	}catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
    	  }
    }
    

    @DeleteMapping("/Deletar/{id}")
    public ResponseEntity<String> deletarReserva(@PathVariable Long id) {
        try {
            reservasService.deletarReservaPorId(id);
            return new ResponseEntity<>("Reserva deletada com sucesso!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao deletar reserva.", HttpStatus.NOT_FOUND);
        }
    }
}
