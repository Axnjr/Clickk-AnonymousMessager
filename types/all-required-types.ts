import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

/**
 * {
    id: 'clmo8773i0000w670a2e8vjor',
    name: 'yakshit chhipa',
    email: 'yakshitchhipa@gmail.com',
    emailVerified: null,
    backgroundStyles: 'bg-gradient-to-br from-violet-500 to-cyan-400',
    buttonStyles: '',
    question: 'This, is the fourthchanged this question .......',
    responseType: null,
    extra_param1: '0,0,0,0',
    image: 'https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/46grr.png?alt=media&token=7ed10cc3-b066-46f6-9a54-c8d72c7879d3'
  }

  {
    "id": "clmo8773i0000w670a2e8vjor",
    "name": "yakshit chhipa",
    "email": "yakshitchhipa@gmail.com",
    "emailVerified": null,
    "backgroundStyles": "bg-gradient-to-br from-violet-500 to-cyan-400",
    "buttonStyles": "",
    "question": "This, is the fourthchanged this question .......",
    "responseType": null,
    "extra_param1": "0,0,0,0",
    "image": "https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/46grr.png?alt=media&token=7ed10cc3-b066-46f6-9a54-c8d72c7879d3"
}
 */

export interface userType {
  id : string,
  name : string,
  email?:string,
  emailVerified?:string,
  backgroundStyles:"",
  buttonStyles:""
  question : string,
  responseType?:string,
  extra_param1 : string,
  image : string, 
}

export interface Styles {
  backgroundStyles : string,
  buttonStyles : string
}

export interface UsersUpdatableProps {
  image: string,
	question: string 
}

export interface MessagesType {
  id:string,
  status?:"ok" | "neutral" | "negative" | "positive" | "unchecked" | null,
  timestamp?:string,
  text_message:string | null,
  type?:string,
  voice_message_url?:string | null,
  userId?:string
}

// [key: string]: string -> for all string type