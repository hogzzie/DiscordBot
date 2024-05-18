const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
  console.log('Bot is online!');
});

const GUILD_ID = process.env.GUILD_ID;

app.use(cors());
app.use(bodyParser.json());

app.get('/view-members', async (req, res) => {
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) {
    return res.status(404).json({ message: 'Guild not found.' });
  }
  const members = await guild.members.fetch();
  res.json(members.map((member) => ({ id: member.id, username: member.user.username })));
});

app.post('/ban-member', async (req, res) => {
  const { memberId } = req.body;
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) {
    return res.status(404).json({ message: 'Guild not found.' });
  }
  const member = guild.members.cache.get(memberId);
  if (member) {
    await member.ban();
    res.json({ message: `Member ${memberId} banned successfully.` });
  } else {
    res.status(404).json({ message: 'Member not found.' });
  }
});

app.post('/mute-member', async (req, res) => {
  const { memberId } = req.body;
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) {
    return res.status(404).json({ message: 'Guild not found.' });
  }
  const member = guild.members.cache.get(memberId);
  if (member) {
    await member.voice.setMute(true);
    res.json({ message: `Member ${memberId} muted successfully.` });
  } else {
    res.status(404).json({ message: 'Member not found.' });
  }
});

app.post('/write-announcement', (req, res) => {
  const { announcement } = req.body;
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) {
    return res.status(404).json({ message: 'Guild not found.' });
  }
  const channel = guild.channels.cache.find((ch) => ch.name === 'announcements');
  if (channel) {
    channel.send(announcement);
    res.json({ message: 'Announcement sent successfully.' });
  } else {
    res.status(404).json({ message: 'Announcement channel not found.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
