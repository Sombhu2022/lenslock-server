# Project WEB BCA

**Team Members**: Smriti, Koyel, Subhankar, Meghadri

## System Design

### Photographer Flow:

-   Account creation and login
-   Create buckets (collections of images/videos)
-   Generate and share QR codes with access credentials
-   Manage bucket access permissions
-   View and respond to access requests

### User Flow:

-   Browse available studios/photographers
-   Request access to specific buckets
-   View approved media content
-   Like/interact with media
-   Download shared media (if permitted)

## Core Features

-   Secure user authentication system
-   QR-code based media sharing
-   Access request/approval workflow
-   Media organization in buckets
-   Studio profile management
-   Responsive web interface
-   Cloud-based media storage

## Technology Stack

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| ReactJS           | Frontend Library       |
| Zustand           | State Management       |
| Tailwind CSS      | CSS Framework          |
| React Icon        | Icon Library           |
| Node + Express.JS | Backend & API Creation |
| MongoDB           | Database               |
| Cloudinary        | Media Storage          |
| Nodemailer        | Email Service          |
| Zod               | Data Validation        |
| BcryptJS          | Password Hashing       |

## Database Models

### 1. User Model

```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['photographer', 'client'], default: 'client' },
  profilePicture: {
    url: String,
    publicId: String
  },
  createdAt: { type: Date, default: Date.now }
}
```

### 2. Studio Model (Meghadri)

```javascript
{
  photographer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  location: {
    address: String,
    city: String,
    coordinates: [Number] // [longitude, latitude]
  },
  contact: {
    phoneNumber: { type: String, required: true },
    email: String,
    socialMedia: {
      instagram: String,
      facebook: String
    }
  },
  images: [{
    url: String,
    publicId: String,
    isPrimary: Boolean
  }],
  workingHours: {
    open: String,
    close: String,
    days: [String] // ['Monday', ...]
  }
}
```

### 3. Photographer Model (Subhankar)

```javascript
{
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  experience: {
    years: Number,
    specialization: [String] // ['Wedding', 'Portrait', ...]
  },
  equipment: [String],
  awards: [{
    name: String,
    year: Number
  }],
  bio: String,
  portfolioLink: String,
  isVerified: { type: Boolean, default: false }
}
```

### 4. Bucket Model (Smriti)

```javascript
{
  studio: { type: Schema.Types.ObjectId, ref: 'Studio', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  tags: [String],
  qrCode: {
    url: String,
    publicId: String
  },
  shareLink: { type: String, unique: true },
  accessList: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    accessLevel: { type: String, enum: ['view', 'download'] },
    grantedAt: Date
  }],
  accessRequests: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    message: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
```

### 5. Media Model (Smriti)

```javascript
{
  bucket: { type: Schema.Types.ObjectId, ref: 'Bucket', required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mediaType: { type: String, enum: ['image', 'video', 'audio'], required: true },
  file: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    format: String,
    size: Number,
    dimensions: {
      width: Number,
      height: Number
    }
  },
  metadata: {
    title: String,
    description: String,
    captureDate: Date,
    location: String,
    cameraSettings: {
      iso: Number,
      shutterSpeed: String,
      aperture: String
    }
  },
  likes: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    likedAt: { type: Date, default: Date.now }
  }],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### 6. Request Model (Koyel)

```javascript
{
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bucket: { type: Schema.Types.ObjectId, ref: 'Bucket', required: true },
  mediaItems: [{
    media: { type: Schema.Types.ObjectId, ref: 'Media' },
    accessLevel: { type: String, enum: ['view', 'download'] }
  }],
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'partially-approved'],
    default: 'pending'
  },
  responseMessage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
```

## API Endpoints (Outline)

### Authentication

-   POST /api/auth/register - User registration

-   POST /api/auth/login - User login

-   GET /api/auth/me - Get current user profile

### Studio

-   POST /api/studios - Create studio profile

-   GET /api/studios - List all studios

-   GET /api/studios/:id - Get studio details

### Buckets

-   POST /api/buckets - Create new bucket

-   GET /api/buckets/:id - Get bucket details

-   POST /api/buckets/:id/share - Generate share link/QR

### Media

-   POST /api/media - Upload media

-   GET /api/media/:id - Get media details

-   POST /api/media/:id/like - Like media

### Requests

-   POST /api/requests - Create access request

-   GET /api/requests - List requests (photographer view)

-   PUT /api/requests/:id - Update request status

<!-- Work Distribution
Smriti:

Bucket Model & Media Model design

Media upload/download functionality

QR code generation

Koyel:

Request Model design

Access request workflow

Notification system

Subhankar:

Photographer Model

User authentication

Profile management

Meghadri:

Studio Model

Location services

Studio profile pages

``` -->
