import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage, IUser } from "../../typings";
import ordinal from "ordinal";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "leaderboard",
      description: "Shows the leaderboard",
      aliases: ["lb"],
      category: "general",
      usage: `${client.config.prefix}lb | ${client.config.prefix}lb --group`,
      baseXp: 10,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined, flags }: IParsedArgs
  ): Promise<void> => {
    flags.forEach((flag) => (joined = joined.replace(flag, "")));
    let text = "";
    const users = [];
    if (flags.includes("--group")) {
      text += "🔵 *GROUP LEADERBOARD* 🔵";
      const members = await (
        await this.client.groupMetadata(M.from)
      ).participants;
      for (let i = 0; i < members.length; i++) {
        const User = await this.client.getUser(members[i].jid);
        users.push(User);
      }
    } else {
      text += "🔵 *LEADERBOARD* 🔵";
      const Users = await this.client.DB.user.find();
      for (let i = 0; i < Users.length; i++) {
        const User = await this.client.getUser(Users[i].jid);
        users.push(User);
      }
    }
    users.sort((a, b) => (a.Xp < b.Xp ? 1 : b.Xp < a.Xp ? -1 : 0));
    const place = users.findIndex((x: IUser) => x.jid === M.sender.jid);
    const placeOrdinal = await ordinal(place + 1);
    if (place < 10) text += `\t*(You are in the ${placeOrdinal} place)*`;
    let n = 10;
    if (users.length < 10) n = users.length;
    for (let i = 0; i < n; i++) {
      text += `\n\n*#${i + 1}*\n`;
      const user = await this.client.getUser(users[i].jid);
      const exp = user.Xp;
      let role: string;
      if (exp < 500) {
        role = "🔵 𝑪𝒊𝒕𝒊𝒛𝒆𝒏";
      } else if (exp < 1000) {
        role = "🔵 𝑪𝒍𝒆𝒓𝒊𝒄";
      } else if (exp < 2000) {
        role = "🔵 𝑾𝒊𝒛𝒂𝒓𝒅";
      } else if (exp < 5000) {
        role = "🔵 𝑴𝒂𝒈𝒆";
      } else if (exp < 10000) {
        role = "🔵 𝑵𝒐𝒃𝒍𝒆";
      } else if (exp < 25000) {
        role = "🔵 𝑬𝒍𝒊𝒕𝒆";
      } else if (exp < 50000) {
        role = "🔵 𝑨𝒄𝒆";
      } else if (exp < 75000) {
        role = "🔵 𝑯𝒆𝒓𝒐";
      } else if (exp < 100000) {
        role = "🔵 𝑺𝒖𝒑𝒓𝒆𝒎𝒆";
      } else {
        role = "🔴 𝑴𝒚𝒔𝒕𝒊𝒄";
      }
      let level: number;
      if (exp < 500) {
        level = 1;
      } else if (exp < 1000) {
        level = 2;
      } else if (exp < 2000) {
        level = 3;
      } else if (exp < 5000) {
        level = 4;
      } else if (exp < 10000) {
        level = 5;
      } else if (exp < 25000) {
        level = 6;
      } else if (exp < 50000) {
        level = 7;
      } else if (exp < 75000) {
        level = 8;
      } else if (exp < 100000) {
        level = 9;
      } else {
        level = 10;
      }
      const q = this.client.getContact(users[i].jid);
      const username = q.notify || q.vname || q.name || "User";
      text += `🔘 *𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${username}*\n🔘 *𝗟𝗲𝘃𝗲𝗹: ${level}*\n🔘 *Exp: ${
        exp || 0
      }*\n🔘 *𝗥𝗼𝗹𝗲: ${role}*`;
    }
    return void M.reply(
      await this.client.getBuffer(
        "https://wallpapermemory.com/uploads/711/chitoge-kirisaki-wallpaper-full-hd-323316.jpg"
      ),
      MessageType.image,
      undefined,
      undefined,
      text
    );
  };
}
