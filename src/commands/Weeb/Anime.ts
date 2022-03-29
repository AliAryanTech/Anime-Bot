/**
 * /*eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/*eslint-disable @typescript-eslint/no-unused-vars*/
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import request from "../../lib/request";
import { MessageType } from "@adiwajshing/baileys";
import { Anime } from "@shineiichijo/marika";
export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "anime",
      description: `Gives you the data of the given anime from MyAnimeList.`,
      aliases: ["ani", "a"],
      category: "weeb",
      usage: `${client.config.prefix}anime [title]`,
      baseXp: 50,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    if (!joined) return void M.reply("Provide the anime to search, Baka!");
    const client = new Anime();
    let anime;
    try {
      anime = await client.searchAnime(joined.trim());
    } catch (error) {
      return void M.reply("Couldn't find any anime");
    }
    let text = "";
    const result = anime.data[0];
    text += `🟡 *Title: ${result.title}*\n`;
    text += `🟡 *Format: ${result.type}*\n`;
    text += `🟡 *Status: ${result.status.toUpperCase().replace(/\_/g, " ")}*\n`;
    text += `🟡 *Total episodes: ${result.episodes}*\n`;
    text += `🟡 *Duration: ${result.duration}*\n`;
    text += `🟡 *Genres:*\n`;
    for (let i = 0; i < result.genres.length; i++) {
      text += `\t\t\t\t\t\t\t\t*${result.genres[i].name}*\n`;
    }
    text += `🟡 *Based on: ${result.source.toUpperCase()}*\n`;
    text += `🟡 *Studios:*\n`;
    for (let i = 0; i < result.studios.length; i++) {
      text += `\t\t\t\t\t\t\t\t*${result.studios[i].name}*\n`;
    }
    text += `🟡 *Producers:*\n`;
    for (let i = 0; i < result.producers.length; i++) {
      text += `\t\t\t\t\t\t\t\t\t\t*${result.producers[i].name}*\n`;
    }
    text += `🟡 *Premiered on: ${result.aired.from}*\n`;
    text += `🟡 *Ended on: ${result.aired.to}*\n`;
    text += `🟡 *Popularity: ${result.popularity}*\n`;
    text += `🟡 *Favorites: ${result.favorites}*\n`;
    text += `🟡 *Rating: ${result.rating}*\n`;
    text += `🟡 *Rank: ${result.rank}*\n\n`;
    if (result.trailer.url !== null)
      text += `🟡 *Trailer: ${result.trailer.url}*\n\n`;
    text += `🌐 *URL: ${result.url}*\n\n`;
    if (result.background !== null)
      text += `🟡 *Background:* ${result.background}*\n\n`;
    text += `🟡 *Description:* ${result.synopsis.replace(
      /\[Written by MAL Rewrite]/g,
      ""
    )}`;
    const buffer = await request.buffer(result.images.jpg.large_image_url);
    return void M.reply(buffer, MessageType.image, undefined, undefined, text);
  };
}
