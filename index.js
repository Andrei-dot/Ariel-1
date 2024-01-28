//      - Requirements & Vars -         //

const Discord     = require('discord.js');

const c           = new Discord.Client();
const Client      = new Discord.Client();

const readline    = require('readline');
const fs          = require('fs');
const path        = require('path');
const chalk       = require('chalk');
const moment      = require('moment');
const ms          = require('ms');
const si          = require('systeminformation');
const exec        = require('child_process').execFile;


const cfg         = require('./data.json');
const settings    = require('./settings.json');
const pkg         = require('./package.json');
const { S_IFMT, SSL_OP_TLS_BLOCK_PADDING_BUG, UV_FS_O_FILEMAP } = require('constants');

require('console-png').attachTo(console);
 
var image = require('fs').readFileSync('./assets/bis.png');
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var link          = ("https://bit.ly/36eTdve1");
var prefix        = (">");
var version       = pkg.version;
var github        = pkg.author;
var master        = false;
var settuped      = false;
var os            = require('os');

var osu           = require('node-os-utils');
const { obj }     = require('through2');
var netstat       = osu.netstat
var mem           = osu.mem;

// - Console - //

    // Custom Chalks

const special     = chalk.underline.red;             // Utilisation : console.log(special('Special'));
const normal      = chalk.bold.white;                // Utilisation : console.log(normal('Normal'));
const info        = chalk.reset.red;                  // Utilisation : console.log(info('Info'));
const err         = chalk.bold.red;                   // Utilisation : console.log(err('Erreur'));

    // Logs

c.once('reconnecting', () => 
{
  console.log(info("[?]") + normal(' Reconnecting!'));
});
c.once('disconnect', () => 
{
  console.log(info("[?]") + normal(' Disconnect!'));
});

var commands      = {};
var specommands   = {};
var concommands   = {};
var dashboard     = {};

function msleep(n) 
{
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) 
{
  msleep(n * 1000);
}

function board(Info,Usage)
{
  this.Info = Info;
  this.Usage = Usage;
}

function concmds(Nom,Catégorie,Description)
{
  this.Nom = Nom;
  this.Catégorie = Catégorie;
  this.Description = Description;
}

function specmds(Nom,Catégorie,Description)
{
  this.Nom = Nom;
  this.Catégorie = Catégorie;
  this.Description = Description;
}

function cmds(Nom,Catégorie,Description)
{
  this.Nom = Nom;
  this.Catégorie = Catégorie;
  this.Description = Description;
}

commands.a = new cmds(">help","Basique","Vous donne les commandes d'aide.");
commands.b = new cmds(">moderation","Basique", "Vous donne les commandes de modération.");
commands.c = new cmds(">utilitaires","Basique", "Vous donne les commandes utiles."); 

commands.x = new cmds("                                  ", "          ", "                  ");

commands.d = new cmds(">ban <@mention> 'raison'", "Modération", "Bannit l'utilisateur mentionné. => Nécessite la permission 'BAN_MEMBERS'.");
commands.e = new cmds(">mute <@mention> 'raison' <temps>", "Modération", "Mute l'utilisateur mentionné. => Nécessite la permission 'MANAGE_ROLES.'");
commands.f = new cmds(">kick <@mention> 'raison'", "Modération", "Kick l'utilisateur mentionné. Nécessite la permission 'KICK_MEMBERS'.");
commands.h = new cmds(">cls <int>", "Modération", "Efface le nombre de messages donnés. => Nécessite la permission 'MANAGE_MESSAGES'.");

commands.y = new cmds("                                  ", "          ", "                  ");

commands.i = new cmds(">pp <@mention>", "Utilitaires", "Vous donne la photo de profil de l'utilisateur.");
commands.j = new cmds(">servericon", "Utilitaires", "Vous donne la photo de serveur (sauf s'il n'en a pas).");
commands.k = new cmds(">serverinfo", "Utilitaires", "Vous donne les informations relatives au serveur.");
commands.l = new cmds(">userinfo <@mention>", "Utilitaires", "Vous donne les informations de l'utilisateur mentionné.")
commands.m = new cmds(">botinfo", "Utilitaires", "Vous donne les informations relative au bot.");
commands.n = new cmds(">roll", "Utilitaires","Vous donne un chiffre aléatoire entre 0 et 100.");



specommands.a = new specmds(">ch","Channels","Supprime tous les channels pour les recréer avec d'autres noms et les inonder de gifs.");
specommands.b = new specmds(">mpall <ARGUMENT>","Utilisateurs","Envoie un MP à tous les utilisateurs en fonction ")
specommands.c = new specmds(">rename","Serveur","Rename le serveur et change le logo.");



