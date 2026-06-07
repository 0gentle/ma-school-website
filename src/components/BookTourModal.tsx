import React, { useState } from 'react';
import Modal from './Modal';
import { TourBookingInput } from '../types';
import { Check, Calendar, Users, GraduationCap } from 'lucide-react';

interface BookTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TourBookingInput) => void;
}

export default function BookTourModal({ isOpen, onClose, onSubmit }: BookTourModalProps) {
  const [tourType, setTourType] = useState<'daily' | 'shadow'>('daily');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !date) return;
    
    onSubmit({
      tourType,
      visitorName,
      visitorEmail,
      date,
      timeSlot
    });
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setVisitorName('');
      setVisitorEmail('');
      setDate('');
      onClose();
    }, 2500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Campus Tour or Class Shadow">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-secondary-container text-primary rounded-full flex items-center justify-center animate-bounce">
            <Check size={32} strokeWidth={3} />
          </div>
          <h4 className="text-xl font-semibold font-serif text-primary">Booking Confirmed!</h4>
          <p className="max-w-xs text-text-muted">
            Excellent Choice, <span className="font-semibold">{visitorName}</span>! Your {tourType === 'daily' ? 'Daily Campus Tour' : 'Class Shadowing Session'} is reserved for <span className="font-semibold">{date}</span> at <span className="font-semibold">{timeSlot}</span>. Check your inbox for additional details.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-text-muted mb-4 leading-normal">
            Select an immersive tour guided by our student ambassadors or sit in on a live lecture with an admissions cohort.
          </p>

          {/* Visit Type Select */}
          <div>
            <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Type of Visit
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTourType('daily')}
                className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all outline-none ${
                    tourType === 'daily'
                    ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                    : 'border-surface-container hover:border-text-muted hover:bg-neutral-50/50'
                }`}
                id="tour-type-daily"
              >
                <Users size={18} className="mt-0.5 text-secondary shrink-0" />
                <div>
                  <div className="font-semibold text-primary text-xs">Daily Tour</div>
                  <div className="text-[10px] text-text-muted mt-0.5">Campus walk with student ambassadors.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTourType('shadow')}
                className={`p-3 rounded border text-left flex items-start gap-2.5 transition-all outline-none ${
                    tourType === 'shadow'
                    ? 'border-secondary bg-secondary/5 ring-1 ring-secondary'
                    : 'border-surface-container hover:border-text-muted hover:bg-neutral-50/50'
                }`}
                id="tour-type-shadow"
              >
                <GraduationCap size={18} className="mt-0.5 text-secondary shrink-0" />
                <div>
                  <div className="font-semibold text-primary text-xs">Class Shadow</div>
                  <div className="text-[10px] text-text-muted mt-0.5">Sit in on a lecture of your choice.</div>
                </div>
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="visitorName" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="visitorName"
                type="text"
                required
                placeholder="Jane Doe"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="visitorEmail" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="visitorEmail"
                type="email"
                required
                placeholder="jane.doe@example.com"
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tourDate" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Date Preferred
              </label>
              <input
                id="tourDate"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[38px] transition-all"
              />
            </div>

            <div>
              <label htmlFor="timeSlot" className="block text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
                Time Slot
              </label>
              <select
                id="timeSlot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2 border border-surface-container rounded text-sm text-primary bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-[38px] transition-all"
              >
                <option value="10:00 AM">10:00 AM (Morning Tour)</option>
                <option value="1:00 PM">1:00 PM (Afternoon Tour)</option>
                <option value="3:30 PM">3:30 PM (Evening Tour)</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-surface-container flex justify-end gap-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold border border-surface-container rounded hover:bg-neutral-50 hover:text-primary transition-all"
              id="cancel-tour"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-primary text-on-primary rounded hover:bg-primary-container hover:shadow-md transition-all flex items-center gap-1.5"
              id="submit-tour"
            >
              <Calendar size={14} />
              Book Selected Date
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
