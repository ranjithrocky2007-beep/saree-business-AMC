import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success' || !toast.type;
        const isWarning = toast.type === 'warning' || toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-xl border backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${
              isSuccess
                ? 'bg-[#250711]/95 text-[#FAF7F2] border-[#D4AF37]'
                : isWarning
                ? 'bg-amber-950/95 text-amber-100 border-amber-500'
                : 'bg-stone-900/95 text-stone-100 border-stone-500'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              ) : isWarning ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
              )}
              <span className="text-xs font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white shrink-0 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
