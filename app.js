// sélection des éléments HTML 

const chatbody = document.querySelector(".chat-body");
const entrer = document.getElementById("txtInput");
const envoyer = document.getElementById("send");

// variable pour les tailles de texte

let taille1 = true;
let taille2 = false;
let inconnu = false;

// variable pour les textes entrer et la sauvegarde de conversation 

let user_input = ""; 
let id_msg = "";
let sauvegarde = [];
let sauvegarde_button = [];

// variable index de repère des chaines | programmes | heures

let index_chains_hours = 0;
let index_programs = 0;

// variable d'activation d'affichage d'heures

let button_activation = false;


// Objet contenant les réponses du bot 

const responseObjt = {
    
    Salut:"Salut, je m'appelle Bot Tv mon rôle est de t'informer sur le programme des différentes chaîne de la TNT. Pour obtenir la liste des chaînes disponible entre : oui",
    salut:"Salut, je m'appelle Bot Tv mon rôle est de t'informer sur le programme des différentes chaîne de la TNT. Pour obtenir la liste des chaînes disponible entre : oui",
    Bonjour:"Salut, je m'appelle Bot Tv mon rôle est de t'informer sur le programme des différentes chaîne de la TNT. Pour obtenir la liste des chaînes disponible entre : oui",
    bonjour:"Salut, je m'appelle Bot Tv mon rôle est de t'informer sur le programme des différentes chaîne de la TNT. Pour obtenir la liste des chaînes disponible entre : oui",
    Hello:"Salut, je m'appelle Bot Tv mon rôle est de t'informer sur le programme des différentes chaîne de la TNT. Pour obtenir la liste des chaînes disponible entre : oui",
    hello:"Quelle programme désirez vous connaître aujourd'hui ?",
    Aurevoir:"bye",
    aurevoir:"bye",
    Bye:"bye",
    bye:"bye",
    Oui:"Pas de soucis :) entre maintenant une chaîne.",
    oui:"Pas de soucis :) entre maintenant une chaîne.",
    OUI:"Pas de soucis :) entre maintenant une chaîne.",
    OUi:"Pas de soucis :) entre maintenant une chaîne.",
    OuI:"Pas de soucis :) entre maintenant une chaîne.",
    oUI:"Pas de soucis :) entre maintenant une chaîne.",
    oUi:"Pas de soucis :) entre maintenant une chaîne.",
    Non:"Entre : oui pour voir la liste des chaînes disponible pour continuer ta recherche:) ",
    non:"Entre : oui pour voir la liste des chaînes disponible pour continuer ta recherche:) "

}

//tab de tout les clé de l'objet

let tab_keys_objet = [];

for(let i = 0; i < Object.keys(responseObjt).length; i++){

tab_keys_objet.push(Object.keys(responseObjt)[i])

}


//Départ de l'algorithme : Événement clic 

envoyer.addEventListener("click", () => show_msg());

// Évenement touche entrer clic

entrer.addEventListener("keyup",(event) => {
    
    if(event.keyCode === 13){
        
        show_msg();
    }
});

// Chargement des messages entrer dans le corp de conversation

const load_msg = (value,type) => {
    
    let bot = false;
    
    let id_sign = "Moi";

    let className_id = "user-message";
    
    taille1 == true ? id_msg = "taille1_txt_user" : id_msg = "taille2_txt_user";
    
    
    if(type !== "user"){
        
        className_id = "chatbot-message";
        
        inconnu == true ? id_msg = "taille1_txt_bot" : id_msg = "taille2_txt_bot";
        
        id_sign = "Bot";
        bot = true;
        
    }
    
    const msg_txt = document.createElement("div");
    const id = document.createElement("p");
    const texte = document.createElement("p");
    
    msg_txt.classList.add(className_id);
    id.classList.add(id_sign);
    
    texte.setAttribute("id",id_msg);
    msg_txt.append(texte);
    
    bot == true ? id.textContent = id_sign+":" : id.textContent = ":"+id_sign;
    
    texte.textContent = value;
    
    chatbody.append(id);
    chatbody.append(msg_txt);
    
}

//Affichage des heures de la chaines sélectionnée

