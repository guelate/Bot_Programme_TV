//tab of alls data (chains, programs, hours)

let data_programs = [];
let data_hours = [];

let all_chains;
let all_programs;
let all_hours;


//Récupération de toutes les chaînes TV

function loading1 () {
    
    let chains = [];
    
    if(this.status == 200) {
        
        // console.log("ok")
        data_fichier = JSON.parse(this.responseText);

        let keys = Object.keys(data_fichier)
        let value = Object.values(data_fichier)
        
        
        for(let counter = 0; counter < keys.length; counter++){
            
            chains.push(value[counter][0])
        }
        
    }
    
    localStorage["chains"] = JSON.stringify(chains);
}

all_chains = JSON.parse(localStorage.getItem("chains")); //tab de toutes les chaînes
// console.log("les chaines:",all_chains)


// Récupération de tout les programmes 

function loading2() {
    
let programs = [];

if(this.status == 200){
    
    // console.log("ok")
    
    data_fichier = JSON.parse(this.responseText);
    let keys = Object.keys(data_fichier);
    let value = Object.values(data_fichier);
    
    for(let counter = 0; counter < keys.length; counter++){
        
        programs.push(value[counter])
    }
    data_programs.push(programs);
}
localStorage["programs"] = JSON.stringify(data_programs);
}

all_programs = JSON.parse(localStorage.getItem("programs")); //tab de touts les programmes
// console.log("les programmes",all_programs)

// Récupération de toutes les heures 

function loading3() {

    let hours = [];
    if(this.status == 200){
        
        data_fichier = JSON.parse(this.responseText);
        let keys = Object.keys(data_fichier); 
        let value = Object.values(data_fichier);

        // console.log(keys)
        // console.log(value)
        
        for(let counter = 0; counter < keys.length; counter++){
            
            hours.push(value[counter])
        }
        data_hours.push(hours);
        
    }

    localStorage["hours"] = JSON.stringify(data_hours)
}

all_hours = JSON.parse(localStorage.getItem("hours"));// tab de toute les heures                           
// console.log(all_hours);


// Traitement des données dans les sous dossier et fichier du dossier ./Répertoire

all_chains.forEach( data => {
    
    // fichier programmes

    let requestURL_programs = "./Répertoire/Chaînes/"+data+"/programs_file.json";
    let request_programs = new XMLHttpRequest();
    request_programs.onload = loading2;
    request_programs.overrideMimeType("application/json");
    request_programs.open("GET",requestURL_programs,true);
    request_programs.send();  

    // fichier heures

    let requestURL_hours = "./Répertoire/Chaînes/"+data+"/time_file.json";
    let request_hours = new XMLHttpRequest();
    request_hours.onload = loading3;
    request_hours.overrideMimeType("application/json");
    request_hours.open("GET",requestURL_hours,true);
    request_hours.send();

});

// Traitement du fichier json file

let xml_objet = new XMLHttpRequest();
xml_objet.onload = loading1;
xml_objet.overrideMimeType("application/json");
xml_objet.open("GET", "file.json", true);
xml_objet.send();

