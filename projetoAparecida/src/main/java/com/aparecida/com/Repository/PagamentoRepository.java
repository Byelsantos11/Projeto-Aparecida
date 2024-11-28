package com.aparecida.com.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aparecida.com.Model.Pagamento;


public interface PagamentoRepository extends JpaRepository<Pagamento, Long>{
  Optional<Pagamento>findById(Long id);
}
