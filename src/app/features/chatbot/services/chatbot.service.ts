import { Injectable, signal, computed } from '@angular/core';
import { ChatMessage, MessageType, BotResponse } from '../../../shared/models/message.model';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messagesSignal = signal<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      type: MessageType.BOT,
      timestamp: new Date()
    }
  ]);

  private isTypingSignal = signal<boolean>(false);

  readonly messages = this.messagesSignal.asReadonly();
  readonly isTyping = this.isTypingSignal.asReadonly();
  readonly messageCount = computed(() => this.messagesSignal().length);

  private readonly responses: BotResponse[] = [
    { 
      keywords: ['hello', 'hi', 'hey', 'greetings'], 
      responses: [
        'Hello! Great to hear from you. What can I assist you with?',
        'Hi there! How can I help you today?',
        'Hey! I\'m here to help. What do you need?'
      ] 
    },
    { 
      keywords: ['help', 'assist'], 
      responses: [
        'I\'m here to help! I can answer questions about features, pricing, support, analytics, and integrations. What would you like to know?',
        'Happy to assist! Ask me about our features, pricing plans, or technical support.'
      ] 
    },
    { 
      keywords: ['pricing', 'price', 'cost', 'plan'], 
      responses: [
        'Our pricing starts at $29/month for Basic, $79/month for Professional, and $199/month for Enterprise. Would you like details on any specific plan?',
        'We have flexible pricing options. Basic ($29), Pro ($79), and Enterprise ($199) per month. Which interests you?'
      ] 
    },
    { 
      keywords: ['feature', 'capability', 'function'], 
      responses: [
        'We offer AI-powered chatbots, advanced analytics dashboards, real-time reporting, and seamless integrations with 50+ tools!',
        'Our platform includes intelligent chatbots, comprehensive analytics, customizable dashboards, and extensive integration options.'
      ] 
    },
    { 
      keywords: ['analytics', 'dashboard', 'report', 'data'], 
      responses: [
        'Our analytics dashboard provides detailed insights with customizable charts, KPI tracking, data export, and real-time updates. Check out the Analytics page!',
        'Analytics features include: interactive charts, KPI cards, data tables with export, and real-time filtering. Navigate to Analytics to see it in action!'
      ] 
    },
    { 
      keywords: ['support', 'customer service', 'contact'], 
      responses: [
        'We offer 24/7 customer support via chat, email, and phone. Our average response time is under 2 minutes!',
        '24/7 support available! Reach us via live chat, email (support@example.com), or phone. We\'re always here to help.'
      ] 
    },
    { 
      keywords: ['demo', 'trial', 'test'], 
      responses: [
        'You\'re experiencing a demo right now! Would you like to explore our Analytics features or learn more about specific capabilities?',
        'This is a working demo! Feel free to explore the chatbot and analytics dashboard. Want a guided tour?'
      ] 
    },
    { 
      keywords: ['integration', 'integrate', 'connect'], 
      responses: [
        'We integrate with 50+ popular tools including Slack, Microsoft Teams, Salesforce, HubSpot, Zendesk, and more. What tool do you need?',
        'Integration support includes: Slack, Teams, Salesforce, HubSpot, Zapier, and many more. Which platform are you using?'
      ] 
    },
    { 
      keywords: ['thank', 'thanks', 'appreciate'], 
      responses: [
        'You\'re very welcome! Is there anything else I can help you with?',
        'Happy to help! Let me know if you have any other questions.'
      ] 
    },
    { 
      keywords: ['bye', 'goodbye', 'see you', 'later'], 
      responses: [
        'Goodbye! Feel free to come back anytime. Have a wonderful day!',
        'See you later! Don\'t hesitate to return if you need assistance.'
      ] 
    }
  ];

  sendMessage(content: string): void {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      type: MessageType.USER,
      timestamp: new Date()
    };

    this.messagesSignal.update(messages => [...messages, userMessage]);

    // Show typing indicator
    this.isTypingSignal.set(true);

    // Simulate bot response delay (1-2 seconds)
    const delayTime = Math.floor(Math.random() * 1000) + 1000;
    
    of(this.getBotResponse(content))
      .pipe(delay(delayTime))
      .subscribe(response => {
        this.isTypingSignal.set(false);
        
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response,
          type: MessageType.BOT,
          timestamp: new Date()
        };

        this.messagesSignal.update(messages => [...messages, botMessage]);
      });
  }

  private getBotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // handle any links
    const hasLink = /https?:\/\/|www\.|\.[a-z]{2,}(\/|$)/.test(lowerMessage);
    if (hasLink) {
      return 'I can answer questions about features, pricing, support, analytics, and integrations. What would you like to know?';
    }

    // Find matching response
    for (const responseSet of this.responses) {
      if (responseSet.keywords.some(keyword => lowerMessage.includes(keyword))) {
        // Return random response from matching set
        const randomIndex = Math.floor(Math.random() * responseSet.responses.length);
        return responseSet.responses[randomIndex];
      }
    }

    // Default fallback
    return 'While I\'m a demo chatbot, I can help with questions about features, pricing, support, analytics, or integrations. What would you like to know?';
  }

  clearMessages(): void {
    this.messagesSignal.set([
      {
        id: '1',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        type: MessageType.BOT,
        timestamp: new Date()
      }
    ]);
  }
}
