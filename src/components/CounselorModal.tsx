import React, { useState } from 'react';
import Modal from './Modal';
import { CounselorInput } from '../types';
import { Check, Phone, Calendar } from 'lucide-react';

interface CounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CounselorInput) => void;
}

export default function CounselorModal({ isOpen, onClose, onSubmit }: CounselorModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00 AM');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !preferredDate) return;

    onSubmit({
      name,
      email,
      phone,
      preferredDate,
      preferredTime
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
      setPreferredDate('');
      onClose();
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Counselor Consultation">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center animate-bounce">
            <Check size={32} strokeWidth={3} />
          </div>
          <h4 className="text-xl font-semibold font-serif text-primary">Call Scheduled!</h4>
          <p className="max-w-xs text-text-muted">
            Thank you, <span className="font-semibold">{name}</span>! An admissions specialist will call you at <span className="font-semibold">{phone}</span> on <span className="font-semibold">{preferredDate}</span> around <span className="font-semibold">{preferredTime}</span>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-text-muted mb-4 leading-normal">
            Our counselors can clarify requirements, answer program queries, and assist in compiling documents. Please fill in your details below.
          </p>

          <div>
            <label htmlFor="counselorName" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
              Your Full Name
            </label>
            <input
              id="counselorName"
              type="text"
              required
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="counselorEmail" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="counselorEmail"
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label htmlFor="counselorPhone" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                id="counselorPhone"
                type="tel"
                required
                placeholder="+1 (555) 0192-281"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="counselorDate" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Preferred Date
              </label>
              <input
                id="counselorDate"
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[38px] transition-all"
              />
            </div>

            <div>
              <label htmlFor="counselorTime" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Preferred Time
              </label>
              <select
                id="counselorTime"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[38px] transition-all"
              >
                <option value="09:00 AM">09:00 AM (Early Morning)</option>
                <option value="11:30 AM">11:30 AM (Mid-Day)</option>
                <option value="02:30 PM">02:30 PM (Afternoon)</option>
                <option value="04:30 PM">04:30 PM (Late Afternoon)</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-surface-container flex justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold border border-surface-container rounded hover:bg-neutral-50 hover:text-primary transition-all"
              id="cancel-consultation"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-primary text-on-primary rounded hover:bg-primary-container hover:shadow-md transition-all flex items-center gap-1.5"
              id="submit-consultation"
            >
              <Phone size={14} />
              Schedule Counselor Call
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
