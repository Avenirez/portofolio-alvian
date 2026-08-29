import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read .env file manually if dotenv is not installed
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    });
  }
}

loadEnv();

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.log('\n======================================================');
  console.log('⚠️  VERCEL_TOKEN tidak ditemukan di file .env atau Environment Variable!');
  console.log('------------------------------------------------------');
  console.log('Cara Penggunaan:');
  console.log('1. Buat Personal Access Token di https://vercel.com/account/tokens');
  console.log('2. Buat file .env di root folder web-portfolio dan tambahkan:');
  console.log('   VERCEL_TOKEN=token_vercel_anda_di_sini');
  console.log('3. Jalankan kembali: npm run sync-vercel');
  console.log('======================================================\n');
  process.exit(1);
}

// Map framework slug to readable technology names
const frameworkMap = {
  nextjs: ['Next.js', 'React', 'TailwindCSS'],
  vite: ['React', 'Vite', 'JavaScript'],
  svelte: ['Svelte', 'Vite', 'JavaScript'],
  astro: ['Astro', 'React', 'TailwindCSS'],
  nuxtjs: ['Nuxt.js', 'Vue.js', 'TailwindCSS'],
  vue: ['Vue.js', 'Vite', 'JavaScript'],
  gatsby: ['Gatsby', 'React', 'GraphQL'],
  remix: ['Remix', 'React', 'TailwindCSS'],
  hexo: ['Hexo', 'JavaScript', 'HTML/CSS'],
  eleventy: ['11ty', 'HTML/CSS', 'JavaScript']
};

