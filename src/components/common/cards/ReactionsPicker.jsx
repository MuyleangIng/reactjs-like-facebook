// src/components/ReactionsPicker.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThumbsUp, FaHeart, FaLaugh, FaSurprise, FaSadCry, FaAngry } from 'react-icons/fa';
import './ReactionsPicker.css';

const reactions = [
  { id: 1, emoji: <FaThumbsUp />, label: 'Like', color: '#4267B2' },
  { id: 2, emoji: <FaHeart />, label: 'Love', color: '#E0245E' },
  { id: 3, emoji: <FaLaugh />, label: 'Haha', color: '#F7B928' },
  { id: 4, emoji: <FaSurprise />, label: 'Wow', color: '#F7B928' },
  { id: 5, emoji: <FaSadCry />, label: 'Sad', color: '#F7B928' },
  { id: 6, emoji: <FaAngry />, label: 'Angry', color: '#E0245E' },
];

const ReactionsPicker = () => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  const handleMouseEnter = () => {
    setShowReactions(true);
  };

  const handleMouseLeave = () => {
    setShowReactions(false);
  };

  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
  };

  return (
    <div className="reactions-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="like-button" style={{ color: selectedReaction ? selectedReaction.color : '#000' }}>
        {selectedReaction ? selectedReaction.emoji : <FaThumbsUp />}
      </div>
      <AnimatePresence>
        {showReactions && (
          <motion.div
            className="reactions-picker"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {reactions.map((reaction) => (
              <motion.button
                key={reaction.id}
                className="reaction-button"
                onClick={() => handleReactionClick(reaction)}
                whileHover={{ scale: 1.2 }}
                style={{ color: reaction.color }}
              >
                {reaction.emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReactionsPicker;
