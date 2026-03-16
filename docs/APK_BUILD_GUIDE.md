# Building APK from Ionic Angular App

## Overview

Your mobile app uses **Capacitor** (not Cordova) for native integration. The build process has 3 stages:

```
Angular App (TypeScript) → Web Build (HTML/CSS/JS) → Capacitor → Android Studio → APK
```

## Prerequisites

### 1. Android Development Kit (Required)
```bash
# Check if you have Android SDK installed
echo $ANDROID_HOME

# If not installed, install Android Studio:
# - Download from: https://developer.android.com/studio
# - During setup, install Android SDK (API level 33 as per your config)
# - Accept the licenses: sdkmanager --licenses
```

### 2. Java Development Kit
```bash
# Verify Java is installed
java -version

# If not: install JDK 17+
# Ubuntu: sudo apt-get install openjdk-17-jdk
```

### 3. Gradle (Usually installed with Android Studio)
```bash
gradle --version
```

## Step-by-Step Build Process

### Step 1: Build the Angular Web App

```bash
cd /home/arazek/workspace/sleepydev/mobile-app-template

# Build for production (optimized)
npm run build -- --configuration production

# This creates: dist/apps/mobile-app/
# Capacitor will use this directory
```

**What happens:**
- Angular compiles TypeScript → JavaScript
- Builds production bundle (minified, tree-shaken)
- Output goes to `dist/apps/mobile-app/` (configured in `capacitor.config.json`)

### Step 2: Sync Web Build to Native Project

```bash
# Install Capacitor CLI (if not already done)
npm install -g @capacitor/cli

# Sync the web build to Android project
npx cap sync android

# Or just update the web assets
npx cap copy android
```

**What happens:**
- Copies your `dist/apps/mobile-app/` to native Android project
- Updates native configuration from `capacitor.config.json`

### Step 3: Build APK with Android Studio/Gradle

#### Option A: Using Gradle (Command Line - Fastest)

```bash
# Navigate to Android project
cd android

# Build debug APK
./gradlew assembleDebug

# Build release APK (requires signing)
./gradlew assembleRelease

# Output APK locations:
# Debug: android/app/build/outputs/apk/debug/app-debug.apk
# Release: android/app/build/outputs/apk/release/app-release.apk
```

#### Option B: Using Android Studio (GUI)

```bash
# Open Android Studio with the Android project
open android/
# OR
android/gradlew openStudio

# In Android Studio:
# 1. Click "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"
# 2. Wait for build to complete
# 3. Find APK in: android/app/build/outputs/apk/
```

## Complete Build Script

Create `build-apk.sh`:

```bash
#!/bin/bash

echo "📱 Building APK from Ionic Angular App"
echo "======================================="

# Step 1: Build Angular
echo "1️⃣  Building Angular web app..."
npm run build:app
if [ $? -ne 0 ]; then echo "❌ Build failed"; exit 1; fi

# Step 2: Sync to Android
echo "2️⃣  Syncing to Android project..."
npx cap sync android
if [ $? -ne 0 ]; then echo "❌ Sync failed"; exit 1; fi

# Step 3: Build APK
echo "3️⃣  Building APK..."
cd android
./gradlew assembleDebug
if [ $? -ne 0 ]; then echo "❌ Gradle build failed"; exit 1; fi

echo ""
echo "✅ APK Build Complete!"
echo "📦 APK Location: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
```

Run it:
```bash
chmod +x build-apk.sh
./build-apk.sh
```

## Your Project Configuration

### Current Settings (capacitor.config.json)

```json
{
  "appId": "com.example.mobileapp",
  "appName": "Mobile App Template",
  "webDir": "dist/apps/mobile-app",      ← Web build output
  "android-minSdkVersion": "22",         ← Minimum Android version
  "android-targetSdkVersion": "33"       ← Target Android version
}
```

### Before Release Build: Update

```json
{
  "appId": "com.yourcompany.yourapp",    ← Change to your package name
  "appName": "Your App Name"              ← Your app's display name
}
```

## Debug vs Release APK

| Feature | Debug APK | Release APK |
|---------|-----------|------------|
| **Size** | Larger (~50MB) | Smaller (~20-30MB) |
| **Performance** | Slower | Optimized |
| **Signing** | Automatic | Requires key signing |
| **Installation** | Direct on dev devices | Play Store only |
| **Build Time** | ~2-3 minutes | ~3-5 minutes |
| **Use Case** | Testing & development | Production release |

## Testing the APK

### Install on Device/Emulator

```bash
# Start Android emulator or connect device
adb devices

# Install APK
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Uninstall
adb uninstall com.example.mobileapp

# View logs
adb logcat | grep "mobile-app"
```

## Release Build (Play Store)

### 1. Generate Signing Key

```bash
keytool -genkey -v -keystore mobile-app.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias mobile-app-key

# Save the keystore file safely!
```

### 2. Update gradle.properties

```properties
# android/gradle.properties
KEYSTORE_FILE=../mobile-app.keystore
KEYSTORE_PASSWORD=your-keystore-password
KEY_ALIAS=mobile-app-key
KEY_PASSWORD=your-key-password
```

### 3. Build Release APK

```bash
cd android
./gradlew assembleRelease

# Upload to Play Console:
# https://play.google.com/console
```

## Troubleshooting

### Issue: "Android SDK not found"
```bash
# Set ANDROID_HOME
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Issue: "Gradle build failed"
```bash
# Clear Gradle cache
./gradlew clean

# Try again
./gradlew assembleDebug
```

### Issue: "App crashes on startup"
```bash
# Check backend API connection in environment
# Make sure http://your-api:3333 is accessible from mobile

# View logs
adb logcat | grep "Exception"
```

## File Structure After Build

```
mobile-app-template/
├── dist/apps/mobile-app/          ← Angular build output
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── android/                        ← Native Android project
│   ├── app/
│   │   └── build/outputs/apk/     ← APK OUTPUT HERE
│   │       ├── debug/
│   │       │   └── app-debug.apk  ← Use this for testing
│   │       └── release/
│   │           └── app-release.apk ← Use for Play Store
│   ├── gradle/
│   └── gradlew                     ← Gradle wrapper
└── capacitor.config.json           ← Configuration
```

## Next Steps for Your Project

1. **Install Android SDK**
   ```bash
   # Install Android Studio first
   # Then set ANDROID_HOME environment variable
   ```

2. **Initialize Android Project** (if not done)
   ```bash
   npx cap add android
   ```

3. **Build Web App**
   ```bash
   npm run build
   ```

4. **Sync and Build**
   ```bash
   npx cap sync android
   cd android
   ./gradlew assembleDebug
   ```

5. **Test on Emulator**
   ```bash
   adb install -r app/build/outputs/apk/debug/app-debug.apk
   ```

---

**Note**: Your backend API runs on port 3333. Make sure the mobile app can reach it!
For local testing: change `http://localhost:3333` to your computer's IP address.
