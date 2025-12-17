import React from 'react';
import './DecaBotIntro.css';

const DecaBotIntro = ({ onStart }) => {
    return (
        <div className="decabot-intro-overlay">
            <div className="decabot-intro-modal">
                <h1 className="decabot-title">🎲 DECA 3D WORLD 🎲</h1>

                <div className="decabot-message">
                    <p className="greeting">Hey there, fellow gamer!</p>

                    <p className="intro">
                        I'm <strong>Deca Bot</strong> - your friendly neighborhood game guide.
                    </p>

                    <p className="disclosure">
                        (Yes, I'm a bot, but I promise I rolled high on charisma!)
                    </p>
                </div>

                <div className="controls-section">
                    <h3>🎮 CONTROLS</h3>
                    <div className="controls-grid">
                        <div className="control-item">
                            <kbd>W</kbd> <kbd>↑</kbd>
                            <span>Forward</span>
                        </div>
                        <div className="control-item">
                            <kbd>A</kbd> <kbd>←</kbd>
                            <span>Left</span>
                        </div>
                        <div className="control-item">
                            <kbd>D</kbd> <kbd>→</kbd>
                            <span>Right</span>
                        </div>
                        <div className="control-item">
                            <kbd>S</kbd> <kbd>↓</kbd>
                            <span>Backward</span>
                        </div>
                        <div className="control-item">
                            <kbd>SPACE</kbd>
                            <span>Brake</span>
                        </div>
                    </div>
                </div>

                <button
                    className="start-button"
                    onClick={onStart}
                >
                    LET'S ROLL! 🎯
                </button>
            </div>
        </div>
    );
};

export default DecaBotIntro;
