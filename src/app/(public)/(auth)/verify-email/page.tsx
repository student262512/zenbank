'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, Loader2, Send } from 'lucide-react';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    // Simulate email verification
    const timer = setTimeout(() => {
      // TODO: Implement actual email verification logic
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      setStatus(isSuccess ? 'success' : 'error');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendEmail = () => {
    setResendStatus('sending');
    // TODO: Implement resend email logic
    setTimeout(() => {
      setResendStatus('sent');
      setTimeout(() => setResendStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Card */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        {status === 'loading' && (
          <>
            {/* Loading State */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl mb-4">
                <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Verifying Email</h1>
              <p className="text-white/60">
                Please wait while we verify your email address...
              </p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            {/* Success State */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Email Verified!</h1>
              <p className="text-white/60 mb-8">
                Your email has been successfully verified.
                <br />
                You can now access your ZenBank dashboard.
              </p>

              <div className="space-y-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all"
                >
                  <span>Continue to Dashboard</span>
                </Link>

                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-sm text-white/70 mb-2">🎉 Welcome Bonus Activated!</p>
                  <ul className="space-y-1 text-xs text-white/60">
                    <li>✓ 3 months free trial</li>
                    <li>✓ ₹1L+ in partner credits</li>
                    <li>✓ 100+ AI agents access</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            {/* Error State */}
            <div className="text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl mb-4">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
              <p className="text-white/60 mb-8">
                We couldn't verify your email address.
                <br />
                The link may have expired or is invalid.
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleResendEmail}
                  disabled={resendStatus !== 'idle'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendStatus === 'sending' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : resendStatus === 'sent' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>Email Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Resend Verification Email</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-white/60">
                  or{' '}
                  <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    return to login
                  </Link>
                </p>
              </div>

              <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-white/70 mb-2">Need help?</p>
                <div className="flex flex-wrap gap-4 justify-center text-xs">
                  <a
                    href="mailto:support@zenbank.ai"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    support@zenbank.ai
                  </a>
                  <span className="text-white/30">•</span>
                  <a
                    href="tel:+918001234567"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    +91 800 123 4567
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
