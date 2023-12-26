package com.camber.user.service.exceptions;

public class ResourceNotFoundException extends RuntimeException{

    //Añadir propiedades que desee
    public ResourceNotFoundException(){
        super("Recursos no encontrados en el servidor!!");
    }

    public ResourceNotFoundException(String message){
        super(message);
    }
}
