//      - Requirements & Vars -         //

const Discord = require('discord.js');

const c = new Discord.Client();
const Client = new Discord.Client();

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment');
const ms = require('ms');

const settings = require('./settings.json');
const { S_IFMT, SSL_OP_TLS_BLOCK_PADDING_BUG } = require('constants');

const ytdl = require('ytdl-core');
const queue = new Map();

var prefix = (">");

// - Console - //

    // Custom Chalks

const special = chalk.underline.red;            // Utilisation : console.log(special('Special'));
const normal = chalk.bold.white;               // Utilisation : console.log(normal('Normal'));
const info = chalk.bold.green;                // Utilisation : console.log(info('Info'));
const err = chalk.bold.red;                  // Utilisation : console.log(err('Erreur'));

    // Logs

c.once('reconnecting', () => {
  console.log(info("[-INFO-]") + normal(' Reconnecting!'));
});
c.once('disconnect', () => {
  console.log(info("[-INFO-]") + normal(' Disconnect!'));
});

c.on('ready', () => {
    console.log(info("[-INFO-]") + normal (" Connecté sur le compte : ") + special (c.user.tag))

    console.log(info("[-INFO-]") + normal (" Prefix : ") + special (prefix))
    
    console.log(info("[-INFO-]") + normal (" Sur : ") + special (c.guilds.size) + normal (" serveurs."))
    
    console.log(info("[-INFO-]") + normal (" Et je vois : ") + special(c.users.size ) + normal (" personnes."))
    
    console.log(info("[-INFO-]") + normal (" Lien : ") + special ( "https://bit.ly/3cyniI5"));

    const activities_list = [
        "Espionne " +  c.users.size + " utilisateurs.",
        "Faîtes '>help' pour l'aide.", 
        "github.com/Andrei-dot/Ariel-1", 
        "ARI3L 1 - A votre service !"
    ]; 

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        c.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
        c.user.setStatus('dnd') }, 3200);
});

c.on('message', message => 
{
    var splited_message = message.content.slice(prefix.length).split(" ");
    var parameters = splited_message.slice(1)

    if(message.content.startsWith(prefix + "help")) {
        let helpicon = 'https://upload.wikimedia.org/wikipedia/commons/5/57/Ariel_1.jpg'; 

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

            if (user) {
              const member = message.guild.member(user);
            if (member) {
              member.ban({
                reason: 'ARI3Logs => Banissement -> Raison : ' + raison,
              }).then(() => {
                var ban_message = new Discord.RichEmbed()

                .setTitle("**ARI3L**")
                .addField("ACCES AUTORISE", `:white_check_mark: - ${user.tag} ne reviendra plus. Il est actuellement en orbite autour d'une autre planète.`, false)
                .setFooter("Demandé par " + message.author.username,message.author.avatarURL)
                
                message.channel.send(ban_message).catch(console.error);

              }).catch(err => {

                var ban_embed2 = new Discord.RichEmbed()

                .setTitle("**ARI3L - ERR0R :no_entry:**")
                .addField("Fatal Error => ARI3L a rencontré un bug.", "=> Contactez le support pour reporter ce bug.", false)
                .setFooter("Demandé par " + message.author.username, message.author.avatarURL)

                message.channel.send(ban_embed2).catch(console.err);
              });
            } else {

              var ban_embed3 = new Discord.RichEmbed()

              .setTitle("**ARI3L**")
              .addField("ERR0R 404 :no_entry:", "Je ne trouve personne nommé ainsi.", false)
              .setFooter("Demandé par" + message.author.username, message.author.avatarURL)

              message.channel.send(ban_embed3).catch(console.err);
            }
          } else {

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
                  .addField("ACCES AUTORISE", `:white_check_mark: - ${user.tag} ne reviendra plus. Il est actuellement en orbite autour d'une autre planète.`, false)
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
    }    

    // Mute quelqu'un

    if(message.content.startsWith(prefix + "mute"))
    {
      if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES'))
      {
        var mute_embed = new Discord.RichEmbed()

        .setTitle("**ARI3L**")
        .addField("ERR0R 404 :no_entry:", "Vous n'avez pas la permission d'utiliser cette commande.", false)
        .setFooter("Demandé par " + message.author.username, message.author.avatarURL)  

        message.channel.send(mute_embed).catch(console.error);
      }

      let user = message.mentions.members.first();
      if(!user)
      {

      }
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
            console.log(info("[-INFO-]") + normal (" J'ai quitté le serveur : ") + special (message.guild.name))
            message.guild.leave()
          }
        }
});

c.login(settings.token);