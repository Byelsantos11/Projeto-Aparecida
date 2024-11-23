package com.aparecida.com.Services;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aparecida.com.Model.Coordenador;
import com.aparecida.com.Model.Passageiro;
import com.aparecida.com.Repository.PassageiroRepository;

@Service
public class PassageiroService {

	@Autowired
	private PassageiroRepository passageiroRepository;
	
	@Autowired
	private PasswordEncoder PasswordEncoder;
	
	
	public Passageiro cadastrar(Passageiro passageiro) {
		passageiro.setSenha(PasswordEncoder.encode(passageiro.getSenha()));
		return passageiroRepository.save(passageiro);
	}
	
	
    public Passageiro logout(String email, String senha) {
        Optional<Passageiro> optionalPassageiro = passageiroRepository.findByEmail(email);
        
        if (optionalPassageiro.isPresent()) {
            Passageiro passageiro = optionalPassageiro.get();
            
            if (PasswordEncoder.matches(senha, passageiro.getSenha())) {
                return passageiro; 
            }
        }
        throw new RuntimeException("Email ou senha inválidos"); 
    }

    
    public List<Passageiro> buscarTodosOsPassageiros() {
        return passageiroRepository.findAll();
    }


}
