<template>
    <div class="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div class="text-center">
         <!-- 404 Icon  -->
        <div class="text-9xl mb-4">🔍</div>
        
        <!-- Error Message  -->
        <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p class="text-2xl text-gray-600 mb-8">
          Page Not Found
        </p>
        <p class="text-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <!-- Back to Home Button  -->
        <RouterLink 
          to="/"
          class="inline-block px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          ← Back to Home
        </RouterLink>
      </div>
    </div>

</template>

