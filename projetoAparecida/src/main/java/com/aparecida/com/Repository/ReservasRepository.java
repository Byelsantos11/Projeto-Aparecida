package com.aparecida.com.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aparecida.com.Model.Reservas;

public interface ReservasRepository extends JpaRepository <Reservas, Long> {
	  Optional<Reservas>findById(Long id);
	  List<Reservas>findByNome(String nome);
		  
}
