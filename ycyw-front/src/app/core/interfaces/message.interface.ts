export interface Message {
  id: string;
  content: string;
  sender: string;
}

export interface Chat {
  addresseeName?: string;
  messages?: Message[];
}
