import { Token } from 'src/app/shared/models/Token';

export class ChannelMessage {
  command: 'cleanStorage' | 'getStorage' | 'shareStorage';
  token: Token;
}