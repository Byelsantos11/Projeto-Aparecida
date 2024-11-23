package com.aparecida.com.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
	
	@GetMapping("/")
		public String login() {
			return "Login";
	}
	
	
	@GetMapping("/Login.html")
	public  String Login() {
		return "Login"; 
	}
	
	
	@GetMapping("/Cadastrar.html")
	public String Cadastro() {
		return "Cadastrar";
	}
	
	@GetMapping("/Home.html")
	public String Home() {
		return "Home";
	}
	
	@GetMapping("/Reserva.html")
	public String Reserva() {
		return "Reserva";
	}
	
	@GetMapping("/Acompanhar.html")
	public String Acompanhar() {
		return "Acompanhar";
	}
	
	@GetMapping("/Reservab.html")
	public String Reservab() {
		return "Reservab";
	}
	
	
	@GetMapping("/Reservac.html")
	public String Reservac() {
		return "Reservac";
	}
	
	@GetMapping("/Adm.html")
	public String Adm() {
		return "Adm";
	}
	
	@GetMapping("/Pagamento.html")
	public String Pagamento() {
		return "Pagamento";
	}
	
	
	@GetMapping("/AdminPassageiros.html")
	public String AdminPassageiros() {
		return "AdminPassageiros";
	}
	
	@GetMapping("/AdminOnibus.html")
	public String AdminOnibus() {
		return "AdminOnibus";
	}
	
	@GetMapping("/AdminReservas.html")
	public String AdminReservas() {
		return "AdminReservas";
	}
	
	

	
	
	}
	


