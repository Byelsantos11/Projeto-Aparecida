package com.aparecida.com.Controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aparecida.com.Model.Pagamento;
import com.aparecida.com.Services.PagamentoService;

@RestController
@RequestMapping("/api/pagamento")
public class PagamentoController {

    @Autowired
    PagamentoService pagamentoService;

    @PostMapping("/criarPagamento")
    public ResponseEntity<Map<String, Object>> criarPagamento(@RequestBody Pagamento pagamento) {
        Pagamento novoPagamento = pagamentoService.criarPagamento(pagamento);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", novoPagamento.getId());
        response.put("message", "Pagamento criado com sucesso");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/Editar/{id}")
    public ResponseEntity<String> atualizarPagamento(@PathVariable Long id, @RequestBody String status_pagamento) {
        Pagamento pagamentoAtualizado = pagamentoService.atualizarStatus(id, status_pagamento);
        return ResponseEntity.ok("Status do pagamento atualizado com sucesso para: " + pagamentoAtualizado.getStatus_pagamento());
    }

    @DeleteMapping("/Deletar/{id}")
    public ResponseEntity<String> deletarPagamento(@PathVariable Long id) {
        pagamentoService.deletarPagamento(id);
        return ResponseEntity.ok("Pagamento com ID " + id + " deletado com sucesso.");
    }

    @GetMapping("/listarTodos")
    public ResponseEntity<List<Pagamento>> listarTodos() {
        List<Pagamento> pagamentos = pagamentoService.buscarPagamentos();
        return ResponseEntity.ok(pagamentos);
    }
}


