package com.aparecida.com.Model;
import jakarta.persistence.*;


@Entity
@Table (name= "onibus")
public class Onibus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String modelo;
    private int capacidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoOnibus tipo_onibus;

    @ManyToOne
    @JoinColumn(name = "coordenador_id", nullable = false)
    private Coordenador coordenador;

    public Onibus() {
        this.modelo = "Volvo";      
        this.capacidade = 40; 
        this.tipo_onibus = TipoOnibus.A;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public TipoOnibus getTipo_onibus() {
        return tipo_onibus;
    }

    public void setTipo_onibus(TipoOnibus tipo_onibus) {
        this.tipo_onibus = tipo_onibus;
    }

    public Coordenador getCoordenador() {
        return coordenador;
    }

    public void setCoordenador(Coordenador coordenador) {
        this.coordenador = coordenador;
    }

    @Override
    public String toString() {
        return "Onibus{" +
                "id=" + id +
                ", modelo='" + modelo + '\'' +
                ", capacidade=" + capacidade +
                ", tipo_onibus=" + tipo_onibus +
                ", coordenador=" + coordenador +
                '}';
    }
}

