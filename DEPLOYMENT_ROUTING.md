# SPA Routing Configuration

This document explains how to configure your hosting platform to handle client-side routing for this React SPA.

## The Problem

When users navigate directly to routes like `/rantakalkylator`, the server tries to find a file at that path. Since it doesn't exist, it returns a 404 error. However, when navigating from the homepage, React Router handles the routing on the client side, which works fine.

## Solution

The server needs to be configured to serve `index.html` for all routes that don't match actual files, allowing React Router to handle the routing.

## Configuration by Platform

### ✅ Netlify / Cloudflare Pages
The `public/_redirects` file has been created and will automatically work for these platforms.

### ✅ Vercel
The `vercel.json` file has been created and will automatically work.

### ⚠️ AWS S3 + CloudFront

If you're using AWS S3 + CloudFront (which seems likely based on your error message), you need to configure CloudFront error pages:

1. **Go to CloudFront Console**
2. **Select your distribution**
3. **Go to "Error Pages" tab**
4. **Create Custom Error Response:**
   - HTTP Error Code: `404: Not Found`
   - Customize Error Response: `Yes`
   - Response Page Path: `/index.html`
   - HTTP Response Code: `200: OK`
5. **Save the changes**
6. **Invalidate the CloudFront cache** (optional but recommended):
   - Go to "Invalidations" tab
   - Create invalidation with path: `/*`

### Alternative: AWS S3 Website Configuration

If you're using S3 static website hosting (not CloudFront), you can use S3's error document feature:

1. Go to S3 bucket properties
2. Enable "Static website hosting"
3. Set "Error document" to `index.html`

### Alternative: Lambda@Edge Function

For more advanced control, you can use a Lambda@Edge function to rewrite all requests to `index.html` except for actual files.

## Testing

After deploying the configuration:

1. Clear your browser cache
2. Try accessing `https://www.kalkylatorn.com/rantakalkylator` directly
3. It should now work instead of showing a 404


