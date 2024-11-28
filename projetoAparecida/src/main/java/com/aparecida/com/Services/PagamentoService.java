package com.aparecida.com.Services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aparecida.com.Model.Pagamento;
import com.aparecida.com.Repository.PagamentoRepository;

@Service
public class PagamentoService {
	
	
	@Autowired
	 PagamentoRepository pagamentoRepository;
	
	
	 public Pagamento criarPagamento(Pagamento pagamento) {
		 pagamento.setStatus_pagamento("pendente");
		return pagamentoRepository.save(pagamento);
		
	}
	 
	 public List<Pagamento> buscarPagamentos(){
		 return pagamentoRepository.findAll();	
	 }
	 
	    
	 public Pagamento atualizarStatus(Long id, String status_pagamento) {
	        Pagamento pagamento = pagamentoRepository.findById(id)
	                        .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
	        pagamento.setStatus_pagamento(status_pagamento);
	        return pagamentoRepository.save(pagamento);
	    }
	    
	    
		   public void deletarPagamento(Long id) {
		        if (id == null) {
		            throw new IllegalArgumentException("O ID do pagamento não pode ser nulo.");
		        }

		        if (!pagamentoRepository.existsById(id)) {
		            throw new IllegalArgumentException("Pagamento não encontrada com o ID fornecido.");
		        }
		        pagamentoRepository.deleteById(id);
		    }
	

}
