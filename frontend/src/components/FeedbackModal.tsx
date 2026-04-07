import React, { useState, useRef } from 'react';
import { X, Send, Mic, Square } from 'lucide-react';
import { useFeedback } from '../hooks/useApi';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess?: () => void;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  userId,
  onSuccess,
}: FeedbackModalProps) {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { createFeedback, loading } = useFeedback({ userId });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // TODO: Upload audio to Firebase Storage and get URL
        // For now, we'll just use the text
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Não foi possível acessar o microfone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Por favor, insira seu feedback');
      return;
    }

    try {
      await createFeedback(text);
      setText('');
      alert('Feedback enviado com sucesso! ✅');
      onSuccess?.();
      onClose();
    } catch (error) {
      alert('Erro ao enviar feedback');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Enviar Feedback</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Descreva seu feedback, sugestão ou problema..."
            className="flex-1 p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isRecording
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-4 h-4" />
                  Parar Gravação
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Gravar Áudio
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
