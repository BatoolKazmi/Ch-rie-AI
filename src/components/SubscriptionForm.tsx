import React, { useState } from 'react';

interface SubscriptionFormProps {
  onSubmit?: (email: string) => void;
}

const SubscriptionForm = ({ onSubmit }: SubscriptionFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // You'll need to replace this URL with your actual ConvertKit form endpoint
      const response = await fetch('https://app.kit.com/forms/7551572/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setSuccess(true);
      onSubmit?.(email);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
            Success! Now check your email to confirm your subscription.
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <a
            href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
            target="_blank"
            rel="nofollow"
            className="hover:text-gray-700"
          >
            Built with Kit
          </a>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;