function BotInfo(message_obj) {
    var CPUUage;

  var os = require("os");

  //Create function to get CPU information
  function cpuAverage() {

    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();

    //Loop through CPU cores
    for(var i = 0, len = cpus.length; i < len; i++) {

      //Select CPU core
      var cpu = cpus[i];

      //Total up the time in the cores tick
      for(type in cpu.times) {
        totalTick += cpu.times[type];
     }     

      //Total up the idle time of the core
      totalIdle += cpu.times.idle;
    }

    //Return the average Idle and Tick times
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }

  //Grab first CPU Measure
  var startMeasure = cpuAverage();

  //Set delay for second Measure
  setTimeout(function() { 

    //Grab second Measure
    var endMeasure = cpuAverage(); 

    //Calculate the difference in idle and total time between the measures
    var idleDifference = endMeasure.idle - startMeasure.idle;
    var totalDifference = endMeasure.total - startMeasure.total;

    //Calculate the average percentage CPU usage
    var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    //Output result to console
    CPUUage = percentageCPU

  }, 100);

  // at the top of your file
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const InfoEmbed = new EmbedBuilder()
	.setColor(0x087208)
	.setTitle('Bot information')
	.setURL('https://docs.google.com/document/d/18FJ45JHkBosmiVvvwDq6o5RXK1A3qyZqLJXbWhj9Hgs/edit?usp=sharing')
	.setAuthor({ name: 'RHHS Music Terminal', iconURL: 'https://cdn.discordapp.com/icons/951535930320244778/56706ed914edbb753a38ca8d6dcf2234.webp?size=128', url: 'https://www.rhhsmusic.ca/' })
	.setDescription(' ')
	.setThumbnail('https://cdn.discordapp.com/icons/951535930320244778/56706ed914edbb753a38ca8d6dcf2234.webp?size=128')
	.addFields(
		{ name: 'Info', value: 'This is a bot system created with discord.js API, by RHHS MusCo Tech' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Commands: ', value: "https://docs.google.com/document/d/18FJ45JHkBosmiVvvwDq6o5RXK1A3qyZqLJXbWhj9Hgs/edit?usp=sharing", inline: true },
		
	)
	.addFields({ name: 'CPU Usage: ', value: String(CPUUage) + "%", inline: true })
	//.setImage('https://cdn.discordapp.com/icons/996603879301058580/7e3042a5d288a41945df49aecdb8ece2.webp?size=128')
	.setTimestamp()
	.setFooter({ text: 'RHHS Music Council 2023-2024 (Dev: Fangda)', iconURL: 'https://docs.google.com/document/d/18FJ45JHkBosmiVvvwDq6o5RXK1A3qyZqLJXbWhj9Hgs/edit?usp=sharing' });


    message_obj.reply({ embeds: [InfoEmbed] });
}

module.exports = BotInfo;