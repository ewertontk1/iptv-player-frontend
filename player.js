/**
 * player.js
 * Script para abrir vídeos diretamente no VLC via Node.js
 */

const { spawn } = require("child_process");
const os = require("os");
const path = require("path");
const fs = require("fs");

// 🔧 Ajuste aqui o link ou arquivo que deseja abrir no VLC
const streamUrl = "http://imperiotv.cloud/movie/Evertonviamar/185675284/12345.mp4";

// Função para detectar caminho do VLC conforme o sistema operacional
function getVlcPath() {
  const platform = os.platform();

  if (platform === "win32") {
    // Windows 64/32 bits
    const possiblePaths = [
      "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe",
      "C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe"
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) return p;
    }
    return "vlc"; // fallback se estiver no PATH
  }

  if (platform === "darwin") {
    // macOS
    return "/Applications/VLC.app/Contents/MacOS/VLC";
  }

  // Linux ou outros
  return "vlc";
}

// Caminho detectado
const vlcPath = getVlcPath();

// Executa o VLC
console.log(`🎬 Abrindo no VLC: ${streamUrl}`);
const vlc = spawn(vlcPath, [streamUrl, "--fullscreen"], {
  detached: true,
  stdio: "ignore"
});

vlc.unref();
