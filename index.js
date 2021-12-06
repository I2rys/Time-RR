//Dependencies
const Discord = require("discord.js")

//Variables
const Bot = new Discord.Client()

var Self = {
    access: [],
    discord_token: ""
}

//Main
Bot.on("ready", ()=>{
    Bot.user.setActivity("T!remove <user> <role> <time(second)> | Time RR")
    console.log("Time RR is running.")
})

Bot.on("message", (message)=>{
    if(!message.guild){
        return
    }

    if(Self.access.indexOf(parseInt(message.author.id)) == -1){
        return
    }

    const message_args = message.content.split(" ")

    if(message_args[0] === "T!remove"){
        const mentioned_member = message.mentions.members.first()
        var mentioned_role = message.mentions.roles.first()

        if(!message_args[3]){
            message.channel.send("Please specify a time to remove the role from the user.")
            return
        }

        if(isNaN(message_args[3])){
            message.channel.send("Make sure the time is Int.")
            return
        }

        if(!mentioned_member.roles.cache.find(role => role.id === mentioned_role.id)){
            message.reply("The role does not exist in the user.")
            return
        }
        
        message.channel.send(`<@${mentioned_member.id}>, ${mentioned_role.name} role will be removed in ${message_args[3]} seconds.`)
        setTimeout(function(){
            try{
                role = message.guild.roles.cache.find(role => role.id === mentioned_role.id)

                mentioned_member.roles.remove(role).then(()=>{
                    message.channel.send(`<@${mentioned_member.id}>, ${mentioned_role.name} role has been removed.`)
                }).catch(()=>{
                    message.channel.send(`Unable to remove role ${mentioned_role.name} from <@${mentioned_member.id}> due to low permission/the role is not in the user.`)
                })
            }catch{
                message.channel.send(`Something went wrong while removing role ${mentioned_role.name} from <@${mentioned_member.id}>, please make sure you mentioned a member, role & added a time(second).`)
            }
        }, message_args[3] * 1000)
    }
})

Bot.login(Self.discord_token)
