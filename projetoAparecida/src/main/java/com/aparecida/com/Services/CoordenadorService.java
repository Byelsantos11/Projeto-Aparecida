package com.aparecida.com.Services;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.aparecida.com.Model.Coordenador;
import com.aparecida.com.Repository.CoordernadorRepository;


@Service
public class CoordenadorService {
	@Autowired
	private CoordernadorRepository CoordenadorRepository;
	
	@Autowired
	private PasswordEncoder PasswordEncoder;
	
	

	public Coordenador cadastrar(Coordenador coordenador) {
		coordenador.setSenha(PasswordEncoder.encode(coordenador.getSenha()));
		return CoordenadorRepository.save(coordenador);
	}
	
	
    public Coordenador logout(String email, String senha) {
        Optional<Coordenador> optionalCoordenador = CoordenadorRepository.findByEmail(email);
        
        if (optionalCoordenador.isPresent()) {
            Coordenador coordenador = optionalCoordenador.get();
            
            if (PasswordEncoder.matches(senha, coordenador.getSenha())) {
                return coordenador; 
            }
        }
        throw new RuntimeException("Email ou senha inválidos"); 
    }
    
   
    public List<Coordenador> buscarTodosOsCoordenadores() {
        return CoordenadorRepository.findAll();
    }

    
    public void deletarCoordenadorPorId(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("O ID da reserva não pode ser nulo.");
        }

        if (!CoordenadorRepository.existsById(id)) {
            throw new IllegalArgumentException("Reserva não encontrada com o ID fornecido.");
        }
        CoordenadorRepository.deleteById(id);
    }
    
}
