/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BLOG_DIR = path.join(__dirname, '../src/data/blog');
const BLOG_LIB_FILE = path.join(__dirname, '../src/lib/blog.ts');

function toKebabCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

// Minimal HTML template for the blog post
const generateHtmlTemplate = (title, mainKeyword) => `
<p>As we age, keeping our minds active is just as important as physical exercise. Whether you're looking for fun activities for yourself or a loved one, <strong>${title.toLowerCase()}</strong> can provide excellent mental stimulation.</p>

<h2>Why ${mainKeyword} Matters</h2>
<p>Research consistently shows that engaging in cognitively demanding tasks helps build cognitive reserve. This means that regular mental workouts can help delay the onset of age-related cognitive decline.</p>

<h2>Our Top Recommendations</h2>
<ul>
  <li><strong>Word Games:</strong> Excellent for vocabulary and recall. Try our <a href="/play/word-games">Word Puzzles</a>.</li>
  <li><strong>Memory Challenges:</strong> Great for short-term retention. Try our <a href="/play/memory-games">Memory Card Match</a>.</li>
  <li><strong>Trivia:</strong> Perfect for long-term memory retrieval. Explore our <a href="/play/nostalgia-trivia">Nostalgia Trivia</a>.</li>
</ul>

<h2>Getting Started Today</h2>
<p>You don't need to spend hours a day to see benefits. Just 15-20 minutes of daily practice can make a significant difference. Start building your habit today with our <a href="/daily-challenge">Daily Challenge</a>, which gives you 5 quick questions across different categories!</p>
`;

function createBlogFile(title, description, keyword) {
  const slug = toKebabCase(title);
  const date = new Date().toISOString().split('T')[0];
  const content = generateHtmlTemplate(title, keyword);

  const fileContent = `import type { BlogArticle } from "@/lib/blog";

const article: BlogArticle = {
  slug: "${slug}",
  title: "${title}",
  description: "${description}",
  date: "${date}",
  readingTime: "5 min read",
  content: \`
${content.trim()}
\`,
};

export default article;
`;

  const filePath = path.join(BLOG_DIR, `${slug}.ts`);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created blog file: ${filePath}`);
  return slug;
}

function updateBlogLib(slug) {
  let content = fs.readFileSync(BLOG_LIB_FILE, 'utf-8');
  
  const camelCaseName = toCamelCase(slug);
  const importStatement = `import ${camelCaseName} from "@/data/blog/${slug}";`;
  
  // Insert import after the last import statement
  const lastImportIndex = content.lastIndexOf('import');
  const nextNewlineIndex = content.indexOf('\n', lastImportIndex);
  
  content = `${content.slice(0, nextNewlineIndex + 1)}${importStatement}\n${content.slice(nextNewlineIndex + 1)}`;
  
  // Insert into articles array
  const arrayStart = content.indexOf('const articles: BlogArticle[] = [');
  const arrayEnd = content.indexOf('];', arrayStart);
  
  // Insert right before the closing bracket
  content = `${content.slice(0, arrayEnd)}  ${camelCaseName},\n${content.slice(arrayEnd)}`;
  
  fs.writeFileSync(BLOG_LIB_FILE, content);
  console.log(`✅ Updated src/lib/blog.ts with new article export.`);
}

console.log("=== SEO Blog Article Generator ===");
rl.question("Enter Article Title (e.g., 'Best Brain Games for Dementia'): ", (title) => {
  rl.question("Enter SEO Description (meta description, ~150 chars): ", (description) => {
    rl.question("Enter Main Keyword (e.g., 'Brain Games'): ", (keyword) => {
      
      try {
        const slug = createBlogFile(title, description, keyword);
        updateBlogLib(slug);
        console.log(`
Success! The article '${title}' is now live on your site.`);
        console.log(`You can edit the content at: src/data/blog/${slug}.ts`);
      } catch (err) {
        console.error("Error generating blog:", err);
      }
      
      rl.close();
    });
  });
});
