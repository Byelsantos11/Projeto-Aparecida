package com.aparecida.com.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aparecida.com.Model.Onibus;


public interface OnibusRepository extends JpaRepository <Onibus, Long> {
	  Optional<Onibus>findById(Long id);
		  
}
