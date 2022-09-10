client.on('message', async (message) => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
  
    const roleName = args.join(' ');
    const roles = await message.guild.roles.fetch();
    const role = roles.cache.find(
      (r) => r.name.toLowerCase() === roleName.toLowerCase(),
    );
    if (!role)
      return message.channel.send(
        `**Error:** ${roleName} is not a valid role on this server`,
      );
    const members = await message.guild.members.fetch();
    const usersWithRole = members.filter((member) =>
      member.roles.cache.has(role.id),
    );
  
    const embed = new Discord.MessageEmbed()
      .setTitle(`Users with ${roleName} role`)
      .setDescription(`${usersWithRole.array().join('\n')}`)
      .setColor('RANDOM')
      .setFooter(
        `${message.author.username}`,
        message.author.avatarURL({ dynamic: true }),
      );
  
    return message.channel.send(embed);
  });