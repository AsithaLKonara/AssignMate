# Assignment Assistant Tool

AI-powered assignment assistant built with Next.js 16, featuring PDF upload, GPT-4 answer generation, and document export capabilities.

## Features

- 📄 **PDF Upload & Parsing**: Upload PDF files and extract text automatically
- 🤖 **AI Answer Generation**: Get comprehensive answers using GPT-4
- ✍️ **Answer Rewriting**: Improve answer clarity and readability
- 📥 **Document Export**: Download answers as PDF or DOCX
- 👤 **User Authentication**: JWT-based authentication with MongoDB
- 📚 **Assignment History**: Save and manage your assignment history
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **AI**: OpenAI GPT-4
- **PDF Parsing**: pdf-parse
- **Export**: pdfkit, docx

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ASSign
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | No |

## Project Structure

```
app/
├── api/              # API routes
│   ├── auth/        # Authentication endpoints
│   ├── assignments/ # Assignment CRUD
│   └── ...          # Other API routes
├── upload/          # Upload page
├── result/          # Result display page
├── history/         # Assignment history page
├── login/           # Login page
└── register/        # Registration page

components/          # React components
lib/                 # Utility functions
models/              # MongoDB models
middleware.ts        # Next.js middleware
```

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Assignments
- `POST /api/parse-pdf` - Parse PDF file
- `POST /api/generate-answer` - Generate answer using GPT-4
- `POST /api/rewrite-answer` - Rewrite answer for clarity
- `POST /api/export-pdf` - Export as PDF
- `POST /api/export-docx` - Export as DOCX
- `POST /api/save-assignment` - Save assignment (authenticated)
- `GET /api/assignments` - Get assignment history (authenticated)
- `GET /api/assignments/[id]` - Get single assignment (authenticated)
- `DELETE /api/assignments/[id]` - Delete assignment (authenticated)

## Usage

1. **Upload Assignment**: 
   - Go to `/upload`
   - Upload a PDF or paste your question
   - Click "Generate Answer"

2. **View Results**:
   - Review the generated answer
   - Optionally rewrite for clarity
   - Download as PDF or DOCX
   - Save to history (requires login)

3. **Manage History**:
   - Login or register at `/login` or `/register`
   - View saved assignments at `/history`
   - Search, view, or delete assignments

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform:
- `OPENAI_API_KEY`
- `MONGODB_URI`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## License

ISC

## Support

For issues and questions, please open an issue on GitHub.