function formatTitle(name) {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Daftar nama/slug projek Vercel yang diabaikan (tahap development)
const IGNORED_PROJECTS = ['rezstore', 'frontend'];

async function syncVercel() {
  console.log('🔄 Menghubungi Vercel API...');
  try {
    const res = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`
      }
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Token Vercel tidak valid / Unauthorized. Periksa kembali VERCEL_TOKEN Anda.');
      }
      throw new Error(`Gagal mengambil data dari Vercel API. Status: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const vercelProjects = data.projects || [];

    console.log(`📦 Ditemukan ${vercelProjects.length} projek di akun Vercel Anda.\n`);

    // Load existing projectsData.js
    const projectsDataPath = path.resolve(__dirname, '../src/data/projectsData.js');
    let fileContent = fs.readFileSync(projectsDataPath, 'utf8');

    // Extract current projects array from file using evaluation / parsing or dynamic import
    const { projectsData: existingProjects = [] } = await import(`file://${projectsDataPath}?t=${Date.now()}`);

    let updatedCount = 0;
    let addedCount = 0;

    const mergedProjects = [...existingProjects];

    vercelProjects.forEach(vp => {
      // Abaikan jika projek termasuk dalam IGNORED_PROJECTS (masih tahap dev)
      const isIgnored = IGNORED_PROJECTS.some(ign => vp.name.toLowerCase().includes(ign));
      if (isIgnored) {
        console.log(`  🙈 [DIABAIKAN] Skipping projek dev: "${vp.name}"`);
        return;
      }
      const prodTarget = vp.targets?.production;
      const domain = prodTarget?.alias?.[0] || prodTarget?.url || `${vp.name}.vercel.app`;
      const demoUrl = domain.startsWith('http') ? domain : `https://${domain}`;

      const repoInfo = vp.link;
      let githubUrl = 'https://github.com/Avenirez';
      if (repoInfo && repoInfo.type === 'github' && repoInfo.repo) {
        githubUrl = `https://github.com/${repoInfo.org || repoInfo.owner || 'Avenirez'}/${repoInfo.repo}`;
      }

      const detectedTech = [...(frameworkMap[vp.framework] || ['React', 'JavaScript', 'TailwindCSS'])];

      // Auto-detect Backend & Database from Vercel Environment Variables if available
      if (Array.isArray(vp.env)) {
        const envKeys = vp.env.map(e => (e.key || '').toUpperCase());
        if (envKeys.some(k => k.includes('SUPABASE')) && !detectedTech.includes('Supabase')) {
          detectedTech.push('Supabase');
        }
        if (envKeys.some(k => k.includes('POSTGRES') || k.includes('PRISMA')) && !detectedTech.includes('PostgreSQL')) {
          detectedTech.push('PostgreSQL');
        }
        if (envKeys.some(k => k.includes('MONGO')) && !detectedTech.includes('MongoDB')) {
          detectedTech.push('MongoDB');
        }
        if (envKeys.some(k => k.includes('FIREBASE')) && !detectedTech.includes('Firebase')) {
          detectedTech.push('Firebase');
        }
        if (envKeys.some(k => k.includes('QRIS') || k.includes('MIDTRANS')) && !detectedTech.includes('QRIS Payment Gateway')) {
          detectedTech.push('QRIS Payment Gateway');
        }
      }

      const formattedName = formatTitle(vp.name);

      // Check if project already exists in projectsData by matching demoUrl or title/name
      const existingIndex = mergedProjects.findIndex(p => {
        const pDemo = (p.demoUrl || '').toLowerCase().replace(/https?:\/\//, '').replace(/\/$/, '');
        const vDemo = demoUrl.toLowerCase().replace(/https?:\/\//, '').replace(/\/$/, '');
        const pTitle = (p.title || '').toLowerCase();
        const vTitle = formattedName.toLowerCase();
        return pDemo === vDemo || pTitle.includes(vTitle) || vTitle.includes(pTitle);
      });

      if (existingIndex !== -1) {
        // Update URL & github if changed, keep existing rich metadata
        mergedProjects[existingIndex] = {
          ...mergedProjects[existingIndex],
          demoUrl: mergedProjects[existingIndex].demoUrl || demoUrl,
          githubUrl: mergedProjects[existingIndex].githubUrl || githubUrl
        };
        updatedCount++;
        console.log(`  ✓ Sync projek yang sudah ada: "${mergedProjects[existingIndex].title}"`);
      } else {
        // Add new project
        const maxId = mergedProjects.reduce((max, p) => Math.max(max, p.id || 0), 0);
        const newProject = {
          id: maxId + 1,
          title: formattedName,
          category: "frontend",
          categoryLabel: "Frontend & Web App",
          description: `Aplikasi web modern ${formattedName} yang dideploy otomatis di Vercel.`,
          fullDescription: `${formattedName} adalah projek web app yang dibangun menggunakan ${detectedTech.join(', ')} dan di-host di Vercel infrastructure dengan performa tinggi.`,
          image: "/projects/default-project.webp",
          demoUrl: demoUrl,
          githubUrl: githubUrl,
          technologies: detectedTech,
          featured: false,
          keyFeatures: [
            "Integrasi Vercel Deployment otomatis",
            "Desain antarmuka responsif",
            "Optimasi performa & SEO"
          ],
          challenges: "Memastikan proses CI/CD deployment otomatis berjalan lancar dan optimal."
        };

        mergedProjects.push(newProject);
        addedCount++;
        console.log(`  ✨ [BARU] Menambahkan projek baru dari Vercel: "${formattedName}" (${demoUrl})`);
      }
    });

    // Write back to projectsData.js file, preserving personalInfo, categories, techSkills
    const personalInfoMatch = fileContent.match(/export const personalInfo = [\s\S]*?;\n\n/);
    const categoriesMatch = fileContent.match(/export const categories = [\s\S]*?;\n\n/);
    const techSkillsMatch = fileContent.match(/export const techSkills = [\s\S]*?;/);

    const newProjectsDataString = `export const projectsData = ${JSON.stringify(mergedProjects, null, 2)};`;

    const updatedFileContent = `${personalInfoMatch ? personalInfoMatch[0] : ''}${categoriesMatch ? categoriesMatch[0] : ''}${newProjectsDataString}\n\n${techSkillsMatch ? techSkillsMatch[0] : ''}\n`;

    fs.writeFileSync(projectsDataPath, updatedFileContent, 'utf8');

    console.log(`\n🎉 BERHASIL SINKRONISASI!`);
    console.log(`- Total Projek Vercel: ${vercelProjects.length}`);
    console.log(`- Projek Terupdate: ${updatedCount}`);
    console.log(`- Projek Baru Ditambahkan: ${addedCount}`);
    console.log(`\n📁 File src/data/projectsData.js telah diperbarui.`);

  } catch (error) {
    console.error('\n❌ Terjadi Kesalahan:', error.message);
  }
}

syncVercel();