concommands.a = new concmds("CONHELP","Basique","Affiche ce panneau d'aide dans la console.");
concommands.b = new concmds("MASTERINFO","Basique","Donne des informations plus poussées sur le bot.");
concommands.c = new concmds("BACK","Basique","Vous fait retourner au menu d'accueil de la console.");
concommands.x = new concmds(" "," "," ");
concommands.d = new concmds("SETSTATUS <ARGUMENT>","External","Change le status du bot, en fonction de l'argument donné.");
concommands.y = new concmds(" "," "," ");
concommands.e = new concmds("SC","Internal","Vous donne le privilège administrateur (SUPERCLIENT) dans le terminal du bot.")
concommands.f = new concmds("IDEVICE","Interal","Vous donne les informations sur l'utilisation de votre ordinateur (CPU, GPU, Espace disque libre etc..)");

function displayMenu()
{
  console.clear();
  console.log("                                                             ");
  console.log("                                                             ");
  console.log(info("                                                   ▄▄▄       ██▀███   ██▓▓█████  ██▓        "));
  console.log(info("                                                  ▒████▄    ▓██ ▒ ██▒▓██▒▓█   ▀ ▓██▒        "));
  console.log(info("                                                  ▒██  ▀█▄  ▓██ ░▄█ ▒▒██▒▒███   ▒██░        "));
  console.log(info("                                                  ░██▄▄▄▄██ ▒██▀▀█▄  ░██░▒▓█  ▄ ▒██░        "));
  console.log(info("                                                   ▓█   ▓██▒░██▓ ▒██▒░██░░▒████▒░██████▒    "));
  console.log(info("                                                   ▒▒   ▓▒█░░ ▒▓ ░▒▓░░▓  ░░ ▒░ ░░ ▒░▓  ░    "));
  console.log(info("                                                    ▒   ▒▒ ░  ░▒ ░ ▒░ ▒ ░ ░ ░  ░░ ░ ▒  ░    "));
  console.log(info("                                                    ░   ▒     ░░   ░  ▒ ░   ░     ░ ░       "));
  console.log(info("                                                        ░  ░   ░      ░     ░  ░    ░  ░    "));
  console.log("                                                             ");
  console.log(info("                                                  ARIEL-1 VERSION -> ") + version);
  console.log("                                                             ");
  console.log(info("                                                  Prefix -> ") + prefix);
  console.log("                                                             ");
  console.log(info("                                                  Invitation -> ") + link);
  console.log("                                                             ");
  console.log(info("                                                  Github -> ") + github);
  console.log("                                                             ");
  console.log(info("                                     Serveurs -> ") + c.guilds.size + info("    ") + info("Utilisateurs -> ") + c.users.size + info("    ") + info("Compte -> ") + c.user.tag);
  console.log("                                                             ");
  console.log(info("                                     Executez CONHELP pour avoir accès à l'espace d'informations relatif aux commandes de la console."))
  console.log("                                                             ");

  console.table(commands);
}

async function getData() {
  try {
    const data = await si.cpu();

    var startMeasure = cpuAverage();

    si.baseboard().then(el => dashboard.MOTHERBOARD = new board(el.manufacturer, "-"));

    setTimeout(function() { 

      var endMeasure = cpuAverage(); 
    
      var idleDifference  = endMeasure.idle - startMeasure.idle;
      var totalDifference = endMeasure.total - startMeasure.total;
    
      var percentageCPU   = 100 - ~~(100 * idleDifference / totalDifference);
      
      const arr      = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
      arr.reverse();
      const used     = process.memoryUsage().heapUsed / 1024 / 1024;
      const hostname = os.hostname();
      const homedir  = os.homedir();
      const tmpdir   = os.tmpdir();
      const test     = os.type();
      
      /*
      const getCPUTemp = () => {
        si.baseboard.then(get => {
          dashboard.getCPUTEMPS = new board(si.cpuTemperature);
        })
      }
      */


      var total_memory = os.totalmem(); 

      var total_mem_in_kb = total_memory/1024; 
      var total_mem_in_mb = total_mem_in_kb/1024; 
      var total_mem_in_gb = total_mem_in_mb/1024; 
         
      total_mem_in_kb = Math.floor(total_mem_in_kb); 
      total_mem_in_mb = Math.floor(total_mem_in_mb); 
      total_mem_in_gb = Math.floor(total_mem_in_gb); 

      /*
      console.log("Memory used in GB", (usedMemory/ Math.pow(1024, 3)).toFixed(2))
      console.log("Used memory" , getpercentage);
      */

      var um              = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

      var percentageRAM   = ((um/totalMemory) * 100).toFixed(0);

      dashboard.HOSTNAME  = new board(hostname, "-");
      dashboard.HOMEDIR   = new board(homedir, "-");
      dashboard.TMPDIR    = new board(tmpdir, "-");
      dashboard.CPU       = new board(data.manufacturer + " " + data.brand, percentageCPU+ "%");
      dashboard.TOTAL_RAM = new board(total_mem_in_gb + "GB", percentageRAM + "%");    

      console.table(dashboard);
      console.log(info(`[!] Ce script occupe ${Math.round(used * 100) / 100} MB de RAM`));
    }, 100);
  } catch (e) {
    console.log(e)
  }
}

