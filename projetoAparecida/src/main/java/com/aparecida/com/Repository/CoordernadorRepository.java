package com.aparecida.com.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aparecida.com.Model.Coordenador;

public interface CoordernadorRepository extends JpaRepository<Coordenador, Long> {
	  Optional<Coordenador>findById(Long id);
	  Optional<Coordenador>findByEmail(String email);
}
