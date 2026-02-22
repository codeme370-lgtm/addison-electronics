# Cloudinary Integration Setup Guide

Your app is now configured to use **Cloudinary** for all image uploads instead of base64 data URIs. This provides better performance, storage, and CDN delivery.

## ✅ What Changed

### Updated Files:
- **`app/api/store/upload/route.js`** - Now uploads images directly to Cloudinary instead of using base64

## 🔑 Required Environment Variables

Add the following to your `.env.local` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=jeeshop
```

## 📝 Steps to Get Cloudinary Credentials

1. **Create a Cloudinary Account**
   - Go to https://cloudinary.com
   - Sign up for a free account
   
2. **Find Your Cloud Name**
   - Log in to your Cloudinary dashboard
   - Your Cloud Name is displayed at the top of the dashboard (e.g., `djxxxxxx`)

3. **Get Your API Keys**
   - Go to Settings → API Keys (or Account)
   - Copy your API Key and API Secret
   - ⚠️ **IMPORTANT**: Keep your API Secret private! Don't commit it to version control

4. **Create an Upload Preset (Optional but Recommended)**
   - Go to Settings → Upload
   - Scroll to "Upload presets"
   - Click "Create unsigned upload preset" (if you want client-side uploads later)
   - Name it `jeeshop`
   - This allows flexible folder organization

## 🏗️ Folder Structure in Cloudinary

Images uploaded through your app will be organized in:
```
jeeshop/
└── products/
    ├── product1.jpg
    ├── product2.jpg
    └── ...
```

You can modify this in `app/api/store/upload/route.js` line 49:
```javascript
cloudinaryFormData.append("folder", "jeeshop/products");
```

## ✨ Features Enabled

✅ **Add Products** - Upload product images (all supported formats)  
✅ **Create Store** - Store logo uploads (currently disabled in create API, can be enabled)  
✅ **Image CDN** - All images served from Cloudinary's global CDN  
✅ **Auto Optimization** - Images automatically optimized for web  
✅ **Transformations** - Resize, crop, and apply effects (future enhancement)

## 🚀 Ready to Deploy

Once you add the environment variables:

```bash
npm run build
```

The build should now complete successfully with Cloudinary integration!

## 🔄 Switching Between Environments

**Development (`.env.local`)**
```env
CLOUDINARY_CLOUD_NAME=your_dev_cloud_name
CLOUDINARY_API_KEY=dev_key
CLOUDINARY_API_SECRET=dev_secret
```

**Production (`.env.production`)**
```env
CLOUDINARY_CLOUD_NAME=your_prod_cloud_name
CLOUDINARY_API_KEY=prod_key
CLOUDINARY_API_SECRET=prod_secret
```

## 🐛 Troubleshooting

**"Cloudinary configuration is missing"**
- Check that all three environment variables are set in `.env.local`
- Restart your dev server after adding environment variables

**Images not uploading**
- Verify your Cloud Name is correct
- Check that your API Key and Secret are valid
- Ensure the upload preset name matches (if using one)

**Rate limiting**
- Free tier: 500 uploads/hour per day
- Upgrade your plan if needed

## 📚 Next Steps (Optional Enhancements)

1. **Client-side uploads** - Upload directly from frontend using unsigned upload presets
2. **Image transformations** - Resize/optimize images on the fly
3. **Auto WebP conversion** - Serve modern image formats automatically
4. **Crop on upload** - Let users crop images before upload

See [Cloudinary Documentation](https://cloudinary.com/documentation) for these features.
