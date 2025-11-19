# Google AdSense Program Policies Compliance Guide

## Required for AdSense Approval

### 1. **Privacy Policy** ✅ REQUIRED
- **MUST** be accessible from every page (typically in footer)
- **MUST** disclose:
  - Use of cookies and similar technologies
  - Third-party ad serving (Google AdSense)
  - Data collection practices
  - User rights (especially for EU users under GDPR)
  - Contact information
- **MUST** be in Swedish (since your site is Swedish)

### 2. **Cookie Policy / Cookie Consent** ✅ REQUIRED (EU/GDPR)
- **MUST** comply with GDPR if serving EU users
- **MUST** show cookie consent banner before ads load
- **MUST** allow users to opt-out of non-essential cookies
- **MUST** explain what cookies are used and why

### 3. **Terms of Service** ⚠️ RECOMMENDED
- Not strictly required but highly recommended
- Protects you legally
- Shows professionalism

## AdSense Implementation Requirements

### 4. **Ad Placement Rules**
- ✅ Maximum 3 ad units per page (you have 2 banners + 2 sidebars = 4 total, need to reduce)
- ✅ Ads must be clearly distinguishable from content
- ✅ No ads that look like navigation or download buttons
- ✅ No ads placed in a way that encourages accidental clicks
- ✅ No ads above the fold that push content below (be careful with sticky top banner)

### 5. **Content Requirements**
- ✅ Original, valuable content (your calculators qualify)
- ✅ No prohibited content (adult, violence, hate speech, etc.)
- ✅ Sufficient content on each page (not just ads)
- ✅ No copyright infringement

### 6. **Invalid Click Activity - STRICTLY PROHIBITED**
- ❌ **NEVER** click your own ads
- ❌ **NEVER** ask others to click your ads
- ❌ **NEVER** use automated tools to generate clicks
- ❌ **NEVER** place ads in a way that encourages accidental clicks
- ❌ **NEVER** use misleading labels like "Click here" near ads

### 7. **Ad Labeling**
- ✅ Ads should be clearly labeled (AdSense does this automatically)
- ✅ Use clear visual separation between ads and content
- ✅ Don't use misleading text near ads

### 8. **Technical Requirements**
- ✅ AdSense script properly loaded (already done in index.html)
- ✅ Valid HTML structure
- ✅ Mobile-responsive design
- ✅ Fast page load times

## Implementation Checklist

- [x] AdSense script added to index.html
- [ ] Privacy Policy page created and linked in footer
- [ ] Cookie Policy page created and linked in footer
- [ ] Cookie consent banner implemented
- [ ] Terms of Service page created (recommended)
- [ ] Footer updated with policy links
- [ ] Ad components properly implement AdSense
- [ ] Ad placement verified (max 3 per page)
- [ ] Test ad implementation in development

## Important Notes

1. **Ad Limit**: You currently have 4 ad placements (2 banners + 2 sidebars). AdSense allows max 3 per page. Consider:
   - Remove one sidebar on mobile
   - Or show only 1 sidebar on desktop
   - Or alternate which sidebar shows

2. **Cookie Consent**: Since you're serving EU users (Swedish site), you MUST implement cookie consent before ads load. This is legally required.

3. **Testing**: Use AdSense test ads during development. Never click your own ads, even for testing.

4. **Approval Process**: After implementation, submit for AdSense approval. This can take 1-14 days.

## Next Steps

1. Create Privacy Policy page
2. Create Cookie Policy page  
3. Create Terms of Service page
4. Implement cookie consent banner
5. Update Footer with policy links
6. Update AdBanner and AdSidebar components with proper AdSense code
7. Verify ad placement limits
8. Test implementation
9. Submit for AdSense approval

