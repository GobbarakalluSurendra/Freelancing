import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, User, Briefcase, Building2, MessageSquare, Quote, PenLine } from 'lucide-react';
import axios from 'axios';

/* ── Star Display ── */
const StarDisplay = ({ rating }) => (
  <div className="flex space-x-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`h-4 w-4 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
    ))}
  </div>
);

/* ── Star Picker ── */
const StarPicker = ({ value, onChange }) => (
  <div className="flex space-x-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" onClick={() => onChange(star)}
        className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
        <Star className={`h-8 w-8 transition-colors duration-150 ${
          star <= value ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-300'}`} />
      </button>
    ))}
  </div>
);

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent!' };

const AVATAR_COLORS = [
  'bg-primary-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-purple-500', 'bg-amber-500', 'bg-rose-500',
];

const ReviewsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({ name: '', role: '', company: '', message: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(({ data }) => setTestimonials(data))
      .catch(() => {})
      .finally(() => setLoadingReviews(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await axios.post('/api/testimonials/submit', form);
      setSubmitted(true);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── average rating ── */
  const avg = testimonials.length
    ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20 relative">
      {/* bg blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold tracking-wide mb-5">
            <Star className="h-4 w-4 fill-amber-400" />
            Client Reviews
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Say</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real feedback from real clients. See why businesses trust me to deliver exceptional results.
          </p>

          {/* Rating summary */}
          {avg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-4 mt-6 px-6 py-3 glass-card"
            >
              <div className="text-4xl font-bold text-white">{avg}</div>
              <div>
                <div className="flex space-x-0.5 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={`h-5 w-5 ${s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                  ))}
                </div>
                <p className="text-slate-400 text-sm">{testimonials.length} verified review{testimonials.length !== 1 ? 's' : ''}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* ── Leave a Review CTA ── */}
        <AnimatePresence>
          {!submitted ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-14"
            >
              {!showForm ? (
                <div className="glass-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Worked with me?</h3>
                    <p className="text-slate-400">Share your experience and help others make confident decisions.</p>
                  </div>
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary-500/25"
                  >
                    <PenLine className="h-5 w-5" />
                    Leave a Review
                  </button>
                </div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-8"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Your Review</h3>
                    <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white text-sm transition-colors">
                      ✕ Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <User className="inline h-4 w-4 mr-1 text-primary-400" />
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input required type="text" placeholder="e.g. Rajesh Kumar"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          <Briefcase className="inline h-4 w-4 mr-1 text-primary-400" />
                          Your Role <span className="text-red-400">*</span>
                        </label>
                        <input required type="text" placeholder="e.g. CEO, Manager"
                          value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Building2 className="inline h-4 w-4 mr-1 text-primary-400" />
                        Company <span className="text-slate-500 text-xs">(optional)</span>
                      </label>
                      <input type="text" placeholder="e.g. Acme Corp"
                        value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">
                        <Star className="inline h-4 w-4 mr-1 text-amber-400" />
                        Rating
                      </label>
                      <div className="flex items-center gap-4">
                        <StarPicker value={form.rating} onChange={(val) => setForm({ ...form, rating: val })} />
                        <span className="text-amber-400 font-semibold text-sm">{ratingLabels[form.rating]}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <MessageSquare className="inline h-4 w-4 mr-1 text-primary-400" />
                        Your Review <span className="text-red-400">*</span>
                      </label>
                      <textarea required rows={4} placeholder="Tell others about your experience working with me..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-dark-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none" />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
                    )}

                    <button type="submit" disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary-500/25">
                      {submitting ? (
                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                      ) : (
                        <><Send className="h-5 w-5" /> Submit Review</>
                      )}
                    </button>
                    <p className="text-center text-slate-500 text-xs">Your review will appear after approval.</p>
                  </form>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ── Success ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 text-center mb-14"
            >
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You! 🎉</h3>
              <p className="text-slate-400">Your review has been submitted and is pending approval. It will appear here shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Reviews Grid ── */}
        {loadingReviews ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card p-7 flex flex-col hover:-translate-y-1 transition-transform duration-300 relative"
              >
                <Quote className="absolute top-5 right-5 h-7 w-7 text-primary-500/15" />
                <StarDisplay rating={t.rating} />
                <p className="text-slate-300 leading-relaxed mt-4 mb-6 flex-grow italic text-sm">
                  "{t.message}"
                </p>
                <div className="flex items-center space-x-3 mt-auto border-t border-slate-700/50 pt-5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
                    {t.avatarInitials || t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}{t.company ? ` @ ${t.company}` : ''}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-7 w-7 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No reviews yet</h3>
            <p className="text-slate-400">Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
