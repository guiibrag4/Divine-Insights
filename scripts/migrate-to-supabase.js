"use strict";
/**
 * Script de Migração: _posts → Supabase
 *
 * Este script lê todos os arquivos markdown de _posts/
 * e os insere no Supabase (tabelas series e posts)
 *
 * Como usar:
 * 1. Certifique-se que SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão em .env.local
 * 2. Execute: npx tsx scripts/migrate-to-supabase.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var gray_matter_1 = require("gray-matter");
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv_1 = require("dotenv");
// Carregar variáveis de ambiente
(0, dotenv_1.config)({ path: ".env.local" });
var SUPABASE_URL = process.env.SUPABASE_URL;
var SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Erro: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontrado em .env.local");
    process.exit(1);
}
var supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
var postsDirectory = path_1.default.join(process.cwd(), "_posts");
function getAllMarkdownFiles(dirPath, arrayOfFiles) {
    if (arrayOfFiles === void 0) { arrayOfFiles = []; }
    var files = fs_1.default.readdirSync(dirPath);
    files.forEach(function (file) {
        var fullPath = path_1.default.join(dirPath, file);
        if (fs_1.default.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
        }
        else if (file.endsWith(".md") && !file.includes("TEMPLATE")) {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}
function parseMarkdownFile(filePath) {
    var _a, _b, _c;
    try {
        var fileContents = fs_1.default.readFileSync(filePath, "utf8");
        var _d = (0, gray_matter_1.default)(fileContents), data = _d.data, content = _d.content;
        // Extrair series slug e post slug do caminho
        var relativePath = path_1.default.relative(postsDirectory, filePath);
        var parts = relativePath.split(path_1.default.sep);
        var seriesSlug = parts[0]; // ex: "1joao" ou "tiago"
        var fileName = parts[parts.length - 1].replace(".md", ""); // ex: "1joao-01-capitulo-1"
        return {
            seriesSlug: seriesSlug,
            slug: fileName,
            title: data.title || "",
            excerpt: data.excerpt || "",
            content: content || "",
            coverImage: data.coverImage || "",
            ogImage: ((_a = data.ogImage) === null || _a === void 0 ? void 0 : _a.url) || data.coverImage || "",
            date: data.date || new Date().toISOString().split("T")[0],
            authorName: ((_b = data.author) === null || _b === void 0 ? void 0 : _b.name) || "Autor Desconhecido",
            authorPicture: ((_c = data.author) === null || _c === void 0 ? void 0 : _c.picture) || "/assets/blog/authors/default.jpeg",
        };
    }
    catch (err) {
        console.error("\u26A0\uFE0F Erro ao processar ".concat(filePath, ":"), err);
        return null;
    }
}
function inferSeriesFromPosts(posts) {
    var seriesMap = new Map();
    posts.forEach(function (post) {
        var _a;
        if (post.slug.includes("-00-indice") || post.slug.includes("indice")) {
            // Este é um arquivo índice - usar para dados da série
            var existing = seriesMap.get(post.seriesSlug);
            seriesMap.set(post.seriesSlug, {
                slugPrefix: post.seriesSlug,
                title: (existing === null || existing === void 0 ? void 0 : existing.title) || ((_a = post.title.split("|")[0]) === null || _a === void 0 ? void 0 : _a.trim()) || post.seriesSlug,
                description: post.excerpt || "Estudo bíblico completo",
                coverImage: post.coverImage,
                status: "completo",
                chaptersCount: (existing === null || existing === void 0 ? void 0 : existing.chaptersCount) || 0,
            });
        }
        else {
            // Capítulo regular - incrementar contador
            var existing = seriesMap.get(post.seriesSlug);
            if (existing) {
                existing.chaptersCount += 1;
            }
            else {
                seriesMap.set(post.seriesSlug, {
                    slugPrefix: post.seriesSlug,
                    title: post.seriesSlug.charAt(0).toUpperCase() + post.seriesSlug.slice(1),
                    description: "Estudos de ".concat(post.seriesSlug),
                    coverImage: post.coverImage,
                    status: "em-andamento",
                    chaptersCount: 1,
                });
            }
        }
    });
    return seriesMap;
}
function migrateSeries(seriesData) {
    return __awaiter(this, void 0, void 0, function () {
        var indexSlug, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    indexSlug = "".concat(seriesData.slugPrefix, "/").concat(seriesData.slugPrefix, "-00-indice");
                    console.log("\uD83D\uDCE6 Migrando s\u00E9rie: ".concat(seriesData.title));
                    return [4 /*yield*/, supabase.from("series").upsert({
                            slug: indexSlug,
                            slug_prefix: seriesData.slugPrefix,
                            index_slug: indexSlug,
                            title: seriesData.title,
                            description: seriesData.description,
                            cover_image: seriesData.coverImage,
                            status: seriesData.status,
                            chapters_count: seriesData.chaptersCount,
                            updated_at: new Date().toISOString(),
                        })];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("\u274C Erro ao migrar s\u00E9rie ".concat(seriesData.title, ":"), error);
                        throw error;
                    }
                    console.log("\u2705 S\u00E9rie migrada: ".concat(seriesData.title));
                    return [2 /*return*/];
            }
        });
    });
}
function migratePost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("   \uD83D\uDCC4 Migrando post: ".concat(post.slug));
                    return [4 /*yield*/, supabase.from("posts").upsert({
                            series_slug: post.seriesSlug,
                            slug: post.slug,
                            title: post.title,
                            excerpt: post.excerpt,
                            content: post.content,
                            cover_image: post.coverImage,
                            og_image: post.ogImage,
                            date: post.date,
                            author_name: post.authorName,
                            author_picture: post.authorPicture,
                            updated_at: new Date().toISOString(),
                        })];
                case 1:
                    error = (_a.sent()).error;
                    if (error) {
                        console.error("\u274C Erro ao migrar post ".concat(post.slug, ":"), error);
                        throw error;
                    }
                    console.log("   \u2705 Post migrado: ".concat(post.slug));
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var markdownFiles, posts, seriesMap, _i, seriesMap_1, _a, seriesData, _b, posts_1, post;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("🚀 Iniciando migração de _posts para Supabase...\n");
                    // 1. Buscar todos os arquivos markdown
                    console.log("📂 Lendo arquivos de _posts/...");
                    markdownFiles = getAllMarkdownFiles(postsDirectory);
                    console.log("   Encontrados ".concat(markdownFiles.length, " arquivos markdown\n"));
                    // 2. Parsear todos os posts
                    console.log("📖 Parseando posts...");
                    posts = markdownFiles
                        .map(parseMarkdownFile)
                        .filter(function (post) { return post !== null; });
                    console.log("   ".concat(posts.length, " posts v\u00E1lidos parseados\n"));
                    // 3. Inferir dados das séries
                    console.log("🔍 Identificando séries...");
                    seriesMap = inferSeriesFromPosts(posts);
                    console.log("   ".concat(seriesMap.size, " s\u00E9ries identificadas\n"));
                    // 4. Migrar séries primeiro
                    console.log("📦 Migrando séries para Supabase...");
                    _i = 0, seriesMap_1 = seriesMap;
                    _c.label = 1;
                case 1:
                    if (!(_i < seriesMap_1.length)) return [3 /*break*/, 4];
                    _a = seriesMap_1[_i], seriesData = _a[1];
                    return [4 /*yield*/, migrateSeries(seriesData)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log();
                    // 5. Migrar posts
                    console.log("📄 Migrando posts para Supabase...");
                    _b = 0, posts_1 = posts;
                    _c.label = 5;
                case 5:
                    if (!(_b < posts_1.length)) return [3 /*break*/, 8];
                    post = posts_1[_b];
                    return [4 /*yield*/, migratePost(post)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 5];
                case 8:
                    console.log();
                    // 6. Resumo final
                    console.log("✅ Migração concluída com sucesso!");
                    console.log("   ".concat(seriesMap.size, " s\u00E9ries migradas"));
                    console.log("   ".concat(posts.length, " posts migrados"));
                    console.log("\n🎉 Tudo pronto! Verifique no dashboard do Supabase.");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error("❌ Erro fatal durante migração:", err);
    process.exit(1);
});
