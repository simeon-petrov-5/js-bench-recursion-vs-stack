import fs from 'fs';
import path from 'path';

/**
 * Save Markdown content to a file
 * @param {string} content - The Markdown content to save
 * @param {string} filename - Name of the file (defaults to README.md)
 * @param {string} directory - Directory to save the file (defaults to current directory)
 */

export function saveMdFile(content, filename = 'README.md', directory = process.cwd()) {
  // Ensure the directory exists
  try {
    // Create directory if it doesn't exist
    fs.mkdirSync(directory, { recursive: true });

    // Full path to the file
    const filePath = path.join(directory, filename);

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`Markdown file saved: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error saving Markdown file:', error);
    throw error;
  }
}