rl.on('line', (input) => {
  if(input == "idevice")
  {
    if(master == true)
    {
      console.log(info("[!] Calcul des paramètres de l'ordinateur..."));
      getData();
    } else 
    {
      console.log(err("[!] Vous n'êtes pas en mode SUPERCLIENT, pour passer en mode SUPERCLIENT, veuillez executer 'SC'."))
    }
  }
  if(input == "sc")
  {
    if(master == true) {
      console.log(info("[!] Vous êtes déjà en mode SUPERCLIENT. Pour en sortir executez BACK."))
    } else {
    if(settuped == true)
    {
      rl.question('[?] Quel est votre mot de passe ? ', (answer) => {
        if (answer === cfg.password)
        {
          master = true;
          console.log(info("[*] Vous venez de passer en mode SUPERCLIENT. Pour en sortir executez BACK (cela vous ramenera également au main menu)."))
        } else { console.log(err("[!] Mauvais mot de passe ! Veuillez re-essayer.")); }
      });
    } else 
    {
      console.log(err('[!] Vous ne vous êtes pas encore créer de mot de passe, veuillez executer SETUP pour le faire.'));
    }
  }
}
  if(input == "setup")
  {
    if(settuped == true) 
    {
      console.log(err("[!] Vous avez déjà créer votre mot de passe, si vous voulez le changer veuillez executer RESET"));
    } else {
      rl.question('[?] Choisissez votre mot de passe ; ', (answer) => {
        if (answer)
        {
          settuped = true;
          console.log(info("[?] Le mot de passe est désormais : " + answer));

          var jsonData = '{"password":"' + answer + '"}';
          var jsonObj = JSON.parse(jsonData);
          var jsonContent = JSON.stringify(jsonObj);

          fs.writeFile('data.json', jsonContent, 'utf-8' ,(err) => {
            if(err)
            {
              console.log(err);
            }
          });
        }
    });
  }
}
  
  if(input == "masterinfo")
  {
    if(master == true)
    {
      console.log(master)
    } else
    {
      console.log(err("[!] Vous n'êtes pas en mode SUPERCLIENT, pour passer en mode SUPERCLIENT, veuillez executer 'SC'."))
    }
  }
  if(input == "raid")
  {
    console.log(info("" +
    "           +--------------------------------------------------+\n"
    + "    (__)   |                                                  |\n"
    + " (|)(00)   |      Vous allez entrer dans le mode RAID.        |\n"
    + "  |/(__)\\  |      Aucun retour ne sera possible.              |\n"
    + "  |_/ _|   |                                                  |\n"
    + "           +--------------------------------------------------+"
    + "                                                                \n"));  
    console.log(info("3..."));
    sleep(0.5);
    console.log(info("2..."));
    sleep(0.5);
    console.log(info("1..."));
    sleep(0.5);
    console.clear();

    console.log(info("                                               ██████╗     █████╗    ██╗   ██████╗     ███╗   ███╗ ██████╗ ██████╗"));
    console.log(info("                                               ██╔══██╗   ██╔══██╗   ██║   ██╔══██╗    ████╗ ████║██╔═══██╗██╔══██╗"));
    console.log(info("                                               ██████╔╝   ███████║   ██║   ██║  ██║    ██╔████╔██║██║   ██║██║  ██║"));
    console.log(info("                                               ██╔══██╗   ██╔══██║   ██║   ██║  ██║    ██║╚██╔╝██║██║   ██║██║  ██║"));
    console.log(info("                                               ██║  ██║██╗██║  ██║██╗██║██╗██████╔╝    ██║ ╚═╝ ██║╚██████╔╝██████╔╝"));
    console.log(info("                                               ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝╚═╝╚═╝╚═════╝     ╚═╝     ╚═╝ ╚═════╝ ╚═════╝"));
    console.log("                                                                          ");
    console.log(info("                                                █████╗  ██████╗████████╗██╗██╗   ██╗ █████╗ ████████╗███████╗██████╗"));
    console.log(info("                                               ██╔══██╗██╔════╝╚══██╔══╝██║██║   ██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗"));
    console.log(info("                                               ███████║██║        ██║   ██║██║   ██║███████║   ██║   █████╗  ██║  ██║"));
    console.log(info("                                               ██╔══██║██║        ██║   ██║╚██╗ ██╔╝██╔══██║   ██║   ██╔══╝  ██║  ██║"));
    console.log(info("                                               ██║  ██║╚██████╗   ██║   ██║ ╚████╔╝ ██║  ██║   ██║   ███████╗██████╔╝"));
    console.log(info("                                               ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝  ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝"));
    console.log("                                                             ");
    console.log(info("                         Bienvenue dans le mod R.A.I.D, c'est ici que sont recensé toutes les commandes relative au RAID de discords."));
    console.log("                                                             ");
  
    console.table(specommands);
  }  

  if(input == "back")
  {
    master = false;
    displayMenu()
  }

  if(input == "conhelp")
  {
    console.clear();
    console.log("                                                             ");
    console.log("                                                             ");
    console.log(info("                                                   ▄▄▄       ██▀███   ██▓▓█████  ██▓        "));
    console.log(info("                                                  ▒████▄    ▓██ ▒ ██▒▓██▒▓█   ▀ ▓██▒        "));
    console.log(info("                                                  ▒██  ▀█▄  ▓██ ░▄█ ▒▒██▒▒███   ▒██░        "));
    console.log(info("                                                  ░██▄▄▄▄██ ▒██▀▀█▄  ░██░▒▓█  ▄ ▒██░        "));
    console.log(info("                                                   ▓█   ▓██▒░██▓ ▒██▒░██░░▒████▒░██████▒    "));
    console.log(info("                                                   ▒▒   ▓▒█░░ ▒▓ ░▒▓░░▓  ░░ ▒░ ░░ ▒░▓  ░    "));
    console.log(info("                                                    ▒   ▒▒ ░  ░▒ ░ ▒░ ▒ ░ ░ ░  ░░ ░ ▒  ░    "));
    console.log(info("                                                    ░   ▒     ░░   ░  ▒ ░   ░     ░ ░       "));
    console.log(info("                                                        ░  ░   ░      ░     ░  ░    ░  ░    "));
    console.log("                                                             ");
    console.log(info("                                                  ARIEL-1 VERSION -> ") + version);
    console.log("                                                             ");
    console.log(info("                                                  Prefix -> ") + prefix);
    console.log("                                                             ");
    console.log(info("                                                  Invitation -> ") + link);
    console.log("                                                             ");
    console.log(info("                                                  Github -> ") + github);
    console.log("                                                             ");
    console.log(info("                                     Serveurs -> ") + c.guilds.size + info("    ") + info("Utilisateurs -> ") + c.users.size + info("    ") + info("Compte -> ") + c.user.tag);
    console.log("                                                             ");
    console.log(info("                                     Executez BACK pour revenir à l'espace d'accueil de la console."))
    console.log("                                                             ");

    console.table(concommands);
  }
});

