#!/bin/bash

echo "🚀 Installing DealScope with MongoDB for High Traffic..."

# Clean any existing installations
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Payload types
echo "🔧 Generating Payload types..."
npm run generate:types

# Build Payload admin panel
echo "🏗️ Building Payload admin panel..."
npm run build:payload

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    echo "✅ MongoDB CLI found"
else
    echo "⚠️ MongoDB CLI not found. Please install MongoDB:"
    echo "   - macOS: brew install mongodb/brew/mongodb-community"
    echo "   - Ubuntu: sudo apt-get install mongodb"
    echo "   - Windows: Download from https://www.mongodb.com/try/download/community"
fi

# Start MongoDB if not running
if ! pgrep -x "mongod" > /dev/null; then
    echo "🚀 Starting MongoDB..."
    if command -v brew &> /dev/null; then
        brew services start mongodb/brew/mongodb-community
    elif command -v systemctl &> /dev/null; then
        sudo systemctl start mongod
    else
        echo "⚠️ Please start MongoDB manually"
    fi
fi

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy .env.example to .env.local:"
echo "   cp .env.example .env.local"
echo ""
echo "2. Update MongoDB URI in .env.local:"
echo "   MONGODB_URI=mongodb://localhost:27017/dealscope"
echo ""
echo "3. Seed the database:"
echo "   npm run seed"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Access the application:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   ⚙️ Admin Panel: http://localhost:3000/admin"
echo "   📧 Login: admin@dealscope.com / admin123"
echo ""
echo "🚀 Ready for high traffic with MongoDB!"
