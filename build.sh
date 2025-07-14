#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Copy the SPA routing configuration files to the build directory
cp vercel.json dist/
cp public/_redirects dist/

echo "Build completed successfully!"