function cpuAverage() {

  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  for(var i = 0, len = cpus.length; i < len; i++) {

    var cpu = cpus[i];

    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    totalIdle += cpu.times.idle;
  }

  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

c.on('ready', () => {
    if(cfg.password !== "0000")
    {
      settuped = true;
    }
    else 
    {
      settuped = false;
    }

    displayMenu()
    // console.png(image);

    const activities_list = 
    [
        "Espionne " +  c.users.size + " utilisateurs.",
        "Faîtes '>help' pour l'aide.", 
        "github.com/Andrei-dot/Ariel-1", 
        "ARI3L 1 - A votre service !"
    ]; 

    setInterval(() =>
    {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        c.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
        c.user.setStatus('dnd') 
    }, 3200);
});

  // Message quand le bot rejoins le serveur

c.on('guildCreate', guild => 
{
  let defaultChannel = "";
  guild.channels.forEach((channel) => 
  {
    if(channel.type == "text" && defaultChannel == "") 
    {
      if(channel.permissionsFor(guild.me).has("SEND_MESSAGES"))
      {
        defaultChannel = channel;
      } 
      else 
      {
        console.log(err("[!]") + normal (" Je n'ai pas pu envoyer de message de bvn sur le serveur : ") + special ( c.guild.name));
      }
  }
})
  defaultChannel.send(`test1`).catch(console.log(err("/!]") + normal (" Je n'ai pas pu envoyer de message de bvn sur le serveur : ") + special ( c.guild.name)));
});

c.on('message', message => 
{
  if(!message.content.startsWith(">")) {
    if (message.isMemberMentioned(c.user)) {
      return message.channel.send("Mon préfix est **>**, si tu as besoin d'aide fait **>help**.");
  }
} 
    var splited_message = message.content.slice(prefix.length).split(" ");
    var parameters = splited_message.slice(1);

    if(message.content.startsWith(prefix + "help")) 
    {
        let helpicon = 'https://image.noelshack.com/fichiers/2021/04/2/1611679748-ariel.jpg'; 

        var help_embed = new Discord.RichEmbed()
        
        .setThumbnail(helpicon)
        .setTitle("ARI3L pour vous servir. \n")
        .addField(":round_pushpin: **>divertissement ↓**", "```Vous donne les commandes pour vous divetir.```", false)
        .addField(":round_pushpin: **>moderation ↓**", "```Vous donne les commandes de modération.```", false)
        .addField(":round_pushpin: **>utilitaires ↓**", "```Vous donne des commandes utiles.```", false)
        .setColor(3553598)
        .setFooter("ARI3L 1 - Pour vous servir.")

        message.channel.send(help_embed).catch(console.error);    
    }

    if(message.content.startsWith(prefix + "divertissement"))
    {
      var div_embed = new Discord.RichEmbed()

      .setTitle("ARI3L - Divertissement")
      .addField(`>hug __<@mention>__`, "```Caline la personne mentionnée.```", false)
      .setFooter("ARI3L 1 - Commandes de divertissement")

      message.channel.send(div_embed).catch(console.error);
    }

    if(message.content.startsWith(prefix + "moderation"))
    {    
      let modicon = 'https://media1.tenor.com/images/d856e0e0055af0d726ed9e472a3e9737/tenor.gif?itemid=8540509';

      var mod_embed = new Discord.RichEmbed()
      .setThumbnail(modicon)
      .setTitle("ARI3L - Modération")
      .addField(`>ban __<@mention>__ "raison"`,"```Bannit l'utilisateur mentionné.\nNécessite la permission 'BAN_MEMBERS'```", true)
      .addField(`>mute __<@mention>__ "raison" <temps>`,"```Mute la personne mentionnée.\nNécessite la permisison 'MANAGE_ROLES'```", false)
      .addField(`>kick __<@mention>__ "raison"`,"```Kick l'utilisateur mentionné.\nNécessite la permission 'KICK_MEMBERS'```", true)
      .addField(`>cls __<nbr>__`,"```Efface le nombre de messages donnés.\nNécessite la permission'MANAGE_MESSAGES'```", false)
      .setFooter("ARI3L 1 - Commandes de modération")

      message.channel.send(mod_embed).catch(console.error);
    }

    if(message.content.startsWith(prefix + "utilitaires"))
    {
      var utils_embed = new Discord.RichEmbed()

      .setTitle("ARI3L - Utilitaires")
      .addField(`>pp __<@mention>__`, "```Vous donne la photo de profil de l'utilisateur```", false)
      .addField(`>servericon`, "```Vous donne l'icon du serveur (sauf s'il n'en a pas)```", false)
      .addField(`>serverinfo`, "```Vous donne toutes les informations du serveur```", false)
      .addField(`>userinfo __<@mention>__ (ou pas)`, "```Vous donne les infos de l'utilisateur mentionné, si pas de mention vous donne vos infos.```", false)
      .addField(`>botinfo`, "```Vous donne toutes les informations à propos du bot.```", false)
      .addField(`>roll`, "```Vous donne un chiffre aléatoire entre 0 et 100.```",false)
      .setFooter("ARI3L 1 - Commandes utiles")

      message.channel.send(utils_embed).catch(console.error);
    }

    /*
     *
     * Modération >> Ban , Kick , Mute & Clear cmd 
     * 
     */

    // Bannir quelqu'un

    if(message.content.startsWith(prefix + "ban"))
    {
      message.delete();
        if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) {
          var ban_embed = new Discord.RichEmbed()  

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "Vous n'avez pas la permission d'utiliser cette commande.", false)
          .addField("PERM :red_circle:", "Cette commande nécessite l'autorisation suivante : `KICK_MEMBERS`", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  

          return message.channel.send(ban_embed).catch(console.error);
        }

            const args = message.content.slice(prefix.length).trim().split(' ');
            let raison = args.slice(2).join(" ");
            const user = message.mentions.users.first();

            if(!raison)
            {
              var ban_embed1 = new Discord.RichEmbed()

              .setTitle("**ARI3L**")
              .addField("ERR0R 404 :no_entry:", "Vous n'avez pas fournit de raison pour la mise en orbite !", false)
              .setFooter("Demandé par " + message.author.username, message.author.avatarURL)

              return message.channel.send(ban_embed1).catch(console.error); 
            }

            if (user) 
            {
              const member = message.guild.member(user);
            if (member) 
            {
              member.ban
              ({
                reason: 'ARI3Logs => Banissement -> Raison : ' + raison,
              }).then(() => 
              {
                var ban_message = new Discord.RichEmbed()

                .setTitle("**ARI3L**")
                .addField("__ACCES AUTORISÉ__", `:white_check_mark: => __**<@${user.id}>**__ ne reviendra plus. Il est actuellement en orbite autour d'une autre planète.`, false)
                .setFooter("Demandé par " + message.author.username,message.author.avatarURL)
                
                message.channel.send(ban_message).catch(console.error);

              }).catch(err => 
              {

                var ban_embed2 = new Discord.RichEmbed()

                .setTitle("**ARI3L - ERR0R :no_entry:**")
                .addField("Fatal Error => ARI3L a rencontré un bug.", "=> Contactez le support pour reporter ce bug.", false)
                .setFooter("Demandé par " + message.author.username, message.author.avatarURL)

                message.channel.send(ban_embed2).catch(console.err);
              });
            } 
            else 
            {

              var ban_embed3 = new Discord.RichEmbed()

              .setTitle("**ARI3L**")
              .addField("ERR0R 404 :no_entry:", "Je ne trouve personne nommé ainsi.", false)
              .setFooter("Demandé par" + message.author.username, message.author.avatarURL)

              message.channel.send(ban_embed3).catch(console.err);
            }
            } 
            else 
            {

            var ban_embed4 = new Discord.RichEmbed()

            .setTitle("**ARI3L**")
            .addField("ERR0R 404 :no_entry:", "Tu ne vise personne !", false)
            .setFooter("Demandé par " + message.author.username,message.author.avatarURL)

            message.channel.send(ban_embed4).catch(console.error);
            }
        }

    // Kick quelqu'un

    if(message.content.startsWith(prefix + "kick"))
    {
      message.delete();
        if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) 
        {
           var kick_embed = new Discord.RichEmbed()

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "Vous n'avez pas la permission d'utiliser cette commande.", false)
          .addField("PERM :red_circle:", "Cette commande nécessite l'autorisation suivante : `KICK_MEMBERS`", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  

          message.channel.send(kick_embed).catch(console.error);
        }  
          const user = message.mentions.users.first();
          const member = message.guild.member(user);
          const args = message.content.slice(prefix.length).trim().split(' ');
          let raison = args.slice(2).join(" ");
            if (user) {
              if (member) {
                member.kick('ARI3Logs => Ejecté -> Raison : ' + raison).then(() => {
                  var kick_embed1 = new Discord.RichEmbed()

                  .setTitle("**ARI3L**")
                  .addField("__ACCES AUTORISÉ__", `:white_check_mark: => __**<@${user.id}>**__ ne reviendra plus. Il est actuellement en orbite autour d'une autre planète.`, false)
                  .setFooter("Demandé par " + message.author.username,message.author.avatarURL)
                
                  message.channel.send(kick_embed1).catch(console.error);
                }).catch(err => {
                  var kick_embed2 = new Discord.RichEmbed()
                  
                  .setTitle("**ARI3L**")
                  .addField("ERR0R 404 :no_entry:", "Tu ne vise personne !", false)
                  .setFooter("Demandé par " + message.author.username,message.author.avatarURL)

                  message.channel.send(kick_embed2).catch(console.err);
                });
              } else {
                var kick_embed3 = new Discord.RichEmbed()

                .setTitle("**ARI3L**")
                .addField("ERR0R 404 :no_entry:", "Je ne trouve personne nommé ainsi.", false)
                .setFooter("Demandé par" + message.author.username, message.author.avatarURL)

                message.channel.send(kick_embed3).catch(console.error);
                }
            } else {
              var kick_embed4 = new Discord.RichEmbed()

              .setTitle("**ARI3L**")
              .addField("ERR0R 404 :no_entry:", "Tu ne vise personne !", false)
              .setFooter("Demandé par " + message.author.username,message.author.avatarURL)
              
              message.channel.send(kick_embed4).catch(console.error);
            }
          }

    // Mute quelqu'un
    
    if(message.content.startsWith(prefix + "mute"))
    {
      const args = message.content.slice(prefix.length).trim().split(' ');
      const user = message.mentions.users.first();
      const member = message.guild.member(person);
      var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

      let muterole = message.guild.roles.find(role => role.name === "Muet");
      let reason = args[3];
      let time = args[2];
      if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES'))
      {
        var mute_embed = new Discord.RichEmbed()

        .setTitle("**ARI3L**")
        .addField("ERR0R 404 :no_entry:", "Vous n'avez pas la permission d'utiliser cette commande.", false)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  

        message.channel.send(mute_embed).catch(console.error);
      } else {
        if(!person)
        {
          var user_embed = new Discord.RichEmbed()

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "Vous n'avez mentionné personne.", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  
  
          message.channel.send(user_embed).catch(console.error);  
        } else {
          if(!time)
          {
            return message.channel.send("Tu n'as pas spécifié le temps!")
          } else {
            person.addRole(muterole.id);
            return message.channel.send(`<@${user.id}> a été rendu muet pour une durée de ${ms(ms(time))}`);
          }
        }
      } 
      setTimeout(function()
      {
        person.removeRole(muterole.id);
        message.channel.send(`démute`);
      }, ms(time));
    }

    // Un-mute quelqu'un

    if(message.content.startsWith(prefix + "unmute"))
    {
      const args = message.content.slice(prefix.length).trim().split(' ');
      var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
      let muterole = message.guild.roles.find(role => role.name === "Muet");

      if(person) 
      {
        if(person.roles.find(role => role.name === "Muet")) 
        {
          person.removeRole(muterole.id);

          var unmute_embed2 = new Discord.RichEmbed()

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "La personne mentionnée a été démute.", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  
  
          message.channel.send(unmute_embed2).catch(console.error);
        } else {
          var unmute_embed1 = new Discord.RichEmbed()

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "La personne mentionnée n'est pas mute.", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  
  
          message.channel.send(unmute_embed1).catch(console.error);  
        }
      } 
      if (!args[1])
      {
        if(!person)
        {
          var unmute_embed1 = new Discord.RichEmbed()

          .setTitle("**ARI3L**")
          .addField("ERR0R 404 :no_entry:", "La personne mentionnée n'est pas présente.", false)
          .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  
  
          message.channel.send(unmute_embed1).catch(console.error);  
        }

        return message.channel.send("tu n'a mentionné personne");
      } 
    }

    // Clear les messages

    if(message.content.startsWith(prefix + "cls"))
    {
      if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES'))
      {
        var cls_embed = new Discord.RichEmbed()

        .setTitle("**ARI3L**")
        .addField("ERR0R 404 :no_entry:", "Vous n'avez pas la permission d'utiliser cette commande.", false)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  

        message.channel.send(cls_embed).catch(console.error);
      }
      const args = message.content.slice(prefix.length).trim().split(' ');
      let nbr = args.slice(1).join(" ");
      if(!nbr)
      {
        var cls_embed1 = new Discord.RichEmbed()

        .setTitle("**ARI3L**")
        .addField("ERR0R 404 :no_entry:", "Tu n'a pas précisé le nombre de messages à supprimer.", false)
        .setFooter("Demandé par " + message.author.username,message.author.avatarURL)

        message.channel.send(cls_embed1).catch(console.error);
      }
      
      var channel = message.channel;
      channel.bulkDelete(nbr);
    
      message.channel.send("🔄 **Effacement des messages...**").then(sentMessage => { sentMessage.edit("✔️ **Messages effacés.**")})
    }    

    /*
     *
     *  Utilitaires >> pp,userinfo,botinfo,serverinfo
     * 
     */

    // Get les infos du serveur

    if(message.content.startsWith(prefix + "serverinfo"))
    {
      message.delete();

        let nocon = message.guild.iconURL;
        var date = message.guild.createdAt;
        let serverinfo_embed = new Discord.RichEmbed()

        .setTitle("𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗱𝘂 𝘀𝗲𝗿𝘃𝗲𝘂𝗿")
        .setThumbnail(nocon)
        .addField("`Nom du serveur ↓ `", message.guild.name, true)
        .addField("`Createur du Serveur ¬`", message.guild.owner, true)
        .addField("`Serveur créé le ¬`", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes(), true)
        .addField("`Utilisateurs ¬`", message.guild.memberCount, true)
        .addField("`Région ¬`", "Europe de l'ouest", true)
        .addField("`Nombre de channel ¬`", message.guild.channels.size, true)
        .addField("`Nombre d'emoji ¬`", message.guild.emojis.size, true)
        .addField("`Level de vérification ¬`", message.guild.verificationLevel, true)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)

        message.channel.send(serverinfo_embed).catch(console.error);
    }

    // Get les infos de l'utilisateur mentionné

    if(message.content.startsWith(prefix + "userinfo"))
    {
      message.delete();
          var member = message.author;
          if (parameters.length > 0) {
            let member_got = message.guild.member(message.mentions.users.first() || message.guild.members.get(parameters[0]));
            if (member_got != undefined) {
              var member = member_got.user
            }
          };  
          var champ_additions = [];
          var champ_permissions = [];
          var date = member.createdAt;
          if (member.presence.status === "online") {
            var statut = "Connecté"
          }
          if (member.presence.status === "dnd") {
            var statut = "Ne pas déranger"
          }
          if (member.presence.status === "offline") {
            var statut = "Déconnecté"
          }
          else if (member.presence.status === "idle") {
            var statut = "Inactif"
          }
           
          if(member.id === "502859175445921800") 
          {
            var devinfo_embed = new Discord.RichEmbed()

            .setFooter("Demandé par " + message.author.username, message.author.avatarURL)
            .setThumbnail(member.displayAvatarURL)
            .setAuthor(member.username, member.avatarURL)
            .addField("Pseudo ¬", member.username, true)
            .addField("Creation du compte ¬", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes(), true)
            .addField("Identification ¬", ":hammer: Admin du bot", true)
            .addField("Discriminateur ¬", member.discriminator, true)
            .addField("Statut ¬", statut, true);

            message.channel.send(devinfo_embed).catch(console.error);
          } else if(member.id === "759375440644669481") 
          { 
            var botuserinfo_embed = new Discord.RichEmbed()

            .setFooter("Demandé par " + message.author.username, message.author.avatarURL)
            .setThumbnail(member.displayAvatarURL)
            .setAuthor(member.username, member.avatarURL)
            .addField("Pseudo ¬", member.username, true)
            .addField("Creation du compte ¬", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes(), true)
            .addField("Identification ¬", ":hammer: C'est moi :)", true)
            .addField("Discriminateur ¬", member.discriminator, true)
            .addField("Statut ¬", statut, true);

            message.channel.send(botuserinfo_embed).catch(console.error);
          } else {
            var userinfo_embed = new Discord.RichEmbed()
  
            .setFooter("Demandé par " + message.author.username, message.author.avatarURL)
            .setThumbnail(member.displayAvatarURL)
            .setAuthor(member.username, member.avatarURL)
            .addField("Pseudo ¬", member.username, true)
            .addField("Creation du compte ¬", date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes(), true)
            .addField("Identification ¬", member.id, true)
            .addField("Discriminateur ¬", member.discriminator, true)
            .addField("Statut ¬", statut, true);
            
            message.channel.send(userinfo_embed).catch(console.error);
            }
        }

      // Roll the dice :)

      if(message.content.startsWith(prefix + "roll"))
      {
        var result = Math.floor((Math.random() * 100) + 1);
        var roll_embed = new Discord.RichEmbed()
  
          .setAuthor("ARI3L Roll", c.user.avatarURL)
          .addField("Ton roll est de : ", + result)
        message.channel.send(roll_embed).catch(console.error);
      }

      // Get l'icon du serveur

      if(message.content.startsWith(prefix + "servericon"))
      {
        message.delete()

        let servcon = message.guild.iconURL;
        var servericon_embed = new Discord.RichEmbed()
        
        .setTitle("𝗜𝗰𝗼𝗻 𝗱𝘂 𝘀𝗲𝗿𝘃𝗲𝘂𝗿")
        .setColor("#168856")
        .setImage(servcon)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)
    
        message.channel.send(servericon_embed).catch(console.error);
      }

      // Get les informations du bot

      if(message.content.startsWith(prefix + "botinfo"))
      {
        message.delete()

        let leel = 'https://media.tenor.com/images/142e440a6a21666a3491ba113f479630/tenor.gif';
  
        var botinfo_embed = new Discord.RichEmbed()
  
        .setAuthor("Ariel-1", c.user.avatarURL)
        .addField("**En savoir plus :**", "Je suis ARIEL-1, une IA à l'interieur d'un satellite", false)
        .addField("**Lien**", "https://bit.ly/3cyniI5", true)
        .addField("**Programmé par**", "**github.com/Andrei-dot** ou **andreikalachnik@gmail.com**", false)
        .addField("**Fonctionne grace à**", "npm 5.6.0", true)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)
          
        message.channel.send(botinfo_embed).catch(console.error);
      }    
    
    // Get la pp d'un utilisateur

    if(message.content.startsWith(prefix + "pp"))
    {
        message.delete();
          var member = message.author;
          if (parameters.length > 0) {
            let member_got = message.guild.member(message.mentions.users.first() || message.guild.members.get(parameters[0]));
            if (member_got != undefined) {
              var member = member_got.user
            }
          };

          message.channel.send({
            embed: {
              color: 3553598,
              author: {
                name: c.user.username,
                icon_url: c.user.avatarURL
              },
              title: "**Photo de profil**",
              url: member.avatarURL,
              image: {
                url: member.avatarURL
              },

              footer: {
                icon_url: message.author.avatarURL,
                text: "demandé par " + message.author.username + ""
              }
            }
          });
        }

        // Master cmd

        if(message.content.startsWith(prefix + "mastercmd"))
        {
          if(!message.author.id === "502859175445921800")
          {
            return message.channel.send(":no_entry: No");
          }
          else {
            var mastercmd_embed = new Discord.RichEmbed()


            .setTitle("MASTERCMD - Only Dev")
            .addField("`>quit`", "```Fait quitter le bot du serveur en question.```", true)
            .setFooter(message.author.username, c.user.avatarURL)

            message.author.send(mastercmd_embed).catch(console.error);
          }
        }

        if(message.content.startsWith(prefix + "quit"))
        {
          if(!message.author.id === "502859175445921800")
          {
            return message.channel.send(":no_entry: No");
          }
          else {
            message.channel.send("Je m'en vais !")
            console.log(info("[-INFO-]") + normal (" J'ai quitté le serveur : ") + spaecial (message.guild.name))
            message.guild.leave()
          }
        }
});

c.login(settings.token);