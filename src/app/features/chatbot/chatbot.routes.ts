import { Routes } from '@angular/router';
import { ChatContainer } from './components/chat-container/chat-container';

export const CHATBOT_ROUTES: Routes = [
  {
    path: '',
    component: ChatContainer
  }
];