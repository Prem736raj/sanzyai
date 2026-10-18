/**
 * =============================================================================
 * DOMAIN REGISTRAR AFFILIATE CONFIGURATION & LINK BUILDER
 * =============================================================================
 * 
 * How to monetize domain searches on SanzyAI:
 * 1. Sign up for the registrar affiliate programs listed below (Impact, CJ, direct).
 * 2. Enter your unique Affiliate ID / Partner Tag in the `affiliateId` field.
 * 3. Set `enabled: true` for the registrars you are approved for.
 * 
 * All outbound links automatically receive `rel="noopener sponsored"` to comply
 * with Google SEO guidelines and FTC affiliate disclosure standards.
 * 
 * Documentation: See docs/DOMAIN_AFFILIATE_SETUP.md for complete step-by-step
 * application instructions and commission breakdown for each registrar.
 * =============================================================================
 */

export const registrarAffiliateConfig = {
    namecheap: {
        name: 'Namecheap',
        network: 'Impact',
        programUrl: 'https://app.impact.com/campaign-promo-signup/Namecheap.brand',
        // Example: '123456' or your Impact publisher campaign sub-ID
        affiliateId: '',
        paramName: 'aff',
        // Optional: If you use Impact tracking redirect links, enter your template:
        // e.g. 'https://namecheap.pxf.io/c/{affiliateId}/.../?u={destination}'
        customUrlTemplate: '',
        enabled: true
    },
    godaddy: {
        name: 'GoDaddy',
        network: 'CJ Affiliate (Commission Junction)',
        programUrl: 'https://www.cj.com',
        // Example: your CJ website/publisher ID or source code (isc parameter)
        affiliateId: '',
        paramName: 'isc',
        customUrlTemplate: '',
        enabled: true
    },
    porkbun: {
        name: 'Porkbun',
        network: 'Porkbun Affiliate / Referral Program',
        programUrl: 'https://porkbun.com/affiliate',
        // Example: your Porkbun partner tag or coupon/referral code
        affiliateId: '',
        paramName: 'ref',
        customUrlTemplate: '',
        enabled: true
    },
    hostinger: {
        name: 'Hostinger',
        network: 'Hostinger Affiliates / Impact',
        programUrl: 'https://www.hostinger.com/affiliates',
        // Example: your referral identifier or campaign tag
        affiliateId: '',
        paramName: 'REFERRALCODE',
        customUrlTemplate: '',
        enabled: true
    },
    dynadot: {
        name: 'Dynadot',
        network: 'Dynadot Refer-a-Friend / Partner',
        programUrl: 'https://www.dynadot.com/community/refer-a-friend',
        // Example: your Dynadot referral ID (drefid)
        affiliateId: '',
        paramName: 'drefid',
        customUrlTemplate: '',
        enabled: true
    },
    spaceship: {
        name: 'Spaceship',
        network: 'Spaceship Partner Program',
        programUrl: 'https://spaceship.com',
        affiliateId: '',
        paramName: 'aff',
        customUrlTemplate: '',
        enabled: true
    },
    ionos: {
        name: 'IONOS',
        network: 'CJ / Awin',
        programUrl: 'https://www.ionos.com/affiliate',
        affiliateId: '',
        paramName: 'affiliate_id',
        customUrlTemplate: '',
        enabled: true
    },
    namedotcom: {
        name: 'Name.com',
        network: 'Impact / Direct',
        programUrl: 'https://www.name.com/partner',
        affiliateId: '',
        paramName: 'aff',
        customUrlTemplate: '',
        enabled: true
    },
    squarespace: {
        name: 'Squarespace',
        network: 'Impact',
        programUrl: 'https://www.squarespace.com/affiliates',
        affiliateId: '',
        paramName: 'subid',
        customUrlTemplate: '',
        enabled: true
    },
    cloudflare: {
        name: 'Cloudflare',
        network: 'Direct (Zero-markup registrar)',
        programUrl: 'https://cloudflare.com/products/registrar',
        // Cloudflare Registrar sells wholesale domains at cost without retail commission
        affiliateId: '',
        paramName: '',
        customUrlTemplate: '',
        enabled: false
    }
};

/**
 * Builds a tracked outbound registrar search link with affiliate parameters.
 * 
 * @param {string} registrarId - ID matching registrarAffiliateConfig keys
 * @param {string} targetUrl - Clean registrar search or landing URL
 * @param {string} domain - Domain being searched
 * @returns {string} Fully formatted URL with affiliate tracking parameters
 */
export function buildAffiliateSearchLink(registrarId, targetUrl, domain = '') {
    if (!targetUrl) return '#';

    const config = registrarAffiliateConfig[registrarId];
    if (!config || !config.enabled || !config.affiliateId) {
        return targetUrl;
    }

    const { affiliateId, paramName, customUrlTemplate } = config;

    // 1. If a custom redirect wrapper URL is configured (e.g. Impact/CJ redirect)
    if (customUrlTemplate) {
        return customUrlTemplate
            .replace('{affiliateId}', encodeURIComponent(affiliateId))
            .replace('{destination}', encodeURIComponent(targetUrl))
            .replace('{domain}', encodeURIComponent(domain));
    }

    // 2. Standard query parameter attachment
    if (paramName) {
        try {
            const urlObj = new URL(targetUrl);
            urlObj.searchParams.set(paramName, affiliateId);
            return urlObj.toString();
        } catch {
            // Fallback for relative or non-standard URLs
            const separator = targetUrl.includes('?') ? '&' : '?';
            return `${targetUrl}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(affiliateId)}`;
        }
    }

    return targetUrl;
}

/**
 * Standard rel attribute for affiliate / sponsored links.
 */
export const AFFILIATE_LINK_REL = 'noopener sponsored';
