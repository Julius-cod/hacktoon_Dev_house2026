import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

interface FeedbackWidgetProps {
  userId: string;
}

export default function FeedbackWidget({ userId }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 hover:from-primary-500 hover:to-primary-600"
        title="Enviar feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modal */}
      <FeedbackModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={userId}
        onSuccess={() => {
          // Opcional: refresh data, show notification, etc
        }}
      />
    </>
  );
}
