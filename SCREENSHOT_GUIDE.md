# 📸 Screenshot Placement Guide for FrostyLabs

This document outlines where to add screenshots and what images are needed for maximum impact.

## 🎯 Priority Images Needed

### HIGH PRIORITY (Add These First)

#### 1. **OG Image & Twitter Card** 
- **Location**: `/public/og-image.png` and `/public/twitter-image.png`
- **Size**: OG: 1200x630px, Twitter: 1200x630px (can be same image)
- **Content**: FrostyLabs logo + "Build AI Agents for Web3" tagline + visual of workflow canvas
- **Current**: Referenced in `app/layout.tsx` but files don't exist yet
- **Impact**: ⭐⭐⭐⭐⭐ - Shows when sharing on social media

#### 2. **Token Analyzer Workflow Screenshot**
- **Location**: First card in UseCases section (already has placeholder)
- **Size**: 16:9 aspect ratio (video aspect)
- **Content**: FrostyFlow canvas showing Token Analyzer workflow with nodes and connections
- **Current**: ScreenshotPlaceholder showing "Social Media Management Workflow"
- **Impact**: ⭐⭐⭐⭐⭐ - Proves the product works

#### 3. **DeFi Trading Workflow Screenshot**
- **Location**: Second card in UseCases section (already has placeholder)
- **Size**: 16:9 aspect ratio
- **Content**: DeFi workflow showing swap/stake operations
- **Current**: ScreenshotPlaceholder showing "DeFi Trading Workflow"
- **Impact**: ⭐⭐⭐⭐⭐ - Key use case visual proof

---

### MEDIUM PRIORITY

#### 4. **Main Demo Video**
- **Location**: `/public/recordings/short.mp4`
- **Duration**: 30-60 seconds
- **Content**: Full Token Analyzer workflow execution
- **Current**: Video element exists in VideoDemo component, file may not exist
- **Impact**: ⭐⭐⭐⭐ - Users see it in action

#### 5. **Workflow Builder Screenshot**
- **Location**: Referenced in schema markup (`screenshots/workflow-builder.png`)
- **Size**: 1600x1000px or similar
- **Content**: Clean view of FrostyFlow visual workflow builder
- **Current**: Referenced but doesn't exist
- **Impact**: ⭐⭐⭐⭐ - SEO and general screenshots

#### 6. **Smart Contract Deployment Workflow**
- **Location**: Third card in UseCases (already has placeholder)
- **Size**: 16:9 aspect ratio
- **Content**: EVM contract deployment workflow
- **Current**: ScreenshotPlaceholder
- **Impact**: ⭐⭐⭐ - Shows technical capability

---

### LOWER PRIORITY (Nice to Have)

#### 7-12. **Other Use Case Workflows**
- Customer Support
- eCommerce Automation  
- Content Creation
- All have placeholders ready in UseCases section
- **Impact**: ⭐⭐ - Good for completeness

---

## 📁 File Structure

```
/public/
├── og-image.png                    # ⭐ HIGH - Social sharing
├── twitter-image.png               # ⭐ HIGH - Twitter cards
├── recordings/
│   └── short.mp4                   # ⭐ HIGH - Main demo video
└── screenshots/
    ├── workflow-builder.png        # ⭐ MED - General screenshot
    ├── token-analyzer.png          # ⭐ HIGH - Use cases
    ├── defi-trading.png            # ⭐ HIGH - Use cases
    ├── smart-contract.png          # ⭐ MED - Use cases
    ├── customer-support.png        # Lower priority
    ├── ecommerce.png               # Lower priority
    └── content-creation.png        # Lower priority
```

---

## 🎨 Screenshot Guidelines

### For Workflow Screenshots:
1. **Clean canvas** - Remove test/debug nodes
2. **Good layout** - Arrange nodes in clear left-to-right flow
3. **Visible labels** - Make sure node titles are readable
4. **Show connections** - Lines between nodes should be clear
5. **Include results** - If possible, show output/results panel
6. **Dark theme** - Match the ice theme aesthetic
7. **High resolution** - At least 1920x1080 for 16:9 images

### For OG/Twitter Images:
1. **Branding** - FrostyLabs logo and name prominent
2. **Tagline** - "Build AI Agents for Web3" clearly visible
3. **Visual interest** - Workflow canvas in background
4. **Ice theme colors** - Use frost-blue, ice-blue palette
5. **Text readable** - Even when scaled down to thumbnail

---

## 🔄 How to Replace Placeholders

### For Use Case Screenshots:

**Current Code** (in `components/UseCases.tsx`):
```tsx
<ScreenshotPlaceholder
  title={`${useCase.title} Workflow`}
  description="Add a screenshot of this workflow in action from FrostyFlow"
  aspectRatio="video"
  priority={index < 2}
/>
```

**Replace With** (using Next.js Image):
```tsx
<Image
  src="/screenshots/token-analyzer.png"
  alt="Token Analyzer workflow showing parallel data fetching"
  width={1920}
  height={1080}
  className="rounded-lg border border-frost-blue/30"
  priority={index < 2}
/>
```

### For Video:

The video element already exists at `components/VideoDemo.tsx` line 59-70.
Just add the file to `/public/recordings/short.mp4`

---

## ✅ Checklist

- [ ] Create OG image (1200x630) → Save to `/public/og-image.png`
- [ ] Create Twitter image (1200x630) → Save to `/public/twitter-image.png`
- [ ] Record Token Analyzer demo → Save to `/public/recordings/short.mp4`
- [ ] Screenshot Token Analyzer workflow → Save to `/public/screenshots/token-analyzer.png`
- [ ] Screenshot DeFi workflow → Save to `/public/screenshots/defi-trading.png`
- [ ] Screenshot Smart Contract workflow → Save to `/public/screenshots/smart-contract.png`
- [ ] Screenshot workflow builder (general) → Save to `/public/screenshots/workflow-builder.png`
- [ ] Replace ScreenshotPlaceholder components with actual Image components
- [ ] Test social sharing (Twitter, LinkedIn, etc.)
- [ ] Verify schema.org structured data with Google Rich Results Test

---

## 🎯 Expected Impact

**With Screenshots:**
- ✅ Social shares look professional (not generic)
- ✅ Users can visualize using the product
- ✅ Conversion rate increases (visual proof)
- ✅ SEO improves (image alt text, schema data)
- ✅ Credibility increases (not vaporware)

**Without Screenshots:**
- ❌ Looks like a concept/mockup
- ❌ Users can't see how it works
- ❌ Generic social sharing cards
- ❌ Lower trust/conversion

---

## 📝 Tips for Recording

1. **Screen resolution**: Set to 1920x1080 before recording
2. **Clean workspace**: Close unnecessary tabs/apps
3. **Smooth execution**: Practice the workflow before recording
4. **Audio**: Optional, but consider adding background music
5. **Length**: Keep videos under 60 seconds
6. **Format**: MP4 with H.264 codec for best browser compatibility
7. **File size**: Compress to under 5MB for fast loading

---

## 🎨 Design Tool Recommendations

For creating OG/Twitter images:
- **Figma** - Best for design
- **Canva** - Quick and easy templates
- **Photoshop** - Full control
- Or use the generated images from screenshots with text overlay

For screen recording:
- **OBS Studio** (Free, powerful)
- **Loom** (Easy to use)
- **QuickTime** (Mac native)
- **Built-in screen recorder** on most OSes
