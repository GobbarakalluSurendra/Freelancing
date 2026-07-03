import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, User, Briefcase, Building2, MessageSquare } from 'lucide-react';
import axios from 'axios';

const StarPicker = ({ value, onChange }) => (
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
      >
        <Star
          className={`h-8 w-8 transition-colors duration-150 ${
            star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-300'
          }`}
        />
      </button>
    ))}
  </div>
);

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent!' };

const ReviewPage = () => {
  const [form, setForm] = useState({ name: '', role: '', company: '', message: '', rating: 5 });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/testimonials/submit', form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="w-full max-w-xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success State ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass-card p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-accent-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-3">Thank You! 🎉</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Your review has been submitted successfully. It will appear on the site after a quick review.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-6 w-6 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-wide mb-4"
                >
                  <Star className="h-4 w-4 fill-amber-400" />
                  Share Your Experience
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Leave a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Review</span>
                </h1>
                <p className="text-slate-400 text-lg">
                  Worked with me? I'd love to hear your feedback!
                </p>
              </div>

              {/* Card */}
              <div className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <User className="inline h-4 w-4 mr-1 text-primary-400" />
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    />
                  </div>

                  {/* Role & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Briefcase className="inline h-4 w-4 mr-1 text-primary-400" />
                        Your Role <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Founder, Manager"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Building2 className="inline h-4 w-4 mr-1 text-primary-400" />
                        Company <span className="text-slate-500 text-xs">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Corp"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      <Star className="inline h-4 w-4 mr-1 text-amber-400" />
                      Rating
                    </label>
                    <div className="flex items-center gap-4">
                      <StarPicker value={form.rating} onChange={(val) => setForm({ ...form, rating: val })} />
                      <span className="text-amber-400 font-semibold text-sm">
                        {ratingLabels[form.rating]}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      <MessageSquare className="inline h-4 w-4 mr-1 text-primary-400" />
                      Your Review <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell others about your experience working with me..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                    />
                    <p className="text-slate-600 text-xs mt-1 text-right">{form.message.length} characters</p>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary-500/25 text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Review
                      </>
                    )}
                  </button>

                  <p className="text-center text-slate-500 text-xs">
                    Your review will be visible after approval. No spam, ever.
                  </p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewPage;