let show_hours_program = heures => {

    // console.log(" ici ")
    
    let cadre_button = document.createElement("div");
    cadre_button.setAttribute("id","cadre_button");
    chatbody.append(cadre_button);
    
    
    heures.forEach( element => {
        
        let button = document.createElement("button");
        button.classList.add("bouton")
        button.textContent = element;
        
        sauvegarde_button.push(button);
        cadre_button.append(button);
        
    });
    
    
    chatbody.append(cadre_button);
    console.log(sauvegarde_button.length);

    button_activation = false;

}


// Chargement de la réponse du bot 

const bot_response = (value) =>{
    
    const response = check_response(value);
    
    inconnu == true ? taille = true : null;
    
    load_msg(response);
}


// Analyse du bot du message entrer par l'utilisateur

const check_response = (value) => {
    
    return responseObjt[value] == undefined ? "Je n'ai pas compris": responseObjt[value];
    
}

// Comparation du message avec les réponse du bot 

const verification = (x) => {
    
    let verification = 0;
    
    for(let i = 0; i < x.length; i++){
        
        if( user_input != x[i] ){
            
            verification++;
            
        } 
    }
    
    if(verification === Object.keys(responseObjt).length){
        
        inconnu = true;
        
        
    }else{
        
        inconnu = false;
        
    }
}


//Fonction principale (Main) qui lance tout le processus

const show_msg = () => {
    
    user_input = entrer.value;
    sauvegarde.push(user_input);
    
    sauvegarde.length == 1 ? user_input = "Salut" : sauvegarde.pop(); // force le premier message à être: Salut.
    
    if ((user_input == "Oui" || user_input == "oui") && sauvegarde.length > 0){
        
        let liste = document.getElementById("liste");
        let texte = [];
        let index = [];
        
        all_chains.forEach(element => {
            
            texte.push(element);
        });
        
        texte = texte.toString();
        
        
        for(let i = 0; i < texte.length ; i++){
            
            texte[i] == "," ? texte = texte.replace(texte[i],"  "):null;
            
        }
        
        liste.textContent = texte+" (copiez et coller pour éviter les erreurs. ATTENTION À NE PAS COPIER LES ESPACES JUSTE LE TEXTE UNIQUEMENT ET NE PRESSEZ AUCUNE AUTRE TOUCHE AVANT D'APPUYER SUR ENTRER !)";
    
    }else{
        
        null;
    } 
    
    if(user_input.length > 33) { taille1 = false;  taille2 = true; } else { taille1 = true; taille2 = false; }
    
    for(let i = 0; i < all_chains.length; i++){
        
        if(user_input == all_chains[i]){
            
            if(button_activation == false){
                
                index_chains_hours = i;
                console.log("index heure et chaine",index_chains_hours)
                // console.log("la chaine choisie est:",all_chains[index_chains_hours])
                button_activation = true;
            
            } else {
                
                null;
                button_activation = false;
            }
        }
    }
    
    // console.log("chaine",all_chains[index_chains_hours])
    
    verification(tab_keys_objet);
    
    load_msg(user_input,"user");
    
    entrer.value = "";
    
    
    setTimeout(() => {
        
        
        button_activation == true ? show_hours_program(all_hours[index_chains_hours]) : bot_response(user_input);
        
        for(let i = 0; i < sauvegarde_button.length; i++){
            
            sauvegarde_button[i].addEventListener('click', () => {
                index_programs = i;

                // console.log(sauvegarde_button[i],i,index_programs); 
                
                //Objet donnant le résultat de la recherche . 
                
                programme = { 
            
                    resultat :"Voici le programme donné à :"+all_hours[index_chains_hours][index_programs]+"\n"+"sur "+all_chains[index_chains_hours]+": "+all_programs[index_chains_hours][index_programs],
                }
                
                load_msg(programme.resultat);
                

                scroll_move();
                sauvegarde_button.length = 0;
            });
        }
        
        scroll_move();
    
    },700);
}
    
// Actualisation automatique du scroll de la conversation

const scroll_move = () =>{
    
    if(chatbody.scrollHeight > 0){
        
        chatbody.scrollTop = chatbody.scrollHeight;
    }
};