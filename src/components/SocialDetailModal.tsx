import React, { useState } from 'react';
import Modal from './Modal';
import { SocialPost } from '../types';
import { Heart, MessageSquare, Send, Camera, Globe, AtSign } from 'lucide-react';

interface SocialDetailModalProps {
  post: SocialPost | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  likedPosts: string[];
}

export default function SocialDetailModal({
  post,
  isOpen,
  onClose,
  onLike,
  onComment,
  likedPosts
}: SocialDetailModalProps) {
  const [commentInput, setCommentInput] = useState('');

  if (!post) return null;

  const handleLike = () => {
    onLike(post.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const isLiked = likedPosts.includes(post.id);

  const getPlatformIcon = (platform: 'Instagram' | 'Twitter/X' | 'Facebook') => {
    switch (platform) {
      case 'Instagram':
        return <Camera size={16} className="text-secondary" />;
      case 'Twitter/X':
        return <AtSign size={16} className="text-secondary" />;
      case 'Facebook':
        return <Globe size={16} className="text-secondary" />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${post.platform} Announcement`}>
      <div className="space-y-4">
        {/* Post Image Banner */}
        <div className="relative h-64 rounded-lg overflow-hidden bg-primary">
          <img
            src={post.image}
            alt="School activity update"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* User Line / Title */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-secondary/10">
              {getPlatformIcon(post.platform)}
            </div>
            <div>
              <span className="font-semibold text-primary block text-xs">@MySchool_Official</span>
              <span className="text-[10px] text-text-muted">{post.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Likes */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                isLiked
                  ? 'bg-rose-50 text-rose-600 font-semibold border border-rose-100'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-text-muted border border-surface-container'
              }`}
              id="like-post-btn"
            >
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{post.likes}</span>
            </button>
            
            <div className="flex items-center gap-1 bg-neutral-50 border border-surface-container text-text-muted text-xs px-2.5 py-1 rounded">
              <MessageSquare size={14} />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>

        {/* Post description text */}
        <p className="text-sm text-text-muted leading-relaxed italic">
          "{post.text}"
        </p>

        {/* Comments Section */}
        <div className="space-y-2">
          <h5 className="font-semibold text-xs text-primary uppercase tracking-wider">Comments</h5>
          <div className="bg-surface-card p-3 rounded-lg border border-surface-container max-h-[160px] overflow-y-auto space-y-2.5">
            {post.comments.length === 0 ? (
              <p className="text-xs text-text-muted italic text-center py-2">No comments yet. Be the first!</p>
            ) : (
              post.comments.map((comment, index) => (
                <div key={index} className="text-xs pb-1.5 border-b border-surface-container/60 last:border-0 last:pb-0">
                  <span className="font-semibold text-primary mr-1">School_Community:</span>
                  <span className="text-text-muted">{comment}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Post comment input */}
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a friendly comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-surface-container rounded text-xs text-primary bg-background focus:outline-none focus:border-secondary transition-all"
            id="comment-input"
          />
          <button
            type="submit"
            className="p-1.5 bg-primary text-on-primary rounded hover:bg-secondary hover:text-on-secondary transition-all shrink-0"
            id="submit-comment"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
