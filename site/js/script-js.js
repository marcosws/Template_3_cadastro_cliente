/* Autor: Marcos Willian de Souza - 11/03/2016 */

$(function(){

	var temp = false;
	$('.cpf_cnpj').keypress(function(){
		
		var input = $(this);
		
		if(temp){
			clearTimeout(temp);
		}
		
		temp = setTimeout(function(){
		
		    input.removeClass('campo_valido');
            input.removeClass('campo_invalido');
		
			var cpf_cnpj = input.val();
			var valida = false;
			
			
			if(validaCpf(cpf_cnpj)){
				valida = true;
				$("#pessoa_fisica").show();
				$("#pessoa_juridica").hide();
			}
			else if(validaCnpj(cpf_cnpj)){
				valida = true;
				$("#pessoa_juridica").show();
				$("#pessoa_fisica").hide();
			}
			
			if(valida){
				input.addClass('campo_valido');
			}
			else{
				input.addClass('campo_invalido');
			}
	
		},500);
		
	});
	
});
$(function(){

	var temp = false;
	$('.idade').keypress(function(){
	
		var input = $(this);
		
		if(temp){
			clearTimeout(temp);
		}
		
		temp = setTimeout(function(){
		
			input.removeClass('campo_valido');
            input.removeClass('campo_invalido');
			
			var idade = input.val();
			
			if(validaNumero(idade)){
				input.addClass('campo_valido');
			}
			else{
				input.addClass('campo_invalido');
			}
			
		},500);
	
	});

});
$(function(){

	var temp = false;
	$('.email').keypress(function(){
		
		var input = $(this);
		
		if(temp){
			clearTimeout(temp);
		}
		
		temp = setTimeout(function(){
		
			input.removeClass('campo_valido');
            input.removeClass('campo_invalido');
			
			var email = input.val();
			
			if(validaEmail(email)){
				input.addClass('campo_valido');
			}
			else{
				input.addClass('campo_invalido');
			}
			
		},500);
	});

});

$(document).ready(function(){

	$('.enviar').click(function(){
		
		var valida = true;
		var cnpj = false;
		var msg = "";
		
		var nome = $('.nome').val();
		var cpf_cnpj = $('.cpf_cnpj').val();
		var idade = $('.idade').val();
		var email = $('.email').val();
	
		if(nome === ""){
			msg += "O campo Nome deve ser preenchido !\n";
			valida = false;
		}
		
		if(cpf_cnpj.length === 11){
			if(!validaCpf(cpf_cnpj)){
				msg += "CPF inválido !\n";
				valida = false;
			}
		}
		else if(cpf_cnpj.length === 14){
			cnpj = true;
			if(!validaCnpj(cpf_cnpj)){
				msg += "CNPJ inválido !\n";
				valida = false;
			}
		}
		else{
			msg += "Formato de CPF/CNPJ inválido !\n";
			valida = false;
		}
		
		if(cnpj === false){
			if(!validaNumero(idade)){
				msg += "O campo Idade deve ser preenchido apenas com numeros !\n";
				valida = false;
			}
			else if(idade === ""){
				msg += "O campo Idade deve ser preenchido!\n";
				valida = false;
			}
		}
		
		if(email === ""){
			msg += "O campo E-mail deve ser preenchido !\n";
			valida = false;
		}
		else{
			if(!validaEmail(email)){
				msg += "Formato de E-mail inválido !\n";
				valida = false;
			}
		}
		
		if(valida){
			$('.formulario').submit();
		}
		else{
			alert(msg);
		}
	
	});

});

function validaEmail(email){

	var res = email.match(/^([\w\-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\-]{2,3})$/g);
	if(res === null){
		return false;
	}
	else{
		return true;
	}

}
function validaNumero(numero){

	var res = numero.match(/[^0-9]/g);
	if(res === null){
		return true;
	}
	else{
		return false;
	}

}
function validaCpf(cpf){

	cpf = cpf.toString();
	cpf = cpf.replace(/[^0-9]/g, '');
	
	if(cpf.length != 11){
		return false;
	}
	
	var rep = 0;
	for(var r = 0; r < 10; r++){
		if(cpf.substr(r,1) === cpf.substr(10,1)){
			rep += 1;
		}
		if(rep === 10){
			return false;
		}
	}
	
	var soma = 0;
	var valida = false;
	var peso_mult1 = [10,9,8,7,6,5,4,3,2];
	var peso_mult2 = [11,10,9,8,7,6,5,4,3,2];
	
	for(var i = 0; i < 9; i++){
		soma += peso_mult1[i] * parseInt(cpf.substr(i,1));
	}
	
	var resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	var digito = resto.toString();
	var parc_cpf = cpf.substr(0,9) + digito;
	soma = 0;
	
	for(var j = 0; j < 10; j++){
		soma += peso_mult2[j] * parseInt(parc_cpf.substr(j,1));
	}
	
	resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	digito += resto.toString();
	if(cpf.substr(9,2) === digito){
		valida = true;
	}

	return valida;

}
function validaCnpj(cnpj){

	cnpj = cnpj.toString();
	cnpj = cnpj.replace(/[^0-9]/g, '');
	
	if(cnpj.length != 14){
		return false;
	}
	
	var rep = 0;
	for(var r = 0; r < 13; r++){
		if(cnpj.substr(r,1) === cnpj.substr(13,1)){
			rep += 1;
		}
		if(rep === 13){
			return false;
		}
	}
	
	var soma = 0;
	var valida = false;
	var peso_mult1 = [5,4,3,2,9,8,7,6,5,4,3,2];
	var peso_mult2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	
	for(var i = 0; i < 12; i++){
		soma += peso_mult1[i] * parseInt(cnpj.substr(i,1));
	}

	var resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	var digito = resto.toString();
	var parc_cnpj = cnpj.substr(0,12) + digito;
	soma = 0;
	
	for(var j = 0; j < 13; j++){
		soma += peso_mult2[j] * parseInt(parc_cnpj.substr(j,1));
	}
	
	resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	digito += resto.toString();
	if(cnpj.substr(12,2) === digito){
		valida = true;
	}

	return valida;
	
}