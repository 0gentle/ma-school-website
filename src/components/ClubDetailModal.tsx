import React, { useState } from 'react';
import Modal from './Modal';
import { Club } from '../types';
import { Check, Users, Sparkles } from 'lucide-react';

interface ClubDetailModalProps {
  club: Club | null;
  isOpen: boolean;
  onClose: () => void;
  onJoin: (clubId: string) => void;
  isJoinedAlready: boolean;
}

export default function ClubDetailModal({
  club,
  isOpen,
  onClose,
  onJoin,
  isJoinedAlready
}: ClubDetailModalProps) {
  const [successJoin, setSuccessJoin] = useState(false);

  if (!club) return null;

  const handleJoinClick = () => {
    onJoin(club.id);
    setSuccessJoin(true);
    setTimeout(() => {
      setSuccessJoin(false);
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={club.name}>
      <div className="space-y-4">
        {/* Banner image */}
        <div className="relative h-44 rounded-lg overflow-hidden bg-primary">
          <img
            src={club.featuredImg}
            alt={club.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-primary text-secondary-container text-xs font-semibold px-2.5 py-1 rounded shadow flex items-center gap-1">
            <Sparkles size={12} />
            {club.category}
          </div>
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between py-1 border-b border-surface-container">
          <div className="flex items-center gap-1.5 text-text-muted text-xs">
            <Users size={16} />
            <span className="font-semibold text-primary">{club.membersCount} active members</span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-secondary">
            Club ID: {club.id}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h4 className="font-semibold font-serif text-primary text-base">Club Overview</h4>
          <p className="text-sm text-text-muted leading-relaxed">
            {club.longDescription || club.description}
          </p>
        </div>

        {/* Join CTA */}
        <div className="pt-4 border-t border-surface-container flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold border border-surface-container rounded hover:bg-neutral-50 hover:text-primary transition-all"
            id="close-club"
          >
            Go Back
          </button>
          
          {isJoinedAlready ? (
            <button
              disabled
              className="px-5 py-2 text-xs font-semibold bg-neutral-100 text-text-muted border border-surface-container rounded cursor-not-allowed flex items-center gap-1.5"
              id="already-joined"
            >
              <Check size={14} className="text-emerald-600" />
              Already Joined
            </button>
          ) : successJoin ? (
            <button
              disabled
              className="px-5 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded animate-pulse flex items-center gap-1.5"
              id="join-success"
            >
              <Check size={14} />
              Welcome to the Club!
            </button>
          ) : (
            <button
              onClick={handleJoinClick}
              className="px-5 py-2 text-xs font-semibold bg-primary text-on-primary rounded hover:bg-primary-container hover:shadow-md transition-all flex items-center gap-1.5"
              id="join-club-btn"
            >
              <Sparkles size={14} className="text-secondary-container" />
              Join Club Membership
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
