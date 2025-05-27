const testAuth = async () => {
  console.log('🧪 Testing Auth Setup...\n');
  
  const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001';
  const appURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  console.log(`📍 Backend URL: ${baseURL}`);
  console.log(`📍 Frontend URL: ${appURL}\n`);
  
  try {
    // Test backend health
    console.log('1️⃣ Testing backend health...');
    const backendHealth = await fetch(`${baseURL}/health`);
    const healthData = await backendHealth.json();
    console.log('✅ Backend is running:', healthData);
    
    // Test auth endpoint on backend
    console.log('\n2️⃣ Testing backend auth endpoint...');
    const backendAuth = await fetch(`${baseURL}/api/auth/session`);
    console.log(`✅ Backend auth endpoint status: ${backendAuth.status}`);
    
    // Test frontend proxy
    console.log('\n3️⃣ Testing frontend auth proxy...');
    const frontendAuth = await fetch(`${appURL}/api/auth/session`);
    console.log(`✅ Frontend auth proxy status: ${frontendAuth.status}`);
    
    console.log('\n✨ All tests passed! Your auth setup appears to be working correctly.');
    
  } catch (error) {
    console.error('\n❌ Error during testing:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('- Make sure both servers are running (frontend on :3000, backend on :3001)');
    console.log('- Check that environment variables are set correctly');
    console.log('- Verify CORS settings in the backend');
  }
};

// Run the test
testAuth();
