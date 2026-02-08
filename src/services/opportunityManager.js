// src/services/opportunityManager.js
import { xService } from './xService';
import { grokService } from './grokService';

class OpportunityManager {
    constructor() {
        this.listeners = [];
        this.activeOpportunities = [];
        this.isMonitoring = false;
        this.unsubStream = null;
    }

    startMonitoring() {
        if (this.isMonitoring) return;
        this.isMonitoring = true;
        console.log('OpportunityManager: Started monitoring.');

        // Initial fetch
        this.loadInitialData();

        // Subscribe to live updates
        this.unsubStream = xService.subscribeToStream(async (newPost) => {
            const analysis = await grokService.analyzeOpportunity(newPost);
            const opportunity = { ...newPost, analysis };

            this.activeOpportunities = [opportunity, ...this.activeOpportunities].slice(0, 50); // Keep last 50
            this.notifyListeners();
        });
    }

    stopMonitoring() {
        if (!this.isMonitoring) return;
        this.isMonitoring = false;
        if (this.unsubStream) this.unsubStream();
        console.log('OpportunityManager: Stopped monitoring.');
    }

    async loadInitialData() {
        const posts = await xService.fetchRecentPosts();
        // Analyze all initial posts in parallel
        const opportunities = await Promise.all(posts.map(async (post) => {
            const analysis = await grokService.analyzeOpportunity(post);
            return { ...post, analysis };
        }));

        this.activeOpportunities = opportunities;
        this.notifyListeners();
    }

    getOpportunities() {
        return this.activeOpportunities;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        // Send current state immediately
        listener(this.activeOpportunities);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.activeOpportunities));
    }
}

export const opportunityManager = new OpportunityManager();
