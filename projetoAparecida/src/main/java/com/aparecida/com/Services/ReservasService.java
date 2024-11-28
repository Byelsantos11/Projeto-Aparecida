package com.aparecida.com.Services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aparecida.com.Model.Onibus;
import com.aparecida.com.Model.Reservas;
import com.aparecida.com.Repository.OnibusRepository;
import com.aparecida.com.Repository.ReservasRepository;

@Service
public class ReservasService {
	
	@Autowired
	 ReservasRepository reservasRepository;
	
	@Autowired
	OnibusRepository onibusRepository;
	
	public Reservas salvarReserva(Reservas reserva) {
	    Optional<Onibus> onibusOpt = onibusRepository.findById(reserva.getOnibus().getId());
	    if (onibusOpt.isPresent()) {
	        Onibus onibus = onibusOpt.get();
	        reserva.setTipo_onibus(onibus.getTipo_onibus());
	        System.out.println("Reserva salva com sucesso: " + reserva);
	        return reservasRepository.save(reserva);
	    } else {
	        System.out.println("Ônibus não encontrado!");
	        throw new RuntimeException("Ônibus não encontrado.");
	    }
	}

	   public List<Reservas> buscarReservas(){
		   return reservasRepository.findAll();
		   
	   }
	   
	   
	   public List<Reservas>BuscarPorNome(String nome){
		   if(nome==null || nome.isEmpty()) {
			   throw new IllegalArgumentException("Nome de reserva não existe.");
		   }
		    List<Reservas> resultado = reservasRepository.findByNome(nome);
		    return resultado;
	   }
	   
	   
	   public void deletarReservaPorId(Long id) {
	        if (id == null) {
	            throw new IllegalArgumentException("O ID da reserva não pode ser nulo.");
	        }

	        if (!reservasRepository.existsById(id)) {
	            throw new IllegalArgumentException("Reserva não encontrada com o ID fornecido.");
	        }
	        reservasRepository.deleteById(id);
	    }

	   public Reservas atualizarReservas(Long id, Reservas reservasAtualizadas) {
		    Optional<Reservas> reservaExistente = reservasRepository.findById(id);

		    if (reservaExistente.isPresent()) {
		        Reservas reserva = reservaExistente.get();

		        reserva.setNome(reservasAtualizadas.getNome());
		        reserva.setPoltrona(reservasAtualizadas.getPoltrona());
		        reserva.setValor(reservasAtualizadas.getValor());
		        reserva.setData_reserva(reservasAtualizadas.getData_reserva());
		        return reservasRepository.save(reserva);
		        
		    } else {
		       
		        throw new RuntimeException("Reserva com ID " + id + " não encontrada.");
		    }
		}


}
