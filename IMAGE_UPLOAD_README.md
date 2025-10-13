# Image Upload Component

A modern, accessible drag-and-drop image upload component for React/Next.js applications.

## 🎯 Features

- **Drag & Drop**: Intuitive drag-and-drop interface
- **Click to Browse**: Traditional file input fallback
- **Image Preview**: Real-time preview of uploaded images
- **File Validation**: Type and size validation with user feedback
- **Error Handling**: Clear error messages for invalid files
- **Loading States**: Visual feedback during upload processing
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## 📦 Installation

The component is already included in the project at `src/components/ImageUpload.tsx`.

## 🚀 Usage

### Basic Usage

```tsx
import ImageUpload from '../components/ImageUpload';

function MyComponent() {
  const handleImageUpload = (file: File) => {
    console.log('Uploaded:', file);
    // Handle the uploaded file
  };

  return (
    <ImageUpload onImageUpload={handleImageUpload} />
  );
}
```

### Advanced Usage

```tsx
<ImageUpload 
  onImageUpload={handleImageUpload}
  maxSize={10} // 10MB limit
  acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
  className="w-full max-w-md"
/>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onImageUpload` | `(file: File) => void` | **Required** | Callback function called when a file is uploaded |
| `maxSize` | `number` | `5` | Maximum file size in MB |
| `acceptedTypes` | `string[]` | `['image/jpeg', 'image/png', 'image/gif', 'image/webp']` | Array of accepted MIME types |
| `className` | `string` | `''` | Additional CSS classes |

## 🎨 Styling

The component uses Tailwind CSS classes and is fully customizable. You can override styles by passing custom classes or modifying the component.

### Default Styling
- Purple theme with hover effects
- Gray borders and backgrounds
- Responsive design
- Loading animations

### Customization Example

```tsx
<ImageUpload 
  onImageUpload={handleUpload}
  className="border-2 border-blue-300 hover:border-blue-500"
/>
```

## 📱 Demo Pages

### 1. Upload Demo Page
Visit `/upload-demo` to see the component in action with examples and usage instructions.

### 2. Custom Orders Integration
The component is integrated into the `/custom-orders` page for uploading design files.

## 🔧 File Validation

### Supported File Types
- **JPEG** (.jpg, .jpeg) - Best for photographs
- **PNG** (.png) - Best for images with transparency
- **GIF** (.gif) - Animated images
- **WebP** (.webp) - Modern web format
- **SVG** (.svg) - Vector graphics (recommended for logos)

### Size Limits
- Default: 5MB maximum
- Configurable via `maxSize` prop
- User-friendly error messages for oversized files

### Validation Features
- Real-time file type checking
- File size validation
- Clear error messages
- Visual feedback for invalid files

## 🎯 Use Cases

### 1. Custom Shirt Designs
Let customers upload their own designs for custom printing:

```tsx
<ImageUpload 
  onImageUpload={handleDesignUpload}
  maxSize={15}
  acceptedTypes={['image/jpeg', 'image/png', 'image/svg+xml']}
/>
```

### 2. Logo Engraving
Upload company logos for water bottle or wood engraving:

```tsx
<ImageUpload 
  onImageUpload={handleLogoUpload}
  maxSize={10}
  acceptedTypes={['image/svg+xml', 'image/png']}
/>
```

### 3. Design Gallery
Create a gallery of customer designs:

```tsx
<ImageUpload 
  onImageUpload={addToGallery}
  maxSize={8}
  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
/>
```

## 🛠️ Technical Details

### Browser Support
- Modern browsers with drag-and-drop API support
- Graceful fallback to click-to-browse for older browsers
- Mobile-friendly touch interactions

### Performance
- File size validation before processing
- Efficient image preview generation
- Minimal re-renders with React hooks

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus management

## 🔍 Troubleshooting

### Common Issues

1. **Files not uploading**
   - Check file size limits
   - Verify accepted file types
   - Ensure proper event handling

2. **Preview not showing**
   - Check browser console for errors
   - Verify file is a valid image
   - Ensure FileReader API support

3. **Styling issues**
   - Check Tailwind CSS classes
   - Verify custom className prop
   - Ensure proper CSS loading

### Debug Mode

Enable console logging to debug upload issues:

```tsx
const handleImageUpload = (file: File) => {
  console.log('File details:', {
    name: file.name,
    size: file.size,
    type: file.type
  });
  // Your upload logic
};
```

## 🚀 Future Enhancements

Potential improvements for the ImageUpload component:

1. **Multiple File Upload**: Support for uploading multiple files at once
2. **Image Cropping**: Built-in image editing capabilities
3. **Cloud Storage**: Direct upload to cloud storage services
4. **Progress Tracking**: Upload progress indicators
5. **Image Compression**: Automatic image optimization
6. **Thumbnail Generation**: Multiple size previews

## 📄 License

This component is part of the DBA Personalizations project and follows the same licensing terms.

---

**Ready to use!** The ImageUpload component is now integrated into your application and ready for customers to upload their designs. 🎉
