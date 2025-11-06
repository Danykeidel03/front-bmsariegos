#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const imageExtensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const fileSizeKB = stats.size / 1024;
    
    console.log(`Optimizando: ${path.basename(inputPath)} (${fileSizeKB.toFixed(1)}KB)`);
    
    await sharp(inputPath)
      .webp({ 
        quality: 80,
        effort: 6
      })
      .toFile(outputPath);
      
    const newStats = fs.statSync(outputPath);
    const newSizeKB = newStats.size / 1024;
    const savings = ((fileSizeKB - newSizeKB) / fileSizeKB * 100).toFixed(1);
    
    console.log(`✓ Convertido a WebP: ${newSizeKB.toFixed(1)}KB (${savings}% reducción)`);
  } catch (error) {
    console.error(`Error optimizando ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const nameWithoutExt = path.basename(file, ext);
        const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
        
        // Solo convertir si el WebP no existe o es más antiguo
        if (!fs.existsSync(webpPath) || 
            fs.statSync(filePath).mtime > fs.statSync(webpPath).mtime) {
          await optimizeImage(filePath, webpPath);
        }
      }
    }
  }
}

async function main() {
  console.log('🖼️  Optimizando imágenes...\n');
  
  try {
    await processDirectory(publicDir);
    console.log('\n✅ Optimización completada');
  } catch (error) {
    console.error('❌ Error durante la optimización:', error);
    process.exit(1);
  }
}

main();