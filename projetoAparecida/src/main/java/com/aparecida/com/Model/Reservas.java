package com.aparecida.com.Model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name= "Reservas")
public class Reservas {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private double valor= 150.0;
	private String status = "pendente";
	private String poltrona;
    @Enumerated(EnumType.STRING)
    private TipoOnibus tipo_onibus;
    private LocalDate data_reserva;
    @ManyToOne
    @JoinColumn(name = "onibus_id", nullable = false)
    private Onibus onibus;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public double getValor() {
		return valor;
	}
	public void setValor(double valor) {
		this.valor = valor;
	}
	public String getPoltrona() {
		return poltrona;
	}
	public void setPoltrona(String poltrona) {
		this.poltrona = poltrona;
	}
	public TipoOnibus getTipo_onibus() {
		return tipo_onibus;
	}
	public void setTipo_onibus(TipoOnibus tipo_onibus) {
		this.tipo_onibus = tipo_onibus;
	}
	public LocalDate getData_reserva() {
		return data_reserva;
	}
	public void setData_reserva(LocalDate data_reserva) {
		this.data_reserva = data_reserva;
	}
	public Onibus getOnibus() {
		return onibus;
	}
	public void setOnibus(Onibus onibus) {
		this.onibus = onibus;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
        
}
