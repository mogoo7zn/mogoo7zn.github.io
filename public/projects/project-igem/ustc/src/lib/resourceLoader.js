/**
 * Resource Loader Utility
 * Handles pre-loading of critical resources and side-effect execution
 */

// Registry for side effects that need to run after loading
const sideEffectsRegistry = [];

/**
 * Register a side effect to be run after resources are loaded
 * @param {Function} effect - The function to execute
 */
export const registerSideEffect = (effect) => {
  sideEffectsRegistry.push(effect);
};

/**
 * Execute all registered side effects
 */
export const executeSideEffects = async () => {
  console.log('🚀 Executing post-load side effects...');
  try {
    await Promise.all(sideEffectsRegistry.map((effect) => effect()));
    console.log('✅ All side effects executed successfully');
  } catch (error) {
    console.error('❌ Error executing side effects:', error);
  }
};

/**
 * Load critical resources dynamically
 * This function uses dynamic imports to load heavy components/libraries
 * @returns {Promise<void>}
 */
export const loadCriticalResources = async () => {
  console.log('📦 Starting resource loading...');
  const startTime = Date.now();

  try {
    // Define resources to load here
    // Example: const heavyLib = import('heavy-lib');

    // We can add specific dynamic imports here if needed by the user
    // For now, we simulate the loading phase or wait for specific signals

    // You can add actual dynamic imports here, e.g.:
    // await Promise.all([
    //   import('../components/some-heavy-component'),
    //   import('../lib/some-heavy-logic')
    // ]);

    const loadTime = Date.now() - startTime;
    console.log(`📦 Resources loaded in ${loadTime}ms`);

    return true;
  } catch (error) {
    console.error('❌ Resource loading failed:', error);
    throw error;
  }
};
