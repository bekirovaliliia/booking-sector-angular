import { Token } from 'src/app/shared/models/token';

export class ChannelMessage {
  command: 'cleanStorage' | 'getStorage' | 'shareStorage';
  token: Token;
}