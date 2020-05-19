var markdown = `# discord-ytdl-core
Simple ytdl wrapper for discord bots with custom ffmpeg args support.

\`\`\`sh
npm i discord-ytdl-core
\`\`\`

[https://www.npmjs.com/package/discord-ytdl-core](https://www.npmjs.com/package/discord-ytdl-core)

> Please install an Opus engine & FFmpeg before using this package.

## **Supported Opus Engines:**
- **[@discordjs/opus](https://npmjs.com/package/@discordjs/opus)** - Best performance
- **[node-opus](https://npmjs.com/package/node-opus)** - Deprecated
- **[opusscript](https://npmjs.com/package/opusscript)**

# Options
This package provides 2 extra options excluding ytdl-core options.
They are: \`seek\` & \`encoderArgs\`.
- seek: This parameter takes the time in seconds. 
If this option is provided, it will return the stream from that frame.
Seek option is provided here because discord.js seek doesn't work for \`ogg/opus\` & \`webm/opus\` stream.
This option is ignored when the supplied parameter type isn't a number. Time should be provided in seconds.
**Example:**

\`\`\`js
let url = "https://www.youtube.com/watch?v=2lNT6AcKYl8";
let stream = ytdl(url, { seek: 10 }); // seek to 10s
VoiceConnection.play(stream, { type: "opus" });

\`\`\`

- encoderArgs: This parameter takes the Array of FFmpeg arguments.
Invalid args will throw error and crash the process.
This option is ignored when the supplied parameter type isn't array. Invalid FFmpeg args might crash the process.
**Example:**

\`\`\`js
let url = "https://www.youtube.com/watch?v=2lNT6AcKYl8";
let stream = ytdl(url, { encoderArgs: ["-af", "bass=g=10"] }); // increase the bass
VoiceConnection.play(stream, { type: "opus" });

\`\`\`

- Other options are the options for **[ytdl-core](https://npmjs.com/package/ytdl-core)**.
**Example:**

\`\`\`js
let url = "https://www.youtube.com/watch?v=2lNT6AcKYl8";
let stream = ytdl(url, { filter: "audioonly", quality: "highestaudio" }); // seek to 10s
VoiceConnection.play(stream, { type: "opus" });

\`\`\`

# Example

\`\`\`js
const ytdl = require("discord-ytdl-core");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log("ready")
});

client.on("message", msg => {
    if (msg.author.bot || !msg.guild) return;
    if (msg.content === "??play") {
        if (!msg.member.voice.channel) return msg.channel.send("You're not in a voice channel?");
        let stream = ytdl("https://youtube.com/watch?v=ERu6jh_1gR0", {
            filter: "audioonly",
            encoderArgs: ['-af', 'equalizer=f=40:width_type=h:width=50:g=10'] // FFmpeg args array (optional)
        });
        
        msg.member.voice.channel.join()
        .then(connection => {
            connection.play(stream, {
                type: "opus" // type: opus is compulsory because this package returns opus stream
            })
            .on("finish", () => {
                msg.guild.me.voice.channel.leave();
            })
        });
    }
});

client.login("TOKEN");
\`\`\`

# Updating the filters of current stream
It can be done by using \`seek\` method & \`Dispatcher.streamTime\` of discord.js. You have to re-play the track with new filters and providing the time in seek option. This may cause delay but it will work. We are working to solve this problem in the future.

# Example Bots
- **[P74Y](https://github.com/Snowflake107/P74Y)**

# Other functions
This package can do all the functions of normal **[ytdl-core](https://npmjs.com/package/ytdl-core)**.

# Related
- **[ytdl-core-discord](https://npmjs.com/package/ytdl-core-discord)**
- **[discord-player](https://npmjs.com/discord-player)**

# Developers
- **[@Snowflake107](https://github.com/Snowflake107)** - Initial (JS)
- **[@Androz2091](https://github.com/Androz2091)** - Rewrite (TS)

# Join our Official Discord Server
- **[Snowflake Development ❄️](https://discord.gg/uqB8kxh)**
- **[AndrozDev](https://discord.gg/Qreejcu)**
`;
/*
showdown.extension('highlight', => {
  return [{
    type: "output",
    filter: (text, converter, options) => {
      var left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
      var replacement = (wholeMatch, match, left, right) => {
      	var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
        left = left.slice(0, 18) + 'hljs ' + left.slice(18);
        if (lang && hljs.getLanguage(lang)) {
          return left + hljs.highlight(lang, match).value + right;
        } else {
          return left + hljs.highlightAuto(match).value + right;
        }
      };
      return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
    }
  }];
});
*/
var converter = new showdown.Converter(/*{ extensions: ["highlight"] }*/);
var html = converter.makeHtml(markdown);
document.getElementById("data").innerHTML = html;
