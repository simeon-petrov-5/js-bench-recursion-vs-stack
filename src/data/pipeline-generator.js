// Utility to generate a random deep pipeline structure with configurable key injection
import { writeFileSync } from 'fs';

const generateRandomPipeline = (options = {}) => {
  // Default options
  const config = {
    totalKeys: 500,
    outputFilePath: './src/example-data/generated-pipeline.json',
    injectKey: {
      enabled: true,
      keyName: 'image',  // Default key to inject
      valueGenerator: () => `${imageTypes[randomNum(0, imageTypes.length - 1)]}-image`,
      frequency: 0.15,   // How often to inject (0-1)
      maxInstances: 50   // Maximum number of times to inject the key
    },
    ...options
  };
  
  // Counter to track the number of keys created
  let keyCount = 0;
  let injectedKeyCount = 0;
  
  // Task types for variation
  const taskTypes = ['build', 'test', 'deploy', 'validate', 'analyze', 'scan', 'backup', 'restore', 'monitor', 'notify'];
  const imageTypes = ['alpine', 'ubuntu', 'busybox', 'node', 'python', 'golang', 'rust', 'java', 'ruby', 'php'];
  
  // Generate a random string
  const randomString = () => Math.random().toString(36).substring(2, 8);
  
  // Generate a random number in range
  const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Should we inject the key at this node?
  const shouldInjectKey = () => {
    return config.injectKey.enabled && 
           Math.random() < config.injectKey.frequency &&
           injectedKeyCount < config.injectKey.maxInstances;
  };
  
  // Inject the configured key into an object
  const injectKeyIfNeeded = (obj) => {
    if (shouldInjectKey()) {
      // Don't add if the key already exists in this object
      if (!(config.injectKey.keyName in obj)) {
        obj[config.injectKey.keyName] = typeof config.injectKey.valueGenerator === 'function' 
                                       ? config.injectKey.valueGenerator() 
                                       : config.injectKey.valueGenerator;
        keyCount++;
        injectedKeyCount++;
      }
    }
    return obj;
  };
  
  // Generate resources section
  const generateResources = () => {
    const resources = [];
    const resourceCount = randomNum(3, 10);
    
    for (let i = 0; i < resourceCount; i++) {
      const resource = {
        name: `${randomString()}-resource`,
        type: Math.random() > 0.5 ? 'git' : 'registry-image',
        source: {}
      };
      
      if (resource.type === 'git') {
        resource.source = {
          uri: `https://github.com/example/${randomString()}.git`,
          branch: Math.random() > 0.7 ? 'develop' : 'main'
        };
      } else {
        resource.source = {
          repository: imageTypes[randomNum(0, imageTypes.length - 1)],
          tag: Math.random() > 0.6 ? 'latest' : `v${randomNum(1, 5)}.${randomNum(0, 9)}`
        };
      }
      
      // Inject key at resource level
      injectKeyIfNeeded(resource);
      
      // Inject key at source level
      injectKeyIfNeeded(resource.source);
      
      // Count keys
      keyCount += countKeys(resource);
      resources.push(resource);
    }
    
    return resources;
  };
  
  // Count keys in an object recursively
  const countKeys = (obj) => {
    let count = 0;
    
    for (const key in obj) {
      count++;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += countKeys(obj[key]);
      }
    }
    
    return count;
  };
  
  // Generate a nested task structure
  const generateNestedTasks = (depth = 0, maxDepth = 10, maxBranching = 3) => {
    if (depth >= maxDepth || keyCount >= config.totalKeys) {
      return null;
    }
    
    const taskName = `${taskTypes[randomNum(0, taskTypes.length - 1)]}-${depth}-${randomString()}`;
    const task = {
      task: taskName,
      file: `pipeline-tasks/${taskName}.yml`
    };
    
    keyCount += 2; // Count the basic keys
    
    // Optionally add the image key naturally (if not our special inject key)
    if (config.injectKey.keyName !== 'image') {
      task.image = `${imageTypes[randomNum(0, imageTypes.length - 1)]}-image`;
      keyCount++;
    }
    
    // Inject our custom key at the task level
    injectKeyIfNeeded(task);
    
    // Add handlers based on random chance and remaining keys
    const handlers = ['on_success', 'on_failure', 'on_abort', 'on_error'];
    
    // Shuffle handlers to get random selection
    for (let i = handlers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [handlers[i], handlers[j]] = [handlers[j], handlers[i]];
    }
    
    // Determine how many handlers to include
    const handlerCount = Math.min(randomNum(1, handlers.length), 
                                 Math.min(4, Math.floor((config.totalKeys - keyCount) / 10)));
    
    // Add selected handlers
    for (let i = 0; i < handlerCount; i++) {
      if (keyCount >= config.totalKeys) break;
      
      const handler = handlers[i];
      const nestedCount = randomNum(1, Math.min(maxBranching, 3));
      const nestedTasks = [];
      
      for (let j = 0; j < nestedCount; j++) {
        if (keyCount >= config.totalKeys) break;
        
        // Generate a subtask
        const nestedTask = generateNestedTasks(depth + 1, maxDepth, Math.max(1, maxBranching - 1));
        if (nestedTask) {
          nestedTasks.push(nestedTask);
        }
      }
      
      if (nestedTasks.length > 0) {
        const handlerObj = { do: nestedTasks };
        task[handler] = handlerObj;
        
        // Inject our key at the handler level
        injectKeyIfNeeded(handlerObj);
        
        keyCount += 2; // Count 'handler' and 'do' keys
      }
    }
    
    return task;
  };
  
  // Generate jobs section
  const generateJobs = () => {
    const jobs = [];
    const jobCount = randomNum(1, 5);
    
    for (let i = 0; i < jobCount; i++) {
      const job = {
        name: `job-${randomString()}`,
        plan: []
      };
      
      // Inject our key at the job level
      injectKeyIfNeeded(job);
      
      keyCount += 2; // 'name' and 'plan' keys
      
      // Add get steps
      const getCount = randomNum(1, 5);
      for (let j = 0; j < getCount; j++) {
        const getStep = {
          get: `resource-${randomString()}`,
          trigger: Math.random() > 0.5
        };
        
        // Add optional count
        if (Math.random() > 0.7) {
          getStep.count = randomNum(1, 20);
          keyCount++;
        }
        
        // Inject our key at the get step level
        injectKeyIfNeeded(getStep);
        
        keyCount += 2; // 'get' and 'trigger' keys
        job.plan.push(getStep);
      }
      
      // Add main task with possible nested structure
      const maxDepth = randomNum(5, 15);
      const mainTask = generateNestedTasks(0, maxDepth, randomNum(2, 4));
      if (mainTask) {
        job.plan.push(mainTask);
      }
      
      jobs.push(job);
    }
    
    return jobs;
  };
  
  // Generate additional configuration with randomly injected keys
  const generateConfig = (remainingKeys) => {
    if (remainingKeys <= 0) return null;
    
    const config = {
      platform: Math.random() > 0.5 ? 'linux' : 'windows',
      parameters: {}
    };
    
    // Inject our key at the config level
    injectKeyIfNeeded(config);
    
    keyCount += 2; // 'platform' and 'parameters' keys
    remainingKeys -= 2;
    
    // Add random parameters
    const paramCount = Math.min(remainingKeys, 20);
    for (let i = 0; i < paramCount; i++) {
      const paramName = `param-${randomString()}`;
      config.parameters[paramName] = randomString();
      keyCount++;
      
      // Occasionally make a parameter an object and inject our key there
      if (Math.random() > 0.7) {
        config.parameters[paramName] = { value: config.parameters[paramName] };
        keyCount++;
        injectKeyIfNeeded(config.parameters[paramName]);
      }
    }
    
    return config;
  };
  
  // Start building the pipeline
  const pipeline = {
    resources: generateResources(),
    jobs: []
  };
  
  // Inject key at top level
  injectKeyIfNeeded(pipeline);
  
  keyCount += 2; // 'resources' and 'jobs' keys
  
  // Keep adding jobs until we reach close to the target key count
  while (keyCount < config.totalKeys * 0.95) {
    const newJobs = generateJobs();
    pipeline.jobs = pipeline.jobs.concat(newJobs);
    
    // Safety check to avoid infinite loop
    if (pipeline.jobs.length > 20) break;
  }
  
  // Add random configuration to reach the target key count if needed
  if (keyCount < config.totalKeys) {
    pipeline.config = generateConfig(config.totalKeys - keyCount);
  }
  
  // Save the pipeline to a JSON file
  writeFileSync(config.outputFilePath, JSON.stringify(pipeline, null, 2));
  
  console.log(`Generated pipeline with ${keyCount} keys (target: ${config.totalKeys})`);
  console.log(`Injected key "${config.injectKey.keyName}" ${injectedKeyCount} times`);
  console.log(`Pipeline saved to ${config.outputFilePath}`);
  
  return {
    pipeline,
    keyCount,
    targetKeys: config.totalKeys,
    injectedKeyCount,
    injectedKeyName: config.injectKey.keyName,
    filePath: config.outputFilePath
  };
};

// Example usage with different configurations
// Default - injects 'image' keys
generateRandomPipeline({totalKeys:1000});