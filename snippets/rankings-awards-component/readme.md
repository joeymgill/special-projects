Rankings & Awards Component
A responsive, accessibility-conscious card component adapted from a production CMS component I designed and developed for a university website.
The original implementation integrates with Modern Campus CMS and an XSLT publishing workflow. This repository is a CMS-independent demonstration using static sample content and generic visual branding.
Features
Responsive three-column desktop and two-column tablet layouts
Centered incomplete grid rows
Touch-friendly single-card mobile carousel
Previous and next navigation with disabled boundary states
Programmatically associated carousel instructions
Live-region slide announcements
Text, icon, and image visual treatments
Keyboard-visible focus states
Reduced-motion support
Progressive enhancement
Reusable BEM-style CSS architecture

Production Architecture

CMS field data
      ↓
XSLT transformation
      ↓
semantic component HTML
      ↓
CSS + JavaScript
