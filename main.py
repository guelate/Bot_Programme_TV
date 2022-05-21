import json
from textwrap import indent
from xml.sax.handler import DTDHandler
from matplotlib.font_manager import json_dump
import requests
import os.path
from bs4 import BeautifulSoup

tab_all_link = [] #contient tout les sous liens de chaîne
tab_all_chains = [] #contient tout les boutons de chaîne
url = "https://www.programme-tv.net/programme/chaine/" #lien de source principale 

index = 0

#dictionnaire contenant les chaînes et leur sous lien qui vont servir de sources.

chains = {

    "TF1":"programme-tf1-19.html",
    "FRANCE 2":"programme-france-2-6.html",
    "FRANCE 3":"programme-france-3-7.html",
    "CANAL +":"programme-canalplus-2.html",
    "France 5":"programme-france-5-9.html",
    "M6":"programme-m6-12.html",
    "Arte":"programme-arte-337.html",
    "C8":"programme-c8-4.html",
    "W9":"programme-w9-24.html",
    "TMC":"programme-tmc-21.html",
    "TFX":"programme-tfx-14.html",
    "NRJ 12":"programme-nrj-12-13.html",
    "LCP":"programme-la-chaine-parlementaire-11.html",
    "France 4":"programme-france-4-8.html",
    "BFM TV":"programme-bfmtv-25.html",
    "CNews":"programme-cnews-30.html",
    "CStar":"programme-cstar-28.html",
    "Gulli":"programme-gulli-29.html",
    "TF1 Séries Films":"programme-tf1-series-films-201.html",
    "L'équipe":"programme-lequipe-204.html",
    "6Ter":"programme-6ter-202.html",
    "RMC Story":"programme-rmc-story-203.html",
    "RMC Découverte":"programme-rmc-decouverte-205.html",
    "Chérie 25":"programme-cherie-25-206.html",
    "LCI":"programme-lci-la-chaine-info-78.html",
    "Franceinfo":"programme-franceinfo-307.html",
}




#Conversion de l'objet en fichier json 

def chain_creation(x):

    global tab_all_chains

    for value in x:
        tab_all_chains.append(value)
   


#Tableau regroupant les sous liens des différentes chaines

def under_link(x,tab):
    for value in x:
        tab.append(x[value])


#Création du répertatoire qui va contenir tout les dossiers et sous fichier des différentes chaînes

def create_folder(path,name):

    try:

        os.mkdir(os.path.join(path,name))
        print("Le dossier:" ,name,"est en cours de création, patientez :)")
        os.mkdir(os.path.join(path+name,"Chaînes"))

    except FileExistsError:

        print("Le dossier:" ,name,"existe déjà.")


#création du fichir HTML 

def html(name_file):

    file = open(name_file,"w")
    file.write("<!DOCTYPE html>\n\n")
    file.write("<html lang='en'>\n\n")
    file.write("    <head>\n\n")
    file.write("        <meta charset='UTF-8'/>\n\n")
    file.write("        <meta http-equiv='X-UA-Compatible' content='IE=edge'/>\n\n")
    file.write("        <title>Chatbot</title>\n\n")
    file.write("        <link rel='stylesheet' href='style.css'/>\n\n")
    file.write("    </head>\n\n")
    file.write("    <body>\n\n")
    file.write("        <div class='container'>\n\n")
    file.write("            <div class='chat-header'>\n\n")
    file.write("            <div id='title'>Programme Bot</div>\n\n")
    file.write("        </div>\n\n")
    file.write("        <div class='chat-body'></div>\n")
    file.write("        <div class='chat-input'>\n\n")
    file.write("            <div class='input-sec'>\n\n")
    file.write("                <input type='text' id='txtInput'required maxlength='50' size='50' placeholder='Écrivez . . .'>\n\n")
    file.write("                <button id='send'>Envoyer</button>\n\n")
    file.write("            </div>\n\n")
    file.write("        </div>\n\n")
    file.write("      </div>\n\n")
    file.write("       <p id='liste'></p>\n\n")
    file.write("      <script src='response.js'></script>\n\n")
    file.write("      <script src='app.js'></script>\n\n")
    file.write("    </body>\n\n")
    file.write("</html>\n\n")


# MAIN 

if __name__ == '__main__':

    chain_creation(chains)

    under_link(chains,tab_all_link)
    
    create_folder("","Répertoire")
    
    html("bot.html")

    #Creation du répertoire contenant tout les dossiers et sous fichiers de chaque chaînes.

    while index < len(tab_all_chains):

        response = requests.get(url+tab_all_link[index])
        
        if response.ok:

            # scraping des différentes infos nécessaire (programme  & heures)

            soup = BeautifulSoup(response.text,"lxml")
            chain_data = soup.findAll("h3",{"class":"mainBroadcastCard-title"})
            time_data = soup.findAll("p",{"class":"mainBroadcastCard-startingHour"})

            #creation de fichiers programme et heures pour chaque chaînes 

            os.mkdir(os.path.join("./Répertoire/Chaînes",tab_all_chains[index]))
            path = "./Répertoire/Chaînes/"+tab_all_chains[index]

            tab_file = ["programs_file.json","time_file.json"]
            for value in tab_file:
                targetFile = os.path.join(path,value)
                createFile = open(targetFile,"w")
                
                if value == "programs_file.json":

                    tab_programs = []

                    for value in chain_data:

                        program_title = value.find("a").string.strip()
                        tab_programs.append(program_title)

                    objet = {}
                    counter = 0

                    for value in tab_programs:

                        objet[counter] = value
                        counter += 1

                    texte = json.dump(objet, createFile, indent = 4, ensure_ascii=False)

                else:
                    
                    tab_time = []

                    for value in time_data:

                        time_title = value.string.strip()
                        tab_time.append(time_title)

                    objet = {}
                    counter = 0

                    for value in tab_time:

                        objet[counter] = value
                        counter += 1

                    texte = json.dump(objet, createFile, indent = 4, ensure_ascii=False)

              
        index += 1
print("Création finit, toutes les données ont été récupérées.")
