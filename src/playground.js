document.addEventListener('DOMContentLoaded', () => {
    const pgAnalyze = document.getElementById('pgAnalyze');
    if (pgAnalyze) {
        pgAnalyze.addEventListener('click', function() {
            const input = document.getElementById('pgInput').value.trim();
            const output = document.getElementById('pgOutput');
            if (!input) {
                output.textContent = 'Please enter a prompt first.';
                return;
            }

            // Detect variables
            const vars = [...new Set(input.match(/\[[A-Z_]+\]/g) || [])];
            
            // Detect role
            const roleMatch = input.match(/act as (?:a |an )?(.+?)[\.\,\n]/i);
            const role = roleMatch ? roleMatch[1].trim() : 'Not specified';

            // Count words
            const wordCount = input.split(/\s+/).length;
            
            // Detect structure keywords
            const hasSteps = /step|include|list|provide|write/i.test(input);
            const hasTone = /tone|style|voice|format/i.test(input);
            const hasAudience = /audience|for|target/i.test(input);

            let analysis = `PROMPT ANALYSIS\n${'─'.repeat(40)}\n\n`;
            analysis += `Word Count: ${wordCount}\n`;
            analysis += `Role: ${role}\n`;
            analysis += `Variables: ${vars.length > 0 ? vars.join(', ') : 'None detected'}\n`;
            analysis += `Has Structure: ${hasSteps ? 'Yes' : 'No'}\n`;
            analysis += `Has Tone: ${hasTone ? 'Yes' : 'No'}\n`;
            analysis += `Has Audience: ${hasAudience ? 'Yes' : 'No'}\n`;
            
            // Score
            let score = 0;
            if (wordCount > 20) score += 20;
            if (wordCount > 50) score += 10;
            if (role !== 'Not specified') score += 20;
            if (vars.length > 0) score += 15;
            if (hasSteps) score += 15;
            if (hasTone) score += 10;
            if (hasAudience) score += 10;
            
            analysis += `\nPROMPT QUALITY SCORE: ${score}/100\n\n`;
            
            if (score >= 80) {
                analysis += `Status: Excellent — this prompt is well-structured and specific.\n`;
            } else if (score >= 50) {
                analysis += `Status: Good baseline. Recommended refinements:\n`;
                if (!roleMatch) analysis += `  - Specify an expert role (e.g., "Act as a...")\n`;
                if (!hasTone) analysis += `  - Define the desired output tone and format\n`;
                if (vars.length === 0) analysis += `  - Introduce parameterized [VARIABLES]\n`;
            } else {
                analysis += `Status: Needs refinement. Tips to improve:\n`;
                analysis += `  - Start with "Act as a [ROLE]"\n`;
                analysis += `  - Add step-by-step instructions\n`;
                analysis += `  - Include [VARIABLES] for reuse\n`;
                analysis += `  - Clarify the intended audience and tone\n`;
            }
            
            analysis += `\nLooking for production-grade prompt templates?\nBrowse our Prompt Store for curated prompt packs.`;
            
            output.textContent = analysis;
        });
    }

    const pgCopy = document.getElementById('pgCopy');
    if (pgCopy) {
        pgCopy.addEventListener('click', function() {
            const input = document.getElementById('pgInput').value;
            navigator.clipboard?.writeText(input).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => this.textContent = originalText, 2000);
            });
        });
    }
});
