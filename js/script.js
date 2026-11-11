let Registro = [];
const _storedRegistro = localStorage.getItem("Registro");
if (_storedRegistro) {
    try {
        Registro = JSON.parse(_storedRegistro);
    } catch (err) {
        console.error("Error parseando 'Empleados' desde localStorage:", err);
        Registro = [];
    }
}
let Base;
let D = 1;
let Suma = 0;
let d1; let d2; let d3;
let Estado;
let TiempoG;
const inputList = document.querySelectorAll('.limpio');
function Calcular(){
    let Max = +document.getElementById("Tmax").value;
    let Min = +document.getElementById("Tmin").value;
    let Planta = document.getElementById("Planta").value;   
    console.log(Planta);
    
    switch(Planta){
        case "tomate":
        Base = 18;
        if(Suma >= 0 && Suma <=80){
            Estado = " germinación";
        } else if(Suma >80 && Suma <= 200){
            Estado = " establecimiento";
        } else if(Suma >200 && Suma <= 500){
            Estado = " crecimiento vegetativo";
        } else if(Suma >500 && Suma <=700){
            Estado = " floración";
        } else if(Suma >700 && Suma <=900){
            Estado = " fructificación";
        } else if(Suma >900 && Suma <= 1200){
            Estado = " maduración inicial";
        } else if(Suma >1200 && Suma <=1500){
            Estado = " cosecha";
        }
        break;
        case "lechuga":
        Base =  15;
        if(Suma >= 0 && Suma <=80){
            Estado = " germinación";
        } else if(Suma >80 && Suma <= 200){
            Estado = " establecimiento";
        } else if(Suma >200 && Suma <= 400){
            Estado = " crecimiento vegetativo";
        } else if(Suma >400 && Suma <=600){
            Estado = " Desarrollo de cabeza";
        } else if(Suma >600 && Suma <=900){
            Estado = " Maduracion";
        } else if(Suma >900){
            Estado = " Floracion";
        } 
        break;
        case "zanahoria":
        Base = 16;
        if(Suma >= 0 && Suma <=120){
            Estado = " germinación";
        } else if(Suma >120 && Suma <= 300){
            Estado = " establecimiento";
        } else if(Suma >300 && Suma <= 700){
            Estado = " crecimiento vegetativo";
        } else if(Suma >700 && Suma <=1100){
            Estado = " Engrosamiento de la raiz";
        } else if(Suma >1100 && Suma <=1500){
            Estado = " Maduracion";
        } else if(Suma >1500){
            Estado = " Floracion";
        } 
        break;
        case "pimiento":
        Base = 21;
        if(Suma >= 0 && Suma <=120){
            Estado = " germinación";
        } else if(Suma >120 && Suma <= 300){
            Estado = " establecimiento";
        } else if(Suma >300 && Suma <= 700){
            Estado = " crecimiento vegetativo";
        } else if(Suma >700 && Suma <=1000){
            Estado = " Floracion";
        } else if(Suma >1000 && Suma <=1300){
            Estado = " Fructificacion";
        } else if(Suma >1300 && Suma <=1600){
            Estado = " Mmaduracion Inicial";
        } else if(Suma >1600 && Suma <=2000){
            Estado = "Cosecha"
        }
        break;
        case "girasol":
        Base = 20;
        if(Suma >= 0 && Suma <=100){
            Estado = " germinación";
        } else if(Suma >100 && Suma <= 250){
            Estado = " establecimiento";
        } else if(Suma >250 && Suma <= 600){
            Estado = " crecimiento vegetativo";
        } else if(Suma >600 && Suma <=800){
            Estado = " Botonamiento";
        } else if(Suma >800 && Suma <=1100){
            Estado = " Floracion";
        } else if(Suma >1100 && Suma <=1400){
            Estado = " Llenado de semillas";
        } else if(Suma >1400 && Suma <=1700){
            Estado = " Maduracion";
        }
        break;
        default:
        break;
    }
        let DC = (Max+Min)/2 - Base;
        Registro.push(DC*10);   
        localStorage.setItem("Registro", JSON.stringify(Registro));
        for (let i = 0; i < Registro.length; i++) {
            Suma += Registro[i];
        }
        
        
        switch(D){
            case 1:
                alert("Los GDD los primeros diez días fueron de: "+Registro[0]+", y está en estado de "+Estado);
                d1 = DC;
            break;
            case 2: 
                alert("En la segunda evaluación, los GDD acumulados en los primeros veinte días fueron de "+Suma+" y su estado es de"+Estado);
                d2 = DC;
            break;
            case 3:
                alert("En el primer mes, los GDD acumulados fueron de "+Suma+", y su estado es"+Estado);
                d3 = DC;
                console.log(d1,d2,d3);
                
                let media = (d1+d1+d3)/3;
                console.log(media);
                switch(Planta){
                    case "tomate":
                        TiempoG = 1500;
                        break;
                    case "lechuga":
                        TiempoG = 900;
                        break;
                    case "zanahoria":
                        TiempoG = 1500;
                        break;
                    case "pimiento":
                        TiempoG = 2000;
                        break;
                    case "girasol":
                        TiempoG = 1700;
                        break;
                }
                let DiasR = (TiempoG-Suma)/media;
                let MesesR =DiasR/30;
                alert("En un aproximado, el tiempo que falta para la cosecha es de "+DiasR.toFixed(2) + " días" + " o "+MesesR.toFixed(2)+ " meses");
                document.getElementById("planta").textContent = Planta;
            break;
        }
        D++;
        console.log("Día "+D-1+" R: "+Registro);
        console.log(Suma);

    document.getElementById("Día").textContent = "Día "+D;
    document.getElementById("Planta").value = Planta;
}
function Borrar(){
    let c = prompt("Ingresa la contraseña para borrar toda los registros de GDD");
    while(c != "pollo"){
        c = prompt("Contraseña incorrecta, vuelve a ingresar");
        if(c == null){
            break;
        }
    }
    if(c == "pollo"){
        localStorage.clear();
        D = 1;
        document.getElementById("Día").textContent = "Día "+D;
        Registro = [];
        alert("Todos los datos han sido borrados con éxito");
    }
}
