import React from 'react';

//VALIDACIONES DE CAMPOS

export const validateName = (name) => {
    let nameRegex = /^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i; //https://stackoverflow.com/questions/9445334/javascript-regex-valid-name
    return nameRegex.test(name);
}

export const validateTel = (tel)=>{
    let telRegex = /[0-9]{4}-[0-9]{4}/; //1234-5678
    return telRegex.test(tel);
}

//PONER CORREO !!!!!!!!!!!!!!!!!!!!!!!!!
