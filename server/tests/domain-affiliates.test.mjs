import test from 'node:test';
import assert from 'node:assert/strict';
import {
    registrarAffiliateConfig,
    buildAffiliateSearchLink,
    AFFILIATE_LINK_REL
} from '../../src/domain-affiliates.js';

test('domain-affiliates: configuration contains all 10 registrars', () => {
    const expected = [
        'cloudflare', 'porkbun', 'spaceship', 'namecheap',
        'hostinger', 'dynadot', 'godaddy', 'ionos',
        'squarespace', 'namedotcom'
    ];
    for (const id of expected) {
        assert.ok(registrarAffiliateConfig[id], `Missing config for ${id}`);
        assert.ok(typeof registrarAffiliateConfig[id].name === 'string', `Missing name for ${id}`);
        assert.ok(typeof registrarAffiliateConfig[id].network === 'string', `Missing network for ${id}`);
    }
});

test('domain-affiliates: returns targetUrl when no affiliate ID is configured', () => {
    const url = 'https://www.namecheap.com/domains/registration/results/?domain=mybrand.com';
    const link = buildAffiliateSearchLink('namecheap', url, 'mybrand.com');
    assert.equal(link, url);
});

test('domain-affiliates: correctly appends query parameter when affiliate ID is set', () => {
    // Temporarily set affiliateId
    const origId = registrarAffiliateConfig.namecheap.affiliateId;
    try {
        registrarAffiliateConfig.namecheap.affiliateId = 'partner123';
        const url = 'https://www.namecheap.com/domains/registration/results/?domain=mybrand.com';
        const link = buildAffiliateSearchLink('namecheap', url, 'mybrand.com');
        const parsed = new URL(link);
        assert.equal(parsed.searchParams.get('domain'), 'mybrand.com');
        assert.equal(parsed.searchParams.get('aff'), 'partner123');
    } finally {
        registrarAffiliateConfig.namecheap.affiliateId = origId;
    }
});

test('domain-affiliates: supports custom wrapper templates (e.g. Impact/CJ redirect URLs)', () => {
    const origTemplate = registrarAffiliateConfig.namecheap.customUrlTemplate;
    const origId = registrarAffiliateConfig.namecheap.affiliateId;
    try {
        registrarAffiliateConfig.namecheap.affiliateId = '99999';
        registrarAffiliateConfig.namecheap.customUrlTemplate = 'https://namecheap.pxf.io/c/{affiliateId}/12345/6789?u={destination}&sub={domain}';
        const url = 'https://www.namecheap.com/domains/registration/results/?domain=test.com';
        const link = buildAffiliateSearchLink('namecheap', url, 'test.com');
        assert.ok(link.includes('99999'));
        assert.ok(link.includes(encodeURIComponent(url)));
        assert.ok(link.includes('test.com'));
    } finally {
        registrarAffiliateConfig.namecheap.customUrlTemplate = origTemplate;
        registrarAffiliateConfig.namecheap.affiliateId = origId;
    }
});

test('domain-affiliates: respects disabled state', () => {
    const origEnabled = registrarAffiliateConfig.cloudflare.enabled;
    const origId = registrarAffiliateConfig.cloudflare.affiliateId;
    try {
        registrarAffiliateConfig.cloudflare.enabled = false;
        registrarAffiliateConfig.cloudflare.affiliateId = 'should-not-show';
        const url = 'https://dash.cloudflare.com/?to=/:account/domains/register/test.com';
        const link = buildAffiliateSearchLink('cloudflare', url, 'test.com');
        assert.equal(link, url);
    } finally {
        registrarAffiliateConfig.cloudflare.enabled = origEnabled;
        registrarAffiliateConfig.cloudflare.affiliateId = origId;
    }
});

test('domain-affiliates: rel attribute is noopener sponsored', () => {
    assert.equal(AFFILIATE_LINK_REL, 'noopener sponsored');
});
