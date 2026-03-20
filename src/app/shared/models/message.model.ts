export enum MessageType {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

export interface BotResponse {
  keywords: string[];
  responses: string[];
}