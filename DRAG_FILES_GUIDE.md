# 📁 Drag Files into Project Folders

This guide explains how to organize and drag files into your DBA Personalizations project folders for easy access and management.

## 🗂️ Folder Structure

Your project now has organized folders for different types of assets:

```
dba-personalization/
├── public/
│   └── assets/
│       └── images/
│           ├── products/     # Product photos and mockups
│           ├── designs/      # Customer design uploads
│           ├── gallery/      # Portfolio and showcase images
│           └── logos/        # Company logos and branding
├── src/
└── data/
```

## 📸 How to Add Files

### Method 1: Drag and Drop (Recommended)

1. **Open File Explorer** on your computer
2. **Navigate to your project** in VS Code or File Explorer
3. **Drag files** from your computer directly into the appropriate folders:
   - **Product images** → `public/assets/images/products/`
   - **Design files** → `public/assets/images/designs/`
   - **Gallery images** → `public/assets/images/gallery/`
   - **Logos** → `public/assets/images/logos/`

### Method 2: Copy and Paste

1. **Select files** from your computer
2. **Copy** them (Ctrl+C)
3. **Navigate to project folder** in File Explorer
4. **Paste** them (Ctrl+V)

### Method 3: VS Code Explorer

1. **Open VS Code**
2. **Right-click** on the target folder in the Explorer panel
3. **Select "Reveal in File Explorer"**
4. **Drag files** from your computer into the opened folder

## 🎯 Folder Usage Guide

### 📦 `products/` - Product Images
- **T-shirt mockups** and product photos
- **Before/after** printing examples
- **Material samples** (cotton, polyester, etc.)
- **Color swatches** and texture images

**Example files:**
- `tshirt-basic-white.jpg`
- `hoodie-black-front.png`
- `polo-shirt-mockup.psd`

### 🎨 `designs/` - Customer Designs
- **Uploaded designs** from customers
- **Custom artwork** for printing
- **Logo files** for personalization
- **Design proofs** and mockups

**Example files:**
- `customer-logo-design.ai`
- `wedding-party-design.png`
- `company-branding.eps`

### 🖼️ `gallery/` - Portfolio Images
- **Completed projects** showcase
- **Customer testimonials** with photos
- **Process videos** and behind-the-scenes
- **Awards and certifications**

**Example files:**
- `completed-order-123.jpg`
- `customer-testimonial.png`
- `workshop-photos.jpg`

### 🏷️ `logos/` - Branding Assets
- **Company logos** in various formats
- **Brand guidelines** and style guides
- **Social media assets**
- **Business cards** and letterhead

**Example files:**
- `dba-alvarado-logo.svg`
- `brand-guidelines.pdf`
- `business-card-design.ai`

## 🔧 File Organization Tips

### Naming Convention
Use descriptive, consistent names:
```
✅ Good: tshirt-cotton-white-front.jpg
✅ Good: customer-logo-acme-corp.png
❌ Bad: IMG_1234.jpg
❌ Bad: design.png
```

### File Formats
- **Images**: JPG, PNG, WebP, SVG
- **Designs**: AI, EPS, PSD, PDF
- **Documents**: PDF, DOC, TXT

### Folder Organization
Create subfolders for better organization:
```
products/
├── tshirts/
├── hoodies/
├── accessories/
└── mockups/

designs/
├── 2024/
├── logos/
└── custom/
```

## 🌐 Accessing Files in Your App

Once files are in the `public/assets/images/` folders, you can reference them in your React components:

```tsx
// Example usage in components
<img src="/assets/images/products/tshirt-basic-white.jpg" alt="Basic White T-Shirt" />

// In CSS
background-image: url('/assets/images/designs/customer-logo.png');

// Dynamic imports
import productImage from '/assets/images/gallery/completed-order.jpg';
```

## 🚀 Quick Start

1. **Open your project** in VS Code
2. **Expand the Explorer panel**
3. **Navigate to** `public/assets/images/`
4. **Drag your image files** directly into the appropriate folders
5. **Files will be available** at `/assets/images/[folder]/[filename]`

## 💡 Pro Tips

- **Keep file sizes reasonable** (< 5MB for web use)
- **Use descriptive filenames** for easy searching
- **Organize by date** or project type
- **Create thumbnails** for large images
- **Backup important files** to cloud storage

## 🔍 Finding Files

### In VS Code:
- Use **Ctrl+P** to search for files by name
- **Right-click** on folders to reveal in File Explorer
- Use the **Search** panel (Ctrl+Shift+F)

### In File Explorer:
- **Sort by date** to find recently added files
- **Use search** to find specific file types
- **Enable file extensions** for better identification

---

**Ready to organize!** Your project folders are set up and ready for you to drag and drop files. The organized structure will make it easy to manage assets and reference them in your application. 🎉
