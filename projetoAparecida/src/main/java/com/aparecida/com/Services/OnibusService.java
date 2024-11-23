package com.aparecida.com.Services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aparecida.com.Model.Onibus;
import com.aparecida.com.Repository.OnibusRepository;


@Service
public class OnibusService {

 @Autowired
 OnibusRepository OnibusRepository;
 
 
 public List<Onibus> BuscarTodosOnibus(){
	 return OnibusRepository.findAll();
 }
	

}
