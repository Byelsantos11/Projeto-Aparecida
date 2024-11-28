package com.aparecida.com.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.aparecida.com.Model.Onibus;
import com.aparecida.com.Services.OnibusService;

@RestController
@RequestMapping("/api/onibus")
public class OnibusController {
	
	
	@Autowired
	OnibusService OnibusService;
	
	
	  @GetMapping("/BuscarOnibus")
	    public ResponseEntity<List<Onibus>> buscarTodosOsOnibus() {
	        List<Onibus> onibus = OnibusService.BuscarTodosOnibus();
	        return new ResponseEntity<>(onibus, HttpStatus.OK);
	    }

}
