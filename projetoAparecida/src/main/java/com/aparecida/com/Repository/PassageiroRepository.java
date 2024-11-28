package com.aparecida.com.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.aparecida.com.Model.Passageiro;

public interface PassageiroRepository extends JpaRepository <Passageiro, Long> {
   Optional<Passageiro>findById(Long id);
   Optional<Passageiro>findByEmail(String email);

}
