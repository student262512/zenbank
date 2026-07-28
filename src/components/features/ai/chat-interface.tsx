'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Sparkles,
  User,
  Paperclip,
  Mic,
  Image,
  StopCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MoreHorizontal,
  ChevronDown,
  Building2,
  Bot,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: { name: string; type: string; url?: string }[];
  actions?: { label: string; onClick: () => void }[];
  isStreaming?: boolean;
  metadata?: {
    model?: string;
    tokens?: number;
    confidence?: number;
  };
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string, attachments?: File[]) => void;
  onFeedback?: (messageId: string, positive: boolean) => void;
  onCopy?: (messageId: string) => void;
  onRetry?: (messageId: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

export function ChatInterface({
  messages,
  onSendMessage,
  onFeedback,
  onCopy,
  onRetry,
  isLoading = false,
  placeholder = 'Ask AI CFO anything...',
  suggestions,
  className,
  showHeader = true,
  title = 'AI CFO Assistant',
  subtitle = 'Powered by Claude',
}: ChatInterfaceProps) {
  const [input, setInput] = React.useState('');
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || attachments.length > 0) {
      onSendMessage(input.trim(), attachments);
      setInput('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className={cn('flex h-full flex-col rounded-lg border border-slate-800 bg-slate-900/50', className)}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">{title}</h3>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Online
          </Badge>
        </div>
      )}

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="text-lg font-medium text-white">How can I help you today?</h4>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                I can help you analyze financial data, forecast cash flows, identify risks, and provide strategic recommendations.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessageBubble
              key={message.id}
              message={message}
              onFeedback={onFeedback}
              onCopy={onCopy}
              onRetry={onRetry}
            />
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-lg bg-slate-800/50 px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && messages.length === 0 && (
        <div className="border-t border-slate-800 px-4 py-3">
          <p className="mb-2 text-xs text-slate-500">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4">
        {attachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {attachments.map((file, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 px-2 py-1">
                <Paperclip className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-300">{file.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))}
                  className="text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              className="max-h-32 min-h-[44px] w-full resize-none rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 pr-24 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              style={{ height: 'auto' }}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4 text-slate-400" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4 text-slate-400" />
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={(!input.trim() && attachments.length === 0) || isLoading}
            className="h-11 gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isLoading ? <StopCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Individual message bubble
function ChatMessageBubble({
  message,
  onFeedback,
  onCopy,
  onRetry,
}: {
  message: ChatMessage;
  onFeedback?: (messageId: string, positive: boolean) => void;
  onCopy?: (messageId: string) => void;
  onRetry?: (messageId: string) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      {isUser ? (
        <Avatar size="sm" className="shrink-0" />
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      {/* Content */}
      <div className={cn('group max-w-[80%]', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-lg px-4 py-3',
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800/50 text-slate-300'
          )}
        >
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.attachments.map((attachment, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded bg-slate-700/50 px-2 py-1"
                >
                  <Paperclip className="h-3 w-3" />
                  <span className="text-xs">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions from AI */}
          {message.actions && message.actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {message.actions.map((action, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={action.onClick}
                  className="h-7 text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp & Actions */}
        <div
          className={cn(
            'mt-1 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100',
            isUser && 'flex-row-reverse'
          )}
        >
          <span className="text-xs text-slate-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          {!isUser && (
            <div className="flex items-center gap-1">
              {onCopy && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onCopy(message.id)}
                >
                  <Copy className="h-3 w-3 text-slate-400" />
                </Button>
              )}
              {onRetry && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onRetry(message.id)}
                >
                  <RotateCcw className="h-3 w-3 text-slate-400" />
                </Button>
              )}
              {onFeedback && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-green-400"
                    onClick={() => onFeedback(message.id, true)}
                  >
                    <ThumbsUp className="h-3 w-3 text-slate-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-red-400"
                    onClick={() => onFeedback(message.id, false)}
                  >
                    <ThumbsDown className="h-3 w-3 text-slate-400" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
