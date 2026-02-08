// src/services/grokService.js

class GrokService {
    constructor() {
        this.apiKey = import.meta.env.VITE_GROK_API_KEY;
    }

    async analyzeOpportunity(post) {
        // Mock Analysis Logic
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate "thinking"

        const text = post.text.toLowerCase();
        let confidence = 'Low';
        let sentiment = 'Neutral';
        let reason = 'General buzz.';
        let action = 'Monitor';

        // Categorization Rules
        if (text.includes('contest') || text.includes('prize') || text.includes('win')) {
            confidence = 'High';
            sentiment = 'Excited';
            if (text.includes('meme')) {
                reason = 'Meme Contest detected. Creativity required.';
                action = 'Create Meme';
            } else if (text.includes('thread') || text.includes('write')) {
                reason = 'Writing/Thread Contest.';
                action = 'Write Thread';
            } else if (text.includes('design') || text.includes('art') || text.includes('sticker')) {
                reason = 'Design/Art Contest.';
                action = 'Submit Design';
            } else {
                reason = 'General Contest / Giveaway.';
                action = 'Enter Contest';
            }
        } else if (text.includes('hackathon') || text.includes('bounties')) {
            confidence = 'High';
            sentiment = 'Proactive';
            reason = 'Hackathon / Bounty Program.';
            action = 'Build & Ship';
        } else if (text.includes('hiring') || text.includes('job') || text.includes('looking for')) {
            confidence = 'High';
            sentiment = 'Positive';
            if (text.includes('writer') || text.includes('moderator') || text.includes('community') || text.includes('marketing')) {
                reason = 'Non-Technical Role.';
                action = 'Apply (Non-Tech)';
            } else if (text.includes('design') || text.includes('ui/ux')) {
                reason = 'Design Role.';
                action = 'Apply (Design)';
            } else {
                reason = 'Technical/General Role.';
                action = 'Apply Now';
            }
        } else if (text.includes('alpha') || text.includes('gem') || text.includes('buy') || text.includes('long')) {
            confidence = 'Medium';
            sentiment = 'Bullish';
            reason = 'Trading Alpha.';
            action = 'Research / Buy';
        } else if (text.includes('whitelist') || text.includes('mint')) {
            confidence = 'Medium';
            sentiment = 'Urgent';
            reason = 'NFT/Token Launch.';
            action = 'Check WL';
        }

        return {
            postId: post.id,
            confidence,
            sentiment,
            reason,
            action,
            timestamp: new Date().toISOString()
        };
    }
}

export const grokService = new GrokService();
