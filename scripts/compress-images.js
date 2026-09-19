#!/usr/bin/env node

/**
 * Image compression for HueStory (image-heavy decor site)
 * Usage: npm run compress-images
 *        npm run compress-images:portfolio
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const CONFIG = {
  quality: 85,
  progressive: true,
  chromaSubsampling: "4:4:4",
  trellisQuantisation: true,
  overshootDeringing: true,
  optimizeScans: true,
};

const targetDir = process.argv[2] || "public/images";

let stats = { processed: 0, originalSize: 0, compressedSize: 0, errors: 0 };

function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function compressImage(filePath) {
  try {
    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;
    if (originalSize < 100 * 1024) return;

    const ext = path.extname(filePath).toLowerCase();
    const tempPath = filePath + ".tmp";
    const metadata = await sharp(filePath).metadata();
    let instance = sharp(filePath);

    if (ext === ".png") {
      instance = instance.png({ quality: CONFIG.quality, compressionLevel: 9 });
    } else if (ext === ".webp") {
      instance = instance.webp({ quality: CONFIG.quality });
    } else {
      instance = instance.jpeg({
        quality: CONFIG.quality,
        progressive: CONFIG.progressive,
        chromaSubsampling: CONFIG.chromaSubsampling,
        trellisQuantisation: CONFIG.trellisQuantisation,
        overshootDeringing: CONFIG.overshootDeringing,
        optimizeScans: CONFIG.optimizeScans,
      });
    }

    if (metadata.width && metadata.width > 2400) {
      instance = instance.resize(2400, null, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    await instance.toFile(tempPath);
    const newSize = fs.statSync(tempPath).size;

    if (newSize < originalSize * 0.95) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      stats.originalSize += originalSize;
      stats.compressedSize += newSize;
      stats.processed++;
      console.log(`✅ ${filePath}`);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (error) {
    stats.errors++;
    console.error(`❌ ${filePath}:`, error.message);
  }
}

async function main() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Directory not found: ${targetDir}`);
    process.exit(1);
  }
  const files = getAllImageFiles(targetDir);
  console.log(`Processing ${files.length} images in ${targetDir}\n`);
  for (const file of files) await compressImage(file);
  console.log(`\nDone: ${stats.processed} compressed, ${stats.errors} errors`);
}

main().catch(console.error);
