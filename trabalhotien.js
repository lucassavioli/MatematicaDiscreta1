var strin = '(d & a) & (b | d)';

var ListaPrioridades = ['&','|'];

function nomefunc(vetor,pos){
    var r = [];
    if(vetor[pos] == '&'){
       r = vetor[pos] = 'E';
    }
    if(vetor[pos] == '|'){
       r = vetor[pos] = 'OU';
    }
    return r;
}
function precompila(vet2){
    //trocar parenteses por []
    for (var i = 0; i < vet2.length; i++) {
        if(vet2[i]=="("){
            vet2[i] = "[";
        }
        if(vet2[i]==")"){
            vet2[i] = "]";
        }
    }
    return vet2;
}
function vetorizar(carac){
    // transformr a estring vet em um vetor de arrays
    var vet = carac.split('');
    //tirar substituir os ' ' por ''
    var vet2 = [];
    var j = 0;
    for (var i = 0; i < vet.length; i++) {
        if(vet[i]!=" "){
            vet2[j] = vet[i];
            j++;
        }
    }
    return vet2;
}
function PegarAbreParent (vet){
   var pos = -1;
    for (var i = 0; i < vet.length; i++) {
        if(vet[i]=="["){
            pos = i;
        }
    }
    return pos;
}
function PegarFechaParent (vet){
    var pos = -1;
    for(var i = 0; i< vet.length; i++){
        if(vet[i]== ']'){
            pos = i;
        }
    }
    return pos;
}
function maiorProcedencia (vet,ListaP){
    var valorcarac = 100;
    var pos = -1;
    for(var i = 0; i< vet.length; i++){
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            if(ListaP.indexOf(caracter) < valorcarac){
                valorcarac = ListaP.indexOf(caracter);
                pos = i; 
            }
        }
    }
    return pos;
}
function  operadorEsquerda (posi,ListaP,vet){
    var vc = posi - 1;
    for (var i = vc; i >= 0; i--) {
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            return i;
        }
    }
    return -1;
}
function  operadorDireita (posi,ListaP,vet){
    var vc = posi + 1;
    for (var i = vc; i < vet.length; i++) {
        var caracter = vet[i];
        if(ListaP.indexOf(caracter) != -1){
            return i;
        }
    }
    return -1;
}
function resolveF (vet,ListaP){
   
    var posMaiorProcedencia = maiorProcedencia(vet,ListaP);
    var posOperadorEsquerda = operadorEsquerda(posMaiorProcedencia,ListaP,vet);
    var posOperadorDireita = operadorDireita(posMaiorProcedencia,ListaP,vet);
    
    var vetAntesEsquerda = [];
    var vetDepoisDireita = [];
    var vetEsquerda = [];
    var vetDireita = [];
    var miolo = [];
    var i = 0;
    var vet2 = [];
    var operadorEsq;
    var operadorDir;
    if (posOperadorEsquerda != -1){
        var y = 0;
        for( i = 0; i < posOperadorEsquerda; i++){
            vetAntesEsquerda[y] = vet[i];
            y++;
        }
        var y = 0;
        for( i = posOperadorEsquerda + 1; i < posMaiorProcedencia; i++){
            vetEsquerda[y] = vet[i];
            y++;
        }
    }else{
        vetAntesEsquerda= [''];
        var y = 0;
        for( i = 0; i < posMaiorProcedencia; i++){
            vetEsquerda[y] = vet[i];
            y++;
        }
     }
    if(posOperadorDireita != -1){
        var y = 0;
        for(i = posOperadorDireita + 1; i< vet.length; i++){
            vetDepoisDireita[y] = vet[i];
            y++;
            }
        var y = 0;
        for( i = posMaiorProcedencia + 1; i < posOperadorDireita; i++){
            vetDireita[y] = vet[i];
            y++;
        }
    }else{
        var y = 0;
        for( i = posMaiorProcedencia + 1; i < vet.length; i++){
            vetDireita[y] = vet[i];
            y++;
        }
        vetDepoisDireita = [''];
     }
        vet2 = ["0"];
        var parte1 = vetEsquerda.concat(vet2);
        miolo = parte1.concat(vetDireita);
        miolo = miolo.join('');
  
    if(vet[posOperadorEsquerda] == undefined){
       operadorEsq = '';
    }else{
       operadorEsq = vet[posOperadorEsquerda];
    }
    if(vet[posOperadorDireita]== undefined){
       operadorDir = '';
    }else{
       operadorDir = vet[posOperadorDireita];
    }
    vet = vetAntesEsquerda.concat(operadorEsq.concat(nomefunc(vet,posMaiorProcedencia).concat('('.concat(miolo.concat(')'.concat(operadorDir.concat(vetDepoisDireita)))))));
    vet = vet.join("");
    return vet;
}


function f(strinn,ListaP){
    var ve = vetorizar(strinn);
    var vetor = precompila(ve);
    var r;
    var parent = parenteses(vetor,ListaP);
    vetor = vetorizar(parent);
    while(maiorProcedencia(vetor,ListaP) != -1){
        r = resolveF(vetor,ListaP);
        vetor = vetorizar(r);
    }
    var ve = vetorizar(r);
    for (var i = 0; i < ve.length; i++) {
        if(ve[i]==","){
            ve[i] = "";
        }
    }
    for (var i = 0; i < ve.length; i++) {
        if(ve[i]=="0"){
            ve[i] = ",";
        }
    }
    ve = ve.join("");
    return ve;
}

window.alert(f(strin,ListaPrioridades));

function parenteses(vetor,ListaP){
    
    while(PegarAbreParent(vetor) != -1){
        var posabrep = PegarAbreParent(vetor);
        var posfechp = PegarFechaParent(vetor);
        var miolo = [];
        var antesmiolo = [];
        var depoismiolo = [];
        var y = 0;
        for (var i = posabrep + 1 ; i < posfechp; i++) {
            miolo[y] = vetor[i];
            y++;
        }
        var y = 0;
        for (var i = 0; i < posabrep; i++) {
            antesmiolo[y] = vetor[i];
            y++;
        }
        var y = 0;
        for (var i = posfechp + 1 ; i < vetor.length; i++) {
            depoismiolo[y] = vetor[i];
            y++;
        }
        while(maiorProcedencia(miolo,ListaP) != -1){
            r = resolveF(miolo,ListaP);
            miolo = vetorizar(r);
            miolo = miolo.join('');
        }
        if(antesmiolo == undefined){
           antesmiolo = '';
        }
        if(depoismiolo == undefined){
           depoismiolo = '';
        }
        vetor = antesmiolo.concat("{".concat(miolo.concat('}'.concat(depoismiolo))));
        vetor = vetor.join("");
        vetor = vetorizar(vetor);
        //tirar substituir os ' ' por ''
        var vet2 = [];
        var j = 0;
        for (var i = 0; i < vetor.length; i++) {
            if(vetor[i]!=" "){
                vet2[j] = vetor[i];
                j++;
            }
        }}
        var j = 0;
        var vet3 = [];
        for (var i = 0; i < vet2.length; i++) {
            if(vet2[i]!=","){
                vet3[j] = vet2[i];
                j++;
            }
        }
    vet3 = vet3.join("");
    return vet3;
}
